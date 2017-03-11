$('#uploadphotos').on('shown.bs.modal', function(){
	var uploader = WebUploader.create({
		// 选完文件后，是否自动上传。
	    auto: false,
	    swf: '/webuploader/Uploader.swf',	    
	    server: '/admin/postfile',		   
	    pick: '#filePicker',
	    // 只允许选择图片文件。
	    accept: {
	        title: 'Images',
	        extensions: 'gif,jpg,jpeg,bmp,png',
	        mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
	    },
	});
	var isAddButton = 0;
	var uploaderHtml = '<div id="uploader" class="wrap-uploader"><div id="filePicker"><span class="glyphicon glyphicon-picture"></span> 选择照片</div><div class="text-center">按住Ctrl键可多选照片</div></div>';
	// 当有文件添加进来的时候
	uploader.on( 'fileQueued', function( file ) {		
		if(0 == isAddButton) {
			$("#uploader").remove();
			$("#bottom-menu-wrap").css('display','block');
			uploader.addButton({
				id : '#btn-addpic'
			});
			isAddButton = 1;
		}
		
	    var $li = $(
	            '<div id="' + file.id + '" class="file-item thumbnail">' +
	                '<img>' +
	                '<div class="info">' + file.name + '</div>' +
	            '</div>'
	            ),
	        $img = $li.find('img');
	    $list = $("#fileList");
	    // $list为容器jQuery实例
	    $list.append( $li );

	    // 创建缩略图
	    // 如果为非图片文件，可以不用调用此方法。
	    // thumbnailWidth x thumbnailHeight 为 100 x 100
	    var thumbnailWidth = 130, thumbnailHeight = 110;
	    uploader.makeThumb( file, function( error, src ) {
	        if ( error ) {
	            $img.replaceWith('<span>不能预览</span>');
	            return;
	        }

	        $img.attr( 'src', src );
	    }, thumbnailWidth, thumbnailHeight );
	});

	// 文件上传过程中创建进度条实时显示。
	uploader.on( 'uploadProgress', function( file, percentage ) {
	    var $li = $( '#'+file.id ),
	        $percent = $li.find('.progress span');

	    // 避免重复创建
	    if ( !$percent.length ) {
	        $percent = $('<p class="progress"><span></span></p>')
	                .appendTo( $li )
	                .find('span');
	    }

	    $percent.css( 'width', percentage * 100 + '%' );
	});

	uploader.on( 'startUpload', function() {  		
		//uploader.options.formData = {'albumid' : 'abdg'};

	});  

	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on( 'uploadSuccess', function( file ) {
	    $( '#'+file.id ).addClass('upload-state-done');
	});

	// 文件上传失败，显示上传出错。
	uploader.on( 'uploadError', function( file ) {
	    var $li = $( '#'+file.id ),
	        $error = $li.find('div.error');

	    // 避免重复创建
	    if ( !$error.length ) {
	        $error = $('<div class="error"></div>').appendTo( $li );
	    }

	    $error.text('上传失败');
	});

	// 完成上传完了，成功或者失败，先删除进度条。
	uploader.on( 'uploadComplete', function( file ) {
	    $( '#'+file.id ).find('.progress').remove();
	    $('#help-upload').text('上传完成');
	});
	$('#uploadphotos').on('hide.bs.modal', function (e) {
			// if(confirm('离开页面将退出照片上传')) {
			 	isAddButton = 0;
			 	$('#fileList').html(uploaderHtml);
			 	$("#bottom-menu-wrap").css('display','none');
	           	uploader.destroy();
	  //       }else{
	  //       	e.preventDefault();
	  //       	e.stopPropagation();
	  //       }		
      });
    $("#btn-upload").on('click', function(){  	
    	uploader.options.formData = {'action':'album','albumid' : $('#albumPicker').val()};
		uploader.upload();
	});
})	

