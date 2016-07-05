// define([
//     "controllers/newPwdController"
// ], function (newPwdController) {
//     new newPwdController();
// });  
//判断密码格式(不能加空格)
var isPwd = function (s) {
	var patrn = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s]{6,20}$/;
	if (!patrn.exec(s)) return false;
	return true;	
}
//btn的可用与禁用状态
var submitshow = function(){
	$("#btnSubmit").removeAttr("disabled").addClass("btn-primary");
}
var submitDisabled = function(){
	$("#btnSubmit").attr("disabled", "disabled").removeClass("btn-primary");
}
//判断btn恢复条件
var condition = function(){
	var _this = this;
	if ($("#pwd").val() != $("#repwd").val()) {
		if( $("#repwd").val().trim())
		{
			_this.hideRepwdState;
			_this.showRepwdTips("两次输入密码不一致");	
			_this.submitDisabled();				
		};
		return false;
	}
	_this.showRepwdState();
	return true;
}
//btn恢复
var check_btn = function () {
	var _this = this;
	if( _this.condition() ){
		_this.submitshow();
	} 
}
//提示的显示与隐藏执行
var showPwdRules = function() {
	$("#pwd_rules").show();
}
var showPwdState = function() {
	$('#pwd_state').addClass('right');
	$("#pwd_state").text("").show();
}
var showPwdTips = function(msg) {
	$('#pwd_state').removeClass('right');
	$("#pwd_state").text(msg).show();
}
var showRepwdState = function() {
	$('#repwd_state').addClass('right');
	$("#repwd_state").text("").show();
}
var showRepwdTips = function(msg) {
	$('#repwd_state').removeClass('right');
	$("#repwd_state").text(msg).show();
}
var hidePwdRules = function() {
	$("#pwd_rules").hide();
}
var hidePwdState = function() {
	$("#pwd_state").hide();
}
var hideRepwdState = function() {
	$("#repwd_state").hide();
}
var showTips = function(msg) {
	$('#tips').text(msg);
	$('#tipdiv').addClass('visible');
}
var hideTips = function() {
	$('#tipdiv').removeClass('visible');
}
//提示的显示与隐藏触发
var bindTips = function(){
	var _this = this;
	$('#pwd').focus(function() {
		_this.hideTips();
		_this.hidePwdState();
		_this.showPwdRules();
	});
	$('#pwd').keyup(function() {
		_this.hidePwdRules();
		if (_this.isPwd($('#pwd').val())) {
			_this.showPwdState();
			_this.check_btn();
			return true;
		};
		_this.showPwdTips("密码格式错误");
		_this.submitDisabled();
		return false;
	});
	$('#pwd').blur(function() {
		_this.hidePwdRules();
		if (_this.isPwd($('#pwd').val())) {
			_this.showPwdState();
			_this.check_btn();
			return true;
		};
		_this.showPwdTips("密码格式错误");
		return false;
	});
	// $("#pwd").keypress(function () {
//              var lKeyCode = (navigator.appname=="Netscape")?event.which:window.event.keyCode; //event.keyCode按的建的代码，13表示回车
// 				if ( lKeyCode == 13 ){
// 					$('#repwd').focus();
// 				}
//          });
	$('#repwd').keyup(function() {
		if (_this.isPwd($('#repwd').val())) {
			_this.showRepwdState();
			_this.check_btn();
			return true;
		};
		_this.showRepwdTips("密码格式错误");
		_this.submitDisabled();
		return false;
	});
	// $("#repwd").keypress(function () {
//              var lKeyCode = (navigator.appname=="Netscape")?event.which:window.event.keyCode; //event.keyCode按的建的代码，13表示回车
// 				if ( lKeyCode == 13 ){
// 					$('#pwd').focus();
// 				}
//          });
	$('#repwd').focus(function() {
		_this.hideTips();
	}).blur(function(){
		if (!_this.isPwd($('#repwd').val())) 
			_this.showRepwdTips("密码格式错误");
	})
}

var doSubmit = function () {
	var username = cookies.get("username");
	var userId = cookies.get("userId");
	var newpwd = $('#pwd').val();
	var repwd = $('#repwd').val();
	var data = "username=" + username + "&userId=" + userId + "&newPassword=" + newpwd + "&reNewPassword=" + repwd;
	// console.log(data);//test
	hideTips();
	loadAjax({
		url : "/user/resetPassword",
        data : data,
        type: "POST",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
		success : function(result) {
			// console.log(result);//test
			if (result) {
				//提交成功
				if (result.rtnCode === "000") {
					location.href = "newPwdSuccess.html";
				} else if (result.rtnCode === "999"){
					showRepwdTips("密码重置失败");
				} else {
					showTips("网络繁忙,请稍后再试!");
				}
			} else {
				showTips("网络繁忙,请稍后再试!");
			}
		}

	});
	if(event.preventDefault) {
		event.preventDefault();
	} else {
		window.event.returnValue = false;//注意加window
	}
	// return false;
}

bindTips();
$('#btnSubmit').click(function() {
	doSubmit();
})
