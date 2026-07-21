---
lang: en
translation_key: gaussian-splat
title: "What is a Gaussian Splat?"
date: 2026-07-22
permalink: /posts/2026/07/what-is-a-gaussian-splat/
excerpt: "The usual way to turn a point cloud into a model is to stretch a surface over it. Plants punish that assumption — so here is the alternative."
tags:
  - basics
  - 3d-gaussian-splatting
  - 3d-reconstruction
---

In the [previous post]({{ site.baseurl }}/posts/2026/07/how-a-computer-sees-a-plant-in-3d/)
we got as far as a point cloud: thousands of dots floating in space, each one a
speck of the plant the software was confident about.

A point cloud is not yet a model, though. It is a set of samples with nothing in
between them. Zoom in and the plant dissolves into gaps.

## The usual next step

The standard move is to build a **mesh**: stretch a skin of tiny triangles over
the points so that the gaps close and you have a continuous surface.

This works beautifully, and almost all of computer graphics is built on it. A
coffee mug, a car door, a museum statue — a mesh describes all of them well,
because they are exactly what a mesh assumes: solid, opaque objects with a clean
boundary between inside and outside.

## Plants break every one of those assumptions

A leaf is not solid. It is a sheet, thin enough that "inside" barely exists — so
the mesh has to represent it as two surfaces almost touching, or one surface
with no thickness at all, and neither is comfortable.

A leaf is not opaque either. Hold one up to a window and you can see the light
coming through. A triangle is either there or it is not; it has no vocabulary
for *partly*.

And a canopy hides itself. Leaves occlude other leaves, so the point cloud
always has regions no camera ever saw. The mesher must do something there, and
what it does is guess — bridging across a gap, welding two separate leaves into
one because they happened to pass close together, or leaving a ragged edge where
the blade actually continued.

<figure>
  <img src="/images/blog/mesh-vs-splats.svg" alt="The same leaf twice: on the left a coarse triangle mesh with flat facets, cut corners and a filled-in hole; on the right a set of soft overlapping ellipses stretched along the blade that fade out at the edges.">
  <figcaption>The dashed line is the real leaf. A mesh has to commit to an exact
  surface everywhere, including where no photograph resolved one. Splats never
  claim a surface in the first place.</figcaption>
</figure>

That last point is the one that matters most to me. **A mesh has to commit.**
Every triangle is a hard assertion that the surface is exactly here — and where
the evidence was weak, it asserts anyway, silently, with no mark to tell you
which parts were measured and which were invented.

## A different representation

So drop the surface. Instead of one skin, describe the plant with a large number
of soft, semi-transparent blobs.

Each blob is a **3D Gaussian**: a fuzzy ellipsoid, densest at its centre and
fading smoothly outward, with no edge anywhere. It carries only a few numbers —
where it sits, its shape and orientation, its colour, and how opaque it is. A
scene is a few hundred thousand to a few million of them, overlapping.

To render, you project every blob onto the image plane, sort them by depth, and
blend them front to back. That is all — no ray tracing, no surface intersection.
Blending flat shapes is something graphics hardware is extremely good at, which
is why a splat scene renders in real time. The name comes from that step: each
blob is *splatted* onto the screen.

## Where the blobs come from

They are not designed. They are fitted.

Start with the point cloud from the previous post and put one blob at each
point. Now render that mess from a camera position where you happen to have a
real photograph, and compare the two images. They will not match.

The crucial property is that the render is a *differentiable* function of every
blob's parameters. That means you can compute, for each blob, which way to nudge
its position, stretch its shape, or shift its colour so the render moves closer
to the photograph. Do that across all your photographs, tens of thousands of
times over, and the blobs settle into an arrangement that reproduces every view
you captured.

The optimiser also controls the population. Where the error stays stubbornly
high, it splits and clones blobs to add detail; where a blob has drifted to
near-zero opacity, it deletes it. Nobody specifies how many blobs a plant needs.

And nobody ever tells it what a leaf is. The only instruction is: *your renders
should look like my photographs.*

## Why this suits a plant

An ellipsoid can stretch. A blob can flatten into a thin disc lying along a leaf
blade, or draw out into a long needle running up a stem or a tendril. That
directional freedom — anisotropy — comes for free, and it means fine structures
do not need many blobs, just well-shaped ones.

Opacity is per-blob and continuous, so translucency and soft edges are
expressible rather than approximated. And it gives the representation something
a mesh cannot have: where the photographs were ambiguous, blobs simply stay
faint. The model declines to assert a surface instead of inventing one.

There is also no topology to get wrong. Two leaves that pass close together stay
two clouds of blobs. Nothing welds.

## What it does not give you

Two honest limitations.

First, it is a representation built for *rendering*, not for *measuring*. Ask a
splat model "where exactly is the leaf surface?" and there is no single answer —
the whole point is that it never drew one. Getting a leaf area out of a cloud of
fuzzy blobs is real work, not a lookup.

Second, and more importantly for this series: splatting inherits the problem
from the last post completely. The blobs live in the same arbitrary-unit space
the point cloud came from. Gaussian Splatting improves how faithfully the model
*looks* like the plant. It does nothing at all about how big the plant is.

So we now have a beautiful, high-fidelity model of a plant — of unknown size.

---

*Next in this series: how to measure a plant's traits without ever fixing the
scale.*
