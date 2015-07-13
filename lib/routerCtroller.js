var express = require('express');

module.exports = function(app){
	var startMock = process.argv[2];

	if(startMock == "mock"){

		// 使用mock自动代理
		var mockRouter = require('../lib/mockHandler');
		app.use(mockRouter);
	}else{

		// 转发请求到服务端
		var userRouter = require('../routers/user');
		app.use(userRouter)
		// var blockRouter = require('../routers/block');
		// app.use(blockRouter)
	}
}
























