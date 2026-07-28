---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% include base_path %}

<p>
  Peer-reviewed papers and preprints. Every entry links to the paper, the code and —
  where they exist — the dataset and an interactive demo, so the results can be
  reproduced or reused without emailing me first.
  {% if site.author.googlescholar %}A full list is also on
  <a href="{{ site.author.googlescholar }}">Google Scholar</a>{% if site.author.orcid %},
  and my ORCID record is <a href="{{ site.author.orcid }}">here</a>{% endif %}.{% endif %}
</p>

{% assign publications = site.publications | sort: "date" | reverse %}
{% assign current_year = "" %}

{% for post in publications %}
{% assign post_year = post.date | date: "%Y" %}
{% if post_year != current_year %}
<h2 class="archive__subtitle">{{ post_year }}</h2>
{% assign current_year = post_year %}
{% endif %}
{% include archive-single.html %}
{% endfor %}
