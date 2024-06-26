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

    $('pre').addClass('prettyprint linenums').attr('style', 'overflow:auto'); // avoid the conflict between prettify.js and Markdown
    //***********************
    //**Please delete the Disqus js***
    window.disqus_shortname = 'rangerway'; // required: replace example with your forum shortname
    $('#disqus_container .comment').on('click', window.loadComment);

    $(window).scroll(function() {
        var hT = $('#disqus_container .comment').offset().top,
        hH = $('#disqus_container .comment').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();
        if (wS > (hT+hH-wH)){
            setTimeout(window.loadComment(), 2000);
        }
    });

    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_shortname = 'rangerway'; // required: replace example with your forum shortname

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function () {
    var s = document.createElement('script'); s.async = true;
    s.type = 'text/javascript';
    s.src = 'https://' + disqus_shortname + '.disqus.com/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
    }());
    //**Please delete the Disqus js***
    //***********************

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

    (function(){
        var ie6 = ($.browser.msie && $.browser.version=="6.0") ? true : false;

        function initHeading(){
            var h2 = [];
            var h3 = [];
            var h2index = 0;

            $.each($('.entry h2, .entry h3'),function(index,item){
                if(item.tagName.toLowerCase() == 'h2'){
                    var h2item = {};
                    h2item.name = $(item).text();
                    h2item.id = 'menuIndex'+index;
                    h2.push(h2item);
                    h2index++;
                }else{
                    var h3item = {};
                    h3item.name = $(item).text();
                    h3item.id = 'menuIndex'+index;
                    if(!h3[h2index-1]){
                        h3[h2index-1] = [];
                    }
                    h3[h2index-1].push(h3item);
                }
                item.id = 'menuIndex' + index;
            });

            return {h2:h2,h3:h3}
        }

        function genTmpl(){
            var h1txt = $('h1.entry-title').text();
            var tmpl = '<ul><li class="h1"><a href="#"><b>' + h1txt + '</b></a></li>';

            var heading = initHeading();
            var h2 = heading.h2;
            var h3 = heading.h3;

            for(var i=0;i<h2.length;i++){
                tmpl += '<li><a href="#" data-id="'+h2[i].id+'">'+h2[i].name+'</a></li>';

                if(h3[i]){
                    for(var j=0;j<h3[i].length;j++){
                        tmpl += '<li class="h3"><a href="#" data-id="'+h3[i][j].id+'">'+h3[i][j].name+'</a></li>';
                    }
                }
            }
            tmpl += '</ul>';

            return tmpl;
        }

        function genIndex(){
            var tmpl = genTmpl();
            var indexCon = '<div id="menuIndex" class="aside"></div>';

            $('#sidebar').append(indexCon);

            $('#menuIndex')
                .append($(tmpl))
                .delegate('a','click',function(e){
                    e.preventDefault();

                    var selector = $(this).attr('data-id') ? '#'+$(this).attr('data-id') : 'h1'
                    var scrollNum = $(selector).offset().top;

                    $('body, html').animate({ scrollTop: scrollNum-30 }, 400, 'swing');
                });
        }

        var waitForFinalEvent = (function () {
            var timers = {};
            return function (callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId";
                }
                if (timers[uniqueId]) {
                    clearTimeout (timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })();

        if($('.entry h2').length > 2 && !isMobile.any() && !ie6){

            genIndex();

            $(window).load(function(){
                var scrollTop = [];
                $.each($('#menuIndex li a'),function(index,item){
                    var selector = $(item).attr('data-id') ? '#'+$(item).attr('data-id') : 'h1'
                    var top = $(selector).offset().top;
                    scrollTop.push(top);
                });

                var menuIndexTop = $('#menuIndex').offset().top;
                var menuIndexLeft = $('#menuIndex').offset().left;

                $(window).scroll(function(){
                    waitForFinalEvent(function(){
                        var nowTop = $(window).scrollTop();
                        var length = scrollTop.length;
                        var index;

                        if(nowTop+20 > menuIndexTop){
                            $('#menuIndex').css({
                                position:'fixed'
                                ,top:'20px'
                                ,left:menuIndexLeft
                            });
                        }else{
                            $('#menuIndex').css({
                                position:'static'
                                ,top:0
                                ,left:0
                            });
                        }

                        if(nowTop+60 > scrollTop[length-1]){
                            index = length;
                        }else{
                            for(var i=0;i<length;i++){
                                if(nowTop+60 <= scrollTop[i]){
                                    index = i;
                                    break;
                                }
                            }
                        }
                        $('#menuIndex li').removeClass('on');
                        $('#menuIndex li').eq(index-1).addClass('on');
                    });
                });

                $(window).resize(function(){
                    $('#menuIndex').css({
                        position:'static'
                        ,top:0
                        ,left:0
                    });

                    menuIndexTop = $('#menuIndex').offset().top;
                    menuIndexLeft = $('#menuIndex').offset().left;

                    $(window).trigger('scroll')
                    $('#menuIndex').css('max-height',$(window).height()-80);
                });
            })

            //用js计算屏幕的高度
            $('#menuIndex').css('max-height',$(window).height()-80);
            // var left = $('#menuIndex').offset().left;
            // $('#menuIndex').css('position', 'fixed');
            // $('#menuIndex').css('left', left);

        }
    })();

    $.getScript('/js/prettify/prettify.js',function(){
        prettyPrint();
    });


    if(/\#comment/.test(location.hash)){
        $('#disqus_container .comment').trigger('click');
    }
});

function loadComment() {
    var comment = $('#disqus_container .comment');
    $(comment).html('Loading...');
    var that = $(comment).parent();
    $.getScript('https://' + disqus_shortname + '.disqus.com/embed.js',
        function(){$(that).remove()});
}

