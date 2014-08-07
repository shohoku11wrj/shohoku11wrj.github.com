---
layout: post
title: 公钥加密算法(一) ElGamal
category: Technology
tag: ['cryptography','asymmetric encryption', 'ElGamal', 'Hiffie-Hellman']
lan: CH
---

公钥加密算法的作用大家都很熟悉了，比如大名鼎鼎的RSA，被誉为计算机领域最重要的算法之一。

学了Foundation of Cryptography之后，我了解了常用的公钥算法除了RSA之外还有好几种，甚至RSA被认为是不能严格证明的，不知道这个不能严格证明的问题和Snowden爆出来的RSA Backdoor有没有关系。

<!--preview-->

本系列主要讲三种不同的公钥加密算法(Public Key Encryption)，并用实例演绎他们是如何实现的。用到的数学基础是数论。

本篇讲ElGamal Encryption Scheme，它是基于Discrete Logarithm Probelm难于求解的前提; 
另外两种是RSA 和 Rabin，他们都是基于同一种前提：在不知道如何因式分解N(=p*q)的前提下很难计算Square Root module N，其中Rabin被认为比RSA更严格符合这一前提。

## Diffie-Hellman

在讲ElGamal之前，先简单地提一提Diffie-Hellman。这是一种最简单的密钥交换算法(Key Exchange Scheme)。

