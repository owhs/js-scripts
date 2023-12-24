//superInspect quickly shows you details about how a target site functions, it logs:
// - window and document modifications
// - elements which have custom properties
// - a list of elements sorted by how many children they have
// - basics like localstorage, document cookies
//
// future plans - details on:
   // indexeddb, (firebase)
   // styling info about site
   // inline scripts
   // iframe, canvas, objects, video, etc. elements
   // external dependancies/links declared in document/inline stuff (not incl. xhr stuff)

(clear=>{
    var ALL = o=>[...new Set([].concat(Object.keys(o),Object.getOwnPropertyNames(o)))],
        iframe = Object.assign(document.createElement("iframe"),{style:"display:none"}),
        filter = ['0', '$_', '$0', '$1', '$2', '$3', '$4', 'location'],
        filterNative = (arr,any)=>arr.filter(x=>(!filter.includes(x) && !+x>0) && !(any[x] && any[x].toString && any[x].toString().match(/ \{ \[[a-z ]*\] \}/i)));
    
    document.body.append(iframe);
    var props = {window:ALL(window),fresh:ALL(iframe.contentWindow)},
        _temp;
    
    iframe.remove();
    if (clear) console.clear();
    
    console.log("Window Modifications:\n",Object.assign.apply({},filterNative(props.window.filter(k=>!props.fresh.includes(k)&&k!==name),window).map(x=>{return {[x]:window[x]}})),
    "\n\nDocument Modifications:\n", ALL(document).map(x=>{return {[x]:document[x]}}),
    "\n\nDOM Modifications:\n", _temp=[...document.querySelectorAll("*:not(iframe)")].map(el=>{return {el:el,modified:Object.getOwnPropertyNames(el).map(p=>{return {[p]:el[p]}})}}).filter(x=>x.modified.length>0),
    "\n\nDOM Mods - by Property:\n",[...new Set(_temp.flatMap(x=>x.modified.map(y=>Object.keys(y)[0])))].filter(x=>(!filter.includes(x) && !+x>0)).map(o=>{return {[o]:_temp.filter(x=>x.modified.filter(y=>y[o]!==undefined).length>0)}}),
    "\n\nElements sorted by child number:\n",[...document.querySelectorAll("html>body *:not(iframe)")].filter(x=>x.children.length>1).sort((a,b)=>a.children.length-b.children.length).reverse().map(x=>{return {el:x,children:x.children}}),
    "\n\nLocalStorage:\n",localStorage,
    "\n\nDocument cookies:\n",Object.assign.apply({},document.cookie.split(";").map(c=>c.trim().split("=")).map(c=>{return {[c[0]]:c[1]}})));
    
})(1)
