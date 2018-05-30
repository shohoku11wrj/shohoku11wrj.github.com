---
layout: post
title: Algorithm -- strstr 的 Rabin Karp 解法
category: Technology
tag: ['algorithm','java', 'strstr', 'hash']
lan: EN
date: 24/05/2018
---

C's [strStr()](http://www.cplusplus.com/reference/cstring/strstr/) or Java's [indexOf()](https://docs.oracle.com/javase/7/docs/api/java/lang/String.html#indexOf(java.lang.String)) 是两个常用函数，也是一道经典的算法问题。

比如[LeetCode第28题](https://leetcode.com/problems/implement-strstr/description/)，几乎所有旁友都做过这题。
<br/>
<br/>

    Input: haystack = "aaaaaaaaaaaaaaaaaabaaaaaa", needle = "aab"
    Output: 16

<!--preview-->

相信很多CS或非CS专业的同学听说过KMP，甚至仔细学习过。但是在面试中是不会要求实现KMP这样的算法的。

假设函数签名是这样的: `public int strStr(String s, String t)`，其中`s`表示`大String`，`t`表示`小String`；要求返回的是t在s中第一次出现的起始index，如果找不到则返回-1。

为了简单起见，以下代码都假设给定的String不为null，并假设 S.length() >= T.length()。

举个例子:

S=

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 |
| T | h | e | q | u | i | c | k | b | r | o | w | n | f | o | x | j | u | m | p |
| 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 |
| s | o | v | e | r | t | h | `e` | `l` | `a` | `z` | `y` | d | o | g |
{: style="margin-left: 0px;"}

T=

| 0 | 1 | 2 | 3 | 4 |
| e | l | a | z | y |
{: style="margin-left: 0px;"}

# 方法一: Brute Force

从S中依次选取每一段和T相同长度的字符串，命名为X，如果X和T相等，则找到并返回X的起始index。code中可以用`S.substring(i, i + T.length())`代替X，如果找到直接返回i.

    public int strStr(String S, String T) {
      for (int i = 0; i < S.length() - T.length() + 1; ++i) {
        if (S.substring(i, i + T.length()).equals(T) {
          return i;
        }
      }
      return -1;
    }

这样的写法，时间复杂度是**O(S * T)**，这里假设substring()和equals()的时间复杂度都是**O(T)**。参考 [Time Complexity of Java's Substring](https://stackoverflow.com/questions/4679746/time-complexity-of-javas-substring)

由于substring()会创造额外的空间，所以空间开销很大**O(S * T)**。
如果对空间进行一点优化，不创造额外的String，直接每个字符比较，可以写成：

    public int strStr(String S, String T) {
      int i = 0, j = 0;
      while (i < S.length() - T.length() + 1) {
        while (j < T.length() && S.charAt(i+j) == T.charAt(j)) {
          j++;
        }
        if (j == T.length()) {
          return i;
        }
        j = 0;
        i++;
      }
      return -1;
    }

这样的写法，时间复杂度最坏的情况下依然是**O(S * T)**，但是不消耗额外的空间。

# 方法二: Rabin-Karp

从方法一其实是从S中选取一个个和T相等长度的窗口X，再和T进行比较。
方法一降低了选取选取窗口的时间复杂度，但并未降低窗口X和T比较的时间复杂度。
也就是说，如果能降低窗口X和T比较的时间复杂度的话，总体时间复杂度就能进一步降低。

Rabin-Karp就是这样一个算法，其中所使用的技巧就是不直接比较String，而是比较String的特征值，比如我们很熟悉的hash value. 算法大致是这样的:

    public int strStr(String S, String T) {
      for (int i = 0; i < S.length() - T.length() + 1; i++) {
        if (S.substring(i, i + T.length()).hashCode() == T.hashCode()) {
          return i;
        }
      }
      return -1;
    }

这样的代码在LeetCode上是可以通过的，但是有两个很严重的错误:

  * substring() 依然要消耗**O(T)**的时间以及**O(T)**的空间; <span style="color:blue">← 主要矛盾</span>
  * String.hashCode() 的计算要消耗O(T)的时间; <span style="color:blue">← 主要矛盾</span>
  * String A.hashCode() == B.hashCode() 并不能保证 A.equals(B)，因为有hash collision的可能存在(虽然可能性很小). <span style="color:black">← 次要矛盾</span>

Rabin-Karp中用来解决主要矛盾的方法叫做: Rolling Hash；
<br/>
换做大家更熟悉的叫法可以是 Sliding Window Hash.
<br/>
[WikiPedia](https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm)上给了一个简单的公式：`s[i+1..i+m] = s[i..i+m-1] - s[i] + s[i+m]`
<br/>
这个方法是靠 递推 来解决主要矛盾的。这个 递推 所用的时间越少，就越能降低总体时间复杂度。

现在来看下这个递推是如何实现的:

### Step_1: 一个普通的hash计算方法

hash(S[0..k]) = (S[0] * prime^k + S[1] * prime^(k-1) + … + S[k] * prime^0) % largePrime
<br/>
hash(S[1..k+1]) = (S[1] * prime^k + S[2] * prime^(k-1) + … + S[k+1] * prime^0) % largePrime

###Step_2: 从S[0..k] 到 S[1..k+1]

S[1] * prime^k + S[2] * prime^(k-1) + … + S[k+1] * prime^0
<br/>
    = ( S[0] * prime^k + S[1] * prime^(k-1) + … + S[k] * prime^0 ) * prime 
<br/>
    - S[0] * prime^(k+1)
<br/>
    + S[k+1] * prime^0

###Step_3: 结合Step_1 和 Step2, 处理计算结果overflow的情况，引入 mod 运算

如果 A == B，那么显然 A % Q == B % Q;
<br/>
现在有 X = Y * p - c * p^k + d，同样可以有 X % Q = (Y * p - c * p^k + d ) % Q，
<br/>
即 X % Q = (Y * p % Q - c * p^k % Q + d % Q) % Q，
<br/>
因为 mod 运算满足分配率

根据以上三步，可以得到一个有用的算法，即在sliding window的每个中间过程中都可以进行mod运算而不影响结果的正确性，同时又避免了overflow的问题。

*为了方便阅读，我做了很多简化和hardcode*

    public int strStr(String S, String T) {
      return strStr(S.toCharArray(), T.toCharArray());
    }

    private int strstr(char[] large, char[] small) {
      int seed = 1;
      int rollingHash = 0;
      int smallHash = 0;
      for (int i = 0; i < small.length; ++i) {
        if (i > 0) {
          seed = seed * 31 % 101;
        }
        smallHash = (smallHash * 31 % 101 + small[i]) % 101;
        rollingHash = (rollingHash * 31 % 101 + large[i]) % 101;
      }
      for (int i = 0; i < large.length - small.length + 1; ++i) {
        if (i > 0) {
          rollingHash = ((rollingHash - seed * large[i-1]) % 101 + 101) % 101;
          rollingHash = (rollingHash * 31 % 101 + large[i + small.length - 1] ) % 101 ;
        }
        if (rollingHash == smallHash && equal(large, i, small)) {
          return i;
        }
      }
      return -1;
    }

    private boolean equal(char[] large, int i, char small) { …略... } // O(T)时间一个个字符比较

其中，smallHash就是hash(T)，rollingHash是S中每一个滑动窗口X的hash(X)；
在不考虑 次要矛盾(hash collision) 的情况下，只要 hash(T) == hash(X)，就能推出T.equals(X).

Seed的作用: `seed % largePrime` 必须为1。
<br/>
还记得__Step_2__中那个被减去的`S[0] * prime^(k+1)`吗？由于`prime^(k+1)`比较大，计算需要花费不少时间，并且被频繁使用，所以这里提前把`prime^(k+1)`的值给计算了出来，并且`% largePrime`也不影响正确性。因为`seed == prime^(k+1) % largePrime`。

举个例子:
<br/>
为了简单直观，我用S = “thelazydog”, T = “lazy”；其中prime用了31，largePrime用了101。

这是以长度5为单位的每个滑动窗口的hash值，读者可以自行进行计算。

<table style="margin-left:0px;">
  <tr>
    <td>0</td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
    <td>8</td>
    <td>9</td>
  </tr>
  <tr>
    <td>t</td>
    <td>h</td>
    <td>e</td>
    <td>l</td>
    <td>a</td>
    <td>z</td>
    <td>y</td>
    <td>d</td>
    <td>o</td>
    <td>g</td>
  </tr>
  <tr>
    <td>58</td>
    <td>91</td>
    <td><code>31</code></td>
    <td>51</td>
    <td>17</td>
  </tr>
</table>

<table style="margin-left:0px">
  <tr>
    <td>0</td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
  </tr>
  <tr>
    <td>e</td>
    <td>l</td>
    <td>a</td>
    <td>z</td>
    <td>y</td>
  </tr>
  <tr>
    <td>31</td>
  </tr>
</table>

Rabin-Karp算法的时间复杂度约等于**O(S + T)**，因为hash collision的几率可以根据需要设计得很小以至忽略不计。空间复杂度同样是常数级别的。(为了代码简洁我把String转换成了Char array，实际算法中不需要这样的处理)

