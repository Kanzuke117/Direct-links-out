// ==UserScript==
// @name        Direct links out
// @name:ru     Прямые ссылки наружу
// @description Removes all "You are leaving our site" and redirection stuff from links
// @description:ru Убирает "Бла-бла-бла, Вы покидаете наш сайт" и переадресацию из ссылок
// @namespace   https://github.com/XX-J
// @author      nokeya & XX-J...
// @update      https://github.com/XX-J/Direct-links-out/raw/master/Direct links out.user.js
// @icon        https://raw.githubusercontent.com/XX-J/Direct-links-out/master/icon.png
// @version     2.40
// @grant       none
//Google
// @include     *://google.*
// @include     *://www.google.*
// @include     *://encrypted.google.*
//4PDA
// @match       *://4pda.ru/*
// @match       *://*.4pda.ru/*
//AMO
// @match       *://addons.mozilla.org/*
//DanielDefo
// @match       *://danieldefo.ru/*
// @match       *://*.danieldefo.ru/*
//DeviantArt
// @match       *://deviantart.com/*
// @match       *://*.deviantart.com/*
//Disq.us
// @match       *://disq.us/*
// @match       *://*.disq.us/*
// @match       *://disqus.com/*
// @match       *://*.disqus.com/*
//ForumAvia
// @match       *://*.forumavia.ru/*
//FB
// @match       *://facebook.com/*
// @match       *://*.facebook.com/*
// @match       *://messenger.com/*
// @match       *://*.messenger.com/*
//Instagram
// @match       *://instagram.com/*
// @match       *://*.instagram.com/*
//JoyReactor
// @match       *://joyreactor.cc/*
// @match       *://*.joyreactor.cc/*
// @match       *://reactor.cc/*
// @match       *://*.reactor.cc/*
// @match       *://joyreactor.com/*
// @match       *://*.joyreactor.com/*
//Kickass
// @match       *://kat.cr/*
// @match       *://kickassto.co/*
// @match       *://katproxy.is/*
// @match       *://thekat.tv/*
// @match       *://*.kat.cr/*
// @match       *://*.kickassto.co/*
// @match       *://*.katproxy.is/*
// @match       *://*.thekat.tv/*
//OK
// @match       *://ok.ru/*
// @match       *://*.ok.ru/*
//Picarto
// @match       *://picarto.tv/*
// @match       *://*.picarto.tv/*
//Pixiv
// @match       *://pixiv.net/*
// @match       *://*.pixiv.net/*
//Slack
// @match       *://*.slack.com/*
//SoundCloud
// @match       *://soundcloud.com/*
// @match       *://*.soundcloud.com/*
//Steam
// @match       *://steamcommunity.com/*
// @match       *://*.steamcommunity.com/*
//Taker
// @match       *://taker.im/*
// @match       *://*.taker.im/*
//Tumblr
// @match       *://tumblr.com/*
// @match       *://*.tumblr.com/*
//Twitter
// @match       *://twitter.com/*
// @match       *://*.twitter.com/*
//Upwork
// @match       *://upwork.com/*
// @match       *://*.upwork.com/*
//USBDev
// @match       *://usbdev.ru/*
// @match       *://*.usbdev.ru/*
//VK
// @match       *://vk.com/*
// @match       *://*.vk.com/*
//Wikimapia
// @match       *://wikimapia.org/*
//Yandex
// @match       *://yandex.ru/*
// @match       *://yandex.ua/*
// @match       *://yandex.by/*
// @match       *://yandex.kz/*
// @match       *://yandex.com.tr/*
// @match       *://yandex.com/*
// @match       *://*.yandex.ru/*
// @match       *://*.yandex.ua/*
// @match       *://*.yandex.by/*
// @match       *://*.yandex.kz/*
// @match       *://*.yandex.com.tr/*
// @match       *://*.yandex.com/*
//YaPlakal
// @match       *://yaplakal.com/*
// @match       *://*.yaplakal.com/*
//Youtube
// @match       *://youtube.com/*
// @match       *://*.youtube.com/*

