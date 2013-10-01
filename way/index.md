---
layout: way
title: Bolg Way
type: way
---

<ul class="artical-list">

{% assign colors  = "#000000|#0937fc" | split: "|" %}
{% for post in site.posts %}
    <!-- {% assign cur = forloop.index | minus: 1 | mod: 2 %} -->
    <li class="post_item">
        <span class="post_line">
            <a class="post_title_link" href="{{ post.url }}"><span class="post_title" style="color:{% cycle 'g1': '#000000', '#f37421' %};">{{ post.title }}</span></a>
            <h class="post_date" style="border-color:{% cycle 'g2': '#000000', '#f37421' %};"><time itemprop="datePublished" class="date-pub" title="{{ post.date | date: '%Y' }}年{{ post.date | date: '%m' }}月{{ post.date | date: '%d' }}日 " datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%B' }} {{ post.date | date: '%d' }}, {{ post.date | date: '%Y' }} </time></h>
        </span>
        <div class="post_prop">
          <span><img class="icon_cat" src="/images/category.ico" alt="category" title="category" /><a class="cat_btn" href="/way/{{ post.category | downcase }}">{{ post.category }}</a></span> 
          <span><img class="icon_tag" src="/images/tag.ico" alt="tags" title="tags" /></span>
          <span>
            {% for tag in post.tags %}
                <a class="tag_btn" href="/tags/index.html#{{ tag }}"><span>{{ tag }}</span><span class="tag_size"> {{ site.tags[tag].size }}</span></a>
                {% if forloop.index != post.tags.size %}
                  , 
                {% endif %}
            {% endfor %}
          </span>
        </div>
        {% if post.content contains '<!--preview-->' %}
          <div class="post_preview">{{ post.content | split:'<!--preview-->' | first }}</div>
        {% endif %}
        <a class="more_btn" href="{{ post.url }}" style="border:2px solid {% cycle 'g3': '#000000', '#f37421' %};">More...</a>
        <!-- <hr size="2px" color="{{ colors[cur] }}" style="align:center;" />
         -->
        <!-- <center style="color:{{ colors[cur] }};"> ~~ I'm a colorful seperator ~~ </center> -->
        
    </li>
{% endfor %}
</ul>