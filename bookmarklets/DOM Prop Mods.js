/*
  Basically LWM (https://github.com/owhs/js-scripts/blob/main/bookmarklets/Log-Win-Mods.js)
  But with a prompt: can enter "window", "document", "document.body"

  Lowkey one of the best forensic techniques for UI "hacking";
   Shows all custom set properties/variables - accessible via an object (window, document etc)
   Achieved by comparing against an empty iframe window
  
  + Framework agnostic
  + Automatic extension filtering

  javascript:(z=>{z=prompt("inspect what","window"),z||(z="window"),eval("((b, a) => {var c = [],d = a.createElement(\"iframe\");d.style.display = \"none\", a.body.append(d), c = Object.keys(d.contentWindow."+z+"), d.remove(), console.log(Object.keys(b).filter(b => !c.includes(b)).reduce((d, c) => ({...d,[c]: b[c]}), {}))})(window."+z+", document);")})();
*/

(z=>{z=prompt("inspect what","window"); if(!z) z="window";eval('((b, a) => {\
var c = [],\
d = a.createElement("iframe");\
d.style.display = "none", a.body.append(d), c = Object.keys(d.contentWindow.'+z+'),\
d.remove(), console.log(Object.keys(b).filter(b => !c.includes(b)).reduce((d, c) => ({\
...d,\
[c]: b[c]\
}), {}))\
})(window.'+z+', document);')})()
