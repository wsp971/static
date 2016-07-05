//define(["jquery", "common/views"], function ($, view) {
//    return new view.extend({
//        init: function () {
//            var validate_rules = {
//                title: function () {
//                    $(".module h4").html("修改密码")
//                },
//                oldpwd: function (flag) {
//                    var value = $("#iptopdpwd").val().trim();
//                    // 旧密码
//                    if (!value) {
//                        flag && pwdMg.alertMsg("#iptopdpwd", "请输入原密码！", "error");
//                        return false;
//                    } else {
//                        pwdMg.clearMsg("#iptopdpwd");
//                        return true;
//                    }
//                },
//                newpwd: function (flag) {
//                    var value = $("#iptnewpwd").val().trim();
//                    // 新密码
//                    if (!value) {
//                        flag && pwdMg.alertMsg("#iptnewpwd", "请输入新密码！", "error");
//                        return false;
//                    } else if (!/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s]{6,20}$/.test(value)) {
//                        flag && pwdMg.alertMsg("#iptnewpwd", "请输入6-20位字母与数字组合！", "error");
//                        return false;
//                    } else {
//                        pwdMg.clearMsg("#iptnewpwd");
//                        return true;
//                    }
//                },
//                repwd: function (flag) {
//                    var newpwd = $("#iptnewpwd").val().trim();
//                    var repwd = $("#iptrenewpwd").val().trim();
//                    // 再次新密码
//                    if (!repwd) {
//                        flag && pwdMg.alertMsg("#iptrenewpwd", "请确认新密码！", "error");
//                        return false;
//                    } else if (newpwd !== repwd) {
//                        flag && pwdMg.alertMsg("#iptrenewpwd", "两次密码不同！", "error");
//                        return false;
//                    } else {
//                        pwdMg.clearMsg("#iptrenewpwd");
//                        return true;
//                    }
//                },
//                yzm: function (flag) {
//                    var yzm = $("#iptyzm").val().trim();
//                    if (!yzm) {
//                        flag && pwdMg.alertMsg("#code_img", "请输入验证码！", "error");
//                        return false;
//                    } else {
//                        pwdMg.clearMsg("#code_img");
//                        return true;
//                    }
//                }
//            }

//            var email = {
//                sendEmail: function () {
//                    var username = cookies.get("username");
//                    var userId = cookies.get("userId");
//                    var email = cookies.get("email").trim();
//                    var emailsubject = "修改密码邮件验证";
//                    //var emailcontext = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>亿账通账户验证</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head><body style="margin: 0; padding: 0;"><table border="1" cellpadding="0" cellspacing="0" width="100%"><tr><td> Hello! </td></tr></table><table align="center" border="1" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;"><tr><td>第一段11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</td></tr><tr><td> Row 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222请点击链接 <a href="' + con_url + '"></a> 继续操作 </td></tr><tr><td> Row 333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333 </td></tr></table></body></html>';
//                    var data = {
//                        userId: userId,
//                        username: username,
//                        email: email,
//                        emailsubject: emailsubject
//                    };
//                    if (userId && email) {
//                        loadAjax({
//                            url: "/email/sendEmailByVerCode",
//                            data: JSON.stringify(data),
//                            type: "POST",
//                            dataType: "json",
//                            contentType: "application/json",
//                            success: function (result) {
//                                if (result) {
//                                    if (result.rtnCode === "000") {
//                                        layer.open({
//                                            type: 2,
//                                            title: ['', 'background:#fff;'],
//                                            shadeClose: true,
//                                            shade: 0.8,
//                                            shadeClose: false,
//                                            area: ['380px;', '364px'],
//                                            content: 'firstEmail.html'
//                                        });
//                                    } else {
//                                        showTips("网络繁忙,请稍后再试!");
//                                    }
//                                } else {
//                                    showTips("网络繁忙,请稍后再试!");
//                                }
//                            }
//                        });
//                        if (event.preventDefault) {
//                            event.preventDefault();
//                        } else {
//                            window.event.returnValue = false; //注意加window
//                        }
//                    }
//                }
//            }

