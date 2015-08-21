var express = require('express'),
    http = require('http'),
    proxy = require('../../lib/httpHandler'),
	router = express.Router(),
	request = require('request');

/**
 * 用户列表路由
 */
// router.get('/user/userlist', function(req, res){
// 	var apiArr = ['/c','/b'];

// 	proxy.buildReq(req, res, apiArr)
// })
router.get('/user/userlist', function(req, res){
	proxy.httpHanlder(req, res, '/c');
})

/**
 * 用户删除路由
 */
router.post('/user/delete', function(req, res){
	proxy.httpHanlder(req, res, '/c');
})

module.exports = router;

























