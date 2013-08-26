---
layout: default
title: Bolg Way
---

<ul class="artical-list">
{% for post in site.posts %}
    <li>
        <h2>
            <a href="{{ post.url }}">
            <h class="post_date">{{ post.date|date:"%Y-%m-%d" }} >> </h><h>{{ post.title }}</h></a>
        </h2>
        <div class="title-desc">{{ post.description }}</div>
    </li>
{% endfor %}
</ul>
