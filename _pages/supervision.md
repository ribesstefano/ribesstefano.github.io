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

{% assign theses = site.teaching | sort: "date" | reverse %}
{% for post in theses %}
  {% include archive-single.html %}
{% endfor %}

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
