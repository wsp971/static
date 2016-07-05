define(function() { 

	function RedeemService(){
	}
	//是否为正整数 
	function isPositiveNum(s){
		var re = /^[1-9][0-9]*$/ ; 
		return re.test(s);
	} 
	//避免重复提交的flag
	var checkSubmitFlg = false; 
	function doSubmit(event) {
		$('#tips').hide();
		if(checkSubmitFlg == true){
			// parent.layer.msg('已提交，请勿重复操作');
			if(event.preventDefault) {
				event.preventDefault();
			} else {
				window.event.returnValue = false;//注意加window
			}
			// return false; //当表单被提交过一次后checkSubmitFlg将变为true,根据判断将无法进行提交。 
		} else {
			// alert(checkSubmitFlg);//test
			var max = $('#orderShare').text().trim();
			// var dailyMax = $('#dailyMaxAmount').text().trim();
			var amount = $('#amount').val();
			var fileNum = $('#fileNum').val();
			// console.log("fileNum:" + fileNum);//test
			var file = $('#file').html();
			// console.log("file:" + file);//test
			// console.log("amount:" + amount);//test
			var department = $('#department').text().trim();
			// var publisherOrgID = $('#publisherOrgID').text().trim();//不需要传了
			var data = {
				oprCode: "024",
				instCode: cookies.get("instCode"),
	            firmAccount: cookies.get("instId"),
	            operator: cookies.get("username"),
				productCode: $('#productCode').text().trim(),
	            orderType: "05",
	            orderShare: $('#amount').val().trim(),
	            executionType: "NEW"
	        }; 
	        //若不是鹏华，传输数据内加入材料信息
	        if (department != "0001") {
	        	var orderDocs=[];
	        	for (var i=0; i<fileNum; i++) {
	        		fileName = $('#file').find('div').eq(i).find('input').eq(1).val();
	        		orderDocs[i] = {
	        			docName: fileName,
	        			docPath: $('#file').find('div').eq(i).find('input').eq(0).val(),
	        			docType: fileName.slice(fileName.lastIndexOf(".")+1).toLowerCase(),
	        			docUse: 15
	        		}
	        	}
	        	data.orderDocs = orderDocs;
	        };
	        // console.log(data);//test
	        // console.log(JSON.stringify(data));//test
	        //若不是鹏华，就判断文件是否存在
	        if ((department!="0001") && (fileNum == 0 || !file)) {
	        	parent.layer.msg('请先上传文件');
	        } else if (!isPositiveNum(amount)) {
	        	$('#tips').text("请正确填写赎回份额");
				$('#tips').show();
				parent.layer.msg('请正确填写购买金额');
				window.location.hash = "#amount"; 
			} else if ((max != '') && (max != '0') && (parseInt(amount) > parseInt(max))) {
	        	$('#tips').text("赎回份额不能超过持有的总份额");
				$('#tips').show();
				parent.layer.msg('请正确填写购买金额');
				window.location.hash = "#amount"; 
			}
			//  else if ((dailyMax != '') && (dailyMax != '0') && (parseInt(amount) > parseInt(dailyMax))) {
	  //       	$('#tips').text("赎回份额不能超过单日赎回上限");
			// 	$('#tips').show();
			// 	parent.layer.msg('请正确填写购买金额');
			// 	window.location.hash = "#amount"; 
			// } 
			else {
				checkSubmitFlg = true;
				loadAjax({
					url : "/trade/order/create",
					data : JSON.stringify(data),
					type: "POST",
					dataType : "json",
					isLoading: true,
					contentType:"application/json",
					success : function(result) {
						// console.log(result);//test
						if (result) {
							//提交成功
							if (result.rtnCode && result.rtnCode === "000") {
								if (result.data.orderStatus && result.data.orderStatus === "022") {
									checkSubmitFlg = true; 
									var url = "redeemSuccess.html";
									location.href = url;
								} else { //"021,赎回申请中"|"023,赎回申请失败"
									parent.layer.msg('购买申请失败');
									checkSubmitFlg = false; 
								}
							} else {
								parent.layer.msg('网络繁忙,请稍后再试！');
								checkSubmitFlg = false;
							}
						} else {
							parent.layer.msg('网络繁忙,请稍后再试！');
							checkSubmitFlg = false;
						}
					}
				 	
				});
			}//else
			// window.event.preventDefault(); 
			if(event.preventDefault) {
				event.preventDefault();
			} else {
				window.event.returnValue = false;//注意加window
			}
		}
	}
	function doConfirm(event) {
		parent.layer.confirm('确认关闭基金赎回页吗？', {
 		   title:"提示",
            btn: ['确定', '取消']
    	}, function () {
    		parent.layer.closeAll('dialog');
    		parent.tab.close();
    		return false;
    	});
	}
	function uploadFile(event) {
		$('#fileFailures').remove();
		$('#fileupload').parents('tr').find('td').eq(1).append('<div id="progress"><div class="bar" style="width: 0%;"></div></div>');
		$('#fileupload').fileupload({
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
		        	parent.layer.msg('文件大于5M');
		        	return false;
		        }
		        data.submit();
			},
			progressall: function (e, data) {
		        var progress = parseInt(data.loaded / data.total * 100, 10);
		        $('#progress .bar').css('width', progress + '%');
			},
			done : function(e, data) {
				var i = $('#fileOrder').val();
				var num = $('#fileNum').val();
				$('#progress').remove();
				$('#fileupload').parents('tr').find('td').eq(1).append('<div><span style="float:left;" id="fileNames'+i
					+'"></span><i class="iconfont del" onclick="deleteFile(this)">&#xe60e;</i><input type="hidden" name="fileDetail" id="fileDetail'+i
					+'" value=""><input type="hidden" name="fileName" id="fileName'+i+'" value=""></div>');
				if (data.result != null && data.result != '') {
					var res = JSON.parse(data.result);
					if(res.rtnCode == "000"){
						$("#fileDetail"+i).val(res.data); //返回的id
						$("#fileNames"+i).text(data.files[0].name);
						$("#fileName"+i).val(data.files[0].name);
						$("#upbtn").text("继续上传");
						i++;num++;
						$('#fileOrder').val(i);
						$('#fileNum').val(num);
						// console.log('i:' + i);//test
						// console.log('num:' + num);//test
					} else if(res.rtnCode == "999") {
						$("#fileNames"+i).parent('div').remove();
						$('#fileupload').parents('tr').find('td').eq(1).append('<div id="fileFailures"><span style="float:left;" id="fileTips"></span></div>');
						$("#fileTips").text("上传失败，请重新上传");
						parent.layer.msg('上传失败，请重新上传');
					} else {
						$("#fileNames"+i).parent('div').remove();
						$('#fileupload').parents('tr').find('td').eq(1).append('<div id="fileFailures"><span style="float:left;" id="fileTips"></span></div>');
						$("#fileTips").text("上传失败，请重新上传");
						parent.layer.msg('上传失败，请重新上传');
					}
				} else {
					$("#fileNames"+i).parent('div').remove();
					$('#fileupload').parents('tr').find('td').eq(1).append('<div id="fileFailures"><span style="float:left;" id="fileTips"></span></div>');
					$("#fileTips").text("上传失败，请重新上传");
					parent.layer.msg('上传失败，请重新上传');
				}
			},
			fail : function(e, data) {
				// console.log("上传失败：" + data.errorThrown);//test
				$('#progress').remove();
				$('#fileupload').parents('tr').find('td').eq(1).append('<div id="fileFailures"><span style="float:left;" id="fileTips"></span></div>');
				$("#fileTips").text("上传失败，请重新上传");
				parent.layer.msg('上传失败，请重新上传');
			}
		})
	}

	RedeemService.prototype.doSubmit = doSubmit;
	RedeemService.prototype.doConfirm = doConfirm;
	RedeemService.prototype.uploadFile = uploadFile;
	return RedeemService;
})