---
lang: en
translation_key: colmap-practice
title: "COLMAP in practice"
date: 2026-07-22 18:00:00 +0900
permalink: /posts/2026/07/colmap-in-practice/
excerpt: "Structure-from-Motion recovers camera poses and a point cloud. COLMAP is the software that actually does it — four commands, a handful of flags that matter, and the specific ways it fails on plants."
tags:
  - 3d-reconstruction
  - colmap
  - tools
  - phenotyping
---

*An aside from the main series. The
[earlier post]({{ site.baseurl }}/posts/2026/07/how-a-computer-sees-a-plant-in-3d/)
explained Structure-from-Motion as an idea; this one is about the program that
does it, for anyone who has to actually run it. The promised post on measuring
without scale is still coming.*

Every 3D Gaussian Splatting pipeline I know of starts the same way: point a
folder of photographs at **COLMAP** and wait. The point cloud that the
[splatting post]({{ site.baseurl }}/posts/2026/07/what-is-a-gaussian-splat/)
took as its starting material is, in practice, COLMAP output. So is the set of
camera poses, which matters just as much — the splat optimiser needs to know
where each photograph was taken from before it can compare renders against it.

COLMAP is an open-source Structure-from-Motion and multi-view stereo package,
and it has been the default for about a decade. It is not the only option, but
it is the one everything else assumes.

## Four commands

Stripped of the bookkeeping, my pipeline is this:

```bash
colmap feature_extractor \
    --database_path  colmap/database.db \
    --image_path     colmap/images \
    --ImageReader.single_camera 1 \
    --FeatureExtraction.use_gpu 1

colmap exhaustive_matcher \
    --database_path  colmap/database.db \
    --FeatureMatching.use_gpu 1

colmap mapper \
    --database_path  colmap/database.db \
    --image_path     colmap/images \
    --output_path    colmap/sparse \
    --Mapper.max_num_models=1 \
    --Mapper.init_min_tri_angle=4 \
    --Mapper.filter_min_tri_angle=0.5

colmap image_undistorter \
    --image_path     colmap/images \
    --input_path     colmap/sparse/0 \
    --output_path    colmap/undistorted
```

Four steps: find features, match them between photographs, solve for geometry,
then rewrite the images into the clean pinhole form that downstream tools want.
The flags are where the interesting decisions live.

## `single_camera` — tell it what you know

`--ImageReader.single_camera 1` says every image came from the same physical
camera with the same settings, so they share one set of intrinsics: focal
length, principal point, distortion coefficients.

If your frames were extracted from a single video, this is simply true, and
asserting it is close to free accuracy. Instead of solving for those parameters
once per image, the solver estimates one set constrained by every image at once.
Fewer unknowns, better conditioned, less drift.

The corollary: if you *did* change lenses or zoom mid-session, this flag is a
lie and it will quietly bend your reconstruction. It is worth being sure.

## Matching — the step that costs

Feature extraction is fast and parallel. Matching is where the time goes,
because the question "which photographs overlap?" has no cheap answer.

<figure>
  <img src="/images/blog/matching-strategies.svg" alt="Sixteen photographs arranged in a ring. On the left, exhaustive matching draws a line between every pair, producing a dense tangle. On the right, sequential matching connects each photograph only to its near neighbours in capture order, producing a thin band around the ring.">
  <figcaption>Exhaustive matching compares every pair, which is thorough and
  quadratic. Sequential matching exploits the fact that video frames arrive in
  order, and only compares each frame with the ones near it in time.</figcaption>
</figure>

`exhaustive_matcher` tries every pair. For *N* images that is *N(N−1)/2*
comparisons — fine at 200 images, unpleasant at 1,000, hopeless at 5,000. It is
also the safest option, because it cannot miss an overlap.

`sequential_matcher` assumes your images arrive in capture order, which they do
if you extracted them from a video, and only matches each frame against a window
of its neighbours:

```bash
colmap sequential_matcher \
    --database_path colmap/database.db \
    --SequentialMatching.overlap 30 \
    --FeatureMatching.use_gpu 1
```

