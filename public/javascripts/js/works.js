window.onload = function(){
	//分类导航处的调用
	classify();
	//瀑布流----总入口
	(function(){
		waterfall();
		var present = 0;
		var data = [
		{
			'imgsrc' : 'images/images/test/img_1.jpg',
			'ptext': '很多无恶恢复饿哦我发货额'
		},
		{
			'imgsrc' : 'images/images/test/img_2.jpg',
			'ptext': '很多无恶恢复饿哦我发货额'
		},
		{
			'imgsrc' : 'images/images/test/img_3.jpg',
			'ptext': '很多无恶恢复饿哦我发货额'
		},
		{
			'imgsrc' : 'images/images/test/img_10.jpg',
			'ptext': '很多无恶恢复饿哦我发货额'
		}
		];
		$(window).scroll(function(){
			if(checkscroll()){
				if(present == data.length){
					present = 0;
				}
				var wrap = $("#waterfall .wrap");
				var string = "<a href='/works/workpage'><div class='item animated bounceIn'><div class='box thumbnail'><img src='" +data[present].imgsrc + "' alt=''><div class='caption'><p class='text-muted'>"+ data[present].ptext +"</p><button class='btn btn-important'>在线预览</button></div></div></div></a>"
				$(wrap).append(string);
				// for(var i = 0;i < data.length;i++){
				// 	var string = "<div class='item animated bounceIn'><div class='box thumbnail'><img src='" +data[i].imgsrc + "' alt=''><div class='caption'><p class='text-muted'>"+ data[i].ptext +"</p><button class='btn btn-important'>在线预览</button></div></div></div>"
				// 	$(wrap).append(string);
				// } 
				present++;
				waterfall();
			}
		});
		$(window).resize(function(){
			var items = $("#waterfall .wrap .item");
			$(items).css({
				"position":"relative",
				"left":0,
				"top":0,
				"float":"left"
			});
			waterfall();
		});

	})();

	//瀑布流----检验动态加载函数
	function checkscroll(){
		var items = $("#waterfall .wrap .item");
		var lastHeight = ($(items[items.length-1]).height()) + items[items.length-1].offsetTop;
		if(lastHeight < $(window).scrollTop()+$(window).height()){
			return true;
		}
		else{
			return false;
		}
	}
	//瀑布流----主要逻辑
	function waterfall(){
		var wrap = $("#waterfall .wrap");                 //父元素
		var items = $("#waterfall .wrap .item");		  //获取每一个块组成的数组
		var num = Math.floor(wrap.width()/items.width()); //一行的个数
		var itemHArr = [];								  //每一列的高度组成的数组
		var minH;										  //所有列中最小高度
		var length = items.length;						
		for(var i = 0;i < length;i++){
			var  iHeight = $(items[i]).height();
			if(i < num){
				itemHArr[i] = iHeight;
			}
			else{
				var minH = Math.min.apply(null , itemHArr);
				var index = getminHindex(itemHArr , minH);
				$(items[i]).css({
					'position' : 'absolute',
					'left'     : items[index].offsetLeft + 'px',
					'top'      : itemHArr[index] + 'px' 
				});
				itemHArr[index] += iHeight;
			}
		}

		function getminHindex(arr , min){
			for(var i = 0;i < arr.length;i++){
				if(arr[i] == min){
					return i;
				}
			}
		}
	}
}