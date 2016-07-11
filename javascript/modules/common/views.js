/**
 * views实例
 * 
 * 
 */
define(["jquery", "underscore"],
function($, _) {
    var $body = $('body');
    var views = function(options) {
        this.options = options;
        this.init(options);
    };
    views.prototype = {
        _init: function() {
            this.events = this.events || {};
            this.handlers = this.handlers || {};
            this.container = this.container || $body;
            this._setAttr();
            this._bindEvents();
            this._setRegions();
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
            this.region=new regions(this,this.regions);
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
        /*_template就是 页面的模板  用underscore  _.template(html 模板)*/
        render: function(id, data, container, isAppend, difColor) {
            var self = this;
            // var templates = self._templates;
            // var tpl = templates[id], html;
            var tpl=self._template,html;
            if (!tpl) {
                tpl = _.template($(id).html());

                templates[id] = tpl;
            }
            html = tpl(data);
            if (container) {
                container=container instanceof $ ? container:$(container);
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
    };
    // 扩展
    views.extend = function(props) {
        var Child = function(options) {
            var self = this;
            views.prototype._init.call(self);
            self.init && self.init(options);
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
    var regions=function(view,regions){
        this.view=view||none;
        this.regions=regions||{};
        var self=this;
        _.each(regions,function(value,key){
            self[key]=$(value);
            self[key].show=function(childView){
                // $(value).html(childView.templates);
                //////////////////////////////
                // self.view.render(value); //
                //////////////////////////////
            self[kye].html(childView);
                // new childView({container:value})
            }
        });
    }
    return views;
});