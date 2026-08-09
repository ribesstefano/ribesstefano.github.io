---
permalink: /
title: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<div class="intro-hero" markdown="1">

I build open-source machine learning tools for **targeted protein degradation** and (sometimes) for **materials** property prediction and data extraction.

I'm a [PhD student](https://www.chalmers.se/en/persons/ribes/) in the
[AI Laboratory for Molecular Engineering (AIME)](https://ailab.bio) led by [Rocío Mercado](https://rociomer.github.io), at Chalmers University of Technology in Gothenburg, Sweden, working at the intersection of AI, computational chemistry and drug discovery. Most of my work is about PROTACs: how to represent them, how to predict what they will degrade, and how to make the data and models behind those predictions genuinely reusable by other groups.

My path here ran from computer engineering through FPGA accelerators and two years
in the aerospace sector, before an internship at AstraZeneca turned into a PhD. I'm
always happy to talk about new ideas and collaborations —
[reach out](mailto:ribes@chalmers.se) 🚀

</div>

## News

{% include news.html limit=6 %}

[See all news](/news/).

## Research

<div class="card-grid" markdown="0">
  <div class="card">
    <span class="card__eyebrow">Activity prediction</span>
    <h3>Will this degrader work?</h3>
    <p>Models that predict PROTAC-induced degradation (pDC<sub>50</sub>, D<sub>max</sub>, binary activity) from structure, target and cellular context — and honest evaluation protocols for telling real progress from noise.</p>
  </div>
  <div class="card">
    <span class="card__eyebrow">Molecular representation</span>
    <h3>Reading PROTACs as modules</h3>
    <p>Automatically decomposing heterobifunctional degraders into E3 ligand, linker and warhead, so downstream models can reason about the parts rather than one opaque SMILES string.</p>
  </div>
  <div class="card">
    <span class="card__eyebrow">Open data</span>
    <h3>Datasets others can build on</h3>
    <p>Curating, harmonising and releasing PROTAC data — because in this field a lot of apparent modelling progress turns out to be curation in disguise.</p>
  </div>
</div>

## Selected Work

Everything below is open source, with data and trained models released alongside
the papers. See [all publications](/publications/) for the full list.

- **[TACK](/publication/2026-05-19-TACK)** (KDD 2026) — 3,514 PROTACs and 6,561
  degradation endpoints in one standardised dataset, plus a statistical benchmark
  showing that XGBoost and MLPs still beat a domain-specific GNN.
  [Dataset](https://huggingface.co/datasets/ailab-bio/TACK) ·
  [Code](https://github.com/ribesstefano/TACK)
- **[PROTAC-Splitter](/publication/2026-02-20-PROTAC-Splitter)**
  (*Journal of Cheminformatics*, 2026) — automated annotation of PROTAC
  substructures, with a synthetic corpus of ~1.3M annotated structures.
  [Demo](https://huggingface.co/spaces/ailab-bio/PROTAC-Splitter-App) ·
  [Code](https://github.com/ribesstefano/PROTAC-Splitter)
- **[PROTAC-Degradation-Predictor](/publication/2024-08-24-Modeling-PROTAC-degradation-activity-with-machine-learning)**
  (*AI in the Life Sciences*, 2024) — an open, reproducible degradation activity
  model that outperforms DeepPROTACs at a fraction of the complexity.
  [Demo](https://huggingface.co/spaces/ailab-bio/PROTAC-Degradation-Predictor) ·
  [Code](https://github.com/ribesstefano/PROTAC-Degradation-Predictor)

I also supervise MSc thesis projects in this space — see
[Supervision](/supervision/) — and present this work at conferences, summer
schools and workshops, listed under [Talks](/talks/).

## Career Path

Before AI "was cool", I focused my studies on embedded systems, with a focus on
computer architecture design and high performance computing. I've always been
fascinated by both hardware and software, and I've worked on projects ranging from
developing [hardware IPs](https://en.wikipedia.org/wiki/Semiconductor_intellectual_property_core_)
for RISC-V processors to [FPGA](https://en.wikipedia.org/wiki/Field-programmable_gate_array)-based
accelerators in [HLS](https://en.wikipedia.org/wiki/High-level_synthesis) for
machine learning.

After working two years in the aerospace sector at [Gaisler](https://www.gaisler.com),
I decided to pivot my career towards AI and computational chemistry instead. Thanks
to an internship opportunity at [AstraZeneca](https://www.astrazeneca.se/om-oss/verksamheten-i-sverige/goteborg.html) in Gothenburg, which introduced me to my
current PhD supervisor, [Rocío Mercado](https://rociomer.github.io), I had the chance
to work on a project that combined my passion for AI with my interest in drug
discovery. This experience was a turning point for me and made me pursue a PhD in
the field of AI-driven molecular engineering.

Please check my [CV](/cv) for more details on my education and work experience.

## Collaborators

This work does not happen alone. I'm grateful to collaborate with
[Rocío Mercado](https://rociomer.github.io), and my group at [AIME](https://ailab.bio) at Chalmers,
and with **Eva Nittinger** and **Christian Tyrchan** at AstraZeneca R&D Gothenburg —
as well as with my former co-authors **Pedro Trancoso**, **Ioannis Sourdis** and
**Christos-Savvas Bouganis** from my hardware years.

<div class="funding-note" markdown="1">
**Funding.** My research is supported by the **Chalmers Gender Initiative for
Excellence (Genie)** and the **Wallenberg AI, Autonomous Systems and Software Program
(WASP)**, funded by the **Knut and Alice Wallenberg Foundation**. Computations and
data storage are enabled by **Chalmers e-Commons** and the **National Academic
Infrastructure for Supercomputing in Sweden (NAISS)**, partially funded by the
**Swedish Research Council** through grant agreement no. 2022-06725.
</div>

## Miscellanea

- I love cooking and trying new recipes, sometimes in a very "nerdy" way (for
  example, I really love this
  [book series](https://www.gribaudo.it/opera/la-scienza-delle-verdure/) 🥦)
- If you don't speak Italian, somehow my name is very hard to pronounce right... so
  [here is how to pronounce it correctly!](https://www.youtube.com/watch?v=EL83d7oe_Ks&ab_channel=PronounceNames)
- For personal reasons, I happen to often travel to Leiden, in the Netherlands. If
  you're around, we can also meet there in the lovely city center!
