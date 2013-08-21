---
layout: default
title: Bolg Way
---

<ul class="artical-list">
<h4>Recently:</h4>
{% for post in site.posts %}
    <li>
        <h2>
            <a href="{{ post.url }}">
            {{ post.date|date:"%Y-%m-%d" }} {{ post.title }}</a>
        </h2>
        <div class="title-desc">{{ post.description }}</div>
    </li>
{% endfor %}
</ul>
