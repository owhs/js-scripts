// Output modifications of the window object to console
//javascript:((b,a)=>{var c=[],d=a.createElement("iframe");d.style.display="none",a.body.append(d),c=Object.keys(d.contentWindow),d.remove(),console.log(Object.keys(b).filter(b=>!c.includes(b)).reduce((d,c)=>({...d,[c]:b[c]}),{}))})(window,document);


((b, a) => {
    var c = [],
        d = a.createElement("iframe");
    d.style.display = "none", a.body.append(d), c = Object.keys(d.contentWindow), d.remove(), console.log(Object.keys(b).filter(b => !c.includes(b)).reduce((d, c) => ({
        ...d,
        [c]: b[c]
    }), {}))
})(window, document);
