$(function(){
	int();

	function int(){
		bindEvent()
	}
	function bindEvent(){
		$(document).on('click', 'input', sendPost)
	}
	function sendPost(){
		var data = {
			'params': 'test',
		};

		$.ajax({
			type: "post",
			url: "/user/delete",
			data: data
		})
		.done(function(data){
			console.log('发送成功');
		})
		.fail(function(data){
			console.log('发送失败');
		})
	}
})