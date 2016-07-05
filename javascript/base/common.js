/***
** Author: Allen Zhang
** UM：zhanghong512
***/

/*******************************************************************************
* * 功能：不同环境api地址可能不一样，这里定义api地址前缀部分，如果前缀不一样，只需简单配置即可； * rootPath
* 是全局变量，一旦赋值，所有页面便可使用；
******************************************************************************/
var envConfig = {
    dev: true,
    test: false,
    prod: false
};
!function () {
    if (envConfig.dev) {
        window.rootPath = ""; // 测试环境的接口地址前缀
    } else if (envConfig.test) {
        window.rootPath = "/fic_web_ii"; // 开发环境的接口地址前缀
    } else if (envConfig.prod) {
        window.rootPath = ""; // 生产环境的接口地址前缀
    }
} ();

/*******************************************************************************
* * 功能：处理低版本IE上控制输出不错情况
******************************************************************************/
window.console || (window.console = {
    log: function () { },
    warn: function () { },
    error: function () { },
    info: function () { }
});

/*******************************************************************************
* * 功能：初始化页面加载loading效果
******************************************************************************/
$(window).load(function () {
    $("#loading").hide()
}),

/*******************************************************************************
* * 功能： 字符串格式化替换操作
******************************************************************************/
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g,
            function (m, i) {
                return args[i];
            });
    }


/*******************************************************************************
* * 功能：去掉字符左右空格
******************************************************************************/
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

/*******************************************************************************
* * 功能：常用正则
******************************************************************************/
var regexMap = {
    username: /^\w+$/,
    password: /^\S{6,16}$/,
    compassword: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/,
    mobile: /^1[34587]\d{9}$/,
    phone: /(^\(\d{3,5}\)\d{6,8}(-\d{2,8})?$)|(^\d+-\d+$)|(^1[34587]\d{9}$)/,
    tel: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
    idCard: /^(\d{15}|\d{18}|\d{17}(\d|X|x))$/,
    passport: /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/,
    url: /^(http|https|ftp):\/\/(\w+\.)+[a-z]{2,3}(\/\w+)*(\/\w+\.\w+)*(\?\w+=\w*(&\w+=\w*)*)*/,
    postalCode: /(^\d{6}$)/,
    trimLeft: /^[\s\xA0]+/,
    trimRight: /[\s\xA0]+$/,
    date: /^(\d{1,4})(-|\/)?(\d{1,2})\2(\d{1,2})$/,
    dateTime: /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/,
    alphaNumberic: /^[A-Za-z0-9]+$/,
    cnAndEnNumeric: /^[_0-9a-zA-Z\u4e00-\u9fa5]+$/,
    enNumberic: /^[_0-9a-zA-Z]+$/,
    chinese: /^[\u4E00-\u9FA5]+$/,
    email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
    money: /^[+-]?\d+(,\d{3})*(\.\d+)?$/,
    numberic: /^[0-9]*$/,
    numberFloat: /^\d+(\.\d+)?$/,
    businessLicense: /^(\d{15,20}$)/,
    organizationCode: /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/
};

/*******************************************************************************
* * 功能：常用正则验证
******************************************************************************/
var validator = {
    executeExp: function (t, e) {
        return t.test(e)
    },
    isEmpty: function (t) {
        return t = t.trim(),
                0 === t.length
    },
    isDate: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = e.match(regexMap.date);
        if (null == i) return !1;
        var n = new Date(i[1], i[3] - 1, i[4]);
        return n.getFullYear() == i[1] && n.getMonth() + 1 == i[3] && n.getDate() == i[4]
    },
    isDateTime: function (e) {
        var i = regexMap.dateTime,
                n = e.match(i);
        if (null == n) return !1;
        var r = new Date(n[1], n[3] - 1, n[4], n[5], n[6], n[7]);
        return r.getFullYear() == n[1] && r.getMonth() + 1 == n[3] && r.getDate() == n[4] && r.getHours() == n[5] && r.getMinutes() == n[6] && r.getSeconds() == n[7]
    },
    isAlphaNumeric: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = regexMap.alphaNumberic;
        return this.executeExp(i, e)
    },
    isCnAndEnNumeric: function (t) {
        var e = regexMap.cnAndEnNumeric;
        return this.executeExp(e, t)
    },
    isEnNumeric: function (e) {
        var i = regexMap.enNumberic;
        return this.executeExp(i, e)
    },
    isChinese: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = regexMap.chinese;
        return this.executeExp(i, e)
    },
    isEmail: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = regexMap.email;
        return this.executeExp(i, e)
    },
    isMoney: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = regexMap.money;
        return this.executeExp(i, e)
    },
    isNumeric: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = regexMap.numberic;
        return this.executeExp(i, e)
    },
    isNumberFloat: function (t) {
        if (this.isEmpty(t)) return !1;
        var e = /^\d+(\.\d+)?$/;
        return this.executeExp(e, t)
    },
    isMobile: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = regexMap.mobile;
        return this.executeExp(i, e)
    },
    isPhone: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = regexMap.phone;
        return this.executeExp(i, e)
    },
    isTel: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = regexMap.tel;
        return this.executeExp(i, e)
    },
    isPostalCode: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = regexMap.postalCode;
        return this.executeExp(i, e)
    },
    isURL: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = regexMap.url;
        return this.executeExp(i, e)
    },
    isIDCard: function (e) {
        if (this.isEmpty(e)) return !1;
        var i = 15 === e.length ? "19" + idNo.substr(6, 6) : idNo.substr(6, 8),
                n = regexMap.idCard;
        return this.executeExp(n, e) && this.isDate(i)
    }
}

