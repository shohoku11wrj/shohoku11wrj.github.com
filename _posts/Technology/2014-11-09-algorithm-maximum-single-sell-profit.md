---
layout: post
title: Algorithm -- Maximum Single-Sell Profit
category: Technology
tag: ['algorithm']
lan: EN
---

This is a classic interview question.

You can cracking it by <a>brute force</a>, <a href="#menuIndex0">divide-and-conquer</a>, and expectly, <a href="#menuIndex2">dynamic programming</a>.

The [famous post](http://stackoverflow.com/questions/7086464/maximum-single-sell-profit) talking about it on StackOverflow.

You can verify your answers via the LeetCode [problem](https://oj.leetcode.com/problems/best-time-to-buy-and-sell-stock/)

<!--preview-->

Addmittedly, this is a very simple problem for most interviewees who has already practiced algorithm for a while. It is classic, and open my eyes on algorithms.

As the post on StackOverflow states, I will implement my code of various approaches except the brute force one. I like brute force, I mean it. But only the __Brute Force__ is not the interviewers what to see in most cases.

## Divide-and-Conquer

O(N log N) time, O(log N) space

<blockquote>
1. The correct buy/sell pair occurs completely within the first half. <br/>
2. The correct buy/sell pair occurs completely within the second half. <br/>
3. The correct buy/sell pair occurs across both halves - we buy in the first half, then sell in the second half. <br/>
<br/>
For option (3), the way to make the highest profit would be to buy at the lowest point in the first half and sell in the greatest point in the second half. We can find the minimum and maximum values in the two halves by just doing a simple linear scan over the input and finding the two values. <br/>
</blockquote>

    public int maxProfit(int[] prices) {
      if (prices.length == 0) return 0;
      return maxProfit1(prices, 0, prices.length - 1);
    }

    public int maxProfit1(int[] prices, int left, int right) {
      if (left == right) return 0; //!!! NOT prices[left];
      int mid = left + (right - left) / 2;
      int leftProfit = maxProfit1(prices, left, mid);
      int rightProfit = maxProfit1(prices, mid+1, right);
      int midProfit = findMax(prices, mid+1, right) - findMin(prices, left, mid);
      return Math.max(Math.max(leftProfit, rightProfit), midProfit);
    }

    public int findMin(int[] prices, int left, int right) {
      int min = prices[left];
      while (++left <= right) {
        min = Math.min(min, prices[left]);
      }
      return min;
    }

    public int findMax(int[] prices, int left, int right) {
      int max = prices[left];
      while (++left <= right) {
        max = Math.max(max, prices[left]);
      }
      return max;
    }

## Optimized Divide-and-Conquer

O(N) time, O(log N) space

<blockquote>
Our recursion hands back three things: <br/>
<br/>
1. The buy and sell times to maximize profit. <br/>
2. The minimum value overall in the range. <br/>
3. The maximum value overall in the range. <br/>
<br/>
These last two values can be computed recursively using a straightforward recursion that we can run at the same time as the recursion to compute (1): <br/>
<br/>
1. The max and min values of a single-element range are just that element. <br/>
2. The max and min values of a multiple element range can be found by splitting the input in half, finding the max and min values of each half, then taking their respective max and min. <br/>
</blockquote>

    public int maxProfit(int[] prices) {
     if (prices.length == 0) return 0;
     return maxProfit2(prices, 0, prices.length - 1)[0];
    }

    /* return int[3]{
     * The buy and sell times to maximize profit,
     * The minimum value overall in the range,
     * The maximum value overall in the range,
     * } */
    public int[] maxProfit2(int[] prices, int left, int right) {
      if (left == right) return new int[]{0, prices[left], prices[right]};
      int mid = left + (right - left) / 2;
      int[] leftProfit = maxProfit2(prices, left, mid);
      int[] rightProfit = maxProfit2(prices, mid+1, right);
      int midProfit = rightProfit[2] - leftProfit[1];
      int[] res = new int[3];
      res[0] = Math.max(Math.max(leftProfit[0], rightProfit[0]),
          rightProfit[2] - leftProfit[1]);
      res[1] = Math.min(leftProfit[1], rightProfit[1]);
      res[2] = Math.max(leftProfit[2], rightProfit[2]);
      return res;
    }

## Dynamic Programming

O(N) time, O(1) space

Sometimes, dynamic programing is hard to be understood, except this quesiton.

The dynamic programming shows its elegant here.

    public int maxProfit(int[] prices) {
      if (prices.length == 0) return 0;
      int minPrice = prices[0];
      int max = 0;
      for (int i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) {
          minPrice = prices[i];
        }

        if (prices[i] - minPrice > max) {
          max = prices[i] - minPrice;
        }
      }
      return max;
    }

I cannot stop myself from quoting words of the post on StackOverflow.

<blockquote>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7&nbsp;<br/>
min&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;<br/>
best&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(5,5)&nbsp;&nbsp;&nbsp;(5,10)&nbsp;&nbsp;&nbsp;(5,10)&nbsp;&nbsp;(5,10)&nbsp;&nbsp;(5,10)&nbsp;<br/>
Answer:&nbsp;(5,10)
</blockquote>

Compared to Brute Force is O(N`\(^2\)`) time, O(1) space.
