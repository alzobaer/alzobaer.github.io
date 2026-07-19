---
title: "What is plant phenotyping?"
date: 2026-07-20
permalink: /posts/2026/07/what-is-plant-phenotyping/
excerpt: "The difference between a plant's genes and how it actually grows — and why measuring the second one is surprisingly hard."
tags:
  - phenotyping
  - basics
  - precision-agriculture
---

If you grow tomatoes in a greenhouse, you already know that two plants from the
same seed packet, planted on the same day, can end up looking nothing alike. One
is tall and leggy; the other is compact with heavy fruit. Same genes, different
outcomes.

That gap is what phenotyping is about.

## Genotype and phenotype

A plant's **genotype** is its genetic code — fixed at the seed, the same in
every cell. Its **phenotype** is what the plant actually becomes: how tall it
grows, how many leaves it puts out, how much light those leaves catch, when it
sets fruit, how it responds to a cold night or a dry week.

<figure>
  <img src="/images/blog/genotype-environment-phenotype.svg" alt="Diagram: genotype plus environment produces phenotype.">
  <figcaption>Two plants from the same seed packet share a genotype. What they
  become depends on everything that happens to them afterwards.</figcaption>
</figure>

The phenotype is the genotype *plus everything that happened to the plant*.
Temperature, light, water, nutrients, pruning, disease pressure — all of it
lands in the phenotype.

This matters because the phenotype is the part a grower can actually influence.
You cannot change the seed once it is in the ground, but you can change the
climate, the irrigation, and the pruning schedule. To know whether those
decisions are working, you have to measure the plant.

## What gets measured

Phenotyping means measuring **traits** — the observable, quantifiable
properties of a plant. A few that matter in a greenhouse:

- **Height** — a direct readout of vegetative growth rate.
- **Leaf area** — roughly, how much surface the plant has for photosynthesis.
- **Stem diameter** — an indicator of vigour and how much load the plant can carry.
- **Biomass** — total accumulated growth.
- **Fruit count and size** — the part that actually gets sold.

Measure these once and you have a snapshot. Measure them every few days across a
season and you have a **growth curve**, which is far more useful: it tells you
not just where the plant is, but where it is heading, and whether last week's
change to the irrigation schedule did anything.

## Why this is hard

Here is the problem that motivates most of my research: the traditional way to
collect these numbers is for a person to walk into the greenhouse with a ruler,
a tape measure, and a notebook.

That approach has three failure modes.

**It does not scale.** Measuring one plant carefully takes a few minutes.
A commercial greenhouse holds thousands. Nobody measures every plant, so growers
sample a handful and hope those represent the rest.

**It is inconsistent.** Where exactly is the "top" of a plant that is bending
under fruit? Two people will answer differently, and so will the same person on
a Friday afternoon. When you are looking for a 5% change in growth rate,
measurement noise of that size hides the signal you care about.

**It is destructive.** The most reliable way to measure biomass or leaf area is
to cut the plant down, dry it, and weigh it. You get one excellent measurement,
and you no longer have a plant. That rules out ever watching the same individual
grow over time.

This last point is the sharpest one. The most interesting questions in crop
science are about *change* — how a plant responds over days and weeks — and the
most accurate traditional methods destroy the very thing you wanted to track.

## The alternative

The obvious idea is to replace the ruler with a camera. Take images, reconstruct
the plant in 3D, and measure the reconstruction instead of the plant. Nothing
gets cut, the same plant can be measured every day, and a robot can do the
walking.

This is roughly what my research does, and the idea is sound. But it introduces
a new problem that is not obvious until you try it: a 3D reconstruction built
from ordinary photographs recovers the plant's **shape** faithfully, while its
**size** is ambiguous. Rebuild the same plant on Tuesday and again on Friday,
and the two models may come out at different scales — not because the plant
changed, but because the reconstruction has no built-in sense of what a
centimetre is.

Which means the measurements drift between sessions, and you are back to noise
swamping signal.

<figure>
  <img src="/images/blog/scale-ambiguity.svg" alt="Two drawings of the same plant at different sizes, each with its height marked as an unknown number of centimetres.">
  <figcaption>Both of these are consistent with the same set of photographs. The
  shape is recovered perfectly; the size is anyone's guess. Rebuild the plant on
  Tuesday and again on Friday and you may land on different answers — not
  because the plant changed, but because nothing in an ordinary photo defines
  how long a centimetre is.</figcaption>
</figure>

That problem — and what to do about it — is the subject of the next few posts.

---

*This is the first in a series of introductory posts on the ideas behind my
research. Next: how a computer builds a 3D model of a plant from ordinary
photographs.*
