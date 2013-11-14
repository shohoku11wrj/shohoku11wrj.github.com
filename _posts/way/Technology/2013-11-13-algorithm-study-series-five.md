---
layout: post
title: 磨刀不误砍柴工 系列之 五 &#58; Strings and Pattern Matching
category: Technology
tag: ['algorithm']
lan: EN
---

## Concepts

substring – the term substring of an m-character string P to refer to a string of the form P[i]P[i+1]P[i+2]…P[j], for some 0 <= i <= j <= m-1.

convention that if i > j, then P[i..j] is equal to the null string, which has length 0

prefix of P -- any substring of the form P[0..i], for 0 <= i <= m-1

suffix of P -- any substring of the form P[i..m-1], for 0 <= i <= m-1

null string is a prefix and a suffix of any other string

use the general symbol ∑ to denote the character set, or alphabet, from which the characters of T and P can come. This alphabet ∑ can be a subset of the ASCII or Unicode character sets, but is also allowed to be infinite.

Suppose text string T = “abacaabaccabacabaabb” and the pattern string P = ”abacab”, then P = T[10..15]

---

## Brute Force

write down the algorithm pseudo-code

run `\( O(nm) \)` time

---

## KMP

The knuth-Morris-Pratt Algorithm

[字符串匹配的KMP算法](http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)

---

## BM

The Boyer-Moore Algorithm

can sometimes avoid comparisons between P and a sizable fraction of the characters in T

BM algorithm assumes the alphabet is of fixed, finite size. It works the fastest when |∑| is moderately sized and the pattern is relatively long.


BM on textbook is a simple version.

Here is a complete version: [字符串匹配的Boyer-Moore算法](http://www.ruanyifeng.com/blog/2013/05/boyer-moore_string_search_algorithm.html)

---

## The Longest Common Subsequence Problem

The LCS on textbook does not take consideration on the continuous subsequence, or say, substring.
书上考虑的LCS问题中，字串可以不连续；但是很多情况下，所求的是最长连续公子串。