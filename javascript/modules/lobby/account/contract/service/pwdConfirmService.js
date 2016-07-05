define(function() {
	function PwdConfirmService(){
	}
	
	PwdConfirmService.prototype.logPwdChanged=function(){
		var val = $("#logpwd").val();
		if(val!=""&&val!="undefined"){
			$("#cancelBtn").attr("disabled",false);
		}else{
			$("#cancelBtn").attr("disabled",true);
		}
	}
	
	PwdConfirmService.prototype.cancelConfirm=function(){
		var index=parent.layer.getFrameIndex(window.name);
		parent.layer.isCancel = true;
		parent.layer.close(index);
	}
	
	PwdConfirmService.prototype.submitPwd=function(){
		console.log("starts validate pwd");
		var pwd=$("#logpwd").val();
		(pwd=="undefined"||pwd=="") && return;
		var reqData={
				userId: parent.cookies.get("userId"),
				oldPassword:pwd
		}
		parent.$.loadAjax({
			url: "/user/validatePwd",
			type: "POST",
			contentType:"application/x-www-form-urlencoded",
			data: reqData,
			isLoading: true,
			targets: [$("#loadTarget")],
			before: function(){
				$("#pwdConfirmedDiv").hide();
				$("#pwdLoadingDiv").show();
			},
			success: function(res){
				if(res.rtnCode == "000"){
					//hide current layer
					parent.layer.isConfirmed = true;
            		var index=parent.layer.getFrameIndex(window.name);
            		parent.layer.close(index);
				}else{
					$("#promptError").remove();
					parent.layer.isConfirmed = false;
					$("#pwdConfirmedDiv").show();
					$("#pwdLoadingDiv").hide();
					$("#msgTd").append("<span id='promptError' class='f16 redcolor'>密码输入错误</span>");
				}
			},
			error:function(err){
				parent.layer.isConfirmed=false;
				console.log(err);
			}
		});
	}
	return PwdConfirmService;
})
