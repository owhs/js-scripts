// scrape make and model list from autotrader homepage
//javascript:async function getModels(a){return await fetch("https://www.autotrader.co.uk/at-graphql",{headers:{accept:"*/*","content-type":"application/json"},referrerPolicy:"origin",body:"[{\"operationName\":\"SearchFormFacetsQuery\",\"variables\":{\"advertQuery\":{\"advertisingLocations\":[\"at_cars\"],\"advertClassification\":[\"standard\"],\"make\":[\""+a+"\"]},\"facets\":[\"model\"]},\"query\":\"query SearchFormFacetsQuery($advertQuery: AdvertQuery!, $facets: [SearchFacetName]) {\\n  search {\\n    adverts(advertQuery: $advertQuery) {\\n      advertList {\\n        totalElements\\n        __typename\\n      }\\n      facets(facets: $facets) {\\n        name\\n        values {\\n          name\\n          value\\n          count\\n          selected\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}]",method:"POST"}).then(a=>a.text()).then(a=>JSON.parse(a)[0].data.search.adverts.facets[0].values.map(a=>a.name))}async function getAllCars(){function a(b){e.after("\n"),e.after(b)}function c(a){return new Promise(b=>setTimeout(b,a))}function d(e,a,b){var d=document.createElement(e);return void 0!==a&&("string"==typeof a&&(d.innerHTML=a),void 0!==a.dir&&d.append(a)),void 0!==b&&b.split(" ").forEach(b=>d.classList.add(b)),d}var e=d("div","Log","title");document.head.append(d("style",".POPMSG{position:fixed;background:#fff;width:80%;left:10%;top:10%;height:80%;z-index:9999999;border:1px solid #000;display:flex;flex-direction:column;text-align:center;font-size:11px;white-space:pre}.POPMSG>.title{padding:10px 0;background:#bbc3ff;margin-bottom:10px;font-size:16px}.POPMSG~*{pointer-events:none;opacity:.2}.POPMSG button{padding:5px;width:50%;margin:0 auto 5px}body{overflow:hidden}")),document.body.prepend(d("div",e,"POPMSG")),a("Initalising Make & Model rip:"),a("Finding makes...");var f=[...document.querySelectorAll("select#make>[label^=All]>option")].map(a=>a.value).reduce((a,b)=>({...a,[b]:[]}),{}),g=Object.keys(f);a("Found "+g.length+" makes.\n"),a("Starting model rip...");for(var h=0;h<g.length;h++)f[g[h]]=await getModels(g[h]),await c(500),a("Found models ("+(h+1)+"/"+g.length+")");var j=d("button","Show Export");j.onclick=()=>{var a=window.open("","","width=800,height=600");a.document.write(JSON.stringify(f))},a(j)}getAllCars();


async function getModels(a) {
    return await fetch("https://www.autotrader.co.uk/at-graphql", {
        headers: {
            accept: "*/*",
            "content-type": "application/json"
        },
        referrerPolicy: "origin",
        body: "[{\"operationName\":\"SearchFormFacetsQuery\",\"variables\":{\"advertQuery\":{\"advertisingLocations\":[\"at_cars\"],\"advertClassification\":[\"standard\"],\"make\":[\"" + a + "\"]},\"facets\":[\"model\"]},\"query\":\"query SearchFormFacetsQuery($advertQuery: AdvertQuery!, $facets: [SearchFacetName]) {\\n  search {\\n    adverts(advertQuery: $advertQuery) {\\n      advertList {\\n        totalElements\\n        __typename\\n      }\\n      facets(facets: $facets) {\\n        name\\n        values {\\n          name\\n          value\\n          count\\n          selected\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}]",
        method: "POST"
    }).then(a => a.text()).then(a => JSON.parse(a)[0].data.search.adverts.facets[0].values.map(a => a.name))
}
async function getAllCars() {
    function a(b) {
        e.after("\n"), e.after(b)
    }

    function c(a) {
        return new Promise(b => setTimeout(b, a))
    }

    function d(e, a, b) {
        var d = document.createElement(e);
        return void 0 !== a && ("string" == typeof a && (d.innerHTML = a), void 0 !== a.dir && d.append(a)), void 0 !== b && b.split(" ").forEach(b => d.classList.add(b)), d
    }
    var e = d("div", "Log", "title");
    document.head.append(d("style", ".POPMSG{position:fixed;background:#fff;width:80%;left:10%;top:10%;height:80%;z-index:9999999;border:1px solid #000;display:flex;flex-direction:column;text-align:center;font-size:11px;white-space:pre}.POPMSG>.title{padding:10px 0;background:#bbc3ff;margin-bottom:10px;font-size:16px}.POPMSG~*{pointer-events:none;opacity:.2}.POPMSG button{padding:5px;width:50%;margin:0 auto 5px}body{overflow:hidden}")), document.body.prepend(d("div", e, "POPMSG")), a("Initalising Make & Model rip:"), a("Finding makes...");
    var f = [...document.querySelectorAll("select#make>[label^=All]>option")].map(a => a.value).reduce((a, b) => ({
            ...a,
            [b]: []
        }), {}),
        g = Object.keys(f);
    a("Found " + g.length + " makes.\n"), a("Starting model rip...");
    for (var h = 0; h < g.length; h++) f[g[h]] = await getModels(g[h]), await c(500), a("Found models (" + (h + 1) + "/" + g.length + ")");
    var j = d("button", "Show Export");
    j.onclick = () => {
        var a = window.open("", "", "width=800,height=600");
        a.document.write(JSON.stringify(f))
    }, a(j)
}
getAllCars();
