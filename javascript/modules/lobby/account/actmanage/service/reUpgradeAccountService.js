define(function() {
 
	function AccountService(){
	}
   
	function initSteps(){
		jQuery.validator.addMethod("institutionType",
				function(value, element) {
					return this.optional(element)
							|| !validator.isEmpty(value);
				}, "机构类型错误");
		jQuery.validator.addMethod("orgCertType", function(
				value, element) {
			return this.optional(element)
					|| !validator.isEmpty(value);
		}, "证件类型错误");
		jQuery.validator.addMethod("isCard", function(
				value, element) {
			var legalCertType = $("select[name='legalCertType']").find("option:selected").text();
			return this.optional(element)
			|| (regexMap.idCard.test(value) && legalCertType == "身份证")
			|| (regexMap.passport.test(value) && legalCertType == "护照");
		}, "证件号码格式错误");
		jQuery.validator.addMethod("isPassport", function(
				value, element) {
			var authPersonCertType = $("select[name='authPersonCertType']").find("option:selected").text();
			return this.optional(element)
			|| (regexMap.idCard.test(value) && authPersonCertType == "身份证")
			|| (regexMap.passport.test(value) && authPersonCertType == "护照");
		}, "证件号码格式错误");
		jQuery.validator.addMethod("phone", function(value,
				element) {
			return this.optional(element)
					|| regexMap.mobile.test(value);
		}, "手机号格式错误");
		var icon = '<i class="iconfont cuo">&#xe60e;</i>';  
		
		$("#form").validate(
				{
					errorPlacement : function(
							error, element) {
						element.before(error)
					},
					rules : {
						"instName" : "required",
						"institutionType" : {
							required : true,
							institutionType : true
						},
						"orgCertType" : {
							required : true,
							orgCertType : true
						},
						"busiLicence" : "required",
						"orgNo" : "required",
						"taxCertNo" : "required",
						"legalName" : "required",
						"legalCertType" : {
							required : true,
							orgCertType : true
						},
						"legalCertNo" : {
							required : true,
							isCard : true
						},
						"authPersonName" : "required",
						"authPersonCertType" : {
							required : true,
							orgCertType : true
						},
						"authPersonCertNo" : {
							required : true,
							isPassport : true
						},
						"authPersonEmail" : "required",
						"phone" : {
							required : true,
							phone : true
						}
					},
					messages : {
						"instName" : icon
								+ "请输入机构名称",
						"institutionType" : icon
								+ "请输入机构类型",
						"orgCertType" : icon
								+ "请输入证件类型",
						"busiLicence" : icon
								+ "请输入营业执照",
						"orgNo" : icon
								+ "请输入组织机构代码",
						"taxCertNo" : icon
								+ "请输入税务登记证",
						"legalName" : icon
								+ "请输入法人代表姓名",
						"legalCertType" : icon
								+ "请输入证件类型",
						"legalCertNo" : icon
								+ "请输入证件号码",
						"authPersonName" : icon
								+ "请输入被授权人姓名",
						"authPersonCertType" : icon
								+ "请输入证件类型",
						"authPersonCertNo" : icon
								+ "请输入证件号码",
						"authPersonEmail" : icon
								+ "请输入邮箱",
						"phone" : icon + "请输入手机号"
					},
					success : function(label) {
						label
								.html('<i class="iconfont success">&#xe60f;</i>');
						label.add();
					}
				});
	};


	function uploadFile(event) {
		var i = $(event.target).parents('tr').find('td').eq(0).text().trim();
		$(event.target).parents('tr').find('td').eq(3).html('<div id="progress"><div class="bar" style="width: 0%;"></div></div>');
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
								$("#fileNames" + i).text(data.files[0].name);
								$("#fileName" + i).val(data.files[0].name);
								$("#fileStatus" + i).text("已上传");
								$("#downloadFile" + i).children('a').text("文件下载");
								$("#upbtn" + i).text("重新上传");
								$("#fileType" + i).val('0');
								$("#downloadFile"+i).children('a').attr('href',"/file/innerDownload?filename="+data.files[0].name+"&uuid="+res.data);
								if ($("#downloadFile1").children('a').text() == "文件下载") {
									$("#lookPicture").off('click');
								}
							}else {
								parent.layer.msg("错误");
							}
						} else {
							parent.layer.msg("错误");
						}

					},
					fail : function(e, data) {
						console && console.log("上传失败：" + data.errorThrown);
					}
				}).prop('disabled', !$.support.fileInput).parent()
				.addClass($.support.fileInput ? undefined : 'disabled');
	}
	
	
	function reUpdate () {
		
		     // 绑定提交
	        var instIdUrl = window.location.href;
	        var  instId = utils.getQueryString("instId",instIdUrl);
		    
	    	var data = {instId : instId};
	        loadAjax({
	            url : window.rootPath + "/user/upgradeQueryInfo",
	            data: data,
	            contentType:"application/x-www-form-urlencoded",
	            dataType:"json",
	            type:"post",
	            success : function(result) {
	               console && console.log(result)
	                var result = result.data;
	                if (result){
	                    if (result.businessType1 == 1)  $('input[name="businessType1"]').prop("checked",true);
	                    if (result.businessType2 == 1)  $('input[name="businessType2"]').prop("checked",true);
	                    if (result.businessType3 == 1)  $('input[name="businessType3"]').prop("checked",true);
	                    $('#instName').val(result.instName);
	                    $('#institutionType').val(result.institutionType);
	                    if(result.orgCertType == 0){
	                        $('input[name="orgCertType"]').eq(0).prop('checked',true);
	                        $('#busiLicence').val(result.busiLicence);
	                        $('#orgNo').val(result.orgNo);
	                        $('#taxCertNo').val(result.taxCertNo);
	                    } else if (result.orgCertType == 1) {
	                        $('input[name="orgCertType"]').eq(1).prop('checked',true);
	                        $("#dis").hide();
	                        $('#busiLicence').val(result.busiLicence);
	                    }
	                 
	                  if(result.financialLicence)  $('#financialLicence').val(result.financialLicence);
	                  if(result.orgCreditNo)  $('#orgCreditNo').val(result.orgCreditNo);
	                  if(result.orgAddress)  $('#orgAddress').val(result.orgAddress);
	                  if(result.legalName)  $('#legalName').val(result.legalName);
	                  if(result.legalCertType)  $('select[name="legalCertType"]').val(result.legalCertType);
	                  if(result.legalCertNo)  $('#legalCertNo').val(result.legalCertNo);
	                  if(result.authPersonName)  $('#authPersonName').val(result.authPersonName);
	                  if(result.authPersonCertType)  $('select[name="authPersonCertType"]').val(result.authPersonCertType);
	                  if(result.authPersonCertNo)  $('#authPersonCertNo').val(result.authPersonCertNo);
	                  if(result.authPersonEmail)  $('#authPersonEmail').val(result.authPersonEmail);
	                  if(result.authPersonCellPhone)  $('#authPersonCellPhone').val(result.authPersonCellPhone);
	                  if(result.province)  $('#pro').val(result.province);
	                  if(result.city)  $('#city').val(result.city);
	                  
	                  $('#instId').val(instId);
	                }
	            }
	        });
	        

		
	}
	
	function getFileName () {
		var instIdUrl = window.location.href;
        var  instId = utils.getQueryString("instId",instIdUrl);
    	var data = {instId : instId};
    	$('#instId').val(instId);
    	loadAjax({
            url : "/user/upgradeQueryFile",
            data: data,
            contentType:"application/x-www-form-urlencoded",
            dataType:"json",
            type:"post",
            success : function(result) {
               console && console.log(result)
                if (result.rtnCode==000){
                	var file = result.data;
                	var len = $('#exampleTableToolbar').children('tbody').children('tr').length;
                	for (var i=0;i<len;i++) {
                		if(file && file['fileDetails'+(i+1)]){
  	                      $("#fileNames"+(i+1)).html(file['fileName'+(i+1)]);
  	   	        		  $("#fileName"+(i+1)).val(file['fileName'+(i+1)]);
  	   	        		  $("#fileStatus"+(i+1)).text("已上传");
  	   	        		  $("#downloadFile"+(i+1)).children('a').text("文件下载");
  	   	        		  $("#downloadFile"+(i+1)).children('a').attr('href',"/file/innerDownload?filename="+file['fileName'+(i+1)]+"&uuid="+file['fileUuid'+(i+1)]);
  	   					  $("#upbtn"+(i+1)).text("重新上传");
  	   					  $('#file'+(i+1)).val(file['fileDetails'+(i+1)]);
  	   					  $('#fileUuid'+(i+1)).val(file['fileUuid'+(i+1)]);
                		}
                	}
            
                }
            }
        });
	}
	
	function subEventFun() {
		if ($('#form').valid())　{
			if ($(".first-ul input[type=checkbox]:checked").length === 0) {
        		parent.layer.msg("请选择业务类型");
        		return false;
        	}
        	
        	if (validator.isEmpty($("#file1").val())) {
				parent.layer.msg("营业执照不能为空");
				return false;
			}
			if (validator.isEmpty($("#file4").val())) {
				parent.layer.msg("法人代表身份证不能为空");
				return false;
			}
			if (validator.isEmpty($("#file5").val())) {
				parent.layer.msg("法人代表授权委托书不能为空");
				return false;
			}
			if (validator.isEmpty($("#file6").val())) {
				parent.layer.msg("被授权人身份证不能为空");
				return false;
			}
			
			loadAjax({
				url : "/user/upgrade",
				data : $("#form").serialize(),
				dataType : "json",
				contentType : "application/x-www-form-urlencoded",
				success : function(data) {
					if (data != null && data.rtnCode === "000") {
						cookies.set("userStatus","0");
						parent.layer.msg("申请已提交,审核通过后将以邮件方式通知，请您耐心等待!");
						setTimeout(function(){
							tab
							.link(
									"myaccount",
									"acc-myaccount_com",
									"account/actmanage/myaccount_com.html", event)
						},2000)
					} else {
						parent.layer.msg("提交申请失败!");
					}
					
				}
			});
		}
		
	}
	
	function getRegionHeight () {
		var regionHeight = $('.upgrade .account-content .first-content .row.second').height();
		$('.upgrade .account-content .first-content .border_list li.second').height(regionHeight)
	}

   AccountService.prototype.initSteps = initSteps;
   AccountService.prototype.uploadFile = uploadFile;
   AccountService.prototype.reUpdate = reUpdate;
   AccountService.prototype.getRegionHeight = getRegionHeight;
   AccountService.prototype.getFileName = getFileName;
   AccountService.prototype.subEventFun = subEventFun;
   return AccountService;
})