/*******************************************************************************
* * 功能：URL相关操作
******************************************************************************/
var utils = {
    // 查询url参数值
    getParameter: function (t) {
        var e = new RegExp("[&,?]" + t + "=([^\\&]*)", "i"),
            i = e.exec(location.search);
        return i ? i[1] : ""
    },
    changeParameter: function (url, arg, arg_val) {
        var pattern = arg + "=([^&]*)",
            replaceText = arg + "=" + arg_val;
        if (url.match(pattern)) {
            var tmp = "/(" + arg + "=)([^&]*)/gi";
            return tmp = url.replace(eval(tmp), replaceText)
        }
        return url.match("[?]") ? url + "&" + replaceText : url + "?" + replaceText
    },
    getQueryString: function (t, e) {
        var i = new RegExp("[&,?]" + t + "=([^\\&]*)", "i"),
            n = i.exec(e || location.href);
        return n ? n[1] : ""
    },
    getQueryMap: function (t) {
        var e, i, n = {},
            r = /[\?\&][^\?\&]+=[^\?\&#]+/g,
            o = /[\?\&]([^=\?]+)=([^\?\&#]+)/;
        if (t = t || location.href, e = t.match(r), !e) return n;
        for (var s = 0,
                a = e.length; a > s; s++) i = e[s].match(o),
            null !== i && (n[i[1]] = i[2]);
        return n
    },
    // 把url参数转换成json对象
    parseQueryString: function (url) {
        var reg_url = /^[^\?]+\?([\w\W]+)$/,
        reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
        arr_url = reg_url.exec(url), ret = {};
        if (arr_url) {
            if (arr_url && arr_url[1]) {
                var str_para = arr_url[1], result;
                while ((result = reg_para.exec(str_para)) != null) {
                    ret[result[1]] = result[2];
                }
            }
        }
        else if (url) {
            var str_para = url, result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        }
        return ret;

    },
    getHost: function () {
        var curWwwPath = window.document.location.href;

        // 获取主机地址之后的目录如：/Tmall/index.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);

        // 获取主机地址，如： http://localhost:8080
        var hostPath = curWwwPath.substring(0, pos);
        return hostPath;
    }
}

var cookies = {
    /***************************************************************************
    * * 功能： 写入cookie操作 * 参数： name cookie名称 * value cookie值 * expires 过期时间 *
    * path 路径 * domain 域
    **************************************************************************/
    set: function (name, value, expires, path, domain) {
        expires = new Date(new Date().getTime() + (((typeof expires == "undefined") ? 12 * 7200 : expires)) * 1000);
        var tempcookie = name + "=" + value +
            ((expires) ? "; expires=" + expires.toGMTString() : "") +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "");
        (tempcookie.length < 4096) ? document.cookie = tempcookie : alert("The cookie is bigger than cookie lagrest");
    },

    /***************************************************************************
    * * 功能： 获取cookie操作 * 参数： name cookie名称
    **************************************************************************/
    get: function (name) {
        var xarr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (xarr != null)
            return xarr[2];
        return "";
    },

    /***************************************************************************
    * * 功能： 删除cookie操作 * 参数： name cookie名称 * path 路径 * domain 域
    **************************************************************************/
    del: function (name, path, domain) {
        if (this.get(name))
            document.cookie = name + "=" +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "") +
            ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    },

    /***************************************************************************
    * * 功能： 删除当前所有的cookie操作
    **************************************************************************/
    remove: function (path, domain) {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--; )
            // document.cookie = keys[i] + '=;expires=;expires=Thu, 01-Jan-1970
            // 00:00:01 GMT';
                document.cookie = keys[i] + "=" +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "") +
            ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        }
    },

    day: function (xd) {
        return xd * 24 * 3600;
    },
    hour: function (xh) {
        return xh * 3600;
    }
}


/*******************************************************************************
* * 功能： 格式化时间字符串，支持多种时间格式化类型 * 参数： format 日期对象 * 示例： new
* Date().format("yyyy年MM月dd日 hh:mm:ss");
******************************************************************************/
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/*******************************************************************************
* * 功能： 格式化时间字符串，支持多种时间格式化类型 * 参数： format 日期对象 * 示例：
* "2016/2/3".format("yyyy年MM月dd日 hh:mm:ss");
******************************************************************************/
String.prototype.formatDate = function (format) {
    if (validator.isDate(this) || validator.isDateTime(this)) {
        var date = new Date(this.toString().replace(/\-+/g, '/'));
        return date.format(format);
    } else {
        try {
            var date = new Date(this);
            return date.format(format);
        } catch (e) {
            return "-";
        }

    }
}
/** 接受毫秒转日期**/
Number.prototype.formatDate = function (format) {
    try {
        var date = new Date(+this.toString());
        return date.format(format);
    } catch (e) {
        return "-";
    };
}


