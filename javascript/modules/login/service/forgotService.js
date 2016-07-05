define(function () {

    function ForgotService() {
    }

    var showTips = function (msg) {
        $('#tips').text(msg);
        $('#tipdiv').addClass('visible');
    }
    var hideTips = function () {
        $('#tipdiv').removeClass('visible');
    }
    var alertNoPermission = function () {
        layer.open({
            type: 2,
            title: ['', 'background:#fff;'],
            shadeClose: true,
            shade: 0.8,
            shadeClose: false,
            area: ['380px;', '364px'],
            content: 'cannotFindPwd.html'
        });
    }


    // 执行验证码加载
    var showVCode = function () {
        $("#code_img").attr("src", "/user/getCaptcha?test=" + new Date());
    }


    function doSubmit(event) {
        var data = "username=" + $("#username").val().trim() + "&captcha=" + $('#verifyCode').val();
        loadAjax({
            url: "/user/checkRole",
            data: data,
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function (result) {
                if (result) {
                    if (result.rtnCode === "000") {
                        location.href = "verify.html";
                    } else if (result.rtnCode === "901") {
                        showTips("用户名不存在");
                    } else if (result.rtnCode === "902") {
                        showTips("验证码错误");
                    } else if (result.rtnCode === "999") {
                        alertNoPermission();
                    } else {
                        showTips("网络繁忙,请稍后再试!");
                    }
                    showVCode();
                } else {
                    showTips("网络繁忙,请稍后再试!");  //输入框获得焦点时候再隐藏
                }
            }

        });
        if(event.preventDefault) {
            event.preventDefault();
        } else {
            window.event.returnValue = false;//注意加window
        }
    }

    ForgotService.prototype.doSubmit = doSubmit;
    return ForgotService;
})