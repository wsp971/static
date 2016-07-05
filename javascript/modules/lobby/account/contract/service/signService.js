define([ 'common/datautil', 'common/keymap'], function(DataUtil, Map) {
	var docWidth, docHeight, signatureList = new Map;
	var l = document.all ? !0 : !1;
	
	function getElement(e){
        return "string" == typeof e ? document.getElementById(e) : e
    }
	
	function create(){
		return function() {
            this.init.apply(this, arguments)
        }
	}
	
	function p(e, t) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    function d(e, t) {
        return function(n) {
            return t.call(e, n || window.event)
        }
    }
    function h(e, t) {
        for (var n in t) e[n] = t[n]
    }
    function v(e) {
        return e.currentStyle || document.defaultView.getComputedStyle(e, null)
    }
    function m(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : (e["on" + t] = n)
    }
    function g(e, t, n) {
        e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent ? e.detachEvent("on" + t, n) : (e["on" + t] = null)
    }
    
	// drag related(copy)
	y = create();
	y.prototype = {
	        init: function(e, t) {
	            this.Drag = getElement(e),
	            this._x = this._y = 0,
	            this._marginLeft = this._marginTop = 0,
	            this._fM = d(this, this.Move),
	            this._fS = p(this, this.Stop),
	            this.SetOptions(t),
	            this.Limit = !!this.options.Limit,
	            this.mxLeft = parseInt(this.options.mxLeft),
	            this.mxRight = parseInt(this.options.mxRight),
	            this.mxTop = parseInt(this.options.mxTop),
	            this.mxBottom = parseInt(this.options.mxBottom),
	            this.LockX = !!this.options.LockX,
	            this.LockY = !!this.options.LockY,
	            this.Lock = !!this.options.Lock,
	            this.onStart = this.options.onStart,
	            this.onMove = this.options.onMove,
	            this.onStop = this.options.onStop,
	            this._Handle = getElement(this.options.Handle) || this.Drag,
	            this._mxContainer = getElement(this.options.mxContainer) || null,
	            this.Drag.style.position = "absolute";
	            if (l && !!this.options.Transparent) {
	                var n = document.createElement("div");
	                n.style.width = "100%",
	                n.style.height = "100%",
	                n.style.backgroundColor = "#fff",
	                n.style.filter = "alpha(opacity:0)",
	                n.style.fontSize = 0,
	                this._Handle.appendChild(n)
	            }
	            this.Repair(),
	            m(this._Handle, "mousedown", d(this, this.Start))
	        },
	        SetOptions: function(e) {
	            this.options = {
	                Handle: "",
	                Limit: !1,
	                mxLeft: 0,
	                mxRight: 9999,
	                mxTop: 0,
	                mxBottom: 999999,
	                mxContainer: "",
	                LockX: !1,
	                LockY: !1,
	                Lock: !1,
	                Transparent: !1,
	                onStart: function() {},
	                onMove: function() {},
	                onMouseUp: function() {},
	                onStop: function() {}
	            },
	            h(this.options, e || {})
	        },
	        Start: function(e) {
	            if (this.Lock) return;
	            this.Repair(),
	            this._x = e.clientX - this.Drag.offsetLeft,
	            this._y = e.clientY - this.Drag.offsetTop,
	            this._marginLeft = parseInt(v(this.Drag).marginLeft) || 0,
	            this._marginTop = parseInt(v(this.Drag).marginTop) || 0,
	            m(document, "mousemove", this._fM),
	            m(document, "mouseup", this._fS),
	            m(this.Drag, "mouseup", this._fS),
	            l ? (m(this._Handle, "losecapture", this._fS), this._Handle.setCapture()) : (m(window, "blur", this._fS), e.preventDefault()),
	            this.Drag.style.cursor = "move",
	            this.onStart()
	        },
	        Repair: function() {
	            this.Limit && (this.mxRight = Math.max(this.mxRight, this.mxLeft + this.Drag.offsetWidth), this.mxBottom = Math.max(this.mxBottom, this.mxTop + this.Drag.offsetHeight), !this._mxContainer || v(this._mxContainer).position == "relative" || v(this._mxContainer).position == "absolute" || (this._mxContainer.style.position = "relative"))
	        },
	        Move: function(e) {
	            if (this.Lock) {
	                this.Stop();
	                return
	            }
	            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	            var t = e.clientX - this._x,
	            n = e.clientY - this._y;
	            if (this.Limit) {
	                var r = this.mxLeft,
	                i = this.mxRight,
	                s = this.mxTop,
	                o = this.mxBottom; ! this._mxContainer || (r = Math.max(r, 0), s = Math.max(s, 0), i = Math.min(i, this._mxContainer.clientWidth), o = Math.min(o, this._mxContainer.clientHeight)),
	                t = Math.max(Math.min(t, i - this.Drag.offsetWidth), r),
	                n = Math.max(Math.min(n, o - this.Drag.offsetHeight), s)
	            }
	            this.LockX || (this.Drag.style.left = t - this._marginLeft + "px"),
	            this.LockY || (this.Drag.style.top = n - this._marginTop + "px"),
	            this.onMove()
	        },
	        Stop: function() {
	            this.Drag.style.cursor = "default",
	            g(document, "mousemove", this._fM),
	            g(document, "mouseup", this._fS),
	            g(this.Drag, "mouseup", this._fS),
	            l ? (g(this._Handle, "losecapture", this._fS), this._Handle.releaseCapture()) : g(window, "blur", this._fS),
	            this.onStop()
	        }
	    };
	
	function Signer() {
        this.page = null,
        this.lastY = 0,
        this.x = 0,
        this.y = 0,
        this.id = null,
        this.signid = 0,
        this.signcate,
        this.left = 0,
        this.top = 0,
        this.lastX = 0,
        this.dragable = !0,
        this.parent = "body",
        this.onClose = !0,
        this.sImgWidth = 120,
        this.sImgHeight = 60,
        this.width = 135,
        this.height = 60,
        this.onClick = function(e) {},
        this.onMouseUp = function(e) {},
        this.onMouseDown = function(e) {},
        this.url = "",
        this.panel = null,
        this.hideTimer = null,
        this.getX = function() {
            return this.lastX + 75
        },
        this.getY = function() {
            return this.lastY + 35
        },
        this.outPut = function() {
        	tmp = Math.ceil(this.y / parseInt(docHeight)),
        	this.page = tmp > 0 ? tmp : 1,
            this.lastY = this.y - (parseInt(docHeight) * (this.page - 1)),
            this.lastX = this.x;
        },
        this.update = function() {
            $(this.parent).append(this.panel),
            this.showClose(!0);
            var e = this;
            this.panel.mouseover(function() {
                e.showClose(!1)
            }).mouseout(function() {
                e.panel.find("a.clsb").hide()
            }),
            this.hideTimer = setTimeout(function() {
                e.panel.find("a.clsb").hide()
            },
            1e3)
        },
        this.showClose = function(e) {
            var t = this;
            this.panel.find("a.clsb").show(),
            e && this.panel.find("a.clsb").bind("mousedown",
            function(e) {
                return signatureList.remove(t.id),
                t.panel.remove(),
                e.preventDefault(),
                e.stopPropagation(),
                !1
            })
        },
        this.append = function(e) {
            e && (this.parent = e),
            this.parent && $(this.parent).append(this.toDom())
        },
        this.moveTo = function(e, t) {
            e && (this.left = e),
            t && (this.top = t),
            this.panel.css({
                left: this.left,
                top: this.top
            })
        },
        this.toDom = function() {
        	this.panel = $('<div class="signature act" />').width(this.width).height(this.height)
        		.html('<img src="' + this.url + '"/>').append($('<a class="clsb"></a>'));
            var t = this;
            return this.panel.bind("click",
            function(e) {
                t.onClick.call(this, t)
            }).bind("mouseup",
            function(e) {
                return t.onMouseUp.call(this, t),
                !1
            }).bind("mousedown",
            function(e) {
                t.onMouseDown.call(this, t)
            })
            this.panel.css({
                left: this.left,
                top: this.top
            })
        }
	}

	function SignService(docPanel){
		this.docPanel = docPanel;
	}
	
	SignService.prototype.initSize = function(docPanel){
		docWidth = docPanel.find(".docItem").css("width");
		docHeight = docPanel.find(".docItem").css("height");
	}
	
	SignService.prototype.getSignature = function(e) {
		if (this.currentSigner) return ! 1;
        var n = new Signer();
        r = Math.floor(Math.random()*3517),
        n.id = r,
        n.signids = $(e.target).data("signids"),
        n.signcate = $(e.target).data("signcate"),
        n.url = $(e.target).attr("src"),
        n.left = e.pageX + 10,
        n.top = e.pageY - 10,
        n.height = $(e.target)[0].naturalHeight,
        n.width = $(e.target)[0].naturalWidth,
        n.dragable = !0,
        n.append(),
        this.currentSigner = n,
        signatureList.put(r,n),
        $(document).mousemove(function(e) {
            n.dragable && n.parent == "body" && (n.panel.css({
                left: e.pageX + 10,
                top: e.pageY - 10
            }), n.x = n.left = e.pageX + 10, n.y = n.top = e.pageY - 10)
        });
        
        this.signed();
    };
	
	SignService.prototype.signed = function() {
		var self = this;
        function putSign(event, target) {
        	
            var r = $(target).offset(),
            x = event.pageX - r.left + 20,
            y = self.docPanel.parent().scrollTop() + event.pageY - 160;
            if(y < 0) y = 0;
			// console.log("X:" + t.pageX + " Y:" + t.pageY);
			// console.log(r);
			// console.log("OX:" + x + "OY:" +y);
            if (self.currentSigner) {
                var o = self.currentSigner;
                o && (o.x = x, o.y = y, o.dragable = !1, o.parent = $(target).parent(), o.panel.css({
                    position: "null",
                    top: o.y,
                    left: o.x
                }), o.update(), self.beginDrag(o)),
                o.outPut(),
                self.currentSigner = null
            }
        }
        
        this.docPanel.find("div.docItem").bind("click",
        function(e) {
            if ($(this).offset().left + $(this).width() < e.pageX + 200) return ! 1;
            putSign(e, this);
        })
    };
	
	SignService.prototype.beginDrag = function(e) {
        var t = new y(e.panel[0], {
            mxContainer: "doc-container",
            Handle: "idHandle",
            Limit: !0,
            onStart: function() {
                this.lock = !1
            },
            onMove: function() {
                var t = this.Drag.offsetLeft,
                n = this.Drag.offsetTop;
                e.x = t,
                e.y = n,
                e.left = t,
                e.top = n,
                e.panel.css({
                    left: t + "px",
                    top: n + "px"
                }),
                e.outPut()
            },
            onStop: function() {
                this.lock = !0
            }
        })
    };
    
    function signingPrompt(content){
    	parent.layer.open({
			type : 1,
			skin : 'layui-layer-lan',
			title : false,
			fix : false,
			closeBtn:0,
			area : [ '230px', '100px' ],
			content : content,
			end: function(){}
		});
    }
    
    function signedPrompt(content){
    	parent.layer.open({
			type : 2,
			skin : 'layui-layer-lan',
			title : false,
			fix : false,
			closeBtn:0,
			area : [ '200px', '150px' ],
			content : "account/contract/signSuccessPrompt.html",
			end: function(){parent.tab.link("myaccount", "acc-contractList","account/contract/contractList.html").close();}
		});
    }
    
    
    function hideLayers(){
    	console.log(parent.layer)
    	var index=parent.layer.getFrameIndex(window.name);
		parent.layer.close(index);
    }
    
    SignService.prototype.submitSign = function(){   
    	var validate = false;
    	signatureList.each(function(signId, sign, length){
    		if(sign.signcate == 0 || sign.signcate == 1){
    			validate = true;
    			return false;
    		}
    	});
    	
    	if(!validate){
    		layer.msg("请在合同上签署有效的签名或签章");
    		return;
    	}
    	//prompt to input pwd
    	layer.open({
			type : 2,
			skin : 'layui-layer-lan',
			title : "签约校验",
			fix : false,
			area : [ '350px', '260px' ],
			content : "account/contract/pwdConfirm.html",
			end: function(){ 
				if(parent.layer.isConfirmed == false ||!parent.layer.isConfirmed) return;
				var contractCode = DataUtil.getUrlParam('id', window.location),
		    	reqestData = {"userCode" : parent.cookies.get("username"),"contractCode" : contractCode};
		    	reqestData.signatures = [];
		    	signatureList.each(function(signId, sign, length){
		    		reqestData.signatures.push({"signatureCode": sign.signids, "pageNo" : sign.page, "posX": Math.ceil(sign.lastX),"posY":Math.ceil(sign.lastY)});
				});
		    	var content="<div style='padding:30px;text-align:center;vertical-align: middle'>正在签署合同，请稍后。。。</div>"
		    	signingPrompt(content);//has pass the validation,is signing
		    	parent.$.loadAjax({
					url: "/contract/management/sign/add",
					type: "POST",
					timeout: 120000,
					data: JSON.stringify(reqestData),
					contentType: "application/json",
					success: function(res){
						if(res.rtnCode=="000"){
							parent.layer.closeAll();
							signedPrompt("签署成功")
						}else{
							parent.layer.closeAll();
							parent.layer.alert("签署失败");
						}
					},
					error:function(err){
						hideLayers();
						parent.layer.alert("签署失败");
					}
				});
			}
		});
    	//return reqestData;
    }
	
	return SignService;
})