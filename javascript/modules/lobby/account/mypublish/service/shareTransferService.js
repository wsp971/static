define(function() {
	
	function shareTransferService(){
		
	}
	
	function submitData(orderId, oprCode, oprOrderStatus, originalSide){
		var fileId = $("#fileId").val();
		var fileName = $("#fileName").text();
		var suffix = '';
		if(fileName !=null && fileName !=''){
			suffix = fileName.split(".");
		}
		loadAjax({
			url : "/trade/order/update",
			data : JSON.stringify({"fileId":fileId,
									"orderId":orderId,
									"oprCode":oprCode, 
									"oprOrderStatus":oprOrderStatus,
									"originalSide":originalSide,
									"orderDocs":[{
										   "docName": fileName, 
						                   "docPath": fileId, 
						                   "docType": suffix[1].toUpperCase(), 
						                   "docUse": "08"
											}]
								}),
			contentType : "json",
			dataType : "json",
			type : "post",
			success : function(result) {
				if(result && result.rtnCode==="000"){
	        		parent.layer.msg("份额划转信息已提交成功！");
	        		var index = parent.layer.getFrameIndex(window.name);
	          		parent.layer.close(index);
				}
			}
		});
	}
	
	function queryData(orderId){
		loadAjax({
			url : "/trade/order/query",
			data : JSON.stringify({"orderId":orderId}),
			contentType : "json",
			async: true,
			dataType : "json",
			type : "post",
			success : function(result) {
				if(result && result.rtnCode==="000"){
					var res = result.data;
					$("#firmAccount").val(res.firmAccount);
	        		$("#counterParty").val(res.counterParty);
	        		$("#orderShare").val(res.orderShare);
				}else{
					parent.layer.msg("查询订单信息失败!");
				}
			}
		});
	}
	
	function uploadFile(event) {
		$(event.target).parents('tr').find('td').eq(0).html('<div id="progress"><div class="bar" style="width: 0%;"></div></div>');
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
				        	parent.layer.msg('文件格式不符合');
				        	return false;
						   }
				        
				        if(data.files[0].error == 'File is too large'){
				        	parent.layer.msg('文件太大');
				        	return false;
				        }  
				        data.submit();
					},
					progressall: function (e, data) {
				        var progress = parseInt(data.loaded / data.total * 100, 10);
				        $('#progress .bar').css(
				            'width',
				            progress + '%'
				        )
					},
					done : function(e, data) {
						if (data.result != null && data.result != '') {
							var res = JSON.parse(data.result);
							if(res.rtnCode == "000"){
								$("#fileId").val(res.data);
								$("#fileName").text(data.files[0].name);
								$("#upbtn").text("重新上传");
							}else {
								parent.layer.msg("错误");
							}
						} else {
							parent.layer.msg("错误");
						}

					},
					fail : function(e, data) {
						console.log("上传失败：" + data.errorThrown);
					}
				}).prop('disabled', !$.support.fileInput).parent()
				.addClass($.support.fileInput ? undefined : 'disabled');
	}
	shareTransferService.prototype.queryData = queryData;
	shareTransferService.prototype.submitData = submitData;
	shareTransferService.prototype.uploadFile = uploadFile;
   return shareTransferService;
})