---
layout: post
title: 磨刀不误砍柴工 系列之 二 &#58; Bounded-Depth Search Trees
category: Technology
tag: ['algorithm']
lan: EN
---

Bounded-Depth Search Trees includes: (2,4) Tree, Red-Black Tree

<!--preview-->

__Bounded-Depth Tree__, or __Depth-Bounded Tree__, can be used to implement an ordered dictionary with `\(O(logn)\)` search and update times.

![](/images/algorithm/multi-way_inorder_traversal.png)

---
<br/>

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

---
<br/>

## Red-Black Tree