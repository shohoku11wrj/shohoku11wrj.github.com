---
layout: post
title: 公钥加密算法(三) Rabin
category: Technology
tag: ['cryptography','asymmetric encryption', 'Rabin', '中国剩余定理']
lan: CH
---

起个头，不知道能否在去加州前写完。

<!--preview-->

The Rabin Cryptosystem is based on the idea that computing square roots modulo a composite N is simple when the factorization is known, but the very complex when it is unknown.

Rabin加密系统是基于在已知合数N的因式分解的情况下，可以计算出二次剩余的平方根；但是在因式分解N未知的情况下很难求解的原理。

It is possible to prove that the hardness of breaking the Rabin cryptosystem is equivalent to the hardness of facting。

Rabin加密系统的安全性源于计算二次剩余平方根( square roots modulo a composite N) 和 因式分解N 具有相同的难度。

无法证明 求解RSA问题 和 因式分解N 具有直接联系。从这个方面来说，Rabin比RSA更安全。

但是在CCA (Chosen Ciphertext Attack) 攻击模式下，Rabin加密系统有可能会被攻破密钥；而RSA加密系统虽然也不安全，却可以保证密钥不被攻破。

之所以在公钥加密系统实际使用领域，RSA比Rabin流行的多，主要是因为一些历史原因，而非技术上的原因。

## Rabin构造模型

### Key Generate

生成`\( K = n, p, q \)`, 其中`\( p, q \)`均为质数。

公钥为`\( n \)`，用于加密；

私钥为`\( K \)`，用于解密。

### Encrypt

`\( Enc_K(m) = m^2\;(mod\;n) = c \)`

*注: `\(Enc_K\)` 不是一个permutation function(一对一关系的函数)

### Decrypt

`\( Dec_K(c) = \sqrt(c)\;(mod\;n) = m \)`

, this is to calculate:

`\( m^2 = c\;(mod\;n) \)`, exists 4 square roots of `\( c\;(mod\;n)\ \)`.

由于解密者持有私钥`\(K\)`，所以可以用因式分解后的`\(n = p*q \)`来计算`\(m\)`，这里依然会用到中国剩余定理。
`\[\begin{align} \text{ 相当于求 } \\ x^2 &= c\;(mod\; p) \\ x^2 &= c\;(mod\;q) \\ \text{ 然后计算 } \\ m_p &= c^{\frac{p+1}{4}}\;(mod\;p) \\ m_q &= c^{\frac{q+1}{4}}\;(mod\;q) \end{align}\]`
因为`\( {m_p}^2 = [c^{\frac{p-1}{2}} * c]\;(mod\;p) \)`，其中`\( c^{\frac{p-1}{2}}\;(mod\;p) == 1\;(mod\;n) \text{ if } c\;\in\;QR_p \)`即Legendre symbol。

__如何从4个平方根中找到正确的那个？__

<blockquote>
  One way to be able to recognize which of all messages was the sent message is adding some information of the message, called <b>redundant information</b>.
</blockquote>

由于是寻找平方根，所以在用中国剩余定理求解时`\((mod\;p)\)`和`\((mod\;q)\)`都分别有2个解，他们的组合就是4个解。如何区分这4个解中哪个才是真正的m？目前所用的是加入一些冗余信息，比如timestamp。

由于公钥加密系统主要用于交换对称加密密钥，而不是实际有意义的可读消息，所以4个平方根都有可能是新的对称加密密钥。这就是为何在不加入冗余信息时，我们不能从4个平方根中直接区分出原始消息。

## 举则列子

应用场景：Bob用Alice的公钥发送一条消息`\( m = 32 \)`给Alice。

### Key Generate

取`\( p = 7, q = 11, n = 77 \)`

Alice的密钥为`\( K = \left \{ n= 77, p = 7, q = 11 \right \} \)`

Bob拿到Alice的公钥即`\( n = 77 \)`

### Encrypt

Bob将消息`\(m = 32\)`用公钥`\(n\)`加密，然后发送给Alice：`\[ Enc_{77}(32) = 32^2\;(mod\;77) = 23 = c \]`

### Decrypt

Alice收到Bob发送的密文`\( c = 23 \)`，用私钥`\(K\)`解密。

中国剩余定理再次登场 `\[\begin{align} m_p &= c^{\frac{p+1}{4}}\;(mod\;p) \\ &= 23^{\frac{7+1}{4}}\;(mod\;7) \\ &= 4 \\ m_q &= c^{\frac{q+1}{4}}\;(mod\;q) \\ &= 23^{\frac{11+1}{4}}\;(mod\;11) \\ &= 1 \end{align}\]`
这相当于我们找到了 `\[\begin{align} +m_p\;(mod\;p) &= 4\;(mod\;7) \\ -m_p\;(mod\;p) &= 3\;(mod\;7) \\ +m_q\;(mod\;q) &= 1\;(mod\;11) \\ -m_q\;(mod\;q) &= 10\;(mod\;11) \end{align}\]`
然后求 `\[\begin{align} b_p &= q^{-1}\;mod\;p = 11^{-1}\;mod\;7 = 2 \\ b_q &= p^{-1}\;mod\;q = 7^{-1}\;mod\;11 = 8  \end{align}\]`
根据 `\[\begin{align} \hat{x} &= a_i * b_i * \frac{M}{m_i} \\ \text{选取 } &+m_p = 4, +m_q = 1 \\ x_1 &= m_p*b_p*\frac{N}{p} + m_q*b_q*\frac{N}{q} \\ &= {\bf 4}*2*11 + {\bf 1}*8*7 \\ &= 144\;mod\;77 \\ &= 67 \\ \text{选取 } &-m_p = 3, +m_q = 1 \\ x_2 &= {\bf 3}*2*11 + {\bf 1}*8*7 \\ &= 122\;mod\;77 \\ &= 45  \end{align}\]`
利用对等原理可以直接得到 `\[\begin{align} x_3 &= -x_1 = 10 \\ x_4 &= -x_2 = 32 \end{align}\]`
至此，Rabin解密的四个二次剩余平方根均已求出。最后根据冗余信息确定唯一的一个解就是原消息m。

## 扩展阅读

### Rabin Signature

### Rabin加密 bit by bit

<blockquote>
参考: <br/>
<b>The Rabin Cryptosystem</b> <br/> 
Naiara Escudero Sanchez <br/>
naiara.escudero@googlemail.com <br/>
University of Paderborn <br/>
</blockquote>

<i>写于2014年5月29日从纽约飞往旧金山的飞机上</i>
