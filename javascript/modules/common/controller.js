define(["jquery","underscore"],function($,_){
    var  controller=function(options){
        // this.options=options;
        // this.actions=options.actions||{};
        this.currentHash=window.location.hash;
        this.initFlag=false;
    };
    controller.prototype={
        _init:function(){
            this.currentHash=window.location.hash;
            this.initFlag=false;
            if(!this.initFlag){
                this.go(this.currentHash.slice(1));
                this.initflag=true;
            }
            this._listenHash();
        },
        _listenHash:function(){
            var self=this;
            if(("onhashchange" in window)&&((typeof document.documentMode==="undefined")|| document.documentMode===8)){
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
        _isHashChange:function(){
            var newhash=window.location.hash;
            if(newhash!==this.hash) return true;
            return false;
        },
        _hashChangeHandle:function(){
            var newHash=window.location.hash.slice(1);
            this.actions[newHash]&&this.go(newHash);
        },
        go:function(router){
            if(!!this.actions[router]){
                var self=this;
                eval(self[self.actions[router]])();
                this.hash=["#",router].join("");
            }
        }
    };
    controller.extend=function(options){
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