//            var pwdMg = {
//                submitUrl: "/More/UpdatePwd",
//                initialize: function () {
//                    this.getVcodeImage();
//                    this.bindEvents();
//                    this.email();
//                },
//                bindEvents: function () {
//                    this.focusEvent();
//                    this.bindSubmit();
//                    this.minitSubmit();
//                },
//                email: function () {
//                    $("#send-email").on("click", function () {
//                        if (pwdMg.validate(false) === false) {
//                            return false;
//                        }
//                        email.sendEmail();

//                    });
//                },
//                focusEvent: function () {
//                    var self = this;
//                    $("#iptopdpwd").on({
//                        focusin: function () {
//                            pwdMg.clearMsg("#iptopdpwd");
//                        },
//                        focusout: function () {
//                            validate_rules.oldpwd(true);

//                        }
//                    });
//                    $("#iptnewpwd").on({
//                        focusin: function () {
//                            pwdMg.clearMsg("#iptnewpwd");

//                        },
//                        focusout: function () {
//                            validate_rules.newpwd(true);
//                        }
//                    });
//                    $("#iptrenewpwd").on({
//                        focusin: function () {
//                            pwdMg.clearMsg("#iptrenewpwd");
//                        },
//                        focusout: function () {
//                            validate_rules.repwd(true);
//                        }
//                    });

//                    $("#yzmcode, .imgvcode").click(function () {
//                        self.getVcodeImage();
//                    });
//                },
//                validate: function (arguments) {
//                    for (var i in validate_rules) {
//                        if (validate_rules[i].call(this, arguments) === false) {
//                            return false;
//                        }
//                    }
//                },

//                minitSubmit: function () {
//                    setInterval(function () {
//                        if (pwdMg.validate(false) === false) {
//                            $("#btnSubmit").attr("disabled", "disabled").removeClass("btn-primary");
//                            return;
//                        }
//                        $("#btnSubmit").removeAttr("disabled").addClass("btn-primary");
//                    }, 500);
//                },


//                bindSubmit: function () {
//                    var self = this;
//                    $("#btnSubmit").on('click', function () {

//                        var userId = cookies.get("userId")
//                        var data = "userId=" + userId + "&oldPassword=" +
//						$('#iptopdpwd').val().trim() + "&newPassword=" + $('#iptnewpwd').val().trim()
//						+ "&reNewPassword=" + $('#iptrenewpwd').val().trim();

//                        if (self.validate(true) === false) {
//                            return;
//                        }
//                        loadAjax({
//                            url: "/user/changePassword",
//                            data: data,
//                            type: "post",
//                            dataType: "json",
//                            contentType: "application/x-www-form-urlencoded",
//                            success: function (result) {
//                                if (result) {
//                                    if (result["retCode"] == "000") {
//                                        layer.alert('密码修改成功，现在去登录？', { time: 2000 }, function () {
//                                            location.href = "../../../page/login/loginPage.html";
//                                        });
//                                    } else {
//                                        alertMsg("", result.Message, "error");
//                                    }
//                                } else {
//                                    layer.alert('网络繁忙,请稍后重试!');
//                                }
//                            }
//                        });
//                    })
//                },

//                alertMsg: function (msid, msg, type) {
//                    var type = type || "error";
//                    var parent = $(msid).parent();
//                    parent.next().remove();
//                    parent.after('<div class="state hidden" id="pwd_state" style="display: block; background-position: 0px -377px;">' + msg + '</div>');
//                },

//                clearMsg: function (msid) {
//                    var parent = $(msid).parent();
//                    parent.next().remove();
//                },

//                getVcodeImage: function () {
//                    $("#iptyzm").val("");
//                }
//            }

//            pwdMg.initialize();
//        }
//    });
//})	
