var express = require('express'),
    path = require('path'),
    Promise = require('bluebird'),
    fs = Promise.promisifyAll(require("fs"));
    async = require('async'),
    router = express.Router();

router.use(function(req, res, next) {
    if (!req.xhr) {        
        // var filePath = path.join(req.app.get('config')['views'], req.path) + '.html',
        //     dataPath = path.join(req.app.get('config')['mockData'], req.path) + '.json';

        // var existsAsync = function(path) {
        //     return new Promise(function(resolve) {
        //         fs.exists(path, resolve);
        //     });
        // }

        // existsAsync(filePath)
        // .then(function(htmlExist){
        //     if(htmlExist){
        //        return existsAsync(dataPath)
        //     }else{
        //         console.log('Html文件不存在')
        //         return Promise.reject()
        //     }
        // })
        // .then(function(dataExit){
        //     if(dataExit){
        //        return fs.readFileAsync(dataPath, 'utf-8') 
        //     }else{
        //         console.log("Json文件不存在")
        //         return Promise.reject()
        //     }
        // })
        // .then(function(result){
        //     res.render(req.path.substring(1), JSON.parse(result));
        // })
        
        /*
         ** get请求自动代理函数
         * curUrl 当前path
         * urlParam 需要拼接的多个path
         * paramGroup 数组，包括当前path及所有需要拼接的path集合
         * counter 计数器，用来累计所有数据
         */
        var curUrl = req.path,
            urlParam,
            paramGroup,
            counter = 0;

        var dataObj = {
            'data': []
        };

        if(req.query.urlgroup === undefined){
            paramGroup = [curUrl];
        }else{
            urlParam = req.query.urlgroup;
            paramGroup = urlParam.split(',');
            paramGroup.push(curUrl);
        }

        for(var i = 0; i<paramGroup.length; i++){
            (function(i){
                var filePath = path.join(req.app.get('config')['views'], paramGroup[i]) + '.html',
                    dataPath = path.join(req.app.get('config')['mockData'], paramGroup[i]) + '.json';

                var existsAsync = function(path) {
                    return new Promise(function(resolve) {
                        fs.exists(path, resolve);
                    });
                }
                
                existsAsync(filePath)
                .then(function(htmlExist){
                    if(htmlExist){
                       return existsAsync(dataPath);
                    }else{
                        console.log('Html文件不存在');
                        return true;
                    }
                })
                .then(function(dataExit){
                    if(dataExit){
                        return fs.readFileAsync(dataPath, 'utf-8'); 
                    }else{
                        console.log("Json文件不存在");
                        return Promise.reject();
                    }
                })
                .then(function(result){
                    counter++;
                    dataObj.data.push(JSON.parse(result));
                    if(counter == paramGroup.length){
                        res.render(req.path.substring(1), dataObj);
                    }
                })
            })(i)
        }
    } else {

        /*
         ** post请求自动代理函数
         */
        var dataPath = path.join(req.app.get('config')['mockData'], req.path) + '.json';

        fs.readFileAsync(dataPath, 'utf-8')
        .then(function(result) {
            res.json(JSON.parse(result));
        })
        .catch(function(e) {
            console.log("该文件不存在")
            return Promise.reject()
        });
    }

});

module.exports = router;

