I switch between the two on frame count — exhaustive under a few hundred,
sequential above. The thing to know about sequential matching is that it only
sees time-adjacent pairs, so when you walk a full circle around a plant, the
last frame and the first frame overlap in space but are far apart in the
sequence. That loop never closes, and the reconstruction can drift all the way
round without anything pulling it shut. COLMAP has vocabulary-tree loop
detection to fix exactly this; if you go sequential on a walkaround, turn it on.

## The mapper, and triangulation angle

The mapper is the actual Structure-from-Motion solver. It chooses a good initial
image pair, triangulates points between them, then registers the remaining
images one at a time, re-running bundle adjustment periodically to keep
everything consistent.

Two of my flags are about **triangulation angle** — the angle at the 3D point
between the two camera rays that observe it.

`--Mapper.init_min_tri_angle=4` requires at least four degrees between the two
cameras of the *initial* pair. A pair of nearly identical viewpoints can match
beautifully and still say almost nothing about depth: the rays are close to
parallel, so a small error in the image sends the intersection sliding a long
way along the ray. Starting from that is how you get a reconstruction that looks
plausible and is wrong.

`--Mapper.filter_min_tri_angle=0.5` is the same idea applied afterwards,
discarding points whose observations are too close to parallel to be trusted.

`--Mapper.max_num_models=1` is a different kind of choice. Given photographs it
cannot link into one consistent scene, COLMAP will happily produce two or three
separate models. That is COLMAP being honest — the connections were not there —
but for my purposes a fragmented capture is a failed capture, and I would rather
find that out immediately than discover it later in a splat that covers half a
plant.

## Where it fails on plants

The general advice above applies to any scene. Plants add their own problems,
and all of them trace back to one assumption: **Structure-from-Motion assumes
the scene is rigid and static.**

**Foliage moves.** A greenhouse has ventilation fans, air currents, and leaves
light enough to respond to both. Between two frames a few seconds apart, the
leaf has changed shape. That feature match is now geometrically inconsistent
with every static point in the scene, and it enters the solve as an outlier.
RANSAC absorbs some of this. Enough of it and registration simply fails. The
practical answer is unglamorous: capture faster, and capture when the fans are
off.

**Leaves are poor features.** A green surface with a smooth gradient and few
distinctive marks yields few keypoints. What COLMAP latches onto instead is soil
texture, pot rims, plant labels, bench edges, and greenhouse clutter. This is
usually enough to solve the camera poses — which is what you actually need — but
the sparse cloud is often much thinner *on the plant* than beginners expect.
Sparse points on the crop are not necessarily a failure.

**Greenhouses repeat themselves.** Identical pots, identical trays, evenly
spaced benches, a repeating structural frame. Repetitive structure is the
classic way to get confident false matches, and confident false matches produce
reconstructions that are locally clean and globally folded.

**Glass and sky.** Backlighting through greenhouse glazing blows out leaf detail
and drives auto-exposure to swing between frames. Specular highlights move with
the camera, which means they are features that violate the static-scene
assumption by construction.

## Reading the result

Before spending GPU hours on splatting, check three things.

First, **how many images registered**. The mapper reports this. If you gave it
600 frames and it registered 340, you do not have the capture you think you
have, and the missing 260 are usually contiguous — that is where something went
wrong in the room.

Second, **how many models came out**. More than one means the scene did not
connect.

Third, **look at the sparse cloud**. Not as a formality: open it and see whether
the shape is the plant. A folded or doubled reconstruction is obvious in three
seconds of viewing and invisible in the log.

## Two operational notes

Build matters. The COLMAP in your distribution's package manager may be compiled
without CUDA, and the GPU flags above then do nothing or fail outright. I keep a
CUDA-enabled build separate from the system one for this reason.

And on a headless machine, COLMAP will try to create an OpenGL context and
crash. `export QT_QPA_PLATFORM=offscreen` fixes it. This cost me an afternoon
once, and the error message points nowhere useful.

## What you have at the end

Camera poses for every registered image, a sparse point cloud, and undistorted
images — everything a splat optimiser needs to begin.

What you do not have is any idea how large the plant is. COLMAP is scrupulous
about geometry and silent about scale, for the reason the
[earlier post]({{ site.baseurl }}/posts/2026/07/how-a-computer-sees-a-plant-in-3d/)
gave: nothing in the process ever compared a photograph to a ruler.

---

*Back to the main series next: measuring a plant's traits without ever fixing
the scale.*
