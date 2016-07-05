// define([
//     "controllers/verifyController"
// ], function (verifyController) {
//     new verifyController();
// }); 
//提示的显示与隐藏
var showTips = function(msg) {
	$('#tips').text(msg);
	$('#tipdiv').addClass('visible');
}
var hideTips = function() {
	$('#tipdiv').removeClass('visible');
}
var doSubmit = function() {
	hideTips();
	var host = utils.getHost();
	// alert(host);//test
	var username = cookies.get("username");
	var userId = cookies.get("userId").trim();
	var email = cookies.get("email").trim(); 
	var emailsubject = "通过邮箱验证身份";
	var url = host + "/page/login/verifyAccess.html";
	var con_url = url + "?username=" + username + "&userId=" + userId + "&email=" +email;
	var data = {
		userId: userId,
        username: username,
        link: '<a href="' + con_url + '">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor</a>',
        email: email
	};
	// console.log(data);//test
	// console.log(JSON.stringify(data));//test
	loadAjax({
		url : "/email/sendEmailByLink2",
        data: JSON.stringify(data),
        type: "POST",
        dataType: "json",
        contentType: "application/json",
		success : function(result) {				
			// console.log(result);//test
			if (result) {
				if (result.rtnCode === "000") {
					location.href = "sendEmail.html";
				} else if (result.rtnCode === "999") {
					showTips("网络繁忙，请稍后再试");
				}else {
					showTips("网络繁忙，请稍后再试");
				}
			} else {
				showTips("网络繁忙，请稍后再试");
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
// 获取邮箱
function getMyEmail() {
	var myemail = cookies.get("email").trim();
	$("#email").text(secureEmail(myemail));
	// $("#email").text(myemail);//test
}
// 邮箱前两位到@之间隐藏
function secureEmail(email) {
		var c=email.split("@");
 	  	var c1=c[0].substr(2);
 	  	var xing="";
 	  	for(var i=0;i<c1.length;i++){
 	  		 xing+="*";
 	  	}
 	  	var myemail=c[0].substr(0,2)+xing+"@"+c[1];
 	  	return myemail;
}

getMyEmail();
$('#send_email').click(function() {
	doSubmit();
})