/*******************************************************************************
* * 功能： 返回日期与diff参数日期的时间差，单位为天 * 参数： 日期对象 * 示例： new Date().diff(new
* Date('2013/04/08 12:43:45'));
******************************************************************************/
Date.prototype.diff = function (date) {
    return parseInt((Math.abs(this.getTime() - date.getTime())) / (24 * 60 * 60 * 1000));
}


/*******************************************************************************
* * 功能： 金额格式化方法, * 参数： s输入金额, n为保留几位小数 * 示例： "201643432".formatMoney(2);
******************************************************************************/
String.prototype.formatMoney = function (n) {
    var _n = n;
    n = n > 0 && n <= 20 ? n : 2;
    var s = parseFloat((this + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
    var l = s.split('.')[0].split('').reverse(), r = s.split('.')[1];
    t = '';
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
    }
    return _n == 0 ? t.split('').reverse().join('') : t.split('').reverse().join('') + '.' + r;
};

var pendingReqs = {};
$.ajaxPrefilter(function (options, originalOptions, xhr) {
    var hash = 17;
    if (options.data) {
        var dataStr = JSON.stringify(options.data);
        if (dataStr.length > 2) {
            for (i = 0; i < dataStr.length; i ++) {
                char = dataStr.charCodeAt(i);
                hash = char + (hash << 6) + (hash << 16) - hash;
            }
        }
    }
    var key = options.url + hash.toString();
    if (!pendingReqs[key]) {
        pendingReqs[key] = xhr;
        xhr.pendingRequestKey = key;
    } else {
        xhr.abort();
    }

    var complete = options.complete;
    options.complete = function (xhr, textStatus) {
        pendingReqs[xhr.pendingRequestKey] = null;
        if ($.isFunction(complete)) {
            complete.apply(this, arguments);
        }
    };
});

/*******************************************************************************
* * 功能： Ajax和Jsonp统一调用方法 * 参数： url 数据请求地址 * data 参数 * fn 成功后回调函数 * isLoading
* 是否显示正在加载
******************************************************************************/
$.loadAjax = loadAjax = function (options) {
    var defaults = {
        url: "",
        type: "POST",
        timeout: 60000,
        async: true,
        data: {},
        dataType: "json",
        jsonp: null,
        contentType: null, // application/x-www-form-urlencoded /
        // mutipart/form-data ，application/json ，text/xml
        // 根据需要选择提交类型
        isLoading: false,
        targets: null,
        before: function () { },
        success: function () { },
        error: function () { },
        complete: function () { },
        timeouthandler: function () { }
    }
    var options = $.extend({}, defaults, options);
    $.ajax({
        url: window.rootPath + options.url,
        type: options.type,
        async: options.async,
        timeout: options.timeout,
        data: options.data,
        dataType: options.dataType,
        contentType: options.contentType,
        beforeSend: function () {
            options.before();
            if (options.isLoading) {
                if (options.targets) {
                    $.each(options.targets, function (index, target) {
                        (target.width() < 30 || target.height() < 30) && target.addClass('spin');
                        (target.width() > 30 || target.height() > 30) && target.addClass('spin-md');
                        (target.width() > 250 && target.height() > 250) && target.addClass('spin-lg');
                    });
                } else {
                    layer.load(1, {
                        shade: [0.3, '#fff'] // 0.1透明度的白色背景
                    });
                }
            }
        },
        success: function (result) {
            if (result && result.rtnCode && result.rtnCode == "999") {
                layer.msg("网络错误，请稍后再试");
            }
            options.success && options.success(result);
        },
        complete: function () {
            // 移除spin
            if (options.isLoading) {
                if (options.targets) {
                    $.each(options.targets, function (i, target) {
                        (target.width() < 30 || target.height() < 30) && target.removeClass('spin');
                        (target.width() > 30 || target.height() > 30) && target.removeClass('spin-md');
                        (target.width() > 250 && target.height() > 250) && target.removeClass('spin-lg');
                    });
                } else {
                    layer.closeAll('loading');
                }
            }
            options.complete();
        },
        error: function (xhr, textStatus, errorThrown) {
            //layer.msg("网络繁忙，请稍后再试");
            (textStatus == 'timeout') ? (xhr.abort(), options.timeouthandler()) : options.error(xhr, textStatus, errorThrown);
            console.log(textStatus);
        }
    });
    
}

function prefixUrl(){
	console.log("prefixUrl");
	var path = location.pathname.substr(0, location.pathname.lastIndexOf('/') + 1);
	$("a[href$='.html']").each(function(index, ele){
    	var href= $(ele).context.pathname;
    	console.log(href);
		if (window.rootPath == ""){
			return true;
		} else if(href.indexOf('/page') == 0 && href.indexOf(window.rootPath) == -1){ 
			href = window.rootPath + href;
    	} else {
    		console.log("contains now");
    	}
    	$(ele).attr("href", href);
    	console.log("result:" + $(ele).attr("href"));
    })
}