// ==UserScript==
// @name         WCO UX+
// @namespace    WCO UX+
// @version      0.1.2
// @description  Make "Watch Cartoons Online" a nicer experience, especially when actually watching shows.
// @author       owhs
// @match        https://www.wcostream.net/*
// @match        https://www.wcostream.org/*
// @match        https://embed.watchanimesub.net/inc/embed/video-js.php?file=*
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wcostream.net
// @run-at       document-start
// ==/UserScript==

var load = (async function() {
    'use strict';
    async function WFE(a,z=100,b=10000){for(const c=Date.now();Date.now()-c<b;){const b=document.querySelector(a);if(b)return b;await new Promise(a=>setTimeout(a,z))}return null}


    if (location.hostname.toLowerCase().includes("wco")){

        var searchList = [], list, isViewingList;
        window.cache = [];

        //fetch("https://www.wcostream.org/dubbed-anime-list").then(async r=>console.log(await r.text()))
        setTimeout(()=>["dubbed-anime","cartoon","subbed-anime","movie","ova"].forEach(s=>{
            fetch("https://www.wcostream.org/"+s+"-list").then(async r=>{
                //console.log(r);
                cache.push({
                    "url":r.url,
                    "data":[...((new DOMParser()).parseFromString(await r.text(), "text/html")).querySelectorAll("#ddmcc_container #ddmcc_container li>a,#content>table li>a[title].sonra")]
                });
            });
            //[...((new DOMParser()).parseFromString(await x.text(), "text/html")).querySelectorAll("#ddmcc_container #ddmcc_container li>a,#content>table li>a[title].sonra")];
                   // cache.push({"url":e.target.href,"data":searchList});
        }),1000);
        async function aclick(e){
            e.preventDefault();
            var pg = await (await fetch(e.target.href)).text(),
                vdom = (new DOMParser).parseFromString(pg,"text/html");

            history.pushState("","",e.target.href);
            if (document.querySelector("iframe"))
            {
                document.querySelector("title").innerHTML = vdom.querySelector("title").innerHTML.split("|")[0];
                document.querySelector("iframe").src = vdom.querySelector("iframe").src;
                document.querySelector("#nav table tr").innerHTML = vdom.querySelector("iframe").closest("table").nextElementSibling.querySelector("tr:last-child").innerHTML;
                [...document.querySelectorAll("#nav table a")].forEach(a=>(a.href=a.href+"?watch"));
                asynclinks();
            } else {
                document.head.innerHTML = vdom.head.innerHTML;
                document.body.innerHTML = vdom.body.innerHTML;
                load();
            }

            //
        }
        function asynclinks(){
            [...document.querySelectorAll("a[href*='?watch']")].forEach(a=>{
                a.onclick=aclick;
            });
        }
        async function popup(e,special){

            isViewingList = e.target.href.includes("list")&&(!e.target.href.includes("movie-")&&!e.target.href.includes("ova-"));

            var cached = cache.filter(c=>c.url===e.target.href)[0];

            if (cached!==undefined){
                searchList = cached.data;
                //console.log(searchList);
                setTimeout(()=>search(),50);
            }
            else {
                fetch(e.target.href).then(async x=>{
                    searchList = [...((new DOMParser()).parseFromString(await x.text(), "text/html")).querySelectorAll("#ddmcc_container #ddmcc_container li>a,#content>table li>a[title].sonra")];
                    cache.push({"url":e.target.href,"data":searchList});
                    search();
                });
            }


            var div = document.createElement("div");
            div.id = "search";

            var box = document.createElement("div");
            box.classList.add("popup");
            box.dataset.title = e.target.dataset.title||e.target.innerText;

            var ebb = document.querySelector("#search .bb");

            var backb = document.createElement("a");
            backb.classList.add("bb");
            backb.innerText = "<";

            if (special) {
                backb.href = e.target.href;
                backb.dataset.title = e.target.innerText
            }
            else {
                backb.href = ebb ? (ebb.href||"javascript:void(0)") : "javascript:void(0)";
                backb.dataset.title = ebb ? (ebb.dataset.title||"") : "";
            }

            backb.addEventListener("click",e=>{
                e.preventDefault();
                if (e.target.href && !e.target.href.includes("javascript")){
                    popup(e);
                    div.remove();
                }
            });


            var exitb = document.createElement("a");
            exitb.classList.add("xb");
            exitb.innerText = "x";
            exitb.addEventListener("click",e=>{
                e.preventDefault();
                div.remove();
            });

            var inp = document.createElement("input");
            inp.setAttribute("placeholder","search");
            inp.addEventListener("keyup",search);
            div.addEventListener("click",()=>inp.focus());

            list = document.createElement("div");
            list.classList.add("list");

            box.append(backb);
            box.append(exitb);

            box.append(inp);
            box.append(list);

            div.append(box);
            document.querySelector("#content").before(div);

            inp.focus();

        }

        function upS(iF){
            iF.width = "100%";
            iF.height = window.innerHeight +"px";
        }
        function initNav(){
            [...document.querySelectorAll("#nav>span:nth-child(11)~span")].forEach(x=>x.remove());


            [...document.querySelectorAll("#nav span>a")].forEach(x=>{
                if (x.innerText==="Home") return;
                x.addEventListener("click",e=>{
                    e.preventDefault();
                    popup(e,1);

                });
            });
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

            var title = list.closest(".popup").dataset.title,
                alist = list.querySelectorAll(".list a");

            alist.forEach(a=>{
                if (!isViewingList) a.href=a.href+"?watch";
                a.removeAttribute("class");

                //console.log(title);
                //console.log();
                if (alist.length>1 && title && !["Cartoons","Dubbed Anime","Subbed Anime","Movies","Ova"].includes(title)) a.innerText = a.innerText.replace(title,"").trim();

                a.addEventListener("click",e=>{
                    e.preventDefault();
                    if (!isViewingList){
                        a.onclick=aclick;
                        e.target.closest("#search").remove();
                        return;
                    }
                    popup(e);
                    e.target.closest("#search").remove();
                });
            });
            asynclinks();

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
.topb,#content>iframe~*,#footer,.alert,table[style*=rightreleated],#content>style~div,body>#wrap~*{display:none}\
body>#wrap,body>#wrap>#content{background:#000;width:100%;display:flex;flex-direction:column}\
#content{background:#000!important}\
#content>iframe{width:100%!important}\
table.browse{background:#000;border-top:.5px solid #808080;position:fixed;text-align:center;border-spacing:0;top:52px;opacity:0;transition:opacity .3s}\
.browse,.browse *{display:flex;width:100%}\
.browse a{text-align:center;color:#fff;opacity:.3;background:#000;transition:opacity .3s;width:100%;display:block;padding:10px;font-weight:400;text-decoration:none;font-size:12px!important;text-wrap:nowrap;overflow:hidden;text-overflow:ellipsis;}\
#nav{margin:0 auto!important;display:flex;width:100%;flex-flow:nowrap;padding:0;position:fixed;line-height:30px;background:#000;opacity:0;transition:opacity .3s;z-index:9;}\
#nav span:nth-child(odd){display:flex;width:100%;text-align:center;overflow:hidden;text-overflow:hidden}\
#nav span:nth-child(even){padding:10px 0}\
#nav span a{width:100%;padding:10px 0;text-decoration:none;opacity:.3;transition:opacity .3s;font-weight:400;font-size:12px!important}\
#nav:hover,#nav span a:hover,#nav:hover .browse,.browse a:hover,#nav.fixed,#nav.fixed .browse,body.act #nav,body.act #nav .browse{opacity:.9}\
#search{display:flex;position:fixed;z-index:2;inset:0}\
#search~#content{pointer-events:none;filter:blur(3px) saturate(0)}\
#search>.popup{display:flex;margin:auto;width:80%;height:80%;background:#000d;border:.5px solid gray;border-radius:5px;flex-direction:column;position:relative;overflow:hidden}\
#search>.popup:before{content:\"search '\" attr(data-title) \"'\";text-align:center;text-transform:uppercase;padding:15px;background:#000;color:#b2b2b2;border-bottom:.5px solid #fff3}\
#search input{border:0;padding:12px 20px;margin:5px;border-radius:5px;outline:0;background-color:#222526;color:#f5f3f0}\
#search .list{display:flex;flex-wrap:wrap;flex-direction:row;overflow:overlay;text-align:center}\
#search .list a{padding:8px;color:#bbb;font-weight:400;text-decoration:none;flex: 40%;text-overflow:ellipsis;overflow:hidden;text-wrap:nowrap}\
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
.manset{width:100%;margin:0}\
#search>.popup a.bb,#search>.popup a.xb{display:block;width:45px;height:45px;position:absolute;background:#090909;text-align:center;line-height:45px;color:#aaa;text-decoration:none;cursor:pointer;transition: color .2s, background .2s}\
#search>.popup a.bb:hover,#search>.popup a.xb:hover{color:#fff;background:#111}\
#search>.popup a.xb{right:0}";

        var styleEl = document.createElement("style");
        styleEl.innerHTML=style;
        await WFE("body");
        document.head.append(styleEl);


        if (location.pathname!=="/")
        {
            await WFE("iframe");
            //setTimeout(()=>,333);
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

            window.addEventListener("keypress",e=>{
                upS(iF);
            });
            window.addEventListener("keydown",e=>{
                upS(iF);
            });
            window.addEventListener("click",e=>{
                upS(iF);
            });
            window.addEventListener("resize",e=>{
                upS(iF);
            });

            document.querySelector("#content").prepend(iF);
            iF.before(document.querySelector("#nav"));
            document.querySelector("#nav").append(brow);

            initNav();

            document.body.classList.add("ready");
        } else
        {

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
        window.addEventListener("message", (event) => {

            //console.log(event);
            if (typeof event.data==="string"){
                var raw = event.data.split(":"),
                    cmd = raw[0].toLowerCase(), arg = raw[1];
                if (cmd==="goto"){
                    if (arg==="nextVideo"){
                        var nxtBtn = document.querySelector(".browse td:first-child~td:last-child>a");
                        if (nxtBtn) nxtBtn.click();
                    }
                }
            }

        });

        asynclinks();

        var fav = document.createElement("link");
        fav.rel="icon";
        fav.type="image/x-icon";
        fav.href="/favicon.ico?";
        document.head.append(fav);

    }
    else if(location.hostname.toLowerCase().includes("watchanimesub")){
        const isAdBlockActive=false;
        window.onload = e=>{e.stopPropagation();e.preventDefault()};

        document.addEventListener("DOMContentLoaded", ()=>{

            //document.getRootNode().children[0].innerHTML=document.getRootNode().children[0].innerHTML;

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


            (async ()=>{
                var v = await WFE(".video-js video");
                v.ontimeupdate=e=>{
                    var d = (v.duration||999) - (v.currentTime||0);
                    if (d<50) {
                        window.top.postMessage("goto:nextVideo","*");
                        v.ontimeupdate=null;
                    }
                };

                //vjs-big-play-button


                var style = ".video-js{max-height:100%!important;height:"+window.innerHeight +"px!important}.vjs-fullscreen-control{display:none!important}body:not(.act),body:not(.act) .video-js{cursor:pointer}";

                document.querySelector("#b-report").closest("p").remove()

                var styleEl = document.createElement("style");
                styleEl.innerHTML=style;
                document.head.append(styleEl);

                document.body.click();

                var pb = await WFE("button.vjs-big-play-button");
                pb.click();

            })();


        });
    }

});
load();
