---
layout: first
---

<link rel="stylesheet" href="/js/prettify/prettify.css" />

<div>
{% highlight ruby %}
Hello, I'm Ranger. Ranger's Way is my personal website.

find_me = {
  "email"   => "renjie.weng@gmail.com",
  "twitter" => "http://twitter.com/#!/gaga_ek",
  "github"  => "http://github.com/shohoku11wrj",
  "GPG"     => "1024R/619F54B5"
}
{% endhighlight %}
</div>

<script type="text/javascript">
$(document).ready(function(){

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        }
        ,BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        }
        ,iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }
        ,Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        }
        ,Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        }
        ,any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    $('pre').addClass('prettyprint'); //添加Google code Hight需要的class

    $('.entry a').each(function(index,element){
        var href = $(this).attr('href');
        if(href){
            if(href.indexOf('#') == 0){
            }else if ( href.indexOf('/') == 0 || href.toLowerCase().indexOf('rangerway.com')>-1 ){
            }else if ($(element).has('img').length){
            }else{
                $(this).attr('target','_blank');
                $(this).addClass('external');
            }
        }
    });

    $.getScript('/js/prettify/prettify.js',function(){
        prettyPrint();
        menuIndex();
    });

    if(/\#comment/.test(location.hash)){
        $('#disqus_container .comment').trigger('click');
    }
});

</script>
