---
layout: post
title: Android UI – Staggered Grid View
category: Technology
tag: Android
lan: EN
---

There is a open source library of [Staggered Grid View](https://github.com/maurycyw/StaggeredGridView)

It works fine but... There are some flaws:

<!--preview-->

<ul>
<li><b>1. No OnScrollListener.</b><br/>
That means, you can not implement infinite scroll with it.</li>
<li><b>2. No Scrill Bar.</b><br/>
So you don't know what the position you are at of the View.</li>
<li><b>3. I want to add Pull To Refresh functions on it.</b></li>
<li><b>4. This viewgroup doesn't remain at its current position after my adapter called notifyDataSetChanged() function.</b><br/>
It's just scroll to Top.</li>
</ul>

The 1st flaw is partially overcomed by [Adding an OnScrollListener](http://www.ggkf.com/android/android-onscrolllistener-for-staggered-grid-view)

Why it is partially? Because it just detect the bottom of the StaggeredGridView and then add a listener on it, without any extra effect/text/animation. So, it's too plain. Maybe the author did not want to strict the imagination of other developers.

So, I think I would at least add a `footer` to indicate the `loading/loaded` state of this view.

Also, `Scroll Bar` and `Pull To Refresh` is important when you are using the StaggeredGridView in your project.