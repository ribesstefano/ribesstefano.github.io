---
title: "Improving AI-based Synthesizability Scores for Next-Generation Protein Degradation Drugs"
collection: teaching
permalink: /teaching/2026-06-01-synthesizability-scores-protac
type: "MSc Thesis"
venue: "Chalmers University of Technology & University of Gothenburg"
date: 2026-06-01
excerpt: "Tingting Mo and Jia Xin Zhu — a systematic framework for PROTAC synthesizability assessment, combining PROTAC-Splitter decomposition with AiZynthFinder-based retrosynthesis scoring."
---

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

See [Supervision](/supervision/) for the full list of MSc theses I've supervised.
