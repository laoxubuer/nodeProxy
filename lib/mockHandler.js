var express = require('express'),
    path = require('path'),
    //fs = require('fs'),
    Promise = require('bluebird'),
    fs = Promise.promisifyAll(require("fs"));
    async = require('async'),
    router = express.Router();

router.use(function(req, res, next) {
    if (!req.xhr) {        
        var filePath = path.join(req.app.get('config')['views'], req.path) + '.html',
            dataPath = path.join(req.app.get('config')['mockData'], req.path) + '.json';

        var existsAsync = function(path) {
            return new Promise(function(resolve) {
                fs.exists(path, resolve);
            });
        }

        existsAsync(filePath)
        .then(function(htmlExist){
            if(htmlExist){
               return existsAsync(dataPath)
            }else{
                console.log('Html文件不存在')
                return Promise.reject()
            }
        })
        .then(function(dataExit){
            if(dataExit){
               return fs.readFileAsync(dataPath, 'utf-8') 
            }else{
                console.log("Json文件不存在")
                return Promise.reject()
            }
        })
        .then(function(result){
            res.render(req.path.substring(1), JSON.parse(result))
        })
    } else {
        var dataPath = path.join(req.app.get('config')['mockData'], req.path) + '.json';

        fs.readFileAsync(dataPath, 'utf-8')
        .then(function(result) {
            res.json(JSON.parse(result));
        })
        .catch(function(e) {
            console.error("该文件不存在")
            return Promise.reject()
        });
    }

});

module.exports = router;

























