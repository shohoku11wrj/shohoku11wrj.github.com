---
layout: post
title: Spam Filter (4) -- Self-Learning & Augment
category: Technology
tag: ['ML', 'spam', 'Self-Learning']
lan: EN
---

Till then, I have achieved Average AUC of 0.921837 with [Naive Bayes](/way/2014/01/27/spam-filter-two/), and 0.909551 with [Logistic Regression](way/2014/03/03/spam-filter-three/). This kind of result would rank at 3rd position in Discovery Challenge 2006.

<!--preview-->

## Shall We Stop?

从之前训练数据的结果和测试数据的结果中发现一个现象，就是训练数据可以把准确率做得很高（接近100%），但是到实际应用时却总会有一个瓶颈上不去。

经过简单的分析我们就可以想明白，这是因为数据的差异性造成的。采用训练数据时，我是把同一组split成两半，一半进行learning，一半进行evaluating。由于是同一组数据，所以相似度很高，机器学习出来的参数相应地在组内十分契合。

但是在实际测试中，我们往往使用来源不同的数据进行learning和evaluating。这种数据本身的差异性造成了如果使用单纯地learning + evaluating模式，必然会有一个误差无法填补。

这时我从使用gmail的经验中获取到了一定的灵感。在使用gmail时我们有时候将一些广告设置成spam后，这样的广告就可能不再出现。这说明gmail对我们的行为作出了新的学习判断。那么如果我__在evaluating的同时进行对新数据的学习__是否有助于提高准确率呢？It depends. 在用贝叶斯的情况下，这样做可以带来很大的好处。

## Implementation of Self-Learning

由于我在evaluating时并不知道邮件的true label，所以我设置一个__置信度__来判断我是否要学习这封新邮件。我设置的置信度为 >0.99 或 < 0.01 。如果一封邮件的判断结果 >0.99，则把它当作是spam进行学习，如果是<0.01则当作是non-spam进行学习。这样，__1.__ 我就有了很多新数据；__2.__ 这些evaluating阶段的数据质量比training阶段的数据质量要更高（更符合我目前要evaluating的数据特征，因为是其本身嘛）。

实验结果令人相当满意。

Table 8 shows the improved result of Self-Learning on Naive Bayes:

<span class="pic">Table 8: AUC of Self-Learning on NB</span>

<table>
<thead>
<tr><th> </th><th> tune </th><th> u01 </th><th> u02 </th><th> u00_tune </th><th> u00</th></tr>
</thead>
<tbody>
<tr><td><strong>AUC</strong>  </td><td> 0.997701  </td><td>  0.927123  </td><td> 0.980120  </td><td> 0.989169  </td><td>  0.889985</td></tr>
<tr><td><strong>u00_tuned</strong> </td><td> </td><td> </td><td> </td><td> 0.992031 </td><td> 0.958331</td></tr>
</tbody>
</table>

The corresponding ROC curves plotted on Figure 8:

![ROC SL Bayes](/images/spam-filter/roc_nb_augment.png)

<span class="pic">Figure 8: ROC curves of Self-Learning on NB</span>

Bayesian Filter 可以从self-learning中得到很大的提高，但是 Logistic Regression Filter 却没有显著提高。对于这个，我分析下来原因是 Logistic Regression 收敛得很快；所以即使加入更多数据，对学习也没有帮助。

## Shall We Stop Now?

I think we can go a little further bravely.

由于我可以通过加入unlabeled的测试数据来进行预判再学习，那么就意味着如果我能得到更多测试数据的话，我的预判会更准确。但是现实情况是我只有这点测试数据。

怎么办呢？是否可以给Self-Learning加上一个__加强系数 Enlargement Coefficient__，使得测试数据在总的学习数据中所占比重更重呢？

至少在这里，这样的假设能得到很好的实验效果。

Table 9 shows the enlargement result on Bayesian Filter:

<span class="pic">Table 9: AUC of Enlarged Self-Learning on NB</span>

__Enlarged X3__
<table>
<thead>
<tr><th> </th><th> tune </th><th> u01 </th><th> u02 </th><th> u00_tune </th><th> u00</th></tr>
</thead>
<tbody>
<tr><td><strong>AUC</strong>  </td><td> 0.997126  </td><td>  0.936075  </td><td> 0.985456  </td><td>   </td><td>  </td></tr>
<tr><td><strong>u00_tuned</strong> </td><td> </td><td> </td><td> </td><td> 0.990459 </td><td> 0.976759</td></tr>
</tbody>
</table>

__Enlarged X20__
<table>
<thead>
<tr><th> </th><th> tune </th><th> u01 </th><th> u02 </th><th> u00_tune </th><th> u00</th></tr>
</thead>
<tbody>
<tr><td><strong>AUC</strong>  </td><td> 0.994268  </td><td>  0.953053  </td><td> 0.987347  </td><td>   </td><td>  </td></tr>
<tr><td><strong>u00_tuned</strong> </td><td> </td><td> </td><td> </td><td> 0.979197 </td><td> 0.988825</td></tr>
</tbody>
</table>

## Final Result

最终我采用__Enlarge X3__最为我的稳定结果：

<span class="pic">Enlarge X3 for Self-Learning on Bayesian Filter</span>

<table>
<thead>
<tr><th> </th><th> u00 </th><th> u01 </th><th> u02 </th><th> Average AUC </th>
</thead>
<tbody>
<tr><td><strong>AUC</strong>  </td><td> 0.976759  </td><td>  0.936075  </td><td> 0.985456  </td><td>  0.966097 </td></tr>
</tbody>
</table>

I felt exciting when comapred to Ranking in Discovery Challenge 2006, where the 1st Rank was 0.950667. And I guess they should have used the same imporvement as Self-Learning, which will break the limitation of similarity between training data and evaluating data.

