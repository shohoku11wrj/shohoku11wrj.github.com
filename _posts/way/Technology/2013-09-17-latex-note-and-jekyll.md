---
layout: post
title: LaTeX Notes & MathJax in Jekyll
description: I want to input formulars in my posts.

category: Technology
tag: ['TeX', 'jekyll']
lan: EN
---

I take `Math of Cryptography` and `Machine Learning` this semester. So I guess it is important for me to be able to input mathematics formular in blog posts when I want to write somthing about math. 

And I like physics. LaTeX will also be awesome when I write some post in `Physics` category.

## Notes

Here are some notes when learning Tex syntax.<br />
[Tutorials](http://mrskrummel.com/tutorials "GIFTED &TALENTED MATHEMATICS")

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

    \end{document}
{% endraw %}
