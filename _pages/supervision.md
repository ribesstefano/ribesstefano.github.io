---
layout: archive
title: "Supervision & Teaching"
permalink: /supervision/
author_profile: true
---

I supervise MSc thesis projects at the
[AI Laboratory for Molecular Engineering (AIME)](https://ailab.bio), Chalmers
University of Technology, mostly around machine learning for targeted protein
degradation. Several of these projects have grown into published work — the
students are co-authors, not acknowledgees.

If you are a Chalmers or GU student looking for a thesis project in AI for drug
discovery, [get in touch](mailto:ribes@chalmers.se). Open topics usually sit
somewhere between generative chemistry, property prediction, and the very
unglamorous but very necessary business of building good datasets.

## MSc Theses Supervised

### Improving AI-based Synthesizability Scores for Next-Generation Protein Degradation Drugs

**Tingting Mo** and **Jia Xin Zhu** — Chalmers University of Technology and
University of Gothenburg, 2026. Examiner **Rocío Mercado**.

Can you tell whether a proposed PROTAC is actually makeable without running a
full retrosynthesis search every time? The thesis builds a systematic framework
for PROTAC synthesizability assessment: 27,099 PROTACs curated and labelled,
decomposed with [PROTAC-Splitter](/publication/2026-02-20-PROTAC-Splitter) and
scored with AiZynthFinder, then distilled into Random Forest, XGBoost and MLP
surrogates. Component-level and whole-molecule synthesizability agree 57% of the
time, with **linkers** identified as the dominant source of synthetic
difficulty. The best classifier reaches 0.958 ROC-AUC; the best regressor
reaches an R² of 0.497, rising to 0.661 once noisy labels are filtered.

### Reinforcement Learning with Language Models for Multi-Objective PROTAC Optimization

**Alexander Persson** and **Felix Erngård** — Chalmers University of Technology
and University of Gothenburg, 2026. Examiner **Rocío Mercado**.

Generative design of complete PROTACs: using language models with reinforcement
learning to optimise heterobifunctional degraders against several objectives at
once, rather than tuning one component in isolation.

[Read the thesis](https://odr.chalmers.se/items/65276979-1afe-41d0-8f72-bcc7fbd66c88)

<!--
  TODO (Stefano): replace the heading above with the thesis' exact registered
  title from ODR. The odr.chalmers.se host is blocked from the environment this
  page was drafted in, so the heading currently paraphrases the topic as
  described in your individual study plan.
-->

### Machine Learning for PROTAC Decomposition and Enhanced Degradation Prediction

**Ranxuan Zhang** — Chalmers University of Technology, defended June 2025.
Co-supervised with **Eva Nittinger** and **Christian Tyrchan** (AstraZeneca R&D
Gothenburg); examiner **Rocío Mercado**.

Learning to split a PROTAC into its E3 ligand, linker and warhead, and using that
decomposition to improve degradation activity prediction. The work fed directly
into [PROTAC-Splitter](/publication/2026-02-20-PROTAC-Splitter), published in the
*Journal of Cheminformatics*, on which Ranxuan is a co-author.

## Teaching

Teaching assistant and course contributor at Chalmers University of Technology.

| Year | Course |
|---|---|
| 2025–2026 | DAT341 Applied Machine Learning |
| 2025–2026 | AI for Molecules |
| 2025–2026 | DAT565 Introduction to Data Science and AI |
| 2024–2025 | DAT341 Applied Machine Learning |
| 2024–2025 | DAT410 Design of AI Systems |
| 2024–2025 | DIT862 Statistical Methods for Data Science |
| 2024–2025 | DAT565 Introduction to Data Science and AI |
| 2019–2020 | DAT093 Introduction to Electronic System Design |
| 2018–2019 | DAT093 Introduction to Electronic System Design |
| 2017–2018 | EDA332 Datorsystemteknik |
| 2017–2018 | EDA322 Digital Konstruktion |
| 2017–2018 | DAT093 Introduction to Electronic System Design |
| 2016–2017 | EDA322 Digital Konstruktion |

<div class="funding-note" markdown="1">
Student projects at AIME have been supported by the **Chalmers Gender Initiative for
Excellence (Genie)** and the **Wallenberg AI, Autonomous Systems and Software Program
(WASP)**, funded by the **Knut and Alice Wallenberg Foundation**, with compute
provided by **Chalmers e-Commons** and the **National Academic Infrastructure for
Supercomputing in Sweden (NAISS)**.
</div>
