var express = require('express'),
    http = require('http'),
    proxy = require('../../lib/httpHandler'),
	router = express.Router(),
	request = require('request');

/**
 * 用户列表路由
 */
router.route('/user/userlist')
	
	// 获取用户列表
	.get(function(req, res){
		proxy.httpHanlder(req, res, '/c')
	});

/**
 * 用户删除路由
 */
router.route('/user/delete')
	
    // 删除用户
    .post(function(req, res) {
	    proxy.httpHanlder(req, res, '/c');
    });

module.exports = router;

























