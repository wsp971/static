define([
    "modules/common/views",
    "modules/common/controller",
    "modules/common/rsa",
    "base/api",
    "base/utils"
],function(view,controller,rsa,api){
    var Common=window.Common={
        view:view,
        controller:controller,
        rsa:rsa,
        api:api,
        utils:utils
    }
    window.console || (window.console = {
        log: function () { },
        warn: function () { },
        error: function () { },
        info: function () { }
    });
    $(window).load(function () {
         $("#loading").hide()
    });

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
    return Common;
});