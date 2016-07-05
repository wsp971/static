define(["jquery",
        "common/views",
        "layer",
        "../service/forgotService"
],
		function ($, view, layer, ForgotService) {
		    return new view.extend({
		        init: function () {
		            var _this = this;

		            this.forgotService = new ForgotService();		           

		            $("#imgvcode").click(function () {
		                _this.showVCode();
		            });

		            // 执行验证码加载
		            this.showVCode = function () {
		                $("#code_img").attr("src", "/user/getCaptcha?test=" + new Date());
		            }
		            //用户名输入框检测
		            $("#username").focus(function () {
		                _this.hideTips();
		                _this.hideUserTips();
		            }).blur(function () {
		                var value = $("#username").val().trim();
		                if (!value) {
		                    _this.showUserTips("请输入用户名！");
		                    _this.submitDisabled();
		                }
		            });
		            $("#username").keyup(function () {
		                var value = $("#username").val().trim();
		                if (!value) {
		                    _this.showUserTips("请输入用户名！");
		                    _this.submitDisabled();
		                    return false;
		                } else {
		                    _this.hideUserTips();
		                    _this.check_btn();
		                }
		            });
		            $("#username").keypress(function () {
		                var lKeyCode = (navigator.appname=="Netscape")?event.which:window.event.keyCode; //event.keyCode按的建的代码，13表示回车
    					if ( lKeyCode == 13 ){
    						$('#verifyCode').focus();
    					}
		            });

		            //验证码输入框检测
		            $("#verifyCode").focus(function () {
		                _this.hideVcodeTips();
		                _this.hideTips();
		            }).blur(function () {
		                var value = $("#verifyCode").val().trim();
		                if (!value) {
		                    _this.showVcodeTips("请输入验证码！");
		                    _this.submitDisabled();
		                }
		            });
		            $("#verifyCode").keyup(function () {
		                var value = $("#verifyCode").val().trim();
		                if (!value) {
		                    _this.showVcodeTips("请输入验证码！");
		                    _this.submitDisabled();
		                    return false;
		                } else {
		                    _this.hideVcodeTips();
		                    _this.check_btn();
		                }
		            });
		            $("#verifyCode").keypress(function () {
		                var lKeyCode = (navigator.appname=="Netscape")?event.which:window.event.keyCode; //event.keyCode按的建的代码，13表示回车
    					if ( lKeyCode == 13 ){
    						$('#username').focus();
    					}
		            });

		            //btn的可用与禁用状态
		            this.submitshow = function () {
		                $("#btnSubmit").removeAttr("disabled").addClass("btn-primary");
		            }
		            this.submitDisabled = function () {
		                $("#btnSubmit").attr("disabled", "disabled").removeClass("btn-primary");
		            }

		            //btn恢复判断
		            this.check_btn = function () {
		                if ($("#verifyCode").val().trim() && $("#username").val().trim()) {
		                    _this.submitshow();
		                }
		            }

		            //提示语句的显示与隐藏
		            this.showUserTips = function (msg) {
		                $("#liyzmboxuesr").text(msg).show();
		            }
		            this.showVcodeTips = function (msg) {
		                $("#liyzmboxvcode").text(msg).show();
		            }

		            this.hideUserTips = function () {
		                $("#liyzmboxuesr").hide();
		            }
		            this.hideVcodeTips = function () {
		                $("#liyzmboxvcode").hide();
		            }
		            this.showTips = function (msg) {
		                $('#tips').text(msg);
		                $('#tipdiv').addClass('visible');
		            }
		            this.hideTips = function () {
		                $('#tipdiv').removeClass('visible');
		            }

		            this.showVCode();
		        },

		        events: {
		            "click #btnSubmit": "doSubmitAjax"
		        },
		        handlers: {
		            doSubmitAjax: function (event) {
		                this.forgotService.doSubmit(event);
		            }

		        }
		    });
		}
); 