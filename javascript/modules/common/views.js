/**
 * views实例
 * 
 * 
 */
define(["jquery", "underscore", "common/extend"],
function($, _) {
    var $body = $('body');
    var views = function(options) {
        this.options = options;
        this.init();
    }
    views.prototype = {
        _init: function() {
            this.events = this.events || {};
            this.handlers = this.handlers || {};
            this.container = this.container || $body;
            this._setAttr();
            this._bindEvents();
            // this._delegateLink();
            // this._router();/*加上hash路由处理*/
            // 特殊处理
            ! $.loadAjax && ($.loadAjax = !parent.$.loadAjax ? parent.parent.$.loadAjax: parent.$.loadAjax);
            parent && (layer = parent.layer?parent.layer:parent.parent.layer);
            parent && (tab = parent.tab?parent.tab:parent.parent.tab);
            parent && (window.rootPath = parent.window.rootPath?parent.window.rootPath:parent.parent.window.rootPath);
            parent && parent.prefixUrl ? parent.prefixUrl():parent.parent.prefixUrl();
            
        },
        /*设置this.query,页面内serach部分属性*/
        _setAttr: function() {
            this.query = this.getQSObject(true);
        },
        _setRegions:function(){

        },
        /*在页面container中绑定定义事件*/
        _bindEvents: function() {
            var self = this;
            _.each(this.events,
            function(handlerName, key) {
                var eventName = '';
                var selector = key.replace(/\w+\s/,
                function(match) {
                    eventName = $.trim(match);
                    return '';
                });
                var handler = self.handlers[handlerName];
                if (!handler) {
                    throw new Error('Can not find method [' + handlerName + '] in handlers');
                }
                self.container.on(eventName, selector, (function(oldFunc) {
                    return function(event) {
                        oldFunc.apply(self, [event, $(this)]);
                    };
                })(handler));
            });
            // 针对iphone iPad 输入框不失焦的bug，点击其他区域手动触发blur事件
            if (/iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)) {
                $('body').on('touchstart.inputBlur',
                function(e) {
                    var target = e.srcElement || e.target;
                    if (!$(target).hasClass("textfield-clean") && !/input/i.test(target.tagName)) {
                        $("input").blur();
                    }
                });
            }
        },
        /*这个。。。。好像没用*/
        // _delegateLink: function() {
        //     $body.on('click', 'a',
        //     function(e) {
        //         var $target = $(this),
        //         url = $(this).data('url') || '',
        //         title = $(this).data('title') || '',
        //         type = $(this).data('type') || 'local';

        //         if (url) {
        //             Hyperion.actions.forward({
        //                 url: url,
        //                 title: title,
        //                 type: type
        //             });
        //         }
        //     });
        // },
        /*获取页面？之后的内容并转化为key，value 形式的map*/
        getQSObject: function(str, decode) {
            if (typeof str === 'boolean') {
                decode = str;
                str = location.search;
            }
            str = str || location.search;
            decode = !!decode;
            var pairs = str.replace('?', '').split('&'),
            ret = {};
            for (var i = 0; i < pairs.length; i++) {
                var kv = pairs[i].split('=');
                if (kv.length > 1) {
                    ret[kv[0]] = decode ? decodeURIComponent(kv[1]) : kv[1];
                }
            }
            return ret;
        },
        /*页面内请求，建议用这个方法*/
        request: function(options) {
            var url = options.url,
            oldSuccess = options.success,
            self = this;

            if (url && !options.debug) {
                // options.url = C.Api.prefix + url;
            }
            options.success = function(res) {
                oldSuccess&&oldSuccess.call(self, res);
                /*增加健壮性*/
            };
            options.error = options.error ||
            function() {
                $.msg.tip("请求失败，请稍候重试")
            };
            options.type = options.type || "GET",
            options.dataType = options.dataType || "json",
            $.ajax(options);
        },
        _templates: {},
        render: function(id, data, container, isAppend, difColor) {
            var self = this;
            var templates = self._templates;
            var tpl = templates[id],
            html;
            if (!tpl) {
                tpl = _.template($(id).html());
                templates[id] = tpl;
            }
            html = tpl(data);
            if (container) {
                if (!isAppend) {
                    container.html(html);
                } else {
                    container.append(html);
                }
            }
            // 表格隔行变色
            if (difColor) {
                var item = $("table tr");
                for (var i = 0; i < item.length; i++) {
                    if (i % 2 == 0) {
                        item[i].style.backgroundColor = "#f3f3f3";
                    }
                }
            }
            return html;
        }
        // _router:function(){
        //     this.router=new Router(this.actions,this);
        // }
        // _actions:function(){
        //     var actions=this.actions;
        //     _.each(actions,function(action,i){

        //     })
        // }
        // ,
        // super: function(method, args) {
        // var func = this.constructor.prototype[method];
        // if (func && typeof args === 'object') {
        // args = args || [];
        // func.apply(this, args);
        // } else {
        // throw new Error('Arguments error in [super].')
        // }
        // }
        
    }
    // 扩展
    views.extend = function(props) {
        var Child = function() {
            var self = this;
            views.prototype._init.call(self);
            self.init && self.init();
        };
        var newViews = function() {};
        newViews.prototype = views.prototype;
        Child.prototype = new newViews();
        Child.prototype.constructor = views;
        _.extend(Child.prototype, props);
        return Child;
    }

    views.initRadioHandlers = function(settings) {
    	 $.each(settings,
    	 function(index, val) {
    		 views.initRadioHandler(val.radios, val.inputs, val.containers);
    	 });
    }
    
    views.initRadioHandler = function(radios, inputs, containers) {
    	$.each(radios, function(index, radio){
    		$(radio).change(function(){//$("#id").trigger("change")
    			$.each(radios, function(ri, r){
    				(r != radio) && $(r).removeAttr("checked");
    			});
    			
        		$(this).attr('checked', true);
        		if(!inputs){return true};
        		$.each(inputs, function(iindex, input){
        			$.each(input, function(eleIndex, ele){
        				if(index == iindex){
            				$(ele).attr('required', true);
            				$(ele).addClass("data-common");
            				if(!$(containers[iindex][eleIndex]).hasClass("div-optional")){
            					$(containers[iindex][eleIndex]).removeClass("hidden");
            				} else {
            					$(containers[iindex][eleIndex]).children('label').children('span').removeClass("hidden");
            				}
            			} else {
            				$(ele).attr('required', false);
            				$(ele).removeClass("data-common");
            				if(!$(containers[iindex][eleIndex]).hasClass("div-optional")){
            					$(containers[iindex][eleIndex]).addClass("hidden");
            				} else {
            					$(containers[iindex][eleIndex]).children('label').children('span').addClass("hidden");
            				}
            			}
        			})
        		});
    		});
    	});
    }
    
    views.initLayerDates = function(settings) {
        $.each(settings,
        function(index, val) {
            views.initLayerDate(val.start, val.end, val.mid);
        });
    }

    views.initLayerDate = function(startDate, endDate, midDate) {
        var start, end, mid;
        var base = {
            format: 'YYYY-MM-DD',
            max: '2099-06-16 23:59:59',
            istime: true,
            istoday: false
        };
        if (startDate) {
            start = jQuery.extend({
                elem: startDate,
                choose: function(datas) {
                	!midDate && end && (end.min = datas);
                	midDate && mid && (mid.min = datas);
                }
            },
            base);
        }

        if (midDate) {
        	mid = jQuery.extend({
                elem: midDate,
                choose: function(datas) {
                	end && (end.min = datas);
                    start && (start.max = datas);
                }
            },
            base);
        }

        if (endDate) {
        	end = jQuery.extend({
                elem: endDate,
                choose: function(datas) {
                	!midDate && start && (start.max = datas);
                	midDate && mid && (mid.max = datas);
                }
            },
            base);
        }

        ($(startDate).length > 0) && (laydate(start)); 
        ($(midDate).length > 0) && (laydate(mid)); 
        ($(endDate).length > 0) && (laydate(end));
    }
    // var testRegion={
    //     "body":"#body"
    // }
    // var regions=function(view,region){
    //     this.view=view;
    //     this.region=region;
    //     var self=this;
    //     _.each(region,function(value,key){
    //         self.kye=$(value);
    //         self.key.show=function(view){
    //             self.view.render(value);
    //         }
    //     });
    // }
    // regions.prototype.show(){
    //     this.view.render();
    //     id, data, container, isAppend, difColor
    // }
    // /*为view添加hash路由变化所做的响应*/
    // function Router(actions,view){
    //     this.actions=_.extend({},actions);
    //     this.hash=window.location.hash;
    //     this.view=view;
    //     this.initFlag=false;/*是否初始化*/
    //     if(!this.initFlag){
    //         this.go(this.hash.slice(1));
    //         this.initflag=true;
    //     }
    //     this._listenHash();
    // }
    // Router.prototype.test=function(){
    //     alert("test");
    // }
    //  // var actions={
    //  //    'router1':"action1",
    //  //    'router2':"action2",
    //  //     "test":"test"
    //  // }
    //  Router.prototype.go=function(router){
    //     if(!!this.actions[router]){
    //         var self=this;
    //         eval(self.view[self.actions[router]])();
    //         this.hash=["#",router].join("");
    //     }
    //  }
    //  Router.prototype._listenHash=function(){
    //     if( ("onhashchange" in window) && ((typeof document.documentMode==="undefined") || document.documentMode==8)) {  
    //     // 浏览器支持onhashchange事件  ie8开始支持documentmode，其他浏览器都不支持
    //      window.onhashchange = this.hashChangeHandle.call(this);  // TODO，对应新的hash执行的操作函数  
    //     }else{  
    //     // 不支持则用定时器检测的办法  
    //         setInterval(function() {  
    //             var ischanged = this.isHashChanged();  // TODO，检测hash值或其中某一段是否更改的函数  
    //             if(ischanged) {  
    //                 this.hashChangeHandle();  // TODO，对应新的hash执行的操作函数  
    //             }  
    //         }, 150);  
    //     }  
    // };
    // Router.prototype.isHashChanged=function(){
    //     var newhash=location.hash;
    //     if(newhash!==this.hash) return true;
    //     return false;
    // };
    // Router.prototype.hashChangeHandle=function(){
    //     var newHash=window.location.hash.slice(1);
    //     if(!!this.actions[newHash]){
    //         this.go(newHash);
    //     }
    // }
    return views;
});