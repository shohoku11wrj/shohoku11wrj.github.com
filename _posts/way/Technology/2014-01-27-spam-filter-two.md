---
layout: post
title: Bayesian Filter for Spam
category: Technology
tag: ['ML', 'spam', 'Bayes']
lan: EN
---

The basic algorithm of my Bayesian Filter is studied from Paul Graham’s post [A PLAN FOR SPAM](http://paulgraham.com/spam.html). I was firstly attracted on this topic by a Chinese version of it: [贝叶斯推断及其互联网应用: 定理简介 和 过滤垃圾邮件 (2011) Ruan Yi-feng](http://www.ruanyifeng.com/blog/2011/08/bayesian_inference_part_two.html) <i>(Bayesian Inference and Web Application: Introduction to the Theory & Spam Filtering)</i>

I also made some improvement based on it to access higher AUC.

<!--preview-->

##  Basic Theory

Given an unlabeled mail, I can calculate the probability of how much it will be a Spam. `\[ (P =  \frac{P(S|W1)  \ast P(S|W2)  \ast P(S)}{P(S|W1)  \ast P(S|W1)  \ast P(S) + (1 - P(S|W1))  \ast (1 - P(S|W2))  \ast (1 - P(S))} \]`, where `\(P(S|Wi)\)` is the probability of a mail to be Spam when it contains the word `\(Wi\)`.