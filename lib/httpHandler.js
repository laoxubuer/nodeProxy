var express = require('express'),
    http = require('http'),
    request = require('request');


function Proxy(){};

// 请求代理
Proxy.httpHanlder = function httpHanlder(req, res, api){
    var proxyApi = 'http://127.0.0.1:4000' + api;

    var options = {
        headers: [
            {
              name: 'content-type',
              value: 'application/x-www-form-urlencoded'
            }
        ],
        method: req.method,
        url: proxyApi,
        qs: req.query,
        form: req.body,
        json: true
    };

    function callBack(error, result, body){
        if(options.method == 'GET'){
            var path = req.path.substring(1);

            res.render(path, body);
        }else{
            res.json(body);
        }
    }
    request(options, callBack)
}

module.exports = Proxy;

