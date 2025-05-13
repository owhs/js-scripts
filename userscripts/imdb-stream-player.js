// ==UserScript==
// @name         IMDB Stream Player
// @namespace    IMDB Stream Player
// @version      0.11
// @description  IMDB Stream Player - Play online streams straight from IMDB page
// @author       owhs
// @match        https://www.imdb.com/title/*
// @match        https://*.vidsrc.me/*
// @icon         https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png
// @require      https://unpkg.com/fflate
// @grant        GM_xmlhttpRequest
// @connect      imdb.com
// @connect      vidsrc.me
// @run-at       document-start
// ==/UserScript==


var tool = {
    enflate: s=>fflate.strFromU8(fflate.decompressSync(fflate.strToU8(atob(s), true))),
    deflate: s=>btoa(fflate.strFromU8(fflate.compressSync(fflate.strToU8(s)), true)),
    wfe: (e,f,t)=>{var m=document.querySelector(e);if (m!==null) f(m); else setTimeout(()=>tool.wfe(e,f,t),(t||20))},
    el: (type,html,attr)=>{var el=document.createElement(type);if (html) el.innerHTML=html;if (attr) Object.keys(attr).forEach(a=>el.setAttribute(a,attr[a]));return el}
};

(function() {
    'use strict';

    //console.log(location.href);

    if (/^https.{0,7}imdb.com$/.test(location.origin)) imdb();
    /*else if (/vidsrc.me$/i.test(location.hostname)){
        window.addEventListener("load",()=>{
            var btn = document.querySelector("#pl_but");
            if (btn!==null){
                btn.click();
                tool.wfe("#player_parent",v=>{
                    console.log(v);
                });
            }
        });
    }*/
    /*else if (/^https.{0,11}vidsrc.me.*$/.test(location.href)) {
        window.addEventListener("load",()=>{
            var obj = {
                id: "ezstream",
                err: document.body.innerText==='404 Not Found!',
                ep: location.pathname.split("/").filter(m=>/\d{1,4}\-\d{1,4}/.test(m))[0] || ""
            };
            window.top.postMessage(obj, '*')
        });
    }*/
})();


function imdb(){
     if (location.search==="?original") return;
    /*window.onmessage = function(e) {
        var msg = e.data;
        if (msg.id==="ezstream"){
            if (msg.ep) history.pushState("","","?ep="+msg.ep);
        }
    };*/

    var conf = {
        style: "H4sIAFeLmGQAA61U32/aMBD+VzpNE2XDFKiYWkft457Wt71VDDnxJTk1sS3bhHYR+9t3NgECZVWl7QHJXO6++/HdfZhbUcPYeQui/hbebS2eWQlYlJ5PEt2AzSu95iVKCSpZo/Qln04mn5JUWwmWTzavMcYi89gcQVHIZGKeN+KxtJB/vhsYq8dYy3SwGI2VaFJhl8vwn+yjvVOFzl+thc9KcttbrywU9MEKj1pdBQA0GfPoK1guQ2qt3Ehi8yiFF8yD8wzl3cCGQpgVWLFMKw/Ks7TS2RMB5Fp7sCMHMfgQF8IetIXv+AQ/SnSDxe/OZ3TsVILVBO1RFSy2snJgOwPhvweYCr7YgceGjCiAwLKnwuqVkvcHY+fGc7TUm86ZfzFwTwCdJSuxku9O2nfoZmm0o3mwTFi5n+g2f+oVY/mqqlhcha17ZChwxSym6b/Ur3y5rf7yenhimEXDF/q1Ep2pxAtXWsEHrI22Xii/OSQoLFLh6KFmzBmh2KwNJuK9WtWKB9PF9dnI/11ve7iYXpZ3ERhbNULKsFReG94Ie8kYGh9BHoQtUI2mFurh+QYo/hRzt2GPGVRLKq0AvyTWaZL+8q1FGZ6n9I0Mr5s9zbEYRtPYQka3WL2wBmENkgXa3PCI5E2nLi0tJkYwkTri0kMSr5pPb0hckjCkaXh0onPzld4VKtipUDR0jMzDO1tZpy03GkkQbEKaoroEhy4vxjOXeHj2TFRYKB6qJd+DA/+Yz7P59KaTRDp7iSvH5wFfVwT/kbQvyUlzmMNfwK+Jsl1HvAwS2/bBUri9nc56/pO9s8gpc9upFx+E+QyS/qC2UbQoSGvNXS3oUDNh3HG6DmcXiCrOKIrhaZmuKWjocToMGsrqtoSI9nh0vWPqc/zzjDSaweJvF/wH5jKZK48GAAA=",
        id: location.pathname.slice(0,-1).split("/").slice(-1)[0],
        ifr: null
    };

    var extra_style='.navbar__user{display:none}';
    document.head.appendChild(tool.el("style",tool.enflate(conf.style)+extra_style));

    var watchBtn = tool.el("span","&#9658;",{class:"stream",title:"Watch Now"});
    watchBtn.onclick=e=>{
        e.preventDefault();
        conf.ifr.classList.add("active");
        window.scrollTo(0,document.querySelector("iframe").offsetTop);
    };

    var loadFrame = m=>{
        conf.ifr = tool.el("iframe","",{class:"streamFrame",allowfullscreen:"true"});
        conf.ifr.height=window.innerHeight;
        conf.ifr.src = "https://vidsrc.me/embed/"+conf.id+"/color-f5c518";
        document.querySelector("main").before(conf.ifr);
    };

    window.addEventListener("load",()=>{
        loadFrame();
        document.querySelector("h1[data-testid='hero__pageTitle'] span").after(watchBtn);
    });

    window.addEventListener("resize",()=>{
        conf.ifr.height=window.innerHeight;
    });
}
