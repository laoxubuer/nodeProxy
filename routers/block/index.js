var express = require('express'),
    http = require('http'),
    proxy = require('../../lib/httpHandler'),
	router = express.Router();

/**
 * 博客列表路由
 */
router.route('/block/blocklist')
    
    // 获取用户列表
    .get(function(req, res){
        res.render('block/block',{
            title: '博客列表'
        })
    });

module.exports = router;

























