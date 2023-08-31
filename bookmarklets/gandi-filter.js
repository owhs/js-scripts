/*

Tool for filtering Gandi domain searches by price


javascript:var V=prompt("Filter by max price");[...document.querySelectorAll("[class^=List-root]>li [class^=PriceText]>span")].forEach(a=>{var b=+a.innerText.split("\xA3")[1].trim().split(" ")[0].split("\xA0")[0].replace(/,/g,"");a.closest("li")[(b>+V?"set":"remove")+"Attribute"]("hidden","hidden")});
*/

var V = prompt("Filter by max price");
[...document.querySelectorAll("[class^=List-root]>li [class^=PriceText]>span")].forEach(a => {
    var b = +a.innerText.split("\xA3")[1].trim().split(" ")[0].split("\xA0")[0].replace(/,/g, "");
    a.closest("li")[(b > +V ? "set" : "remove") + "Attribute"]("hidden", "hidden")
});
