---
layout: post
title: 磨刀不误砍柴工 系列之 三 &#58; Dynamic Programming
category: Technology
tag: ['algorithm']
lan: EN
---

Dynamic Programming (DP) is a general algorithm design paradigm.
Its inventor is [Richard Bellman](http://en.wikipedia.org/wiki/Richard_E._Bellman). DP is originated from his mathemetical research.

<!--preview-->

DP is really difficult to understand. Cause it's not a concrete algorithm pattern. It depends more on the aiming problem.

Then I will study DP case by case at first. It seems more convenient and easier to be understood.

The materials I have referenced also includes `MIT Algorithm Open Course`: <br/>
[19. Dynamic Programming I: Fibonacci, Shortest Paths](http://www.youtube.com/watch?v=OQ5jsbhAv_M) <br/>
[20. Dynamic Programming II: Text Justification, Blackjack](http://www.youtube.com/watch?v=ENyox7kNKeY) <br/>

## Fibonacci Number

We define Fibonacci Number algorithm as following:

    F(1) = F(2) = 1
    F(n) = F(n-1) + F(n-2)

The traditional recursive algorithm has a time complexity of `\(\Theta(2^{n/2})\)`. `\(\because T(n) = T(n-1) + T(n-2) + \Theta(1) \geq 2T(n-2) = \Theta(2^{n/2})\)`

In order to calaulate F(n), you have to calculate F(n-1) and F(n-2) first; in the same way, you should calculate F(n-2) + `F(n-3)` --> F(n-1), `F(n-3)` + F(n-4) --> F(n-2) . So, there will be some duplicated calculation during the recursion. Such as you have to calculate `F(n-3)` twice.

But in DP, a Buttom-up DP algorithm could avoid the duplication.

    fib= {} // used to memorize the calculated Fibonacci Number
    for k in range[1, n+1]
        if k <= 2: f = 1
        else: f = fib[k-1] + fib[k-2]
        fib[k] = f
    return fib[n]

So, the order of complexity comes down to `\(O(n)\)`.

A more detailed guide for Fibonacci Number in DP, see: [Fibonacci series and Dynamic programming](http://functionspace.org/articles/32).

## Shortest Path

## Matrix Chain-Product

The one, most difficultly to be understood.

## 0-1 Knapsack Problem
