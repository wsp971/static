$(function () {
    function home() {
        var _this = this;
        this.init = function () {
            this.events();
            this.initData();
            prefixUrl();
            
        }
        this.events = function () {
            this.goUrl();
            this.isShowLogin();
            this.showCurrent();
        }
        this.isShowLogin = function () {
            if (cookies.get("vertx-web.session") && cookies.get("userId") && cookies.get("userType")) {
                $("#user_login a").text("安全退出");
                $("#user_login").addClass("loging");
            } else {
                this.bindLogin();
            }
        }
        this.showCurrent = function () {
        	$('.header_nav li a').each(function () {
                if ($($(this))[0].href == String(window.location))
                    $(this).parent().addClass('current').attr('href', 'javascript:void(0);');
            });
        }
        this.loadLogin = function (title) {
            layer.open({
                type: 2,
                title: ['', 'background:#fff;'],
                shadeClose: false,
                shade: 0.8,
                shadeClose: false,
                area: ['430px;', '364px'],
                content: '../../../page/login/login.html?title=' + (title || "")
            });
        }
        this.bindLogin = function (title) {
            $("#user_login").click(function () {
                if (!$(this).hasClass("loging")) {
                    _this.loadLogin("");
                }
            })
        }
        this.goUrl = function () {
            $(".needlogin").on("click", function () {
                if (cookies.get("isFirstLogin") == "1" && cookies.get("userType") == "1") {
                    layer.alert('首次登录请先修改密码，马上修改？', { closeBtn: 0,
                        yes: function () {
                            location.href = "../login/first.html";
                        }
                    });
                    return false;
                }
                else  if (!cookies.get("userId") || !cookies.get("userType")) {
                    _this.loadLogin("请先登录亿账通");
                    return false;
                }
            });
        }
        this.initData = function(){
        	loadAjax({
    			url : "/info/getPlatformDyInfo",
    			//data : JSON.stringify({instId: targetInstId, nopage: "1"}),
    			contentType : "application/json",
    			dataType : "json",
    			type : "post",
    			isLoading: false,
    			success : function(result) {
    				if(result && result.rtnCode == "000"){
    					$("#organizationCount").text(result.data.organizationCount);
        				$("#productCount").text(result.data.productCount);
        				$("#tradeCount").text(result.data.tradeCount);
        				$("#tradeNum").text(result.data.tradeNum);
    				}
    			}
    		});
        }
        this.init();
    }
    new home();
})


