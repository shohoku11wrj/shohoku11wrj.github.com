---
layout: post
title: 公钥加密算法(四) RSA及相关笔记 (草稿)
category: Technology
tag: ['cryptography','asymmetric encryption','RSA','Maths']
lan: CH
---

主线为Matrix67的一篇post[跨越千年的RSA算法](http://www.matrix67.com/blog/archives/5100)。

<!--preview-->

## 可公度问题 (有理数)

### 最大共度线段 对应 GCD (最大公约数)

a 9 --- --- -- <br/>
b 3 --- <br/>
c 2 -- <br/>
d 1 - 

则d可共度a,b,c

但是为什么d是最大可共度线段？

证明：
因为a和b的任一共度单位一定能度量d

以上即为Euclid算法，也成为辗转相除法。复杂度为 O(logN)

### 是否所有的任意两个线段都能找出GCD呢？

否。当他们的比值为无理数时，不能。
比如 1. 构造一个黄金分割比例 2. 正方形对角线比边


## 中国剩余定理

a * b = GCD * LCM

p1 * p2 * ... * pm = P

Given M, M mod pm = Xm (Remainder)

CAN determine M in 0 ~ P-1

## 扩展的辗转相除法

if a, n coprime <br/>
then <br/>
a * x mod n = 1 <br/>
a * x mod n = 2 <br/>
... <br/>
a * x mod n = b

以上方程组有特解，且当b=1时，有一个特解可以推出其他所有特解

这里 a * x 就是中国剩余定理中所述的M

## Fermat小定理

### 质数无穷 

反证法： 2*3*5*...*p + 1

并不是说 2*3*5*...*p + 1 就一定是质数

### Fermat小定理

if n is prime, for any a, a^n - a mod n == 0

* Fermat大定理 课外阅读

### 小定理扩展

if n = p * q, for any a, a^i mod n == 以(p-1)*(q-1)的LCM为周期

n-1 未必是最小周期

### Fremat-Euler定理

在1~n内有多少个数和n互质(包括1)，a^i mod n 序列就有多长循环周期。

*证明

e.g. x^i 各位数的重复周期 <= 4，因为 x^i mod 10 where (2-1)*(5-1) == 4

## Public Key

非对称加密算法，Matrix67对它有一个很搞笑的称呼，绝对邪的算法....

该算法利用了自然数间天然存在的不对称性：

即 __判断/生成 质数__ 与 __分解大数__ 之间的不对称

据一个简单的栗子：

加密8位数字可以乘以42269，解密这个8位数字可以在加密的结果上乘以11829;
因为`\(500000001 = 42269 * 11829 \)`。

### 大数分解难题

### Fermat素性测试

利用Fermat小定理`\( (a^n - a)\ mod\ n\ ?=\ 0 \)`
它可以筛选出非素数，但是不保证通过测试的一定是素数;
因为有一类特殊的数也可以通过测试，称为Carmichael数(该类数的第一个是561，第二个是1105....)

为了达到高效率，可以多选几个底数做测试；
进化版有Miller-Rabin素性测试 (Rabin很熟悉啊，我在之前的post中有提到[Rabin加密算法](http://localhost:4000/way/public-key-three-rabin/));
以及AKS素性测试，其中AKS有100%的准确率。
AKS的出现主要是理论上实现了完美素性测试，实际使用上Miller-Rabin已经够用了。

## RSA

虽然这是一个很多人都已经很熟悉了的算法，我在之前也写过相关的计算过程；还是决定在这里详细演算一遍。

## Reference

<blockquote>
1. CS502 Discrete Mathemetics at Stevens Institute of Technology </br>
2. <a herf='http://www.matrix67.com/blog/archives/5100'>跨越千年的RSA算法</a> </br>
3. Michael T. Goodrich & Roberto Tamassia, Introduction to Computer Security, PEARSON (Chapter 2. Cryptography, RSA) </br>
</blockquote>

