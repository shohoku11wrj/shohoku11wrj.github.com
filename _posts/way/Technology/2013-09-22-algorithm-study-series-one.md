---
layout: post
title: 磨刀不误砍柴工 系列之 一 &#58; Heap BST AVL
category: Technology
tag: ['algorithm']
lan: CH
---

学习算法是磨刀不误砍柴工的一件事情。

(磨刀不误砍柴工) 系列是我学习算法的笔记，总结自己学习中的理解，并希望能分享交流。

<!--preview-->

有一个好的算法基础不仅仅是写好程序的必要条件，同时联系算法也是一件乐事。没有大程序的繁琐，同时也有研究逻辑、数理的乐趣。<br />
PS: 虽然看算法书有点枯燥，但是这是学习算法的必经之路。

这学期上Adv. Algorithms, 参考书有两本：<br />
`Algorithm Design(Foundations, Analysis, and Intent Examples)`<br />
`算法导论`

第一篇 包括以下几个算法：Heap, Binary Search Tree, AVL

## Heap

Previously, I thought Heap is built in `O(nlogn)` time.<br />
But sometimes, it can also be constructed in `O(n)` time.

PriorityQueue is NOT necessarily a Heap. Heap is a good implementation of PriorityQueue.

## BST

I have implemented the algorithm of a [BST](https://github.com/shohoku11wrj/algorithms/blob/master/src/backup_20130616/BinarySearchTree.cpp) without the `RemoveElement` method. And the `RemoveElement` is the most complicated among those common methods of BST. 

## AVL

Restructure BST to be balanced.

<b>One rotation</b> (single or double) is sufficient to restore the height-balance in an AVL tree after an <b>insertion</b>. <br />
A single trinode restructuring may <b>not</b> restore the height-balance property globally after a removal. <b>O(logn)</b> trinode restructurings are sufficient.

