---
layout: post
title: Android Parcelable Inside Another Parcelable
category: Technology
tag: ['Android']
lan: EN
---

It is too consuming to pass data using Java serializablein Android. Whereas, Android offers an other powerful tool: Parcelable.

<!--preview-->

Here is a guide of [using Parcelable](http://shri.blog.kraya.co.uk/2010/04/26/android-parcel-data-to-pass-between-activities-using-parcelable-classes/).

And there will be somewhat uncomfortable when you will reference some parcelable classes, especially `ParcelableArray` inside another Parcelable.

I found three efficient ways to do that:

* TypeArray

* TypeList

* ParcelableArray

### Scenario

We have an Class