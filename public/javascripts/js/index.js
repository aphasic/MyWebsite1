$(function(){
	//设置banner轮播部分的高度随宽度自适应
	(function(){
		var width_ = $("#content_banner .item").width();
		$("#content_banner .item").height(width_ * 0.5 + "px");
		$(window).resize(function(){
			var width_ = $("#content_banner .item").width();
			$("#content_banner .item").height(width_ * 0.5 + "px");
		});
	})();
	//设置动latestwork 部分的淡出效果在hover时执行
	(function(){
		$(".content-lastest-body figure").hover(function(){
			$(this).find('h3').addClass("fadeInDown");
			$(this).find('p').addClass("fadeInUp");
		},function(){
			$(this).find('h3').removeClass("fadeInDown");
			$(this).find('p').removeClass("fadeInUp");
		});
		
	})();
})