const http = require('http');
let url= require ('url');
let queryString= require ('querystring');
let {info,error} = require('./modules/my-log');
let consts = require('./utils/const');
let firebase = require('../libs/firebase');
let {countries} = require ('countries-list');

let server = http.createServer(function (req, res) {

    let parsed = url.parse(req.url);
    console.log("parsed:", parsed)
    let pathname = parsed.pathname;
    let query = queryString.parse(parsed.query);
    console.log('Query: ', query);
    if(pathname ==='/'){
        res.writeHead(200,{'Content-type':'text/html'});
        res.write('<html><body><p>HELLO</p></body></html>');
        res.end();
    }else if (pathname ==='/exit'){
        res.writeHead(200,{'Content-type':'text/html'});
        res.write('<html><body><p>BYE</p></body></html>');
        res.end();  
    }else if (pathname ==='/country'){
        res.writeHead(200,{'Content-type':'application/json'});
        res.write(JSON.stringify(countries[query.code]));
        res.end();
    }else if (pathname ==='/info'){
        const result=log.info(pathname);
        res.writeHead(200,{'Content-type':'text/html'});
        res.write(result);
        res.end();  
    }else if (pathname ==='/error'){
        const result= error(pathname);
        res.writeHead(200,{'Content-type':'text/html'});
        res.write(result);
        res.end();  
    }
    else{
        res.writeHead(404,{'Content-type':'text/html'});
        res.write('<html><body><p>NOT FOUND</p></body></html>');
        res.end();  
    }

});

server.listen(3000);
console.log('running on server 3000')

