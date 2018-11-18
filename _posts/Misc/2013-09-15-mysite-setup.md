---
layout: post
title: 我的博客基本建成
category: Misc
tag: ['blog', 'jekyll']
lan: CH
---

之前就想用Ruby建自己的博客，学了点Rails后才发现基于Ruby的jekyll已经很好地和github融合了，而且成为了一种主流。于是经过1个月的陆陆续续参考修改，就基本建成了我的个人网站。

<!--preview-->

高中毕业那会开始就开始写写博客，无非是讲讲废话发发牢骚赶赶时髦，偶尔有点闲情逸致写写思路或影评。<br />
用了很长一段时间msn space，在msn space关掉之后把他迁移到了wordpress主站。由于要翻墙，看得人也少了，准备出国兼上班工作也很繁忙，就让博客在wordpress那里歇息了。

正式进入master阶段学CS后又有了写博客的欲望。<br />
`一方面`是为自己做知识的积累，可以主动地去总结一下学习到的内容，或者有些心得也能分享一下。<br />
`另一方面`对自己的生活做一个记录。<br />
`还有一方面`是个人网站对自己以后的工作有帮助。不仅仅是学习建网站的过程，还包括整理自己的资料，发布简历，让别人知道你在做的一些项目，技术方面的积累和兴趣。



下面这张图很有意思，介绍了个人博客的一些基本元素。
![Simplified Blogging](/images/blogsetup/simplifiedBlog.jpg)

* content  内容 -- jekyll generates the static blog. 这里值得一提的是jekyll生成的静态博客正式我想要的，访问快，博文以文件的形式存储，便于整理迁移。博文更以markdown或者html来写，更丰富也易于控制布局；
* post     文章 -- jekyll 提供了基本的 category 和 tags 用来整理文章，当然还有其他各种属性，比如日期，都可以在整理时用作filter的参数；
* shares   分享 -- 需要自己加入一些js脚本，比如twitter或者weibo；
* comments 评论 -- 会加入Disqus云评论，非常喜欢，也正在成为主流；


网站设计[First Page](/index.html "网站首页")是我自己想的，其他的设计部分参考了很多，基本框架是参考[BeiYuu](http://beiyuu.com/ "一个豆瓣员工")的，也不是他的网站比别人设计得有多好，主要是大致框架符合我的预想。

当然还参考了很多很多，比如jschauma老师那天带来给我们讲Puppet的[James Turnbull](http://www.kartar.net/about.html "kartar.net")，还有[yizeng](http://yizeng.me/ "yizeng")，[连城](http://blog.liancheng.info/ "blog.liancheng.info")等许多IT界人士的网站设计。<br />
这里可以找到很多优秀的jekyll博客地址[mojobo/jekyll/wiki/sites](https://github.com/mojombo/jekyll/wiki/sites)。由于Github Pages已经是融合了jekyll，说不定你经常关注的几个programmer的，尤其是在Github上活跃的，他们的blog都是用jekyll写的。当然，我的`favourite bloggers`列表中的博客也是相当推荐的。不仅仅是网页设计，更是内容。

今天20140414读了阮一封翻译Paul Graham的文章《梦寐以求的编程语言》，一个观点非常符合编程中的太极：
<blockquote>
    为了写出优秀的软件，你必须同时具备两种相互冲突的信念。一方面，你要像初生牛犊一样，对自己的能力信心万丈；另一方面，你又要像历经沧桑的老人一样，对自己的能力抱着怀疑态度。如果你能平衡好希望和担忧，它们就会推动项目前进，就像自行车在保持平衡中前进一样。
</blockquote>

我的个人网站分为两个版块，<b>[Ranger 仁](/ranger "about me")</b> 和 <b>[Way 道](/way "blog")</b>。<br />
<b>仁</b>取自我的名字中；<b>道</b>是我对blog的一种译法，用blog来记录我走过的路，
履行我的道。
