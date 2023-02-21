// intercepts xhr responses when moving around map, adds unique items to data array
// export using json.stringify(data)

var data = [];
(function(xhr) 
{
    var XHR = XMLHttpRequest.prototype;
    var send = XHR.send;
    XHR.send = function(postData) 
    {
        var oldFunc = this.onloadend;
        this.onloadend = function(e){
            JSON.parse(e.target.responseText).data.forEach(d=>{if(data.filter(z=>z.id===d.id).length===0) data.push(d)});
            oldFunc.apply(this, arguments)
        };
        return send.apply(this, arguments);
    };
})(XMLHttpRequest);
