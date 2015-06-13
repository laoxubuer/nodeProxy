var express = require('express'),
	swig = require('swig'),
	cons = require('consolidate'),
	bodyParser = require("body-parser"),
	app = express(),
	port = process.env.PORT || 30010;

// 设置配置项
app.set('config', {
	'views': __dirname + '/views',
	'mock': false,
	'mockData': __dirname + '/mock',
});

// 配置模板
app.engine('.html', cons.swig);
app.set('view engine', 'html');

// 设置静态资源目录
app.use('/static', express.static(__dirname + '/static'));

// 设置两种接受json的方式
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 进入路由控制
var routers = require('./lib/routerCtroller')(app);

// 监听端口
app.listen(port);
console.log('started on port:'+port);











