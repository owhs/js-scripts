//following a search on https://www.onlydomains.com/domains/bulk-registration
//will output a list to the console of available domains

console.log([...document.querySelectorAll(".ResultItem:not(.Registered)")].filter(x=>x.querySelector(".Loading[style*='none']")!==null)
    .map(x=>x.querySelector(".domainNameResponsive").innerText+x.querySelector(".tldNameResponsive").innerText).join('\n'))
