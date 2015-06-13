var express = require('express'),
	bodyParser = require("body-parser"),
	app = express();

// 设置两种接受json的方式
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res){
	res.json({
		status: 0,
		data:'成功'
	})
})
app.listen(4000);