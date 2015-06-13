var express = require('express'),
    _ = require('underscore'),
    path = require('path'),
    fs = require('fs'),
    async = require('async'),
    router = express.Router();

router.use(function(req, res, next) {
    if (!req.xhr) {        
        var filePath = path.join(req.app.get('config')['views'], req.path) + '.html',
            dataPath = path.join(req.app.get('config')['mockData'], req.path) + '.json';

        async.waterfall([

            // 查看html文件是否存在
            function(cb) {
                fs.exists(filePath, function(exists){
                    cb(null, exists)
                })
            },

            // html对应的数据是否存在
            function(isHtmlExists, cb) {
                if (isHtmlExists) {
                    fs.exists(dataPath, function(exists){
                        cb(null, exists)
                    })
                } else {
                    cb('The html file not exists!');
                }
            },

            // 读取数据文件
            function(isDataExists, cb) {
                if (isDataExists) {
                    fs.readFile(dataPath, 'utf-8', function(err, result) {
                        cb(null, result);
                    });
                } else {
                    cb(null, '{}');
                }
            }

            // 回掉结果
        ], function(err, result) {
            if (err) {
                next();
            } else {
                res.render(req.path.substring(1), JSON.parse(result));
            }
        });
    } else {
        var dataPath = path.join(req.app.get('config')['mockData'], req.path) + '.json';

        async.waterfall([

            // 查看数据文件是否存在
            function(cb) {
                fs.exists(dataPath, function(exists){
                    cb(null, exists)
                })
            },

            // 读取数据文件
            function(isDataExists, cb) {
                if (isDataExists) {
                    fs.readFile(dataPath, 'utf-8', function(err, result) {
                        cb(null, result);
                    });
                } else {
                    cb('The data file is not exists!');
                }
            }

            // 回掉结果
        ], function(err, result) {
            if (err) {
                result = JSON.stringify({status:1, message: err});
            }
            res.json(JSON.parse(result));
        });
    }

});

module.exports = router;

























