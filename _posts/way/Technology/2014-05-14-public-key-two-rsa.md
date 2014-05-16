---
layout: post
title: 公钥加密算法(二) RSA
category: Technology
tag: ['cryptography','asymmetric encryption', 'RSA', '中国剩余定理']
lan: CH
---

我对RSA甚至加密以及计算机科学产生兴趣不得不说有很大一部分影响自阮一封的文章。

这要从当年一款神级产品Google Reader说起，相信这款产品在很多人(尤其是IT人员吧)心中都是无可替代的经典。我也忘了当时为什么订阅了阮一封的RSS，可能是随手订阅，可能是一看到就被他的文风和排版所吸引。在Google Reader上面读文章是一种享受，在Google Reader上面读阮一封的文章更是。

<!--preview-->

当时读到阮一封的两篇RSA文章，恰好又有同学在EMC工作提起，加上自己对加密解密有点兴趣，就立刻被吸引了。

## RSA构造模型

对RSA的原理证明及构造模型分析还请看<a href="http://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html">RSA算法原理(一)</a> 和 <a href="http://www.ruanyifeng.com/blog/2013/07/rsa_algorithm_part_two.html">RSA算法原理 (二)</a>。

我在这篇文章主要是一步步详细计算一个RSA的实例。其中用到的比较有意思的就是“中国剩余定理”，也是本blog右上角的那首诗所隐含的数学原理。

## 举则列子

应用场景：Bob用Alice的公钥要发送一条消息`\( m = 57\;(0111001) \)`给Alice。

### Key Generate

__Alice生成公钥密钥对__

* Step 1. Pick two prime numbers `\( p = 11, q = 23, \text{calculate } N = 253, \varphi(N) = 10 * 22 = 220 \)`,
* Step 2. Choose a Random `\( e, 1 < e < \varphi(N) \text{ and co-prime to } \varphi(N) \)`, i.e `\(e = 3\)`
* Step 3. 用表格法计算`\(e\)`的模反元素`\( d = e^{-1}\;(mod\;\varphi(N))\\ \)`

<table style="border:11px solid #e5e5e5;padding: 1px;border-radius:0.7em;vertical-align:text-top">
<tbody><tr><td style="border:0">
  <table>
  <thead>
  <tr><th> i </th><th> r</th><th> s </th><th> t </th><th>  q  </th></tr>
  </thead>
  <tbody>
  <tr><td> 0 </td><td> 220 </td><td> 1 </td><td> 0 </td><td> / </td></tr>
  <tr><td> 1 </td><td> 3 </td><td> 0 </td><td> 1 </td><td> / </td></tr>
  <tr><td> 2 </td><td> <strong>1</strong> </td><td> 1 </td><td> <strong>-73</strong> </td><td> 73 </td></tr>
  </tbody>
  </table>
  \( d = -73\;(mod\;220) = 147 \)
</td><td style="border:0;vertical-align:text-top">
\[ \begin{aligned} q_i &= r_{i-2} / r_{i-1} \\
   r_i &= r_{i-2} - q_i * r_{i-1} \\
   s_i &= s_{i-2} - q_i * s_{i-1} \\
   t_i &= t_{i-2} - q_i * t_{i-1} \end{aligned} \]
</td></tr></tbody></table>

