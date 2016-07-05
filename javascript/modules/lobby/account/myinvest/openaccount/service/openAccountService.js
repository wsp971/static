define(function() {
 
	function OpenAccountService(){
	
	}
	/**
	 * 查询开户模板
	 * instId：发行方id
	 */
	function getTemplate(flag, instId, targetInstId, userId){
		loadAjax({
			url : "/trade/account/open/template/create",
			data : JSON.stringify({instId: targetInstId, nopage: "1"}),
			contentType : "application/json",
			dataType : "html",
			type : "post",
			isLoading: true,
			success : function(result) {
				$("#loadForm").html(result);
				$("input[name='instId']").val(instId);
	        	$("input[name='targetInstId']").val(targetInstId);
	        	$("input[name='userId']").val(userId);
				if(flag == "0"){
					queryInfo(targetInstId);
				}else{
					queryInistInfo(flag, instId, targetInstId, userId);
				}
			}
		});
	}
	
	function queryInfo(targetInstId){
		loadAjax({
			url : "/trade/institution",
			data : JSON.stringify({instId: targetInstId}),
			contentType : "application/json",
			dataType : "json",
			type : "post",
			isLoading: true,
			success : function(result) {
				if(result && result.rtnCode === "000"){
					if(!result.data){
						redirectPage("查询机构信息失败");
						return false;
					}
		        	$("input[name='targetInstName']").val(result.data.instName);
		        	$("input[name='instName']").val(decodeURI(cookies.get("instName")));
		        	$("input[name='instName']").attr("disabled","disabled");
				}
			}
		})
	}
	
	/**
	 * 查询开户信息
	 * flag：标志（flag:0创建;flag:1修改）
	 * instId：发行方id
	 * targetInstId：账户名称
	 */
	function queryInistInfo(flag, instId, targetInstId, userId){
		loadAjax({
			url : "/trade/account/query",
			data : JSON.stringify({instId: instId, targetInstId:targetInstId}),
			contentType : "application/json",
			dataType : "json",
			type : "post",
			isLoading: true,
			success : function(result) {
				if(result && result.rtnCode === "000"){
					if(!result.data){
						redirectPage("查询机构信息失败");
						return false;
					}
					$("input[name='instId']").val(instId);
		        	$("input[name='targetInstId']").val(targetInstId);
		        	$("input[name='userId']").val(userId);
					if(result.data[reason] !="" && result.data[reason] != null){
						$(".attention").removeClass("exis");
						$(".reason").text(result.data[reason]);
					}
					$("input[name='instName']").attr("disabled","disabled");
					if(flag === "0"){
						$("input[name='targetInstName']").val(result.data.targetInstName);
			        	$("input[name='instName']").val(result.data.instName);
					}else{
						$("#loadForm :input[type=text]").each(function(i){
			        		var elementName = $("#loadForm :input[type=text]").eq(i).attr("name");
			        		$("#loadForm :input[type=text]").eq(i).val(result.data[elementName]);
			        	});
						
			        	$("#loadForm select").each(function(i){
			        		var elementName = $("#loadForm select").attr("name");
			        		var elementValue = result.data[elementName]; 
			        		$("#loadForm select[name="+ elementName +"]").find("option[value=" + elementValue + "]").attr("selected",true);
			        	})
			        	
			        	$("#loadForm table tr").each(function(i){
			        		var elementName = $("#loadForm table tr").eq(i+1).find("td:eq(4)").find("input:eq(0)").attr("name");
			        		if(result.data[elementName]){
			        			var arr= new Array()
			        			arr = result.data[elementName].split("|");
			        			filename = arr[1];
			        			elementNameValue = arr[2];
			        			if(filename){
			        				$("#loadForm table tr").eq(i+1).find("td:eq(3)").html('<a class="watchPic link" href="javascript:void(0)" value="'+elementNameValue+'">'+filename+'</a>');	
			        			}
			        			
								$("#upbtn" + i).text("重新上传");
			        		}
			        	});
					}
					
				}else{
					redirectPage("查询机构信息失败");
				}
			}
		});
	}
	/**
	 * 创建账户
	 * flag：标志（flag:0创建;flag:1修改）
	 */
	function openAccount(flag){
		var url = "";
		if(flag === "0"){
			url = "/trade/account/create";
		}else{
			url = "/trade/account/update";
		}
		if(!checkElement()){
			return false;
		}
		loadAjax({
			url : url,
			data : JSON.stringify(utils.parseQueryString(decodeURIComponent($('#form').serialize(),true))),
			contentType : "application/json",
			dataType : "json",
			type : "post",
			isLoading: true,
			success : function(result) {
				if(result && result.rtnCode === "000"){
					if(flag === "1"){
						redirectPage("编辑资料成功");
					}
				}else{
					if(flag === "1"){
						redirectPage("编辑资料失败");
					}
				}
			}
		});
		if(flag === "0"){
			setTimeout(redirectPage("开户申请已提交成功，详情请查看开户列表"),3000);
		}
	}
	
	function checkElement(){
		var flag = true;
		$('#loadForm [required="Y"]').each(function(i,item){
    		var elementName = $(item).attr("name");
    		var elementValue = $(item).val();
    		var elementText = "";
    		if(elementValue.indexOf("fileDetails")>=0){
    			var rtnValue = $(item).parent().parent().find('input[name="'+elementValue +'"]').val();
    			if(validator.isEmpty(rtnValue)){
    				elementText = $(item).parent().parent().find('td:eq(1)').text().trim();
        			parent.layer.msg(elementText +"为空或格式不正确");
        			flag = false;
        			return flag;
        		}
    		}else{
    			var rules = $(item).attr("inputFormat");
    			if(rules){
    				var patten = eval(rules);
    				if(validator.isEmpty(elementValue)||!patten.test(elementValue)){
        				elementText = $(item).parent().parent().find('[name="' + elementName + '_type"]').text();
            			parent.layer.msg(elementText +"为空或格式不正确");
        	        	flag = false;
        	        	return flag;
            		}
    			}else{
    				if(validator.isEmpty(elementValue)){
        				elementText = $(item).parent().parent().find('[name="' + elementName + '_type"]').text();
            			parent.layer.msg(elementText +"为空或格式不正确");
        	        	flag = false;
        	        	return flag;
            		}
    			}
    		}
    	});
		return flag;
	}
	
	
	function redirectPage(msg){
		parent.layer.msg(msg,{
			  time: 3000,
			  shade : [0.5 , '#000' , true]
		},function(){
			tab.link("myaccount","acc-open_account_list", "account/myinvest/openaccount/open_account_list.html");
		});
	}
	
	/**
	 * 文件上传
	 */
	function uploadFile(event) {
		var i = $(event.target).parents('tr').find('td').eq(0).text().trim();
		$(event.target).parents('tr').find('td').eq(3).html('<div id="progress"><div class="bar" style="width: 0%;"></div></div>');
		$(event.target).parents('tr').siblings().find("td:eq(3)").find("#progress").remove();
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
								$("#file" + i).val(res.data);
								var src = "/file/innerDownload?filename="+data.files[0].name+"&uuid="+res.data;
								$("#fileNames" + i).html('<a class="watchPic link" href="javascript:void(0)" value="'+src+'">'+data.files[0].name+'</a>');
								$("#upbtn" + i).text("重新上传");
								//$("#downloadFile"+i).children('a').attr('href',"/file/innerDownload?filename="+data.files[0].name+"&uuid="+res.data);
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
	OpenAccountService.prototype.getTemplate = getTemplate;
	OpenAccountService.prototype.openAccount = openAccount;
	OpenAccountService.prototype.uploadFile = uploadFile;
   return OpenAccountService;
})