---
layout: post
title: HTML SlideShow
category: Technology
tag: ['slideshow', 'jekyll']
lan: CH
---

这两天看了下如何制作网页版的幻灯片，基本原理就是HTML+CSS+Javascript，通过维护一个文件来定义多张页面，用Javascript来实现动态切换效果。

<!--preview-->

wikipedia上罗列了很多[成熟的模板和工具](http://en.wikipedia.org/wiki/Web-based_slideshow#List_of_web-based_slide_shows)

我选了其中两个中规中矩的模板：[__Google Template__](https://code.google.com/p/html5slides/) 和 [__Shower__](https://github.com/shower/shwr.me)

##1. A Google HTML5 slide template 

* __优点__ Google的模板功能齐全，设计简洁流畅，使用方法（只需要一个html文件就能完成全部内容，不包括引用的图片等）。

* __缺点__ 但是是没有Outline，我喜欢看slides前先纵览一下，看的时候知道自己处于什么进度。

##2. Shower 

* __优点__ 当然就是可以纵览全局，告知进度，而且动画效果个人觉得更舒服大气。

* __缺点__ 是功能没有Google Template那么齐全，切换slide不能用鼠标左键；还有就是要引用的文件过多，也有可能是我使用的方法不对吧-____-，不过实际的slideshow内容也是一个html页面可以搞定的。


这是我的[第一个HTML SlideShow](http://rangerway.com/slides/SpamFilter)，源自我在Stevens 2013Fall的Machine Learning课程项目[Email Spam Filter](https://github.com/shohoku11wrj/Spam-Filter)，当然，我太懒了以至于我的每张slide几乎都是PPT直接转图片。。。。

### Native Shower Plugin

然后，意料之外而又情理之中地发现[__Jekyll本身已经支持Shower了__](https://github.com/shower/jekyller)

>Jekyll Shower works at GitHub Pages. Yes, it's using Jekyll and don't need 
any extra plugins, so using it is really staightforward.

只需要配置一下Jekyll下的_config.yml，再用markdown形式就能生成原生支持Jekyll
的Shower Slideshow:

在shower/jekyller的_config.yml中有这样一句话

    fork_url: https://github.com/shower/shower

对应地，在jekyller repository下，shower repo被当作一个子文件夹引用进去了，并
且用灰色图标表示。


![fork shower](/images/slideshow/fork_shower.png)

### My Attempt

但是我并没有完成上述简单载入Shower的方法，而是用了和Jekyller一样的通过git submodule来引用Shower repository文件，参考[Git 进阶：Submodule](http://havee.me/linux/2012-06/the-git-advanced-submodule.html)

Jekyller项目中的 _layout/default.html模板引用了{{ theme }}变量，但是获取不到，所以我修改了这个文件，默认使用ribbon样式，替代了变量{{ theme }}。bright主题样式可以类似地写一个新的layout文件。

Shower所需的其他组件通过git submodule引用进我的github.io repository，这样就可以直接使用了。不得不承认，Google Template在使用友好度的设计上比Shower好很多，只需要维护一个文件即可。

* __Attention__

`Make sure you use the https:// read-only URL for your submodules.` [Using submodules with Pages](https://help.github.com/articles/using-submodules-with-pages)