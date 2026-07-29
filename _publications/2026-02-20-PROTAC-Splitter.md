---
title: "PROTAC-Splitter: A Machine Learning Framework for Automated Identification of PROTAC Substructures"
collection: publications
permalink: /publication/2026-02-20-PROTAC-Splitter
date: 2026-02-20
authors: Stefano Ribes, Ranxuan Zhang, Télio Cropsal, Anders Källberg, Christian Tyrchan, Eva Nittinger, Rocío Mercado
venue: Journal of Cheminformatics
volume: 18
number: 30
year: 2026
doi: 10.1186/s13321-025-01135-9
citation: 'Ribes, S., Zhang, R., Cropsal, T., Källberg, A., Tyrchan, C., Nittinger, E., Mercado, R., <i>"PROTAC-Splitter: a machine learning framework for automated identification of PROTAC substructures"</i>, Journal of Cheminformatics 18, 30 (2026).'
paperurl: https://doi.org/10.1186/s13321-025-01135-9
chemrxiv: https://doi.org/10.26434/chemrxiv-2025-bn1nv
github: https://github.com/ribesstefano/PROTAC-Splitter
spaces: https://huggingface.co/spaces/ailab-bio/PROTAC-Splitter-App
zenodo: https://doi.org/10.5281/zenodo.15797309
excerpt: "An open-source machine learning framework that automatically decomposes a PROTAC into its three functional parts — E3 ligand, linker and POI warhead — together with a synthetic dataset of ~1.3M annotated PROTAC structures."
---

PROTACs are modular by design, yet telling their modules apart computationally is
surprisingly hard. **PROTAC-Splitter** automates that decomposition, turning a raw
SMILES string into an annotated E3 ligand, linker and warhead.

## Abstract

Proteolysis-targeting chimeras (PROTACs) are heterobifunctional molecules composed
of an E3 ligase ligand, a linker, and a warhead targeting a protein of interest
(POI). Despite their modular structure, accurately identifying and annotating these
components is challenging and typically relies on manual curation and predefined
substructure matching. To address data scarcity, we generated and openly released a
synthetic dataset of approximately 1.3 million PROTAC structures with annotated
ligand splits. Leveraging this dataset, we developed two complementary approaches
for PROTAC substructure annotation: a Transformer-based sequence-to-sequence model
and a graph-based XGBoost model. The Transformer model achieves high exact-match
accuracy on public data, while a hybrid approach combining the strengths of both
models reliably annotates PROTACs across diverse chemical spaces.

**Keywords**: PROTAC, targeted protein degradation, substructure annotation,
Transformer, XGBoost, molecular graphs, cheminformatics, open data

## Why This Matters

Almost every downstream PROTAC modelling task — linker design, warhead swapping,
degradation activity prediction, synthesizability scoring — presumes you already
know which atoms belong to which module. In practice that annotation is done by
hand or with brittle SMARTS rules that break as soon as the chemistry drifts away
from the well-trodden CRBN/VHL space.

PROTAC-Splitter treats decomposition as a learning problem instead of a matching
problem, which is what lets it generalise to chemistry it has not seen before.

## Approach

The framework has three moving parts:

- **A synthetic corpus.** Roughly 1.3 million PROTAC-like molecules assembled from
  known ligands and linkers, each carrying a ground-truth split. Releasing this
  openly is arguably as useful as the models themselves — labelled decomposition
  data simply did not exist at this scale before.
- **A Transformer sequence-to-sequence model.** Reads the PROTAC SMILES and emits
  the three component SMILES directly, reaching high exact-match accuracy on public
  benchmarks.
- **A graph-based XGBoost model.** Classifies bonds as cut/no-cut using graph
  descriptors, including a betweenness-centrality heuristic. It is far cheaper to
  run and degrades more gracefully on unusual chemistry.

An **adaptive strategy** combines the two, falling back from one to the other so
that the framework stays reliable across chemical space rather than only on the
molecules that resemble its training data.

## Evaluation

We evaluated on both public PROTAC collections and a set of structurally novel
internal PROTACs provided by AstraZeneca. The gap between the two is the
interesting result: the Transformer's exact-match accuracy drops sharply on the
internal set, while the XGBoost model — lower-scoring on public data — holds up
comparatively better. That contrast is exactly why the released tool ships the
hybrid strategy as its default rather than the single best-on-paper model.

## Code, Models and Data

- Source code: [github.com/ribesstefano/PROTAC-Splitter](https://github.com/ribesstefano/PROTAC-Splitter)
- Interactive app: [PROTAC-Splitter on Hugging Face Spaces](https://huggingface.co/spaces/ailab-bio/PROTAC-Splitter-App)
- Datasets and trained models: [Zenodo, DOI 10.5281/zenodo.15797309](https://doi.org/10.5281/zenodo.15797309)

## Collaborators

This work was carried out in the
[AI Laboratory for Molecular Engineering (AIME)](https://ailab.bio) at Chalmers
University of Technology together with **Ranxuan Zhang**, **Télio Cropsal** and
**Anders Källberg**, and in collaboration with **Christian Tyrchan** and
**Eva Nittinger** at AstraZeneca R&D Gothenburg. The project was supervised by
**Rocío Mercado**.

Much of the framework grew out of Ranxuan Zhang's MSc thesis,
*Machine Learning for PROTAC Decomposition and Enhanced Degradation Prediction*
(Chalmers, 2025), which I supervised — see [Supervision](/supervision/).

<div class="funding-note" markdown="1">
**Funding and acknowledgements.** Stefano Ribes acknowledges funding provided by the
**Chalmers Gender Initiative for Excellence (Genie)**. Ranxuan Zhang and Télio Cropsal
acknowledge funding provided by the **Wallenberg AI, Autonomous Systems and Software
Program (WASP)**, supported by the **Knut and Alice Wallenberg Foundation**.
Computations and data storage were partially enabled by resources provided by
**Chalmers e-Commons**, **AstraZeneca** compute resources, and the **National Academic
Infrastructure for Supercomputing in Sweden (NAISS)**, partially funded by the
**Swedish Research Council** through grant agreement no. 2022-06725. Open access
funding was provided by **Chalmers University of Technology**.
</div>

## Citation

{% raw %}
```bibtex
@article{ribes2026protac,
  title={{PROTAC-Splitter: a machine learning framework for automated identification of PROTAC substructures}},
  author={Ribes, Stefano and Zhang, Ranxuan and Cropsal, T{\'e}lio and
          K{\"a}llberg, Anders and Tyrchan, Christian and Nittinger, Eva and
          Mercado, Roc{\'i}o},
  journal={Journal of Cheminformatics},
  volume={18},
  number={1},
  pages={30},
  year={2026},
  publisher={Springer},
  doi={10.1186/s13321-025-01135-9}
}
```
{% endraw %}
