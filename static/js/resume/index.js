$(function(){

	// 全局变量
	var pageIndex = 0;

	// 执行初始化函数
	init();

	/*
	 ** 初始化函数
	 */
	function init(){
		hideLoading();
		calculateHeight();
		bindEvent();
	};

	/*
	 ** 事件绑定
	 */
	function bindEvent(){
		var articlePage = $('article');

		articlePage.on('swipeUp', 'article section', sectionUp)
				   .on('swipeDown', 'article section', sectionDown);
	}

	/*
	 ** 页面载入结束隐藏Loading展示主页面
	 */
	function hideLoading(){
		$('.load').hide();
		$('.scroll').show();
	}

	/*
	 ** set每一个section的height
	 */
	function calculateHeight(){
		var sectionHeight = $(window).height();

		$('.scroll section').height(sectionHeight);
	}

	/*
	 ** 向上滑动页面
	 */
	function sectionUp(){
		var sectionSize = $('section').size();

		pageIndex++;

		// 如果滑到最后一页隐藏下一页按钮
		if(pageIndex == sectionSize-1){
			$('.page-up').hide();
		}
		if(pageIndex > sectionSize-1){
			return
		}
		crtrolScroll(pageIndex)
	}

	/*
	 ** 向下滑动页面
	 */
	 function sectionDown(){
	 	var sectionSize = $('section').size();

	 	pageIndex--;
	 	$('.page-up').show();

		// 如果滑动到最后一页
		if(pageIndex >= sectionSize-1){
			console.log(1111)
			pageIndex = sectionSize-2
		}

		// 如果滑动到第一页
		if(pageIndex < 0){
			pageIndex = 0;
			return 
		}
		crtrolScroll(pageIndex)
	 }

	/*
	 ** 控制页面滑动
	 */
	 function crtrolScroll(pageIndex){
	 	var scrollPage = $('.scroll'),
	 		allSections = scrollPage.find('section'),
			sectionHeight = $(window).height();

	 	scrollPage.animate({
			top: -sectionHeight * pageIndex
		});
		allSections.removeClass('active_page');
		allSections.eq(pageIndex).addClass('active_page');
	 }
})













