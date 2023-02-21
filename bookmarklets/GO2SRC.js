/*
Tool for getting element src urls quickly from a document

popup of list of all objects in document,
click to pop to fill, or right click and open in new tab

javascript:var D=document,o=D.querySelectorAll("video,object,canvas,iframe,audio"),d=D.createElement("dialog"),s=D.createElement("style"),C=()=>(d.remove(),s.remove()),FS=b=>{b.requestFullscreen?b.requestFullscreen():b.mozRequestFullScreen?b.mozRequestFullScreen():b.webkitRequestFullscreen?b.webkitRequestFullscreen():b.msRequestFullscreen&&b.msRequestFullscreen()};s.innerHTML="dialog.FULL{position:fixed;top:25%;bottom:25%;left:10%;right:10%;z-index:999999;width:auto;background:#000;border:1px #505050 solid;padding:10px}dialog.FULL~*{filter:saturate(0) blur(1px);opacity:.3;pointer-events:none}dialog.FULL a{color:#5f5f5f;display:block;cursor:pointer;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding:5px}dialog.FULL a:hover{color:#aaa}",D.head.appendChild(s);var a=D.createElement("a");a.innerHTML="x",a.style.textAlign="right",a.onclick=()=>{C()},d.appendChild(a),o.forEach(b=>{var c=D.createElement("a"),a=b.currentSrc||b.src;c.innerHTML+=b.nodeName+": "+a,c.title=c.href=a,c.onclick=()=>{if(event.preventDefault(),C(),D.body.firstElementChild.before(b),b.setAttribute("style","display:block;position:absolute;width:100%;height:100%;left:0;top:0"),D.querySelectorAll("body>*:first-child~*,style,script").forEach(a=>a.remove()),"VIDEO"===b.nodeName){var a=D.querySelector("video");a.controls=!0,a.onkeypress=function(b){"f"===b.key&&FS(this),"m"===b.key&&(a.muted=!a.muted)}}},d.appendChild(c)}),d.setAttribute("open","open"),d.classList.add("FULL"),D.onkeydown=function(a){"Escape"===a.key&&C()},D.body.firstElementChild.before(d);
*/

var D = document,
    o = D.querySelectorAll("video,object,canvas,iframe,audio"),
    d = D.createElement("dialog"),
    s = D.createElement("style"),
    C = () => (d.remove(), s.remove()),
    FS = b => {
        b.requestFullscreen ? b.requestFullscreen() : b.mozRequestFullScreen ? b.mozRequestFullScreen() : b.webkitRequestFullscreen ? b.webkitRequestFullscreen() : b.msRequestFullscreen && b.msRequestFullscreen()
    };
s.innerHTML = "dialog.FULL{position:fixed;top:25%;bottom:25%;left:10%;right:10%;z-index:999999;width:auto;background:#000;border:1px #505050 solid;padding:10px}dialog.FULL~*{filter:saturate(0) blur(1px);opacity:.3;pointer-events:none}dialog.FULL a{color:#5f5f5f;display:block;cursor:pointer;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding:5px}dialog.FULL a:hover{color:#aaa}", D.head.appendChild(s);
var a = D.createElement("a");
a.innerHTML = "x", a.style.textAlign = "right", a.onclick = () => {
    C()
}, d.appendChild(a), o.forEach(b => {
    var c = D.createElement("a"),
        a = b.currentSrc || b.src;
    c.innerHTML += b.nodeName + ": " + a, c.title = c.href = a, c.onclick = () => {
        if (event.preventDefault(), C(), D.body.firstElementChild.before(b), b.setAttribute("style", "display:block;position:absolute;width:100%;height:100%;left:0;top:0"), D.querySelectorAll("body>*:first-child~*,style,script").forEach(a => a.remove()), "VIDEO" === b.nodeName) {
            var a = D.querySelector("video");
            a.controls = !0, a.onkeypress = function(b) {
                "f" === b.key && FS(this), "m" === b.key && (a.muted = !a.muted)
            }
        }
    }, d.appendChild(c)
}), d.setAttribute("open", "open"), d.classList.add("FULL"), D.onkeydown = function(a) {
    "Escape" === a.key && C()
}, D.body.firstElementChild.before(d);
