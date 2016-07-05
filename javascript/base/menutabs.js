var menuTabs = {
    // 从参数传来的模块名称
    tabModule: "",
    // 从参数传来的页面地址
    pageUrl: "",

    // 初始化组件
    initialize: function () {
        this.initNav();
        this.events();

    },
    // 事件处理
    events: function () {
        this.bindNav();
        this.bindTab();
        this.bindResize();
    },

    // 重置窗体事件
    bindResize: function () {
        $(window).resize(function () {
            menuTabs.setContentHeight();
        });
    },

    // 初始化左侧菜单
    initNav: function () {
        this.tabModule = this.getParameter("tabmodule");
        this.pageUrl = this.getParameter("pageurl");
        var navUrl = "";
        var $tabs = null;
        // 通过url路径过来加载Tab和iframe
        if (this.tabModule && this.pageUrl) {
            $tabs = $('[data-tabmodule="' + this.tabModule + '"]'); // 找到Tab模块
            navUrl = $tabs.find("[data-navurl]").data("navurl"); // 获得菜单列表地址
        }
        // 否则安默认加载第一个Tab的导航数据，取第一个导航地址为ifram加载页
        else {
            if ($("[data-tabmodule]") && $("[data-tabmodule]").length > 0) {
                $tabs = $("[data-tabmodule]").eq(0); // 第一个tab模块
                this.tabModule = $tabs.data("tabmodule") // 第一个tab模块名称
                navUrl = $tabs.find("[data-navurl]").data("navurl"); // 第一个tab模块导航数据地址
            }
        }
        if ($tabs && navUrl) {
            this.loadNav(navUrl, function (responseText) {
                responseText && $("#J_menuBox").append(responseText);
                $("#J_menuBox ul").attr("data-module", menuTabs.tabModule);
                $("#J_menuBox ul").find("a.J_menuItem").attr("data-module",
						menuTabs.tabModule);

                // 为新添加的nav标示唯一序列，如果已经标示过的跳过
                // menuTabs.setMID();

                // 添加Tab和加载iframe的逻辑
                var navindex = "";
                var isfirst = 1;
                if (menuTabs.pageUrl) {
                    $("#J_menuBox .J_menuItem").each(
							function (index) {
							    if ($(this).attr("href").trim().toLowerCase()
										.indexOf(menuTabs.pageUrl) >= 0) {
							        $(this).parent().addClass("active");
							        // navindex = $(this).data("index");
							        isfirst = 0;
							        return;
							    }
							});
                }

                // 如果不到对应的菜单地址，默认选第一个加载
                if (isfirst) {
                    var $fist = $("#J_menuBox .J_menuItem").eq(0);
                    $fist.parent().addClass("active");
                    // navindex = $fist.data("index");
                    menuTabs.pageUrl = $fist.attr("href");
                }
                var tabId = menuTabs.unique();
                $tabs.attr("data-id", tabId);
                $tabs.addClass("active").siblings().removeClass("active");
                // 第一次创建iframe
                if (menuTabs.pageUrl) {
                    menuTabs.createIframe(tabId, menuTabs.tabModule,
							menuTabs.pageUrl)
                }
                // 修正访问URL
                var json = {
                    time: new Date().getTime()
                };
                window.history.pushState
						&& window.history.pushState(json, "",
								document.location.origin
										+ document.location.pathname);
            });
        }
        // 设置内容的高度
        this.setContentHeight();
    },

    // 绑定导航事件
    bindNav: function () {
        $("body").on(
				"click",
				".J_menuItem",
				function () {
				    // 判断当前用户是否过期，如果过期了，提示登录。
				    if (!menus.loginTimeout()) {
				        return false;
				    }

				    var tabName = $(this).data("module");
				    var href = $(this).attr("href"); // 菜单地址

				    if (!href) {
				        return false
				    }

				    $(this).parent("li").addClass("active").siblings()
							.removeClass("active");
				    var $iframe = $(".J_mainContent .J_iframe[data-module='"
							+ tabName + "']");
				    if ($iframe) {
				        $iframe.attr("src", href);
				        $iframe.show().siblings().hide();
				        $(".J_menuTab[data-tabmodule='" + tabName + "']")
								.addClass("active").siblings().removeClass(
										"active");
				    }
				    menuTabs.getLocation($(".J_menuTab.active"));
				    menuTabs.swithScreen(false); // 恢复左右屏
				    return false
				});
    },

    // 加载iframe
    loadIframe: function (mindex, mtext, href) {
        var isOpen = true;
        // 判断是否已经有加载上，如果有显示原来的那个，没有就新加载
        $(".J_menuTab").each(
				function () {
				    if ($(this).data("id") == mindex) {
				        if (!$(this).hasClass("active")) {
				            $(this).addClass("active").siblings(".J_menuTab")
									.removeClass("active");
				            menuTabs.getLocation(this);
				            $(".J_mainContent .J_iframe").each(
									function () {
									    if ($(this).data("id") == mindex) {
									        $(this).show()
													.siblings(".J_iframe")
													.hide();
									        return false
									    }
									})
				        }
				        isOpen = false;
				        return false
				    }
				});

        if (isOpen) {
            var tab = '<li class="J_menuTab active" data-id="' + mindex
					+ '"><a href="javascript:;" class="tab-title">' + mtext
					+ '</a>';
            tab += '<a href="javascript:;" class="tab-refresh"><i class="iconfont shuaxin">&#xe614;</i></a>';
            tab += '<a href="javascript:;" class="tab-close"><i class="iconfont icon-guanbi1">&#xe60c;</i></a></li>';
            $(".J_menuTab").removeClass("active");
            var iframe = '<iframe class="J_iframe" name="iframe' + mindex
					+ '" width="100%" height="100%" src="' + href
					+ '" frameborder="0" data-id="' + mindex
					+ '" seamless></iframe>';
            $(".J_mainContent").find("iframe.J_iframe").hide().parents(
					".J_mainContent").append(iframe);
            $(".J_menuTabs .page-tabs-content").append(tab);
            menuTabs.getLocation($(".J_menuTab.active"))
        }
    },

    // 第一次创建iframe
    createIframe: function (tabId, tabName, src) {
        var iframe = '<iframe class="J_iframe" data-id ="' + tabId
				+ '" data-module="' + tabName
				+ '" width="100%"  height="100%" src="' + src
				+ '" frameborder="0" seamless></iframe>';
        $(".J_mainContent .J_iframe").hide();
        $(".J_mainContent").append(iframe);
    },

    // 内部跳转提供外部调用
    link: function (tabName, navName, pageUrl) {
        window.parent.menuTabs._link(tabName, navName, pageUrl);
        return this;
    },

    // 内部跳转私有方法
    _link: function (tabName, navName, pageUrl) {
        if (tabName && navName && pageUrl) {
            $(".J_menuTab[data-tabmodule='" + tabName + "']").trigger("click");
            var $nav = $(".J_menuItem[name='" + navName + "']");
            var $iframe = $(".J_iframe[data-module='" + tabName + "']");
            if ($nav.length > 0 && $iframe.length > 0) {
                $nav.parent("li").addClass("active").siblings().removeClass(
						"active");
                $iframe.attr("src", pageUrl);
            } else {
                var timer = setInterval(function () {
                    loadLink(timer);
                }, 100);
            }
        }

        function loadLink(timer) {
            var $nav = $(".J_menuItem[name='" + navName + "']");
            var $iframe = $(".J_iframe[data-module='" + tabName + "']");
            if ($nav.length > 0 && $iframe.length > 0) {
                $nav.parent("li").addClass("active").siblings().removeClass(
						"active");
                $iframe.attr("src", pageUrl);
                clearInterval(timer);
            } else {
                // 处理无限查找，消耗内存;
                setTimeout(function () {
                    clearInterval(timer);
                }, 3000);
            }
        }
        return this;
    },

    // 子窗口关闭标签
    close: function () {
        window.parent.menuTabs._close();
        return false;
    },

    _close: function () {
        window.coloseBefore = null;
        $(".J_menuTab.active .tab-close").trigger("click");
        return false;
    },

    // 子窗口打开tab选项卡,提供调用方式
    open: function (tabid, title, url, event) {
        var event = event || window.event;
        var src = event.srcElement || event.target;
        $target = $(src);
        var mindex = "", mtext = "", href = ""; // 菜单编号
        if (tabid) {
            mindex = tabid;
            $target.attr("data-index", mindex);
        } else {
            mindex = $target.data("index"); // 直接从元素上取值
            if (!mindex) {// 如果没取到，直接生成新的tabID，并赋值给该元素
                mindex = menuTabs.unique();
                $target.attr("data-index", mindex)
            }
        }
        if (title) { // 标签文本
            mtext = title;
        } else {
            mtext = $.trim($target.children("span").text() || $target.text()); // 菜单文本
        }

        if (url) {
            href = url; // 菜单地址 url
        } else {
            href = $target.attr("href"); // 菜单地址
        }

        if (href == undefined || $.trim(href).length == 0) {
            return false
        }
        // 默认宽屏

        var screen = $target.attr("data-screen") || 1;

        window.parent.menuTabs.create(mindex, mtext, href, screen);
        return false;
    },

    // 创建tab选项卡
    create: function (mindex, mtext, href, screen, event) {
        // 1表示全屏显示，其他只在右边显示内容
        if (screen == 1) {
            menuTabs.swithScreen(true);
        } else {
            menuTabs.swithScreen(false);
        }
        menuTabs.loadIframe(mindex, mtext, href);

        return false
    },

    // 恢复全屏还是左右屏显示
    swithScreen: function (is) {
        if (is) { // 全屏
            $(".navbar-default").hide();
            $(".page-wrapper").css("marginLeft", "0");
        } else {// 左右屏
            $(".navbar-default").show();
            $(".page-wrapper").css("marginLeft", "165px");
        }
    },

    // 绑定选项卡事件
    bindTab: function () {
        // 绑定选项卡点击事件
        $(".J_menuTabs")
				.on(
						"click",
						".J_menuTab",
						function () {
						    var _this = this;
						    if (!$(this).hasClass("active")) {
						        var tabid = $(this).data("id");
						        var tabName = $(this).data("tabmodule");
						        var $nav = $("#J_menuBox .nav[data-module='"
										+ tabName + "']");
						        if ($nav && $nav.length > 0) {
						            $nav.show().siblings().hide();
						            menuTabs.swithScreen(false); // 恢复左右屏
						        } else {
						            menuTabs.swithScreen(true);
						        }
						        if (tabid) {
						            $(".J_mainContent .J_iframe")
											.each(
													function () {
													    if ($(this).data("id") == tabid) {
													        $(this)
																	.show()
																	.siblings(
																			".J_iframe")
																	.hide();
													        return false
													    }
													});
						            // $(this).addClass("active").siblings(".J_menuTab").removeClass("active");
						            // menuTabs.getLocation(this);
						        } else { // 打开固定的新标签，加载导航数据，然后显示默认显示第一菜单数据
						            // var tabid = menuTabs.unique(),
						            var navUrl = $(this).find("[data-navurl]")
											.data("navurl"), tabModule = $(this)
											.attr("data-tabmodule");
						            // $(this).attr("data-id", tabid);

						            if (navUrl) {
						                menuTabs
												.loadNav(
														navUrl,
														function (responseText) {
														    $("#J_menuBox ul")
																	.hide();
														    responseText
																	&& $(
																			"#J_menuBox")
																			.append(
																					responseText);
														    var $newUl = $("#J_menuBox ul:last");
														    $newUl
																	.attr(
																			"data-module",
																			tabModule);
														    $newUl
																	.find(
																			"a.J_menuItem")
																	.attr(
																			"data-module",
																			tabModule);

														    // 为新添加的nav标示唯一序列，如果已经标示过的跳过
														    // menuTabs.setMID();

														    // 默认选第一个加载
														    var $fist = $(
																	"#J_menuBox ul:last li a")
																	.eq(0);
														    $fist
																	.parent()
																	.addClass(
																			"active");
														    // var index =
														    // $fist.data("index");
														    var pageUrl = $fist
																	.attr("href");
														    // $(_this).attr("data-id",
														    // index);

														    var tabId = menuTabs
																	.unique();
														    $(_this).attr(
																	"data-id",
																	tabId);
														    // 点击后创建iframe
														    menuTabs.pageUrl
																	&& menuTabs
																			.createIframe(
																					tabId,
																					tabModule,
																					pageUrl)
														    menuTabs
																	.swithScreen(false); // 恢复左右屏
														});
						            }

						        }
						        $(this).addClass("active").siblings(
										".J_menuTab").removeClass("active");
						        menuTabs.getLocation(this);
						    }
						});

        // 关闭tab函数
        function closeTab(target) {
            var m = $(target).parents(".J_menuTab").data("id");
            var l = $(target).parents(".J_menuTab").width();
            if ($(target).parents(".J_menuTab").hasClass("active")) {
                if ($(target).parents(".J_menuTab").next(".J_menuTab").size()) {
                    var k = $(target).parents(".J_menuTab").next(
							".J_menuTab:eq(0)").data("id");
                    $(target).parents(".J_menuTab").next(".J_menuTab:eq(0)")
							.addClass("active");
                    $(".J_mainContent .J_iframe").each(function () {
                        if ($(this).data("id") == k) {
                            $(this).show().siblings(".J_iframe").hide();
                            return false;
                        }
                    });
                    var n = parseInt($(".page-tabs-content").css("margin-left"));
                    if (n < 0) {
                        $(".page-tabs-content").animate({
                            marginLeft: (n + l) + "px"
                        }, "fast")
                    }
                    $(target).parents(".J_menuTab").remove();
                    $(".J_mainContent .J_iframe").each(function () {
                        if ($(this).data("id") == m) {
                            $(this).remove();
                            return false;
                        }
                    })
                }
                if ($(target).parents(".J_menuTab").prev(".J_menuTab").size()) {
                    var $preTab = $(target).parents(".J_menuTab").prev(
							".J_menuTab:last");
                    var tabId = $preTab.data("id");
                    if (!tabId) {// 再往前查找一个
                        $preTab = $preTab.prev(".J_menuTab:last");
                        tabId = $preTab.data("id");
                    }
                    $preTab.addClass("active");
                    // $(this).parents(".J_menuTab").prev(".J_menuTab:last").addClass("active");
                    $(".J_mainContent .J_iframe")
							.each(
									function () {
									    if ($(this).data("id") == tabId) {
									        $(this).show()
													.siblings(".J_iframe")
													.hide();
									        var tabName = $(this)
													.data("module");
									        if (tabName) {
									            $(
														".nav[data-module = '"
																+ tabName
																+ "']").show()
														.siblings().hide();
									            menuTabs.swithScreen(false);
									        }
									        return false;
									    }
									});
                    $(target).parents(".J_menuTab").remove();
                    $(".J_mainContent .J_iframe").each(function () {
                        if ($(this).data("id") == m) {
                            $(this).remove();
                            return false;
                        }
                    })
                }
            } else {
                $(target).parents(".J_menuTab").remove();
                $(".J_mainContent .J_iframe").each(function () {
                    if ($(this).data("id") == m) {
                        $(this).remove();
                        return false;
                    }
                });
                menuTabs.getLocation($(".J_menuTab.active"))
            }
        }
        ;

        // 绑定选项卡关闭事件
        $(".J_menuTabs").on("click", ".J_menuTab .tab-close", function () {
            var _this = this;
            // window.coloseBefore = $.isFunction(window.coloseBefore) ?
            // window.coloseBefore(): closeTab(_this);
//            if (window.coloseBefore && $.isFunction(window.coloseBefore)) {
//                window.coloseBefore();  
//            } else {
                closeTab(_this);
//            }
            return false;
        });

        // 绑定选项卡刷新事件
        $(".J_menuTabs").on("click", ".J_menuTab .tab-refresh", function () {
            var id = $(this).parent("li").data("id");
            id && $(".J_mainContent .J_iframe").each(function () {
                if ($(this).data("id") == id) {
                    this.src = this.src;
                    return false;
                }
            });
        });
    },

    // 加载菜单数据
    loadNav: function (url, fn) {
        url && $.get(url, {}, function (responseText, textStatus) {
            fn && fn(responseText);
        });
    },

    // 给菜单添加唯一标识
    setMID: function () {
        $(".J_menuItem").each(function (index) {
            if (!$(this).attr("data-index")) {
                // $(this).attr("data-index", index);
                $(this).attr("data-index", menuTabs.unique())
            }
        });
    },

    // 设置content内容的高度
    setContentHeight: function () {
        var headHt = $(".header").height(), footHt = $(".footer").height(), clientHt = $(
				window).height(), contentHt = (clientHt - headHt - footHt)
				+ "px";
        $(".J_mainContent") && $(".J_mainContent").css("height", contentHt);

    },

    // 获取新的菜单标识号；
    unique: function (len) {
        len = len || 10;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd.toLowerCase();
    },

    // 获取url参数
    getParameter: function (t) {
        var e = new RegExp("[&,?]" + t + "=([^\\&]*)", "i"), i = e
				.exec(location.search);
        return i ? i[1] : ""
    },
    // 计算元素宽度
    getWidth: function (l) {
        var k = 0;
        $(l).each(function () {
            k += $(this).outerWidth(true)
        });
        return k
    },
    // 获取标签位置
    getLocation: function (n) {
        var o = menuTabs.getWidth($(n).prevAll()), // 当前选项卡的前几个Tab长度
		q = menuTabs.getWidth($(n).nextAll()); // 当前选项卡的后几个Tab长度
        var l = menuTabs.getWidth($(".content-tabs").children().not(
				".J_menuTabs")); // 选项卡列表外元素长度
        var k = $(".content-tabs").outerWidth(true) - l; // 选项卡列表的有效宽度
        var p = 0;
        // 当前已有的选项卡宽度
        if ($(".page-tabs-content").outerWidth() < k) {
            p = 0
        } else {
            if (q <= (k - $(n).outerWidth(true) - $(n).next().outerWidth(true))) {
                if ((k - $(n).next().outerWidth(true)) > q) {
                    p = o;
                    var m = n;
                    while ((p - $(m).outerWidth()) > ($(".page-tabs-content")
							.outerWidth() - k)) {
                        p -= $(m).prev().outerWidth();
                        m = $(m).prev()
                    }
                }
            } else {
                if (o > (k - $(n).outerWidth(true) - $(n).prev().outerWidth(
						true))) {
                    p = o - $(n).prev().outerWidth(true)
                }
            }
        }
        $(".page-tabs-content").animate({
            marginLeft: 0 - p + "px"
        }, "fast")
    }
};

