---
layout: research
permalink: /publications/
title: publications
description: Publications by Yunsung Chung on patient state modeling, clinical world models, multimodal health data, and machine learning.
nav: true
nav_order: 2
---

<header class="archive-header">
  <div>
    <p class="eyebrow">Research archive</p>
    <h1>Publications</h1>
    <p class="archive-intro">Patient state, multimodal learning, and clinical simulation.</p>
  </div>
  <a class="text-link" href="https://scholar.google.com/citations?user={{ site.data.socials.scholar_userid }}">Google Scholar <span aria-hidden="true">↗</span></a>
</header>

<div class="archive-tools" hidden>
  <div class="archive-search">
    <label for="publication-search">Search publications</label>
    <input id="publication-search" type="search" placeholder="Title, author, venue, or topic…" autocomplete="off" spellcheck="false" aria-controls="publication-archive">
  </div>
  <p class="archive-count" role="status" aria-live="polite" aria-atomic="true"></p>
</div>

<section class="publication-archive" id="publication-archive" aria-label="Publications by year">
{% bibliography --template publication-entry %}
</section>
<p class="archive-empty" hidden>No publications match your search. Try a different title, author, or topic.</p>

<script defer src="{{ '/assets/js/publications.js' | relative_url | bust_file_cache }}"></script>
