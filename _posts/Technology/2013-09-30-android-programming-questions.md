---
layout: post
title: Frequent Problems Raised in Android Programming
category: Technology
tag: Android
lan: EN
---

This post lists some problems appears frequently during Android developing.

<!--preview-->

##1. adb cannot run, adb server is out of date

Sometimes, when you want to installed your app on your smart phone with Eclipse running. It seems your computer has not detect your phone.

This is because there are some alternative Android USB detectors are running on `port 5037`. Such as tencent's tadb.exe.

You will have this error message when you run adb start-server:

    C:\Users\xxxx>adb start-server
    adb server is out of date.  killing...
    ADB server didn't ACK
    * failed to start daemon *

We can use this snip to check which process is occupy the port `tcp:5037`

    C:\Users\xxxxxx>netstat -ano | findstr "5037"
    TCP    | 127.0.0.1:5037  | 0.0.0.0:0       | LISTENING   | 4236 
    TCP    | 127.0.0.1:5037  | 127.0.0.1:49422 | ESTABLISHED | 4236 
    TCP    | 127.0.0.1:49422 | 127.0.0.1:5037  | ESTABLISHED | 3840 

Just kill the process 4236 then you will run adb.exe successfully.

##2. Animation run twice in listview

This is a programming mistake.

Once, I wanted to add a fade_in effect while a image is loading in the ListView.
It's easy to do so, just adding a fade_in animation to the ImageView.

    photoToLoad.imageView.startAnimation(myFadeInAnimation); //Set animation to your ImageView

<img src="/images/androidproblem/fadeIn.png" width="45%" alt="FadeIn Animation" style="float: right; margin-left: 2%;" />

But when I did so at the first time, the animation run __twice__ for one ImageView. The __1st time__ is when the image's __top boundary__ shown up on screen; the __2nd time__ is when the image's __bottom bundary__ shown up on screen. It's wired, right?

This is because the same animation was called again by the next ImageView. So, the 2nd time of that animation was actually caused by the __next__ Image's __top boundary__.

Why this happened? Finally, we found I had made a mistake on set the `myFadeInAnimation` variable as a __shared__ one in our ImageLoader class. So, the same `myFadeInAnimation` will be called by different `imageView.startAnimation()` function. It happened to be __twice__ was because our images are too big that one screen could only hold two such images at the same time.

<!-- use a span with inline-block to set content jump out of float -->
<span width="100%" style="display: inline-block; margin-top: 30px;" >
Here I should create a new Animation every time when I want to add it to an ImageView.</span>

    Animation myFadeInAnimation = new AlphaAnimation(0, 1);
    myFadeInAnimation.setDuration(700);
    photoToLoad.imageView.startAnimation(myFadeInAnimation); //Set animation to your ImageView

Thanks for [@Binzhe](https://github.com/kanro001) had taken a lot of time and finally figured out this foolish mistake I had made.

But actually, this is not a simlpe mistake one would make. On another words, this kind of mistakes is common in Android developing.
We should take care that for many __resources__ in Android, like __Bitmap__ and __Animation__, they are designed for reusable.

For example, if you changed a Bitmap in one activity with adding opacity on it, this change will remain on the Bitmap. So the next time you want to use this Bitmap, it will always have that opacity.

I found even a __Color__ resource has this kind of problem. I will figure it out later on.