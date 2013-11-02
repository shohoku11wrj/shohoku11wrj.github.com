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

这学期上Adv. Algorithms, 参考书有两本：

* Algorithm Design(Foundations, Analysis, and Intent Examples)</li>
* 算法导论(第3版)

第一篇 包括以下几个算法：Heap, Binary Search Tree, AVL

## Heap

Previously, I thought Heap is built in `O(nlogn)` time.<br />
But sometimes, it can also be constructed in `O(n)` time.

PriorityQueue is NOT necessarily a Heap. Heap is a good implementation of PriorityQueue.

`Bottom-Up Heap Construction` runs in O(n) time.

Here is the pseudo-code of this construction method, it's a `recursive` algorithm.

>__Algorithm__ BottomUpHeap(`\( S \)`):<br/>
__<i>Input:</i>__ A sequence `\( S \)` storing `\( n = 2^h - 1 \)` keys <br/>
__<i>Output:</i>__ A heap `\( T \)` stroing the keys in `\( S \)`.<br/>
__if__ S is empty __then__<br/>
&nbsp;&nbsp;&nbsp;&nbsp;__return__ an empty heap (consisting of a single external node).<br/>
Remove the first key, `\(k\)`, from `\( S \)`.<br/>
Split `\( S \)` into two sequences, `\(S_1\)` and `\(S_2\)`, each of size `\((n-1)/2\)`.<br/>
`\(T_1\)` <-- BottomUpHeap(\(S_1\))<br/>
`\(T_2\)` <-- BottomUpHeap(\(S_2\))<br/>
Create binary tree `\( T \)` with root `\( r \)` storing `\( k \)`, left subtree `\(T_1\)`, and right subtree `\(T_2\)`.<br/>
Perform a down-heap bubbling from the root `\( r \)` of `\( T \)`, if necessary.<br/>
__return__ `\( T \)`<br/>

---
<br/>

## BST

I have implemented the algorithm of a [BST](https://github.com/shohoku11wrj/algorithms/blob/master/src/backup_20130616/BinarySearchTree.cpp) without the `RemoveElement` method before. And the `RemoveElement` is the most complicated among those common methods of BST. 

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

\#16 is what I have fixed to replace \#18.

### BST VS. Heap

I was used to mix BST and Heap up. Now I know they are both elementary trees, but totally different. <br/>
BST is more well organized where every node satisfies __left_subtree < node < right_subtree__; <br/>
Heap does not necessarily so. What's more, Heap is a complete tree. 

eg: In a MinHeap, root is the minimum of the whole tree. An new node is inserted at the last position at first, then rejust its final position through __Up-Heap Bubbling__.

While in BST, a new node is compared from ROOT to its real position before it is inserted at the real position. And the real position of a new node must be a leaf.

---
<br/>

## AVL

A type of restructured BST to be balanced, named after the initials of its inventors: Adel'son-Vel'skii and Landis.

__Height-Balance Property:__ For every internal node v of T, the heights of the children of v can differ by at most 1.

The height of an AVL tree storing n keys is O(lohn).

The insertion and removal operations for AVL trees are similar to those for binary search trees, but with AVL trees we must perform additional computations.

### Insertion

An insertion in an AVL tree T begins as in an insertItem operation in BST.

While doing restructure on T, we __maintaining the inorder relationships__ of all the nodes in T.

The modification of a tree T caused by a trinode restructure operation is ofen call a __rotation__, <i>because</i> of the geometric way we can visualize the way it changes T. (Ranger said: I have <i>never</i> figured out that this operation has any similarity as roatation visually. Just kidding.)

__single roatation & double rotation__

If b = y, the trinode restructure mothod is called a __single rotation__;
Otherwise, if b = x, the trinode restructure operation is called a __double rotation__.

![signle roation Right-Right]()
![signle roation Left-Left]()
![double roation Right-Left]()
![double roation Left-Right]()

* __One rotation__ (single or double) is sufficient to restore the height-balance in an AVL tree after an __insertion__.

### Removal

We also use trinode restructuring to restore balance in the tree T.


In particular, let w be the parent of the previously removed node. Let z be the first unbalanced node encoundtered going up from w toward the root of T. Also, let ye be the child of z with larger height (note that node y is the child of z that is not an ancestor of w), and let x be a child of y with larger height.

* A single trinode restructuring may __not__ restore the height-balance property globally after a removal. __O(logn)__ trinode restructurings are sufficient.

### Running Times for AVL Trees

* a single restructure is `\( O(1) \)` <br/>
using a linked-structure binary tree
* find is `\( O(log n) \)` <br/>
height of tree is `\( O(log n) \)`, no restructures needed
* insert is `\( O(log n) \)` <br/>
initial find is `\( O(log n) \)` <br/>
Restructuring up the tree, maintaining heights is `\( O(log n) \)`
* remove is `\( O(log n) \)` <br/>
initial find is `\( O(log n) \)` <br/>
Restructuring up the tree, maintaining heights is `\( O(log n) \)`


There are some points confused me in AVL:

- How does AVL detect the diff between height of left_child and right_right __IN DETAIL__?
- What's the algorithm details of rotate operation? Will the 4-types rotation be very complicated?