[Wiki](http://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)上的这个图解释得相当直观:

<object type="image/svg+xml" data="/images/public_key/Diffie-Hellman_Key_Exchange.svg" class="center"></object>
<span class="pic">Diffie-Hellman密钥交换原理示意图</span>

这种算法目的是A和B双方达成一个相同的密钥。有一个与众不同的地方是A和B发送信息的次序可以没有先后（前提是A和B已经达成了`\( <p,p\prime,g> , \text{其中 } p = 2p\prime + 1, g \text{ is a generator in } QR_p, |QR_p| = p\prime \)`的一致）。

Alice 生成一个随机数 a,
Alice 把 `\( y_A = g^a\;(mod\;p) \)` 发送给Bob;

Bob 生成一个随机数 b,
Bob 把 `\( y_B = g^b\;(mod\;p) \)` 发送给Alice;

双方达成共同的密钥`\[\begin{aligned} \text{Alice计算:  } & K_{AB} = {y_B}^a\;(mod\;p) = {(g^b)}^a\;(mod\;p) = g^{a*b}\;(mod\;p) \\
\text{Bob计算:  } & K_{AB} = {y_A}^b\;(mod\;p) = {(g^b)}^a\;(mod\;p) = g^{a*b}\;(mod\;p) \end{aligned}\]`
这里可能有一个疑问：其他人可以看到`\(y_A\text{和}y_B\)`，是否也能解出`\(K_{AB}\)`？

数学表明，在数值很大的情况下，这样的计算是很难的。这个计算难度是经过精确计算的，保证可能在几个月、几十年甚至几百年都无法完成计算。
这个难以计算的难题被称为__discrete logarithm problem__，被定义为求`\( x = \log_g{y}\;(mod\;p)\)`。

ElGamal便是利用类似的数学性质，但是目的在于加密和解密过程，而不仅仅是像Diffie-Hellman一样交换密钥就结束了，所以ElGamal在构造上为了实际应用有所改变。

## ElGamal 构造模型

### Key Generate

这里要生成一对 公钥(Public Key) 和 私钥(Private Key):

取一个随机的素数(Prime) `\( p^\prime \)` s.t.(such that的简写) `\( p = 2p\prime + 1 \)`, 以及在这个`\( Z_p^*\)` 下的 generator `\( g \)`；

随机取一个小于`\( p \)`的数`\( x \)`，Private Key 为 `\( <p,p^\prime,g,x> \)`，

根据`\( x \)`算出 `\( y = g^x\;(mod\;p) \)`，Public Key 为 `\( <p,p^\prime,g,y> \)`

### Encrypt

现在，我们用这对公密钥对消息m进行加密，生成密文c，其中密文c由左右两部分组成，称之为 `\( (C_L,C_R) \)`。

具体加密过程：

  * Step 1. Pick some `\( r^\prime \in Z_{p^\prime} \)`

  * Step 2. `\( C_L = g^r\;(mod\;p)\)`

  * Step 3. `\( C_R = m * y^r\;(mod\;p) \)`

### Decrypt

解密过程用一个公式可以表述：`\[ C_R / C_L^x\;(mod\;p) \]`
证明如下：`\[ C_R / C_L^x = m * y^r / (g^r)^x = m * (g^x)^r / (g^x)^r = m \]`
在没有密钥中的`\(x\)`的情况下，无法顺利解密出原文，这就是ElGamal安全的前提。

## 举则列子

以上的构造过程看似很简单，其实ElGamal的计算很麻烦（或许是我不知道简便方法）。我根据这个例子[ElGamal Enc Example]来一步步分析如何完成ElGamal的计算过程。

Scenario: Alice用Bob的public key发送一个message给Bob。

### Key Generate

  * Step 1. Bob 选取 `\( \text{Prime } p = 139, g = 3, \text{private key } x = 12 \)`
  
  * Step 2. Bob 计算出 公钥 `\( 44 = 3^{12}\;(mod\;139) \)`

### Encrypt

  任何人，包括Alice, 都能获得Bob的公钥, which is 44;

  Step 3和4是Alice发送消息M = 100给Bob;

  * Step 3. Alice 选择一个随机数k，并根据k计算K: `\( k = 52 \)`, and then calculate `\[ K = 44^{52}\;(mod\;139) = 112 \]`

  * Step 4. Alice 计算出密文 <`\(C_L,C_R\)`>, by `\[\begin{aligned} C_L &= 3^{52}\;(mod\;139) = 38 \\ C_R &= 100 *112\;(mod\;139) = 80 \end{aligned}\]`

  Then Alice send <`\(C_L,C_R\)`> to Bob.

### Decrypt

  * Step 5. Bob从`\(C_L\)`中可以计算出K, `\[\begin{aligned} K &= 38^{12}\;(mod\;139) = 112 \\ K^{-1} &= 112^{-1}\;(mod\;139) = 36 \end{aligned}\]`

  * Step 6. 根据公式 `\( M = C_R / C_L^x \)`，Bob 可以计算出Alice所发送的message `\[ M = C_R * K^{-1}\;(mod\;p) = 80 * 36\;(mod\;139) = 100 \]`

至此，我们用ElGamal算法演绎了一遍从Bob生成公钥密钥对，到Alice用Bob的公钥加密message M后发送给Bob, Bob再利用他的密钥解密出M原值。

目前最困扰我的是如何计算 `\( K = 44^{52}\;mod\;139 \)`

如果我按一步步计算的话，是否会过于繁琐：
`\[\begin{aligned}
&Setps:\\
&  44^2\;mod\;139 = 129 = -10\\
&  44^4\,\;... = 100 = -39\\
&  44^8\,\;... = 131 = -8\\
&  44^{16}\,... = 64\\
&  44^{32}\,... = 65\\
&  44^{48}\,... = 129 = -10\\
&  44^{52}\,... = 53 = 112\\\end{aligned}
\]`
我怀疑是否可以利用[Fremat-Euler Theorem](http://en.wikipedia.org/wiki/Euler%27s_theorem)，即以下这条性质来使计算大大简化，毕竟手算64x65 (mod 139)还是很容易算错的。
`\[ 44^{\varphi(139)} = 1\,(mod\,139) ==> 44^{138} = 1 \]`, 因为44和139互质

__答:__ <br/>
是有相对简便的方法的，[Prof. Antonoi](http://www.cs.stevens.edu/~nicolosi/) 给出的提示是利用order的性质来计算。由于order of `\( Z_{139} = \varphi(139) = 138 \)`，可以被因式分解为2 x 3 x 23。即暗示着，可能有些元素在 ^ 23 之后 mod 139 是 1，44恰好是一个，我尝试了一下 45 ^ 23 (mod 139) 结果也是 1。

根据order的性质，if `\({Z_n}^*\)` is cyclic then the number of generators is `\( \varphi(\varphi(n)) \)`；并且if `\(\alpha\)` is a generator then `\( ord(\alpha) = \varphi(n) > \varphi(n)/p \)`，if `\(\alpha\)` is __NOT__ a generator then `\( ord(\alpha) = t < \varphi(n) \text{ and } t|\varphi(n) \)`，其中 x|y 表示x可以整除y。

所以，在这个例子中，我们猜测44可能不是一个generator，那么他的order就有可能可以整除2,3或者23；另外从`\( 44^2 = 44^{48} = -10 \)`中我们也可以得到`\( 44^{46}\;mod\;139 = 1 \)`。

[ElGamal Enc Example]: http://ta.ramk.fi/~jouko.teeriaho/cryptodict/Elgamal.pdf "ElGamal Encryption Algorithm"
[Euler]: http://en.wikipedia.org/wiki/Euler%27s_theorem "Euler theorem"

