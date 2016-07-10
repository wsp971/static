define(["jquery","underscore"],function($,_){
    var  controller=function(options){
        // this.options=options;
        // this.actions=options.actions||{};
        this.currentHash=window.location.hash;
        this.initFlag=false;
    };
    controller.prototype={
        _init:function(){/*初始化*/
            this.currentHash=window.location.hash;
            this.initFlag=false;
            if(!this.initFlag){
                this.go(this.currentHash.slice(1));
                this.initFlag=true;
            }
            this._listenHash();
        },
        _listenHash:function(){/*监听hash变化*/
            var self=this;
            if(("onhashchange" in window)&&((typeof document.documentMode==="undefined")|| document.documentMode===8)){
                // 浏览器支持onhashchange事件  ie8开始支持documentmode，其他浏览器都不支持
                window.onhashchange=function(){
                    var ischanged=self._isHashChange.call(self);
                    ischanged&&self._hashChangeHandle.call(self);
                }
                // this._hashChangeHandle.call(this);
            }else{
                setInterval(function(){
                    var ischanged=self._isHashChange.call(self);
                    ischanged&&self._hashChangeHandle.call(self);
                },150);
            }
        },
        _isHashChange:function(){/*判断hash是否变化*/
            var newhash=window.location.hash;
            if(newhash!==this.hash) return true;
            return false;
        },
        _hashChangeHandle:function(){/*hash变化后处理方法*/
            var newHash=window.location.hash.slice(1);
            this.actions[newHash]&&this.go(newHash);
        },
        go:function(router){/*路由到某个hash*/
            if(!!this.actions[router]){
                var self=this;
                eval(self[self.actions[router]])(self);
                this.hash=["#",router].join("");
            }
        }
    };
    controller.extend=function(options){/*扩展controller*/
        var Child=function(){
            var self=this;
            controller.prototype._init.call(self);
            self.init&&self.init();
        };
        var prototypeinstance=function(){};
        prototypeinstance.prototype=controller.prototype;
        Child.prototype=new prototypeinstance();
        Child.prototype.constructor=controller;
        _.extend(Child.prototype,options);
        return Child; 
    }
    return controller;
});