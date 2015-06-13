var Promise = require('bluebird'),
	fs = require('fs');

// fs.readFile('./a.js', function(err, contents) {
// 	console.log(contents);
// });

// var p = new Promise(function(resolve, reject) {
// 	fs.readFile('./a.js', function(err, contents) {
// 		if (err) {
// 			reject(err);
// 		} else {
// 			resolve(contents)
// 		}
// 	})
// });

// p.then(function(contents) {
// 	console.log('success:', contents);
// 	return contents;
// }, function(err) {
// 	console.log('err: ', err);
// }).then(function(a) {
// 	console.log('111', a)
// });

fs = Promise.promisifyAll(fs);

// fs.readFileAsync('./a.js', 'utf-8')
// 	.then(function(contents) {
// 		console.log(contents);
// 		return fs.readFileAsync('./app.js', 'utf-8')
// 	})
// 	.then(function (argument) {
// 		// body...
// 		console.log(argument);
// 	});

// fs.exists('./a.js', function(err) {
// 	console.log(err);
// });

var existsAsync = function(path) {
	return new Promise(function(resolve) {
		fs.exists(path, resolve);
	});
}

Promise.all([existsAsync('./a.js'), existsAsync('./app2.js')])
	.then(function(result) {
		console.log(result[0], result[1])
	})

// existsAync('./a.js')
// .then(function(result) {
// 	console.log(result)
// 	if (result) {
// 		return fs.readFileAsync('./a.js', 'utf-8')
// 	} else {
// 		return Promise.reject('not exists')
// 	}
// }).then(function (cont) {
// 	// body...
// 	console.log(cont);
// }).catch(function(err) {
// 	console.log(err)
// }).finally(function() {
// 	console.log('finally')
// })