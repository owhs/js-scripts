// ==UserScript==
// @name         WCO UX+
// @namespace    WCO UX+
// @version      0.1
// @description  Make "Watch Cartoons Online" a nicer experience, especially when actually watching shows.
// @author       owhs
// @match        https://www.wcostream.net/*
// @match        https://www.wcostream.org/*
// @match        https://embed.watchanimesub.net/inc/embed/video-js.php?file=*
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wcostream.net
// @run-at       document-start
// ==/UserScript==

(async function() {
    'use strict';
    async function WFE(a,z=100,b=10000){for(const c=Date.now();Date.now()-c<b;){const b=document.querySelector(a);if(b)return b;await new Promise(a=>setTimeout(a,z))}return null}

    if (location.hostname.toLowerCase().includes("wcostream")){

        var searchList = [], list, isViewingList;

        function initNav(){
            [...document.querySelectorAll("#nav>span:first-child,#nav>span:first-child+span,#nav>span:nth-child(11)~span")].forEach(x=>x.remove());


            [...document.querySelectorAll("#nav span>a")].forEach(x=>{
                x.addEventListener("click",e=>{
                    e.preventDefault();
                    popup(e);

                });
            });
        }
        function popup(e){

            isViewingList = e.target.href.includes("list")&&(!e.target.href.includes("movie-")&&!e.target.href.includes("ova-"));

            fetch(e.target.href).then(async x=>{
                searchList = [...((new DOMParser()).parseFromString(await x.text(), "text/html")).querySelectorAll("#ddmcc_container #ddmcc_container li>a,#content>table li>a[title].sonra")];
                search();
            });


            var div = document.createElement("div");
            div.id = "search";

            var box = document.createElement("div");
            box.classList.add("popup");

            box.dataset.title = e.target.innerText;

            var inp = document.createElement("input");
            inp.setAttribute("placeholder","search");
            inp.addEventListener("keyup",search);
            div.addEventListener("click",()=>inp.focus());

            list = document.createElement("div");
            list.classList.add("list");

            box.append(inp);
            box.append(list);

            div.append(box);
            document.querySelector("#content").before(div);

            inp.focus();

        }
        function search(e){
            if (e && e.keyCode && e.keyCode===27) e.target.closest("#search").remove();

            list.innerHTML="";
            var ser = (e ? e.target.value.toLowerCase() : "");

            if (ser.length<1) {
                searchList.forEach(s=>{
                    list.append(s);
                });
            } else {
                searchList.forEach(s=>{
                    if(s.innerText.toLowerCase().includes(ser)){
                        list.append(s);
                    }
                });
            }
            list.querySelectorAll(".list a").forEach(a=>{
                if (!isViewingList) a.href=a.href+"?watch";

                a.onclick=e=>{
                    if (!isViewingList) return;
                    e.preventDefault();
                    popup(e);
                    e.target.closest("#search").remove();
                };
            });

        }

        if (location.pathname.slice(1,6)==="anime"){
            await WFE("#footer");
            [...document.querySelectorAll("#catlist-listview a")].forEach(a=>a.href=a.href+"?watch");
        }
        else if (!location.search.toLowerCase().includes("watch") && location.pathname!=="/") return;

        var style = "\
html{background:#222}\
body{background:#222;overflow:hidden}\
body:not(.ready) #wrap{opacity:0;pointer-events:none;max-height:0;height:0;font-size:0!important}\
body.ready{overflow:auto}\
.topb,#content>iframe~*,#footer,.alert,table[style*=rightreleated],#content>style~div{display:none}\
body>#wrap,body>#wrap>#content{background:#222;width:100%;display:flex;flex-direction:column}\
#content>iframe{width:100%!important}\
table.browse{background:#000;border-top:.5px solid #808080;position:fixed;text-align:center;border-spacing:0;top:52px;opacity:0;transition:opacity .3s}\
.browse,.browse *{display:flex;width:100%}\
.browse a{text-align:center;color:#fff;opacity:.3;background:#000;transition:opacity .3s;width:100%;display:block;padding:10px;font-weight:400;text-decoration:none;font-size:12px!important;text-wrap:nowrap;overflow:hidden;text-overflow:ellipsis;}\
#nav{margin:0 auto!important;display:flex;width:100%;flex-flow:nowrap;padding:0;position:fixed;line-height:30px;background:#000;opacity:0;transition:opacity .3s}\
#nav span:nth-child(odd){display:flex;width:100%;text-align:center}\
#nav span:nth-child(even){padding:10px 0}\
#nav span a{width:100%;padding:10px 0;text-decoration:none;opacity:.3;transition:opacity .3s;font-weight:400;font-size:12px!important}\
#nav:hover,#nav span a:hover,#nav:hover .browse,.browse a:hover,#nav.fixed,#nav.fixed .browse,body.act #nav,body.act #nav .browse{opacity:.9}\
#search{display:flex;position:fixed;z-index:2;inset:0}\
#search~#content{pointer-events:none;filter:blur(3px) saturate(0)}\
#search>.popup{display:flex;margin:auto;width:600px;height:400px;background:#000d;border:.5px solid gray;border-radius:5px;flex-direction:column}\
#search>.popup:before{content:\"search '\" attr(data-title) \"'\";text-align:center;text-transform:uppercase;padding:15px;background:#000;color:#b2b2b2;border-bottom:.5px solid #fff3}\
#search input{border:0;padding:12px 20px;margin:5px;border-radius:5px;outline:0;background-color:#222526;color:#f5f3f0}\
#search .list{display:flex;flex-direction:column;overflow:overlay;text-align:center}\
#search .list a{padding:8px;color:#bbb;font-weight:400;text-decoration:none}\
#search .list a:hover{color:#eee;background:#0007}\
.homepg table[width]{width:100%}\
.homepg td{width:100%;background:none!important}\
table.homepg{margin-top:52px;width:98%;border-spacing:0;border-collapse:collapse}\
.shadetabs li{background:none;border:none;width:100%;display:block;text-align:center}\
.shadetabs li a{color:#fff!important;font-weight:400}\
.shadetabs{display:flex;background:#0008;padding:10px;margin:0;padding-inline-start:0}\
.mansetlisteleme li{background:none;height:auto}\
.mansetlisteleme li a{text-shadow:none;text-align:center;width:100%;font-size:14px;padding:20px 0;display:block;color:#ccc;margin:0}\
.mansetlisteleme li a:hover{font-size:14px;color:#fff;padding:20px 0}\
.manset{width:100%;margin:0}";

        var styleEl = document.createElement("style");
        styleEl.innerHTML=style;
        await WFE("body");
        document.head.append(styleEl);


        if (location.pathname!=="/")
        {
            await WFE("iframe");
            window.stop();


            document.querySelector("img[src*=premiumad4]").closest("td").remove();
            document.querySelector(".alert").remove();

            var iF = document.querySelector("iframe");
            var t = iF.closest("table");
            var brow = t.nextElementSibling;
            brow.classList.add("browse");
            brow.querySelector("tr").remove();
            [...brow.querySelectorAll("a")].forEach(a=>a.href=a.href+"?watch");

            iF.width = "100%";
            iF.height = window.innerHeight +"px";



            function upS(){
                iF.height = window.innerHeight +"px";
            }

            var timeout;
            window.addEventListener("mousemove",e=>{
                clearTimeout(timeout);
                document.body.classList.add("act");
                setTimeout(()=>document.body.classList.remove("act"),3000);
            });

            window.addEventListener("keypress",e=>{
                upS();
            });
            window.addEventListener("keydown",e=>{
                upS();
            });
            window.addEventListener("click",e=>{
                upS();
            });
            window.addEventListener("resize",e=>{
                upS();
            });

            document.querySelector("#content").prepend(iF);
            iF.before(document.querySelector("#nav"));
            document.querySelector("#nav").append(brow);

            initNav();

            document.body.classList.add("ready");
        } else {

            await WFE("#nav");

            var nav = document.querySelector("#nav");
            nav.classList.add("fixed");
            document.querySelector("#content").prepend(nav);
            initNav();

            var tab = document.querySelector("#content>#nav~table");
            tab.classList.add("homepg");


            [...document.querySelectorAll(".mansetlisteleme li a")].forEach(a=>a.href=a.href+"?watch");

            setTimeout(()=>document.body.classList.add("ready"),1000);
        }

    }
    else if(location.hostname.toLowerCase().includes("watchanimesub")){
        const isAdBlockActive=false;
        window.onload = e=>{e.stopPropagation();e.preventDefault()};

        document.addEventListener("DOMContentLoaded", ()=>{
            window.onload = e=>{e.stopPropagation();e.preventDefault()};

            window.addEventListener("keydown",e=>{
                document.querySelector(".video-js").setAttribute("style","height:"+window.innerHeight +"px!important");
            });
            window.addEventListener("click",e=>{
                document.querySelector(".video-js").setAttribute("style","height:"+window.innerHeight +"px!important");
            });
            window.addEventListener("resize",e=>{
                document.querySelector(".video-js").setAttribute("style","height:"+window.innerHeight +"px!important");
            });

            var timeout;

            window.addEventListener("mousemove",e=>{
                clearTimeout(timeout);
                document.body.classList.add("act");
                setTimeout(()=>{document.body.classList.remove("act")},3000);
            });

            var style = ".video-js{max-height:100%!important;height:"+window.innerHeight +"px!important}.vjs-fullscreen-control{display:none!important}body:not(.act),body:not(.act) .video-js{cursor:none}";

            document.querySelector("#b-report").closest("p").remove()

            var styleEl = document.createElement("style");
            styleEl.innerHTML=style;
            document.head.append(styleEl);

            document.body.click();

            window.vp.autoplay(true);
            window.vp.play();

            clearInterval(window.zamanlama);
            for (var i=50;i<5000;i=i+50){
                setTimeout(()=>{
                    document.querySelector(".video-js").setAttribute("style","height:"+window.innerHeight +"px!important");
                    document.querySelector("video").play();
                    window.vp.play();
                    clearInterval(window.zamanlama);
                },i);
            }
        });
    }

})();
