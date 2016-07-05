define(['lobby/account/publish/service/submissionService' ], 
function(SbmS) {
	var sbmS = new SbmS();
	function FastPublishService() {
	}

	function initSteps() {
		$("#form").steps(
				{
					headerTag : "h3",
					bodyTag : "fieldset",
					transitionEffect : "fade",
					onStepChanging : function(event, currentIndex, newIndex) {
						var form = $(this);
						if (currentIndex > newIndex) {
							return true;
						}
						if (currentIndex === 2 && newIndex === 3) {
							if ($("#contractFiles li").length === 0) {
								parent.parent.layer.msg("请上传合同文件");
								return false;
							}
							if ($("#protocolFiles li").length === 0) {
								parent.parent.layer.msg("请上传协议文件");
								return false;
							}
							if ($("#transferContractFiles li").length === 0  && !$("#transferFileTr").hasClass("hidden")) {
								parent.parent.layer.msg("请上传转让合同");
								return false;
							}
							if ($("#specification li").length === 0) {
		                        parent.parent.layer.msg("请上传产品说明书");
		                        return false;
		                    }
							 if($("#online").prop("checked") && !$("#readAnno").prop("checked")){
		                    	 parent.parent.layer.msg("请阅读并同意：《在线签署合同声明》");
		                    	 return false;
		    				}
							if (form.valid()) {
								$(".first-content .steps").hide();
								$(".actions .previous").hide();
		                    	sbmS.submitPublish();
		                    }
						}
						
						if (currentIndex < newIndex) {
							$(".body:eq(" + newIndex + ") label.error", form)
									.remove();
							$(".body:eq(" + newIndex + ") .error", form)
									.removeClass("error");
						}
						form.validate().settings.ignore = ":disabled,:hidden";

						return form.valid();
					},
					onStepChanged : function(event, currentIndex, priorIndex) {
						if (currentIndex === 1 && priorIndex === 0) {
							$(".actions .previous").show();
							$(".actions .next").text("下一步");
						} else if (currentIndex === 0 && priorIndex != 0) {
							$(".actions .previous").hide();
							$(".actions .next").text("下一步");
						} else if (currentIndex === 2 && priorIndex === 1) {
							$("#standard-publish", parent.document).addClass("disabled").removeAttr('href').removeAttr('data-toggle');
							$(".actions .next").text("提交申请");
						} else if (currentIndex === 1 && priorIndex === 2) {
		                    $(".actions .next").text("下一步");
		                }
						var form = $(this);
						form.validate().settings.ignore = ":disabled,:hidden";
						return form.valid();
					}
				});
	}

	function hideStepButtons() {
		$(".actions .previous").hide();
		$(".actions .next").hide();
		$(".actions .finish").hide();
		$(".actions .cancel").hide();
	}

	FastPublishService.prototype.initialize = function() {
		initSteps();
		sbmS.initValidate();
		hideStepButtons();
		initPage();
	};
	
	FastPublishService.prototype.submit = function() {
    	sbmS.submitPublish();
    };

	// 到期额度未满
	function initPage() {
		$("#postponePub").click(function() {
			$(this).siblings("#postponeTo").attr("disabled", false);
		});
		$("#endPublish").click(function() {
			$("#postponeTo-error").remove();
			$("#postponeTo").removeClass("error");
			$("#postponeTo").attr("disabled", true);
		});

		// upload material page
		$("#offline").click(function() {
			$("#readAnno").attr("disabled", true);
		});
		$("#online").click(function() {
			$("#readAnno").removeAttr("disabled");
		});
	}

	return FastPublishService;
})