* 初始条件：第1、2行的s、t、q值固定，第1行的r值为`\(\varphi(N)\)`，第2行的r值为`\(e\)`；
* 计算过程：根据表格右边的四条规则按顺序计算每一行的q、r、s、t；当计算到某行的r值为1时，该行的t值就是所求得模反元素。
* 阮一峰提到了计算模反元素d用[扩展欧几里得算法](http://zh.wikipedia.org/wiki/%E6%89%A9%E5%B1%95%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E7%AE%97%E6%B3%95)，应该和以上计算的原理是一样的。

于是，Alice生成了 公钥<n,e> => <253,3>，私钥<n,p,q,d> => <253,147>;

<!--
至此，我们可以把`\(p,q\)`丢掉了，不仅是因为我们不再需要它们，更是为了安全考虑。因为，我们不希望有人能根据公钥推出私钥：
-->

RSA的安全性能源于在不知道私钥的情况下我们无法解密，因为目前而言，没有已知的方法在短时间内根据n和e推导出d。

<blockquote>
（1）ed≡1 (mod φ(n))。只有知道e和φ(n)，才能算出d。<br/>
（2）φ(n)=(p-1)(q-1)。只有知道p和q，才能算出φ(n)。<br/>
（3）n=pq。只有将n因数分解，才能算出p和q。
</blockquote>

### Encrypt

__Bob将消息m=57用私钥加密__

`\( c = m^e\;(mod\;N) = 57^3\;(mod\;253) = 250 \)`, 计算过程参考[公钥加密算法一 ElGamal](http://rangerway.com/way/2014/05/07/public-key-one-elgamal/)。

### Decrypt

__Alice解密密文c=250__

`\( m = c^d\;(mod\;N) = 250^{147}\;(mod\;253) = ? \)`

如要强行计算以上公式，是很麻烦的，尤其在数字很大的情况下。

下面给出利用[中国剩余定理](http://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E5%89%A9%E4%BD%99%E5%AE%9A%E7%90%86)的解法： (这个方法并不适用于Diffie-Hellman中计算`\( K = 44^{52}\;(mod\;139) \)`，因为139是一个素数，而在本例中253=11*23是一个合数。)

__中国剩余定理__

现在要求解 `\( 250^{147}\;(mod\;253) \)`，其中253=11*23 (N=p*q)。

* Step 1. 求`\(a_1, a_2\)` `\[\begin{align} m_p = a_1 &= c^{[d\;mod\;\varphi(p)]}\;(mod\;p) \\
    &= (250\;mod\;11)^{[147\;mod\;10]}\;(mod\;11) \\
    &= 8^7\;(mod\;11) = 2 \\
m_q = a_2 &= c^{[d\;mod\;\varphi(q)]}\;(mod\;q) \\
    &= (250\;mod\;23)^{[147\;mod\;22]}\;(mod\;23) \\
    &= 20^{15}\;(mod\;23) = 11 \end{align}\]`

* Step 2. 求p,q互相的模反元素`\(b_1, b_2\)` `\[\begin{align} b_1 &= q^{-1}\;(mod\;p) = 23^{-1}\;(mod\;11) = 1 \\
    b_2 &= p^{-1}\;(mod\;q) = 11{-1}\;(mod\;23) = -2 = 23 \end{align}\]`


* Step 3. 根据中国剩余定理公式`\( \hat{x} = \sum_{i=1}^{n}a_ib_iM_i, \text{where } M=\prod_{i=1}^n, M_i=M/m_i \)`计算消息原文m: `\[\begin{align} m &= [a_1b_1(\frac{N}{p}) + a_2b_2(\frac{N}{q})]\;(mod\;N) \\ &= [2*1*23 + 11*(-2)*11]\;(mod\;253) \\ &= -196\;(mod\;253) = 57 \end{align}\]`


## textBook RSA 隐患

以上演示的是__textbook RSA__，它有一个__可能的漏洞__就是解决RSA难题可能比因式分解N=p*q要来得更容易。相比在本系列第(三)篇要讲的Rabin Scheme，RSA之所以被广泛使用更多的是历史原因，而非技术原因。

<blockquote>
RSA problem may potentially easier than factoring.
</blockquote>



__TL;DR__

阮一封翻译Paul Graham的《黑客与画家》不得不说也是让我读得特兴奋，Graham在其中所阐述的一些思想和观点，很多都能引起我的共鸣。以致我在今年3月的硅谷之行中特地去了一次YC，以及向往去硅谷找工作的一些，就是后话了。

<!--
[ruanyifeng]       http://www.ruanyifeng.com/blog/ "阮一封的blog"
[RSA算法原理(一)]  http://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html "RSA算法原理 (一)"
[RSA算法原理(二)]  http://www.ruanyifeng.com/blog/2013/07/rsa_algorithm_part_two.html "RSA算法原理 (二)"
-->
