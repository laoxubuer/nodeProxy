var express = require('express');

module.exports = function(app, req){

	var startMock = app.get('config')['mock']

	if(startMock){

		// 使用mock自动代理
		var mockRouter = require('../lib/mockHandler');
		app.use(mockRouter);
	}else{

		// 转发请求到服务端
		var userRouter = require('../routers/user');
		app.use(userRouter)
		var blockRouter = require('../routers/block');
		app.use(blockRouter)
	}
}
























