---
layout: post
title: LaTeX Notes & MathJax in Jekyll
category: Technology
tag: ['TeX', 'jekyll']
lan: EN
---

I take `Math of Cryptography` and `Machine Learning` this semester. So I guess it is important for me to be able to input mathematics formular in blog posts when I want to write somthing about math. 

<!--preview-->

LaTeX will also be awesome when I write some post in `Physics` category.

## Notes for LaTeX

Here are some notes when learning Tex syntax.
[Krummel's LaTeX Tutorials](http://mrskrummel.com/latex/ "GIFTED &TALENTED MATHEMATICS")

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
<br/>

    <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

[Using MathJax in popular web platforms](http://docs.mathjax.org/en/latest/platforms/index.html#using-mathjax-in-a-theme-file)

###2. Add MathJax Config Before the Reference
<br/>
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

Official guide: [Using in-line configuration options](http://docs.mathjax.org/en/v1.1-latest/configuration.html#config-files)

From other Blogger's: [LaTeX Math Magic][]


###3. Try Your Own Formular from [Tex Samples](http://www.mathjax.org/demos/tex-samples/)
In case you can not figure out the true html source code of formulars, just take a glance at [cowoebker's_post_source_code](https://github.com/cwoebker/.com/blob/master/_posts/2011-10-27-latex-math-magic.markdown).

Some formulars you can test with: [TeX Samples](http://www.mathjax.org/demos/tex-samples/)

example: 
<center><strong>Maxwell’s Equations</strong></center>

`\begin{aligned}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\   \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0 \end{aligned}`

Cool.



<blockquote>
Referenced by: <br/>
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


[LaTeX Math Magic]: http://doswa.com/2011/07/20/mathjax-in-markdown.html