var menus = {
    user: {},
    path: {
        com: "/page/lobby/menu-com.html",
        vip: "/page/lobby/menu-vip.html"
    },
    init: function (fn) {
        this.getUserInfo();
        this.bindUserName();
        this.initMenu(fn);
    },

    getUserInfo: function () {
        this.user = {
            userType: cookies.get("userType") || "", // 1指vip用户，0是普通用户，2后台用户
            userId: cookies.get("userId") || "",
            username: cookies.get("username") || "",
            session: cookies.get("vertx-web.session") || "",
            instName: cookies.get("vertx-web.session") || "",
            userStatus: cookies.get("userStatus") == "1" ? true : false, // 1指用户有效，0指用户无效，普通用户升级高低用户后，vip用户失效，后台会去创建机构用户。
            isFirstLogin: cookies.get("isFirstLogin") == "1" ? true : false
        }
        return this.user;
    },

    bindUserName: function () {
        $("#username").text(this.user.username);
    },

    initMenu: function (fn) {
        var menuUrl = "";
        switch (this.user.userType) {
            case "1":
                menuUrl = this.path.vip;
                break;
            case "0":
                menuUrl = this.path.com;
                break;
            default:
                break;

        }
        // 普通用户第一次登陆不需要更改密码，仅有高级用户第一次登陆才修改密码
        if (this.user.isFirstLogin && this.user.userStatus && menuUrl) {
            if (this.user.userType == "1") {
                location.href = "../login/first.html";
            } else {
                loadpage(menuUrl, fn);
            }
        } else if (!this.user.isFirstLogin && this.user.userStatus && menuUrl) {
            loadpage(menuUrl, fn);
        } else {
            location.href = "../home/index.html";
        }

        function loadpage(menuUrl, fn) {
            ($("#tab-menu").length > 0) && $.loadAjax({
                url: menuUrl,
                type: "get",
                dataType: "text",
                success: function (text) {
                    $("#tab-menu").html(text);
                    fn && fn();
                }
            });
        }
    },

    loginTimeout: function () {
        // 判断当前用户是否过期，如果过期了，提示登录。
        if (!cookies.get("userId") || !cookies.get("userType") || !cookies.get("userStatus")) {
            layer.msg("登录过期，请重新登录", {
                time: 3000,
                shade: [0.5, '#fff']
            }, function (index) {
                layer.close(index);
                location.href = "../../page/login/loginPage.html";
            })
            return false;
        }
        return true;
    }
}

!function () {
    if ($("#tab-menu").length > 0) {
        menus.init(function () {
            window.tab = window.menuTabs = menuTabs;
            tab.initialize();
        });
    } else {
        window.tab = window.menuTabs = menuTabs;
        tab.initialize();
    }
} ();