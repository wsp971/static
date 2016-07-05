define(["jquery", "common/views"], function ($, view) {
    return new view.extend({
        //初始化方法
        init: function () {
            //初始化登录文本
            this.initTitle();

            //软键盘位置初始化
            this.initKeybord();

            //账户名清楚按钮
            this.usersky();

            //验证码
            //this.showVCode();

            //清楚报错信息
            this.hideWhenWrite();

            //更换验证码
            this.showVCode();
            this.getVcodeImage();

            // 绑定提交		 
            this.bindSubmit();
        },

        //初始化登录文本
        initTitle: function () {
            var title = utils.getParameter("title");
            title && $(".title").text("登录亿账通");
        },

        initKeybord: function () {
            window.fixedLeft = 53;
        },

        // 输入文本时隐藏提示框
        hideWhenWrite: function () {
            var _this = this;
            $("#username").focus(function () {
                _this.hideTips();
            });
            $("#password").focus(function () {
                _this.hideTips();
            })
        },
        showVCode: function () {
            $("#img").attr("src", window.rootPath + "/user/getCaptcha?test=" + new Date());
        },
        getVcodeImage: function () {
            var _this = this;
            $("#imgvcode, .vcode").click(function () {
                _this.showVCode()
            });
        },
        // 登陆验证
        validate_rules: {
            // 资金账号
            username: function () {
                var value = $("#username").val().trim();
                if (!value) {
                    this.showTips("请输入用户名！");
                    return false;
                }
                return true;
            },
            // 交易密码
            pwd: function () {
                var value = $("#password").val().trim();
                if (!value) {
                    this.showTips("请输入密码！");
                    return false;
                }
                return true;
            },
            // 图片验证码
            imgyzm: function () {
                var value = $("#vcode").val().trim();
                if (!value) {
                    this.showTips("请输入验证码!");
                    return false;
                }
                return true;
            }
        },
        // 执行验证
        validate: function () {
            var _this = this;
            for (var i in _this.validate_rules) {
                if (_this.validate_rules[i].apply(this, arguments) === false) {
                    return false;
                }
            }
        },

        showTips: function (msg) {
            $("#liyzmbox").text(msg);
            $("#liyzmbox").css("visibility", "visible");
        },

        hideTips: function () {
            $("#liyzmbox").text("");
            $("#liyzmbox").css("visibility", "hidden");
        },

        // 绑定提交事件
        bindSubmit: function () {
            var _this = this;
            $("#btnSubmit").click(function () {
                _this.doSubmit();
                return false;
            });
        },
        usersky: function () {
            $("#sky").click(function () {
                $("#username").val("");
            })
        },

        // 执行提交
        doSubmit: function () {
            var _this = this;
            if (_this.validate() === false) {
                return;
            }
            var data = {
                username: $('#username').val().trim(),
                password: $('#password').val().trim(),
                captcha: $('#vcode').val().trim()
            };
            loadAjax({
                url: "/user/login",
                data: JSON.stringify(data),
                type: "post",
                dataType: "json",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                success: function (result) {
                    if (result) {
                        // 登入成功
                        if (result["rtnCode"] === "000") {
                            //特殊处理，后台写中文cookie出问题
                            !cookies.get("instName") && cookies.set("instName", (result.data && unescape(result.data["instName"]) || ""));
                            var isfirstlogin = result["isFirstLogin"] == "1" ? true : false;
                            var userStatus = result.data["userStatus"] == "1" ? true : false; // 1指用户有效，0指用户无效，普通用户升级高低用户后，vip用户失效，后台会去创建机构用户。
                            if (!userStatus) {
                                _this.showTips("账号暂时无法使用，请联系您的客户经理！");
                                _this.showVCode();
                                return;
                            }
                            // 判断会员类型
                            if (result["data"].userType == "1" && isfirstlogin == true) {
                                window.open("../login/first.html", "_parent");
                            } else {
                                window.open("../lobby/main.html", "_parent");
                            }

                        } else if (result["rtnCode"] === "902") {
                            _this.showTips("验证码错误,请重新输入！");
                            _this.showVCode();
                        } else if (result["rtnCode"] === "903") {
                            _this.showTips("账号暂时无法使用，请联系您的客户经理！");
                            _this.showVCode();
                        } else if (result["rtnCode"] === "901") {
                            _this.showTips("账户名或密码错误！");
                            _this.showVCode();
                        } else if (result["rtnCode"] === "904") {
                            _this.showTips("账户名或密码错误！");
                            _this.showVCode();
                        } else {
                            _this.showTips("服务器繁忙，请稍后再试！");
                            _this.showVCode();
                        }
                    } else {
                        _this.showTips("用户名或密码错误！");
                        _this.showVCode();
                    }
                }
            });
        }

    });
});
// 多资产账户登录模块

