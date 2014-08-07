---
layout: post
title: LaTeX Notes & MathJax in Jekyll
category: Technology
tag: ['TeX', 'jekyll']
lan: EN
---

I take `Math of Cryptography` and `Machine Learning` this semester. So I guess it is important for me to be able to input mathematics formular in blog posts when I want to write somthing about math. 

<!--preview-->

TeX will also be awesome when I write some post in `Physics` category.

[TeX](http://en.wikipedia.org/wiki/TeX) is a text complier which produce high-quality formatted document on its own syntax.
There are many software based on Tex. A well-know of them is [LaTeX](http://latex-project.org/intro.html). 

[MathJax](http://www.mathjax.org/) is a TeX tool purely based on javascript.


## Notes for LaTeX

Here are some notes when learning Tex syntax.<br/>
[Mrs. Krummel's LaTeX Tutorials](http://mrskrummel.com/latex/ "GIFTED &TALENTED MATHEMATICS")<br/>
[Online LaTeX Equation Editor](http://www.codecogs.com/latex/eqneditor.php)

{% raw %}
    \documentclass{article}

    \begin{document}

    math formular $A=x^2+4x+3$ 

    spearate math formular $$A=x^2+4x+3$$

    superscripts: $$2x^{34}$$ ==> x power 34

    subscripts: $$x_1$$  $${{x_1}_2}_3$$

    greek letters:  $$\pi$$ $$\alpha$$  $$A=\pi r^2$$

    trig functions:  $$y=\sin{x}$$  

    log functions:  $$\log_5{x}$$  $\ln{x}$

    square roots:  $$\sprt{2}$$  $$\sprt[3]{x^2+y^2}$$ $$\sport{1+\sprt{x}}$$

    fractions:  2/3 == $$2/3$$ ==> 2/3   
                $$\frac{2}{3}$$  ==> 2upstair 3downstair
                $\displaystyle\frac{2}{3}$  ==> enlarge the upper formular to better display
                $$\sprt{\frac{x}{x^2+x+1}}$$

    $$\{a,b,c\}$$  ==> {a,b,c}

    $$\$12.55$$

    $3\left(\frac{2}{5}\right)$

    $$\left|\frac{x}{x+1}\right|$$

    $$\left\{$x^2\right.$$  ==>  {x^2

    $$\left| \frac{dy}{dx} \right|_{x=1}$$  ==>  |dy/dx|_x=1

    \begin{tabular}{cccccc}

    $x$ & 1 & 2 & 3 & 4 & 5 \\ \hline                  x    1  2  3  4  5 
    $f(x)$ & 10 & 11 & 12 & 13 & 14 \\ \hline     ==>  f(x) 10 11 12 13 14

    \end{tabular}

    \begin{eqnarray}         ==>   右侧对其，每行末尾有(1)(2)等行号
    5x^2-9=x+3\\                   所有的等号上下对齐
    4x^2=12\\
    x^3=3\\
    x\approx\pm1.732             x 约等于 +-1.732
    \end{eqnarray}

    \end{document}
{% endraw %}


## MathJax Guide

Simple guide for enabling MathJax.js on your Jekyll posts.

###1. Reference MathJax Library

    <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

[Using MathJax in popular web platforms](http://docs.mathjax.org/en/latest/platforms/index.html#using-mathjax-in-a-theme-file)

###2. Add MathJax Config Before the Reference

    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        tex2jax: {
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre']
        }
      });

      MathJax.Hub.Queue(function() {
        // Fix <code> tags after MathJax finishes running. This is a
        // hack to overcome a shortcoming of Markdown. Discussion at
        // https://github.com/mojombo/jekyll/issues/199
        var all = MathJax.Hub.getAllJax(), i;
        for(i = 0; i < all.length; i += 1) {
            all[i].SourceElement().parentNode.className += ' has-jax';
        }
      });
    </script>

We do this cause <strong>Markdown messes up MathJax!</strong>

Official guide: [Using in-line configuration options](http://docs.mathjax.org/en/v1.1-latest/configuration.html#config-files)

Or be guided from other bloggers: [LaTeX Math Magic][]

###3. Custom the CSS

Of course, the CSS of your formular text can be redefined:

    code.has-jax {font: inherit; font-size: 100%; background: inherit; border: inherit;}

###4. Try Your Own Formulars

Two approaches to insert your formulars in posts source file:

You could use: `[](raw: put latex here)` But this only works partly.
The markdown will interpret the first `)` as the closing tag for our raw-statement.

Another approach is to use code blocks. So either using at least 4 spaces before you write something, or using the `acute` symbol: \`. Inside the acute symol, brace the formular with `\ [...\ ]`, you will write formular in a seperate new line, brace with `\ (...\ )`, you write formular inline.

In case you can not figure out the true html source code of formulars, just take a glance at [cowoebker's_post_source_code](https://github.com/cwoebker/.com/blob/master/_posts/2011-10-27-latex-math-magic.markdown).

Some formulars you can test with: [TeX Samples](http://www.mathjax.org/demos/tex-samples/)

example:

- Maxwell’s Equations

`\begin{aligned}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\   \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0 \end{aligned}`

- Binomial Formular

The probability of getting `\( k \)`  heads when flipping `\( n \)` coins.

`\[
P(E)   = {n \choose k} p^k (1-p)^{ n-k}
\]`

- Kinetic Energy Equation

Kinetic energy of rigid bodies: `\[ E_k = \frac{1}{2}mv^2 \]`

Rotating bodies: `\[ E_r = \frac{1}{2}Iw^2 \]`


Cool.

###5. Tips

Avoid formatting text in formular by using `\text` tag: `\[ IDF_t (Inverse  Document Frequency) = \log⁡( \frac {\text{Corpus size}} {\text{Document count contains term }t +1)} ) \]` See the difference between text left to `=` and right to, where the right side is using `\text` tag.

Align `=` for multiline equations by using `\( \text{\begin{eqnarray} ... \end{eqnarray}} \)` and set the align mark with `& = &`: `\[ \begin{eqnarray}\text{Simple TF}_t & = & \frac {f_{t,d}} {Max(f_{i,d})} \\
\text{Modified TF}_t & = & \log{|Sf_t - Hf_t |} \\
\text{Re-modified TF}_t & = & \frac {\log{|Sf_t - Hf_t |}} {Max(f_{i,d})} \end{eqnarray}\]`


<blockquote>
References: <br/>
<br/>
<b>Author:</b> Doswa <br/>
<b>Title:</b>  mathjax in markdown <br/>
<b>Link:</b>   http://doswa.com/2011/07/20/mathjax-in-markdown.html <br/>
<br/>
<b>Author:</b> Cecil Woebker <br/>
<b>Title:</b>  LaTeX Math Magic<br/>
<b>Link:</b>   http://cwoebker.com/posts/latex-math-magic/<br/>

<br/>
<b>Author:</b> Krummel <br/>
<b>Title:</b>  LaTeX Tutorials<br/>
<b>Link:</b>   http://mrskrummel.com/latex/<br/>
</blockquote>


[LaTeX Math Magic]: http://cwoebker.com/posts/latex-math-magic/