// ==/UserScript==
(function() {
    // anchors and functions
    var anchor;
    var after;
    var rwLink = function(){};
    var rwAll = function(){};
    var retTrue = function() { return true; }; //dummy function to always return true

    // Base64 Decoder (Not Work)
    function B64Dec(str){
        return decodeURIComponent(escape(window.atob(str)));
    }
    // simple rewrite link -  based on anchors
    function rwSimple(link){
        if (anchor){
            var ndx = link.href.indexOf(anchor);
            if (ndx != -1){
                var newlink = link.href.substring(ndx + anchor.length);
                if (after){
                    ndx = newlink.indexOf(after);
                    if (ndx != -1)
                        newlink = newlink.substring(0, ndx);
                }
                link.href = unescape(newlink);
            }
        }
    }
    function rwaSimple(){
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; ++i)
            rwLink(links[i]);
    }
    // vk
    function rwVK(link){
        if (link.className === 'page_media_link_thumb')
        {
            var parent = link.parentNode;
            link.href = parent.getAttribute("href");
            parent.removeAttribute('href');
            parent.removeAttribute('onclick');
            link.removeAttribute('onclick');
        }

        var ndx = link.href.indexOf(anchor);
        if (ndx != -1){
            var newlink = link.href.substring(ndx + anchor.length);
            var afterArr = ['&post=', '&el=snippet', '&cc_key='];
            for (var i = 0; i < afterArr.length; ++i){
                ndx = newlink.indexOf(afterArr[i]);
                if (ndx != -1)
                    newlink = newlink.substring(0, ndx);
            }
            link.href = unescape(newlink);
        }
    }
    // twitter
    function rwTwitter(link){
        if (link.hasAttribute('data-expanded-url')){
            link.href = link.getAttribute('data-expanded-url');
            link.removeAttribute('data-expanded-url');
        }
    }
    function rwaTwitter(){
        var links = document.getElementsByClassName('twitter-timeline-link');
        for (var i = 0; i < links.length; ++i)
            rwLink(links[i]);
    }
    // kickass
    function rwKickass(link){
        var ndx = link.href.indexOf(anchor);
        if (ndx != -1){
            link.href = window.atob(unescape(link.href.substring(ndx + anchor.length, link.href.length - 1)));
            link.className = '';
        }
    }
    // youtube
    function rwYoutube(link){
        anchor = '&q=';
        after = '&redir_token=';
        rwSimple(link);
    }
    // facebook
    function rwFacebook(link){
        if (/referrer_log/i.test(link.onclick)){
            link.removeAttribute('onclick');
            link.removeAttribute('onmouseover');
        }
        rwSimple(link);
    }
    // google
    function rwGoogle(link){
        // replace global rwt script
        if (window.rwt && window.rwt != retTrue){
            delete window.rwt;
            Object.defineProperty(window, 'rwt', { value: retTrue, writable: false });
        }
        // main search
        if (link.hasAttribute('onmousedown'))
            link.removeAttribute('onmousedown');
        // images
        if (link.hasAttribute('jsaction')){
           var tmp = link.getAttribute('jsaction');
           if (tmp)
            link.setAttribute('jsaction', tmp.replace(/(mousedown:irc.rl|keydown:irc.rlk)/g,''));
        }
    }
    // yandex
    function rwYandex(link){
        // main search
        if (link.hasAttribute('data-counter'))
            link.removeAttribute('data-counter');
        // images
        anchor = '&img_url=';
        after = '&pos=';
        rwSimple(link);
    }
    //mozilla addons store
    function rwAMO(link){
        if (/outgoing.prod.mozaws.net/i.test(link.href)){
            var tmp = link.href;
            link.href = "#";
            // we have to fight mozilla's replacing of direct redirect string with jquery events
            setTimeout(function(){
                tmp = decodeURIComponent(tmp.replace(/(http|https):\/\/outgoing.prod.mozaws.net\/v1\/[0-9a-zA-Z]+\//i,''));
                link.href = tmp.replace(/(\?|&)utm_content=.*/i,'');
            }, 100);
        }
    }
    // daniueldefo
    function rwDanielDefo(link){
        if (link.hasAttribute('data-proxy-href'))
            link.removeAttribute('data-proxy-href');
    }
    // slack
    function rwSlack(link){
        link.removeAttribute('onclick');
        link.removeAttribute('onmouseover');
    }
    // USBDev
    function rwUSBDev(link){
        anchor = '?url=';
        rwSimple(link);
    }

    // determine anchors, functions and listeners
    (function ()
    {
        rwLink = rwSimple;
        rwAll = rwaSimple;

        var loc = window.location.hostname;
        if (/google/i.test(loc))
            rwLink = rwGoogle;
        else if (/youtube/i.test(loc)){
            after = '&event=';
            rwLink = rwYoutube;
        }
        else if (/(facebook|messenger)/i.test(loc)){
            anchor = 'u=';
            after = '&h=';
            rwLink = rwFacebook;
        }
        else if (/instagram/i.test(loc)){
            anchor = 'u=';
            after = '&e=';
        }
        else if (/twitter/i.test(loc)){
            rwLink = rwTwitter;
            rwAll = rwaTwitter;
        }
        else if (/yandex/i.test(loc))
            rwLink = rwYandex;
        else if (/vk/i.test(loc)){
            anchor = 'to=';
            rwLink = rwVK;
        }
        else if (/ok/i.test(loc)){
            anchor = 'st.link=';
            after = '&st.name=';
        }
        else if (/tumblr/i.test(loc)){
            anchor = 'redirect?z=';
            after = '&t=';
        }
        else if (/disq/i.test(loc)){
            anchor = '?url=';
            after = '&cuid=';
        }
        else if (/deviantart/i.test(loc))
            anchor = 'outgoing?';
        else if (/(pixiv|reactor|steam)/i.test(loc))
            anchor = 'url=';
        else if (/(kat|kickass)/i.test(loc)){
            anchor = 'confirm/url/';
            rwLink = rwKickass;
        }
        else if (/soundcloud/i.test(loc))
            anchor = 'exit.sc/?url=';
        else if (/upwork/i.test(loc))
            anchor = 'leaving-odesk?ref=';
        else if (/4pda/i.test(loc)){
            anchor = 'go/?u=';
            after = '&e=';
        }
        else if (/mozilla/i.test(loc))
            rwLink = rwAMO;
        else if (/danieldefo/i.test(loc))
            rwLink = rwDanielDefo;
        else if (/yaplakal/i.test(loc))
            anchor = 'go/?';
        else if (/wikimapia.org/i.test(loc))
            anchor = 'external_link?url=';
        else if (/forumavia.ru/i.test(loc))
            anchor = '/e/?l=';
        else if (/picarto/i.test(loc)){
            anchor = 'referrer?go=';
            after = '&ref=';
        }
        else if (/taker/i.test(loc))
            anchor = 'phpBB2/goto/';
        else if (/slack/i.test(loc))
            rwLink = rwSlack;
        else if (/usbdev/i.test(loc))
            rwLink = B64Dec(rwUSBDev);

        document.addEventListener('DOMNodeInserted', function(event){
            if (!event || !event.target || !(event.target instanceof HTMLElement))
                return;
            var node = event.target;
            if (node instanceof HTMLAnchorElement)
                rwLink(node);
            var links = node.getElementsByTagName('a');
            for (var i = 0; i < links.length; ++i)
                rwLink(links[i]);
        }, false);
    })();
    rwAll();
})();