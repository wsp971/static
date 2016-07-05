define(function() {
 
	function AccountService(){
	}
   
	function initSteps(){
		jQuery.validator.addMethod("institutionType",
				function(value, element) {
					if(value == "11"){
						return false;
					}
					return this.optional(element)
							|| !validator.isEmpty(value);
				}, "机构类型错误");
		jQuery.validator.addMethod("busiLicence",
				function(value, element) {
					return this.optional(element)
							|| regexMap.businessLicense.test(value);
				}, "格式错误");
		jQuery.validator.addMethod("organizationCode",
				function(value, element) {
					return this.optional(element)
							|| regexMap.organizationCode.test(value);
				}, "组织机构格式错误");
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
			|| (!validator.isEmpty(value) && legalCertType == "护照");
		}, "证件号码格式错误");
		jQuery.validator.addMethod("isPassport", function(
				value, element) {
			var authPersonCertType = $("select[name='authPersonCertType']").find("option:selected").text();
			return this.optional(element)
			|| (regexMap.idCard.test(value) && authPersonCertType == "身份证")
			|| (!validator.isEmpty(value) && authPersonCertType == "护照");
		}, "证件号码格式错误");
		jQuery.validator.addMethod("authPersonCellPhone", function(value,
				element) {
			return this.optional(element)
					|| regexMap.mobile.test(value);
		}, "手机号格式错误");
		var icon = '<i class="iconfont cuo">&#xe60e;</i>';
		$("#form").steps({
					headerTag : "h3",
					bodyTag : "fieldset",
					transitionEffect : "fade",
					onStepChanging : function(event, currentIndex,newIndex) {
						if (currentIndex === 0 && $("input[type=checkbox]:checked").length === 0) {
							parent.layer.msg("请选择业务类型");
							return false;
						}
						if (currentIndex === 2 && newIndex === 3 && validator.isEmpty($("#file1").val())) {
							parent.layer.msg("营业执照不能为空");
							return false;
						}
						if (currentIndex === 2 && newIndex === 3 && validator.isEmpty($("#file4").val())) {
							parent.layer.msg("法人代表身份证不能为空");
							return false;
						}
						if (currentIndex === 2 && newIndex === 3 && validator.isEmpty($("#file5").val())) {
							parent.layer.msg("法人代表授权委托书不能为空");
							return false;
						}
						if (currentIndex === 2 && newIndex === 3 && validator.isEmpty($("#file6").val())) {
							parent.layer.msg("被授权人身份证不能为空");
							return false;
						}
						if (currentIndex > newIndex) {
							return true;
						}
						var form = $(this);
						if (currentIndex < newIndex) {
							$(".body:eq("+ newIndex + ") label.error", form).remove();
							$(".body:eq("+ newIndex + ") .error", form).removeClass("error");
						}
						form.validate().settings.ignore = ":disabled,:hidden";
						return form.valid();
					},
					onStepChanged : function(event, currentIndex, priorIndex) {
						$(".actions .next").removeAttr("disabled","disabled");
						$(".actions .next").attr("href","#next");
						$(".actions .next").css("background","#1777CD");
						if (currentIndex === 1 && priorIndex === 0) {
							$(".actions .previous").show();
							$(".actions .previous").text("< 返回上一步");
							$(".border_list .first").addClass("first-hover");
							$(".actions .next").text("下一步");
						} else if (currentIndex === 0 && priorIndex != 0) {
							$(".actions .previous").hide();
							$(".actions .next").text("下一步");
						}else if (currentIndex === 1 && priorIndex === 2) {
							$(".actions .next").text("下一步");
						} else if (currentIndex === 2 && priorIndex === 1) {
							$(".border_list .second").addClass("first-hover");
							$(".actions .next").text("提交申请");
							if($("#confirm").is(':checked')==false){
								$(".actions .next").attr("disabled","disabled");
								$(".actions .next").attr("href","javascript:void(0)");
								$(".actions .next").css("background","gray");
							}
						}
						var form = $(this);
						form.validate().settings.ignore = ":disabled,:hidden";
						if (currentIndex === 3 && priorIndex === 2 && form.valid()) {
							loadAjax({
										url : "/user/upgrade",
										data : $("#form").serialize(),
										dataType : "json",
										contentType : "application/x-www-form-urlencoded",
										success : function(data) {
											$(".first-content .steps").hide();
											$(".actions .previous").hide();
											if (data != null && data.rtnCode === "000") {
												cookies.set("userStatus","0");
												$(".cont-suc").show();
												$(".cont-scs").show();
											} else {
												$(".cont-err").show();
												$(".cont-esg").text(data.rtnMsg);
												$(".cont-esg").show();
											}
										}
									});
						}
						return form.valid();
					}
				})
		.validate(
				{
					errorPlacement : function(error, element) {
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
						"busiLicence" : {
							required : true,
							busiLicence : true
						},
						"orgNo" : {
							required : true,
							organizationCode : true
						},
						"taxCertNo" :  {
							required : true,
							busiLicence : true
						},
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
						"authPersonCellPhone" : {
							required : true,
							authPersonCellPhone : true
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
						"authPersonCellPhone" : icon + "请输入手机号"
					},
					success : function(label) {
						label
								.html('<i class="iconfont success">&#xe60f;</i>');
						label.add();
					}
				});
	}


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
						if(i == "5"){
							var suffix = data.files[0].name.split(".")[1];
							if(suffix != "pdf" || data.files[0].name.split(".")[1].toUpperCase() != "PDF"){
								parent.layer.msg('文件格式不符合，格式需为pdf');
					        	return false;
							}
						}
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
								$("#downloadFile" + i).children('a').off("click");
								$("#upbtn" + i).text("重新上传");
								$("#downloadFile"+i).children('a').attr('href',"/file/innerDownload?filename="+data.files[0].name+"&uuid="+res.data);
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

   AccountService.prototype.initSteps = initSteps;
   AccountService.prototype.uploadFile = uploadFile;
   return AccountService;
})