---
title: 'Drawing for Publications'
date: 2025-06-25
permalink: /posts/2025/06/drawing-tutorial/
tags:
  - drawing
  - latex
  - adobe illustrator
  - matplotlib
  - seaborn
  - chemdraw
  - drawio
  - figures
---

This blogpost provides guidelines and best practices for creating figures, diagrams, and plots for scientific papers, particularly in the context of cheminformatics and related fields. The goal is to ensure that all figures are clear, consistent, and suitable for publication. This is mainly a collection of personal notes coming from experience with various tools and formats, and it is not exhaustive nor a definitive guide (I'm still learning myself!).

The final results shall be done in Adobe Illustrator (Ai), since it's the tool giving the best control over the final output.

Tools used:

| Tool | Version | Purpose |
| ---- | ------- | ------- |
| Matplotlib/Seaborn | v3.10.3 / v0.13.2| Data visualization, _e.g._, bar plots, line plots, etc. |
| DrawIO | v27.0.9 | Diagrams, flowcharts, and simple figures (it supports LaTeX equations too) |
| ChemDraw | 20.1 | Chemical structures and reactions |
| Adobe Illustrator | 2025 | Final drawings, _e.g._, multi-panel figures |

## General Guidelines

The main idea is to work on "artboards" that are the same size as the final image size, which is usually the text width of the paper. This allows for easy scaling and ensures that all elements are properly aligned and sized everywhere and in the final manuscript (I'm using the Adobe Illustrator term to indicate the area where the drawing is done, which might be called differenlty in other tools).
In general, as unit of measurement, use `pt` (points) for all drawings to ease consistency.

To determine the artoboard dimensions, check the LaTeX style (it can be in the main header, or in a separate class or style file) for the maxium image width, that usually is the same as the text width.

Finally, remember that a figure might be placed in a single column or have multiple panels, so use rulers or guides to work on the right size and alignment of the arboard,_e.g._, in half of the text width for a single column figure.

### Fonts

Be consistent in every figure you make by setting the followings:

- the same font, _e.g._, `Sans Serif` or `Helvetica`. NOTE: it can be different from the one used in the manuscript, but it should be consistent across all figures.
- the font size, _e.g._, `11pt`
- the font color, _e.g._, `#000000` (black)

I usually check the font used by checking the LaTeX style file (ChatGPT can help with this).
If not available in my installed fonts, I download it and install it on my system.

Downloaded fonts can be in `.otf` or `.ttf` format, and they can be installed on macOS by double-clicking the file and clicking "Install Font" in the Font Book app.

Sometimes the font might not be available in the plotting library, even after installing it.
In this case, one can use the `matplotlib.font_manager` module to set the font globally for all plots.
Here's an example of how to do this with Matplotlib and Seaborn:

```python
import matplotlib.font_manager as fm
from matplotlib import pyplot as plt
import seaborn as sns

fontsize = 10
fontname = "Latin Modern Roman"  # Change this to the font you want to use

# Set publication-like style with 11pt font
sns.set_context("paper", font_scale=1/fontsize)
sns.set_style("white")

# Rebuild font cache (to be done only once after installing new fonts)
# This will make the font available for Matplotlib, comment it out after the
# first run, otherwise it will take a long time to run every time you start the
# script.
fm._load_fontmanager(try_read_cache=False)

# Double check the font is available
print([f.name for f in fm.fontManager.ttflist if fontname in f.name])
print(fm.findfont(fontname))

# Set global font settings for Matplotlib and Seaborn
# NOTE: This must happen after changing global settings in seaborn
plt.rcParams["font.family"] = fontname
plt.rcParams["mathtext.fontset"] = "custom"
plt.rcParams["mathtext.rm"] = fontname
plt.rcParams["font.size"] = fontsize
```

## Plotting with Matplotlib/Seaborn

For plots with complex images, for example with million of markers in a scatter plot for visualizing a chemical space, flag the `rasterize=True` argument in the plotting command, _e.g._, `plt.scatter(..., rasterize=True)`.
This will avoid a monstrously large PDF image that cannot be imported anywhere else.
In this scenario, always specify the dpi (dot per inch) in the `savefig` command, _e.g._, `dpi=300` or `dpi=600` for high-resolution images, even when saving as PDF or SVG, as the default will make the rasterized part very, very, blurry.

Fix a palette of HEX colors, and use it consistently across all figures. This will help maintain a consistent look and feel.
Example:

```python
# Dictionary of hue (for different categories to plot) and respective color
# NOTE: These colors might look weird, sorry, I won't give you my cool palette,
# so go and make your own awesome style! :)
palette_colors = {
    'Train': '#FF2720',
    'Validation': '#FE222E',
    'Test': '#F42D27',
}

sns.scatterplot(..., hue='split', palette=palette_colors)
```

## DrawIO

DrawIO is a quick and easy option for creating diagrams and flowcharts.
It's main limitation is its inability to import PDF images, like plots or chemical structures, so one has to export those images to SVG and then import them into DrawIO.

If one is skilled enough, DrawIO might be used as a standalone tool for creating the final figures for the paper, but it lacks some advanced features and flexibility compared to Adobe Illustrator.

DrawIO supports LaTeX equations.
To enable this, tick on `Extras` -> `Mathematical Typesetting`, and then encapsulate LaTeX equations in text boxes with `$$` symbols, like `$$E = mc^2$$`.

Text boxes places close to the image edge might also create "misterious" extra white space in the exported PDF.
To overcome this, in the `Style` tab of the text box properties, set the property `Text Overflow` to `Block` and tick the `Resizeable` option to allow you to resize the text box as needed.

Exporting DrawIO drawings to SVG might cause issues when importing those to Adobe Illustrator, so it's better to export to PDF directly.

To export, first select the area to export, then go to `File` -> `Export as` -> `PDF...`. In the export dialog, make sure to set the border width to `0`.
The final image might still have some white edges, so it might be necessary to crop it using some other tools.
I personally like [this online website](https://pdfresizer.com/crop) for automatically cropping and removing the white edges from PDF files.
Be aware that one needs to upload the PDF file to the website, so if the file contains sensitive information, use a local tool instead!

When exporting to PDF in DrawIO, one can also choose to include a copy of the diagram in the PDF file, which can be useful for further editing in DrawIO later on. This is done by checking the "Include a copy of my diagram" option in the export dialog.

## ChemDraw

One shall set the document size as the same as the final image size, which is usually the text width of the paper. ChemDraw might not allow for setting the document size in `pt`, so one can set it in `mm` and then convert it to `pt` (1 pt = 0.352778 mm).

Depending on the target of the manuscript, one shall set the molcule style to the appropriate one, for example, after selecting the molecule(s), go to `Object` -> `Apply Object Settings from` and choose the desired style, such as "ACS Document 1996" for American Chemical Society publications.
Set it default to the whole document if asked.

All chemical related figures **must** have the same size everywhere in the manuscript (funny how attached code is usually unreadeable, but chemical style is enforced...). Hence, scaling is allowed, as long as it doesn't make the chemical structures too small and applied to all with the same settings.
When scaling, scale labels too, and 60% is usually a good compromise but it depends on the final image size.

Kekulization is SMILES-dependent, so if you a molecule looks odd, copy it as SMILES and paste it in a RDKit-powered script to modify it. For example:

```python
from rdkit import Chem
from rdkit.Chem import Kekulize

# Kekulize the SMILES string
smi = "COC1=CC2=C(OC[C@@H]3CCC(N3)=O)N=CC([*:1])=C2C=C1C(N)=O"
mol = Chem.MolFromSmiles(smi)
print(Chem.MolToSmiles(mol, kekuleSmiles=False))
```

I personally found that working on a single document and putting all required chemical structures there is the best way to ensure consistency and avoid issues with different styles or sizes.
When done, export the document to PDF using `File` -> `Export...` and choose SVG as the format, ready to be imported into Adobe Illustrator.

## Adobe Illustrator

Color mode should be set to RGB, not CMYK, otherwise colors might not be rendered correctly in the final PDF.

Layers are very useful.
Groups too, for example when importing an SVG file containing multiple chemical structures.
In fact, every chemical structure is a collection of lines, shapes, and text, so grouping them together allows for easier manipulation and alignment.

Naively cropping PDF images in Ai will result in a rasterized image, which is bad, so it's better to have PDF already properly sized before importing to Ai.

When importing PDF files, make sure to check the "Link" option, so that the original PDF file is not embedded in the Ai file, which can lead to large file sizes and it's convenient when experimenting. For example, making the right plots can require multiple iterations, and having the original PDF linked allows for quick updates without needing to re-import the file.

When exporting the final figure, use `File` -> `Export As...` and choose the desired format (PDF, SVG, PNG, etc.). For publication-quality figures, PDF is preferred as it retains vector graphics quality.

SVGs will be separately opened in Adobe Illustrator, and they allow for full editing of the vector graphics (_i.e._, you can every line, text, and shape).

## Importing to LaTeX

When importing figures into LaTeX, specify the width as a fraction of the text width, _e.g._, `\includegraphics[width=\textwidth]{figure.pdf}`. If eveything is done correctly, the figure should scale properly to fit the text width.
For example:

```latex
\begin{figure}
    \centering
    \includegraphics[width=0.99\textwidth]{my/awesome/picture.pdf}
    \caption{My awesome picture showing the results of my research.}
    \label{fig:my-awesome-picture}
\end{figure}
```