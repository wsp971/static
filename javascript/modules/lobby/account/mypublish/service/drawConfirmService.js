define(["common/datautil"],function(datautil) {
 
	function drawConfirmService(){
	
	}
	function uploadFile(event) {
		$(event.target).fileupload(
				{
					url : window.rootPath + "/file/upload",
					type : "POST",
					dataType : "text",
					autoUpload : false,
					acceptFileTypes : /(\.|\/)(bmp|pdf|jpe?g|png)$/i,
					maxFileSize : "5000000",
					processalways: function(e, data) {
				        if(data.files[0].error == 'File type not allowed'){
				        	parent.layer.alert('文件格式不符合');
				        	return false;
						   }
				        
				        if(data.files[0].error == 'File is too large'){
				        	parent.layer.alert('文件太大');
				        	return false;
				        }  
				        data.submit();
					},
					done : function(e, data) {
						if (data.result != null && data.result != '') {
							var res = JSON.parse(data.result);
							if(res.rtnCode == "000"){
								$("#fileName").html(data.files[0].name);
								$("#fileText").html("重新上传");
								//返回的uuid
								$("#docName").val(data.files[0].name);
								$("#docPath").val(res.data);
								if(data.files[0].type == "image/jpeg"){
									$("#docType").val("JPG");
								}
								if(data.files[0].type== "image/png"){
									$("#docType").val("PNG");
								}
								if(data.files[0].type == "image/bmp"){
									$("#docType").val("BPM");
								}
								if(data.files[0].type == "application/pdf"){
									$("#docType").val("PDF");
								}
							}else {
								parent.layer.alert("错误");
							}
						} else {
							parent.layer.alert("错误");
						}

					},
					fail : function(e, data) {
						console.log("上传失败：" + data.errorThrown);
					}
				}).prop('disabled', !$.support.fileInput).parent()
				.addClass($.support.fileInput ? undefined : 'disabled');
	}
	drawConfirmService.prototype.uploadFile = uploadFile;
   return drawConfirmService;
})