---
lang: en
translation_key: photos-to-3d
title: "How a computer sees a plant in 3D"
date: 2026-07-21
permalink: /posts/2026/07/how-a-computer-sees-a-plant-in-3d/
excerpt: "Walk around a plant with a camera and you can rebuild it in three dimensions. Here is how that actually works — and what it quietly fails to tell you."
tags:
  - basics
  - 3d-reconstruction
  - phenotyping
---

In the [previous post]({{ site.baseurl }}/posts/2026/07/what-is-plant-phenotyping/)
I described the problem with measuring plants by hand: it does not scale, it is
inconsistent, and the most accurate methods destroy the plant. The obvious way
out is to photograph the plant instead and measure the photographs.

But a photograph is flat. A plant is not. So how do you get from one to the
other?

## Two eyes, one distance

Start with something you already do without thinking. Hold a finger up in front
of your face and close one eye, then the other. Your finger appears to jump
sideways against the background.

That jump is the whole idea.

Your two eyes see the world from positions about six centimetres apart, so each
one gets a slightly different image. Near objects shift a lot between those two
views; distant objects barely shift at all. Your brain reads the size of the
shift and turns it into a sense of depth.

A computer does the same trick, with one important relaxation: the two views do
not have to arrive at the same instant, and they do not have to come from a
fixed pair of eyes. One camera, moved to a new position, gives you the second
view just as well.

## Walk around the plant

So the recipe is: take many photographs of the plant from many positions,
walking around it as you go.

<figure>
  <img src="/images/blog/photos-to-3d.svg" alt="Three stages: a camera photographs a plant from five positions around it; the same feature points are matched between two overlapping photos; the matches become a 3D cloud of points.">
  <figcaption>The pipeline in three moves. Photograph from many positions, find
  the points that appear in more than one photo, and let the geometry of those
  repeated points fix where everything sits in space.</figcaption>
</figure>

Now the software looks for **features** — small, distinctive patches it can
recognise again in another photo. The tip of a leaf, a notch on a stem, a
speckle of texture on the soil. Anything visually unusual enough to be picked
out twice.

Then it plays matching. This patch here, in photo 12 — is it the same physical
speck as that patch there, in photo 13? Do this across thousands of features and
hundreds of photos, and something remarkable falls out.

Each matched feature imposes a constraint. If this speck appears *here* in one
photo and *there* in another, then the two cameras must have been in particular
positions relative to each other and to the speck — otherwise the numbers do not
add up. Pile up enough constraints and only one arrangement satisfies them all.
The software solves for that arrangement, recovering **where every photo was
taken from** and **where every speck sits in space**, simultaneously.

This is **Structure-from-Motion**: structure, recovered from the motion of the
camera. The output is a *point cloud* — thousands of dots floating in 3D, each
one a speck the software was confident about, together tracing the shape of the
plant.

## The catch

Here is the part that surprises people, and it is the reason my research exists.

That reconstruction is faithful in every respect but one. The proportions are
right, the shape is right, the geometry is right. The **size** is not
determined.

Think about why. Every constraint in the process came from comparing photos to
each other. Nothing in the process ever compared a photo to a ruler. A large
plant photographed from far away and a small plant photographed from close up
produce *identical* images — so nothing in the images can distinguish them.

The reconstruction therefore comes out in arbitrary units. It is a perfect
model of the plant at an unknown scale, and "unknown" means it can land
differently every time you rebuild. Same plant, Tuesday and Friday, two
different scales — and any measurement in centimetres is meaningless until you
pin that scale down.

The usual answer is to put an object of known size in the scene, like a
chequerboard target, and let the software calibrate against it. That works. It
also means someone has to place and maintain that target in a working
greenhouse, every session, forever.

The alternative is to stop needing the scale at all. That is what the next post
is about.

---

*Next in this series: what a Gaussian Splat is, and why it suits a leafy plant
better than a mesh.*
