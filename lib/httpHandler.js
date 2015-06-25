var express = require('express'),
	request = require('request');


function Proxy(){};

// 单请求请求代理
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

// 多个get请求组装
Proxy.buildReq = function buildReq(req, res, api){
	var counter = 0,
		dataObj = {
			'data': []
		};

	var options = {
		headers: [
			{
			  name: 'content-type',
			  value: 'application/x-www-form-urlencoded'
			}
		]
	}

	for(var i = 0; i<api.length; i++){
		var proxyApi = 'http://127.0.0.1:4000' + api[i];

		options = {
			method: req.method,
			url: proxyApi,
			qs: req.query,
			json: true
		};

		function callBack(error, result, body){
			var path = req.path.substring(1);

			counter++;
			dataObj.data.push(body);

			if (counter == api.length){
				res.render(path, dataObj);
			}
		}
		request(options, callBack)
	}
}

module.exports = Proxy;

