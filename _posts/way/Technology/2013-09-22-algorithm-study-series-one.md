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

Here is a good [ code example of BST](http://www.cplusplus.com/forum/general/1551/). But where I found a bug in `remove` method.
In `Node with 2 children` scenario, after we copied the data from the `leftMost_node of right_subTree`(we call it `replace_node`) to replace the deleted node, we should preserve the `replace_node's right_subTree`. This means, the `replace_node` should not be straightly deleted, we need to link its parent's `*left_child` to its `right_subTree` beforehand.

    void BinarySearchTree::remove(int d)
    {
        ...
        //Node with 2 children
        // replace node with smallest value in right subtree
        if (curr->left != NULL && curr->right != NULL) {
        ...
            if((curr->right)->left != NULL) {
                ...
                while(lcurr->left != NULL)
                {
                   lcurrp = lcurr;
                   lcurr = lcurr->left;
                }
        curr->data = lcurr->data;
        lcurrp->left = lcurr->right;
                delete lcurr;
        //lcurrp->left = NULL;
            }
        ...
    }

\#16 and \#18 is what I fixed it.


### BST VS. Heap

I was used to mix BST and Heap up. Now I know they are both elementary trees, but totally different. BST is more well organized where every node satisfies: left_subtree < node < right_subtree; Heap is a not necessary so. Waht's more, Heap is a complete tree. 

eg: In a MinHeap, root is the minimum of the whole tree. An new node is inserted at the last position at first, then rejust its final position through Up-Heap Bubbling.

While in BST, a new node is compared from ROOT to its real position before it is inserted at the real position. And the real position of a new node must be a leaf.


## AVL

Restructure BST to be balanced.

<b>One rotation</b> (single or double) is sufficient to restore the height-balance in an AVL tree after an <b>insertion</b>. <br />
A single trinode restructuring may <b>not</b> restore the height-balance property globally after a removal. <b>O(logn)</b> trinode restructurings are sufficient.


