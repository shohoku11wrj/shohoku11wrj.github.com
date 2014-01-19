---
layout: post
title: 磨刀不误砍柴工 系列之 二 &#58; Bounded-Depth Search Trees
category: Technology
tag: ['algorithm']
lan: EN
---

Bounded-Depth Search Trees includes: (2,4) Tree, Red-Black Tree

To under Red-Black tree more easily, we could learn (2,4) Tree at first.
These two trees can be converted to each other.

<!--preview-->

__Bounded-Depth Tree__, or __Depth-Bounded Tree__, can be used to implement an ordered dictionary with `\(O(logn)\)` search and update times.

![](/images/algorithm/multi-way_inorder_traversal.png)

## (2,4) Tree

__<i>Size Property</i>:__ Every nopde has at most four children.

__<i>Depth Property</i>:__ All the external nodes have the same depth.

A (2,4) tree storing `\( n \)` items has height `\( O(logn) \)`.

Searching in a (2,4) tree with `\( n \)` items taks `\( O(logn) \)` time.

![](/images/algorithm/2-4_tree_search.png)

__Overflow:__ If a node `\( v \)` was previously a 4-node, then it may become a 5-node after the insertion. __Overflow__ must be resolved in order to restore the properties of a (2,4) tree. The point is: take `\( k3 \)` out of this node and insert it into the parent node `\( u \)`. The overflow may propagate to the parent node `\( u \)`. A split operation affects takes `\( O(1) \)` time; while overflow propagates, the total time to perform an insertion in a (2,4) tree is `\( O(logn) \)`.

![](/images/algorithm/2-4_tree_overflow.png)

__Underflow:__ If `\( v \)` was previously a 2-node, then it becomes a 1-node with no items after the removal. 
To remedy an underflow, we have two operations: __transer__ or __fusion__.<br/>
we perform a __transfer__ operation, in which we move a child of `\( w \)` (`\( v's \)` sibling) to `\( v \)`; <br/>

![](/images/algorithm/2-4_tree_transfer.jpg)

or we perform a __fusion__ operation, in which we merge `\( v \)` with a sibling, creating a new node `\( v' \)`, and move a key from the parent `\( u \)` of `\( v \)` to `\( v' \)`. <br/>

![](/images/algorithm/2-4_tree_fusion.jpg)

Whether we will take __transfer__ or __fusion__ operation depends on, the immediate sibling of `\( v \)` is 3+-nodes or 2-nodes.

## Red-Black Tree

A __red-black tree__ is a BST that uses a kind of "perudo-depth" to achieve balance using the approach of a depth-bounded search tree. <br/>
In particular, it's a BST with nodes colored red and black in a way that stisfies the following properties:

__Root Property:__ The root is black.

__External Property:__ Every external node is black.

__Internal Property:__ The children of a red node are black.

__Depth Property:__ All the external nodes have the same __black depth__, which is defined as the number of black ancestors minus one.

![Red-black tree associated with the (2,4) tree of Figure 3.18](Figure 3.25)
<span class="pic">Red-black tree associated with the (2,4) tree</span>

Performing the update operations in a red-black tree is similar to that of a BST, except that we must additionally restore the color properties.

new node, let it be z, inserted is initially proceeds as in a BST and colored red(if z is not root).
Color the two external-node children of z black.
This action preserves the root, external and depth properties of T, but it may violate the internal property.
Then, we have to do recoloring and rotating if necessary.

The insertion of a key-element item in a red-black tree storing n items can be done in O(logn) time and requires at most O(logn) recolorings and one trinode restructuring (a restruecture operation)


