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
[21. Dynamic Programming III: Parenthesization, Edit Distance, Knapsack](http://www.youtube.com/watch?v=ocZMDMZwhCY) <br/>

---
<br/>

## Fibonacci Number

We define Fibonacci Number algorithm as following:

    F(1) = F(2) = 1
    F(n) = F(n-1) + F(n-2)

`\(\because T(n) = T(n-1) + T(n-2) + \Theta(1) \geq 2T(n-2) = \Theta(2^{n/2})\)`<br/>
`\(\therefore \)`The traditional recursive algorithm has a time complexity of `\(\Theta(2^{n/2})\)`. 

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

---
<img class="pic_right" width="150" src="/images/algorithm/Knapsack.png" />
<br/>
## 0-1 Knapsack Problem

We shall first introduce the `Fraction Knapsack Problem` (FKP). This is, we are allowed to take fractional amounts.

For example, in [Figure 1](#figure_1) there are several bottles of milk to choose, the __volume__ and __value per ml__ are different. We could choose __10ml at most__ among those bottles. 

The strategy is simple. We could simply choose from with the highest value milk greedly.

![Figure 1](/images/algorithm/Fractional_Knapsack.png "Fraction Knapsack Problem")
<span class="pic">Figure 1: Fraction Knapsack Problem</span>

But in `0-1 Knapsack Problem` (0-1KP), we cannot divide the choices fractionally.
For example, if we can still take only 10ml milk. But the choices are 2ml milk with value 8, and 9ml milk with value 9.
In FKP, we can take 2ml-8value , and 8ml-8value from 9ml/9value.
But in 0-1KP, we cannot divide the 9ml/9value milk. So we just take 9ml/9value in order to maximum the benefit.

The stratedy is clear. But the algorithm is a little difficult to be understood. Here is the pseudo-code:

    Algorithm 01Knapsack(S, W):
      Input: set S of n items with benefit b_i and weight w_i; maximum weight W
      Output: benefit of best subset of S with weight at most W
      let A and B be arrays of length W + 1
      for w <-- 0 to W do
      B[w] <-- 0  
      for k <-- 1 to n do
        copy array B into array A 
        for w <-- w_k to W do
          if A[w - w_k] + b_k > A[w] then
            B[w] <-- A[w - w_k] + b_k 
      return B[W] 

The difficult lines are 9 ~ 11. What I have now realized is:

- The size of B[w] is actually equals W+1;
- A new item k will be tested from __0__ to __W - w_k__, no matter that it is valuable to be inserted or not, <br/>
But B[w] will only be scaned & updated from __w_k__ to __W__.
- And the set B[w] will only be changed partially, and, not necessarily successive. <br/>
eg: Assume the size of [Figure 2](#figure_2) is 12, and (3,2)(5,4)(8,5) are in position. So, `B[w] = {0,0,3,3,5,8,8,11,11,13,13,16}`. <br/>
If __a__ (2,1) is coming, then `B[w] = {0,2,3,5,5,8,8,11,13,13,15,16}`; <br/>
Unless there is __another__ (2,1) is coming, then `B[w] = {0,2,4,5,7,8,10,11,13,15,15,17}`. Thus the updated result of B[W] is changed from (3+5+8) to (2+2+5+8).

![Figure 2](/images/algorithm/0-1_Knapsack.png)
<span class="pic">Figure 2: 0-1 Knapsack Problem</span>

Although this examination verified the algorithm is true, there is still far away from understanding the algorithm by <span class="red">__reasoning it logically__</span>. But the examination with real data at least reavels some features of this algorithm: <br/>

- This algorithm's running time structure is more complicated than I had thought of it;
- Everytime a new item is inserted, the changing of the original B[w] is insuccessive. But It ensures recoding the extra information of the new input, whether the final B[W] will be changed or not;
- The size of the set is B[W+1] instead of B[W].

(Another version of pseudo-code gets rid of the assistent array A[w], it replaces lines 8~11 with the following:

    for w <-- W downto w_k do
        if B[w - w_k] + b_k > B[w] then
            B[w] <-- B[w - w_k] + b_k

I have examed this version. It showed the same B[w] structure as the previous one in the runing time.)

---
<br/>

## Shortest Path

## Matrix Chain-Product

The one, most confused one to me among aboving.

---
<br/>

## Other famous DP problems

1. [Maximum sell stock profit within given days](http://stackoverflow.com/questions/7086464/maximum-single-sell-profit?answertab=active#tab-top)
