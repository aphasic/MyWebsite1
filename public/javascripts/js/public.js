//分类目录处的处理函数
function classify(){
	//链接点击改变样式
	var tag_a = $(".classify-item");
	for(var i = 0, j = tag_a.length; i < j; i++){
		$(tag_a[i]).removeClass("item-active");
		if(getUrlParam('cat') == $(tag_a[i]).data('catid')) {
			$(tag_a[i]).addClass("item-active");
		}		
	}
	
	//小屏幕时分类目录点击伸缩
	var btn = $(".classify-btn");
		$(btn).click(function(){
			var list = $(this).parents(".classify-body").find(".classify-item-wrap");
			if($(list).is(":hidden")){
				$(list).show("nomal");
			}
			else{
				$(list).hide("nomal");
			}
			if($(this).hasClass("glyphicon-chevron-right")){
				$(this).removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
			}
			else{
				$(this).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
			}
		});
		$(window).resize(function(){
			if($(window).width() >= 992){
				$(".classify-item-wrap").show("nomal");
			}
		});
}


//多行文本溢出处理函数
//其中object为文本对象，num为限制字符个数
function text_ellipsis(object , num){
	object.each(function(n){
		var length = $(this).text().length;
		if(length >= num){
			$(this).text($(this).text().substring(0,num)+"...");
		}
	})	
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return ''; //返回参数值
}

//图片处理函数，使图片始终取最中间的部分显示在容器中
//参数为要操作的图片数组
//默认图片的父元素为容器
function picture( imagelist ){
	$(imagelist).each(function(){
		var img = $(this);
		var wrapWidth = parseInt($(img).parent().width()+4);//获取容器的宽度
		var wrapHeight = parseInt($(img).parent().height()+4);
		var realWidth;//真实的宽度
		var realHeight;//真实的高度
		//$("<img/>")这里是创建一个临时的img标签，类似js创建一个new Image()对象！
		var ratioWidth;
		var ratioHeight;
		$("<img/>").attr("src", $(img).attr("src")).load(function() {
			/*
			如果要获取图片的真实的宽度和高度有三点必须注意
			1、需要创建一个image对象：如这里的$("<img/>")
			2、指定图片的src路径
			3、一定要在图片加载完成后执行如.load()函数里执行
			*/
			realWidth = this.width;
			realHeight = this.height;
			ratioWidth = realWidth/wrapWidth;
			ratioHeight = realHeight/wrapHeight;
			//如果真实的宽度大于容器的宽度就按照100%显示
			if(ratioWidth >= ratioHeight){

				var margin = Math.floor((realWidth/ratioHeight-wrapWidth)/2);
				$(img).css({
					'height' : '100%',
					'width'  : 'auto',
					'marginLeft':'-'+margin+'px',
				});
			}
			else{
				var margin = Math.floor((realHeight/ratioWidth-wrapHeight)/2);
				$(img).css({
					'width' : '100%',
					'height'  : 'auto',
					'marginTop':'-'+margin+'px',
				});
			}
		});
	});
}