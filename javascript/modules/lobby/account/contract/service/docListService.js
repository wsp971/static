define(['common/datautil'],
function(DataUtil) {
    var contractCode = DataUtil.getUrlParam('id', window.location);
    // docService = document service. provide the methods to init doc list
    function DocListService(docPanel) {
        // doc image
        this.imgWidth = null;
        this.imgHeight = null;

        // doc panel instance
        this.cp = 0,
        this.tp = 0;
        this.docPanel = docPanel;
        this.docArray = new Array;
    }

    function genId() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function validateContract() {
//        $("#valProcess").addClass('spin');
//        $("#valMessage").text("正在验真合同...");
//
//        setTimeout(function() {
//            $("#valProcess").removeClass('spin').addClass("docValPass");
//            $("#valMessage").text("验真成功！合同未被修改，可以正常签署。");
//            $("#submitBtn").attr("disabled", false);
//        },
//        1500)
        reqData = {
            "userCode": parent.cookies.get("username"),
            "contractCode": contractCode
        };
        parent.$.loadAjax({
	        url : "/contract/single/verify",
	        type : "POST",
	        data : JSON.stringify(reqData),
	        contentType: "application/json",
	        targets : [$("#valProcess")],
	        isLoading: true,
	        before: function(){
	        	$("#valMessage").text("正在验真合同...");
	        },
	        success : function(res) {
	        	if(res.data && res.rtnCode == "000"){
	        		setTimeout(function() {
	        			if(res.data.verifyResult == 1){
		        			$("#valProcess").addClass("docValPass");
		    	        	$("#valMessage").text("验真成功！合同未被修改，可以正常签署。");
		    	        	$("#submitBtn").attr("disabled", false);
		        		} else{
		        			$("#valProcess").addClass("docValFail");
		        			(res.data.verifyResult == 0) && $("#valMessage").text("注意！合同被非法途径修改，无法签署，请联系后台管理员。");
			        		(res.data.verifyResult == 2) && $("#valMessage").text("注意！合同状态有误，无法签署，请联系后台管理员。");
		        		} 
	        			$("#valProcess").removeClass("spin");
	        		},5000);
	        	} else {
	        		$("#valProcess").addClass("docValFail");
    	        	$("#valMessage").text("因网络原因，验真失败！请重试。");
	        	}
	        },
	        complete: function(){
	        	$("#valProcess").addClass("spin");
	        	setTimeout(function() {
        			//do nothing;
        		},5000);
	        },
	        error : function(err) {
	        	$("#valProcess").addClass("docValFail");
	        	$("#valMessage").text("因网络原因，验真失败！请重试。");
	        }
        });
    }

    function InitDocs(callback) {
        var self = this,
        reqData = {
            "userCode": parent.cookies.get("username"),
            "contractCode": contractCode
        };
        parent.$.loadAjax({
            url: "/contract/order/details/query",
            type: "POST",
            data: JSON.stringify(reqData),
            contentType: "application/json",
            isLoading: true,
            async: true,
            targets: [$("#docContent ")],
            success: function(res) {
                if (res.rtnCode == "000" && res.data) {
                	res.data.buyer ? $("#buyerLabel").text(res.data.buyer) : $("#buyerLabel").text("公司名获取错误");
                	res.data.seller ? $("#sellerLabel").text(res.data.seller) : $("#sellerLabel").text("公司名获取错误");
                	if(res.data.file){
                		var fileInfo = DataUtil.retrieveFileInfo(res.data);
                		$("#contractName").text(fileInfo.fileName);
                		$("#contractDownload").removeClass("hidden").addClass("download link trust-downUrl")
                		.attr('href', "/file/innerDownload?filename=" + fileInfo.fileName + "&uuid=" + fileInfo.uuid);
                	}
                	if(res.data.buyerStatus){
                		if("否" == res.data.buyerStatus){
                			$("#buyerStatus").text("未签署");
                			$("#buyerStatus").addClass("label-warning");
                		} else {
                			$("#buyerStatus").text("已签署");
                			$("#buyerStatus").addClass("label-success");
                		}
                		
                		if("否" == res.data.sellerStatus){
                			$("#sellerStatus").text("未签署");
                			$("#sellerStatus").addClass("label-warning");
                		} else {
                			$("#sellerStatus").text("已签署");
                			$("#sellerStatus").addClass("label-success");
                		}
                		
                		if(res.data.buyer == reqData.userCode){
                			if((res.data.buyerAllowSign == "0")){
                				$("#goSign").remove();
                			} else if(("是" == res.data.buyerStatus)){
                				$("#goSign").remove();
                			} else if(("否" == res.data.sellerStatus && res.data.sellerAllowSign == "1")){
                				$("#goSign").remove();
                			}
                		} else {
                			if((res.data.sellerAllowSign == "0")){
                				$("#goSign").remove();
                			} else if(("是" == res.data.sellerStatus)){
                				$("#goSign").remove();
                			}
                		}
                		
                		$("#goSign") && $("#goSign").removeClass("hidden");
                	}
                    $.each(res.viewSrc,
                    function(i, e) {
                        self.docArray.push({
                            url: "data:image/png;base64," + e
                        });
                    });
                    if (self.docArray.length > 0) {
                        var t = !1;
                        self.tp = self.docArray.length;

                        if (self.docArray.length > 0) {
                            self.cp = 1;
                            var r = new Image;
                            r.src = self.docArray[0].url,
                            r.onload = function() {
                                if (t) return ! 1;
                                t = !0;
                                self.imgWidth = r.width;
                                self.imgHeight = r.height;
                                self.buildDoc();
                            };
                            if (r.complete) {
                                if (t) return ! 1;
                                t = !0;
                                self.imgWidth = r.width;
                                self.imgHeight = r.height;
                                self.buildDoc();
                            }
                        }
                        self.setPage(self.cp, self.tp);
                        $("#docPaginateDiv").removeClass("hidden");
                    }
                }
            },
            error: function(err) {
                console.log(err);
            },
            complete: function(){
            	callback && callback(self.docPanel);
            }
        });
    }

    function BuildDoc() {
        var r = new Array,
        width = this.imgWidth,
        height = this.imgHeight,
        tHeight = height * this.tp;
        $(this.docArray).each(function(i) {
            var s = genId();
            r.push('<div class="docItem" id="' + s + '" data-page="' + i + '" style="background:url(' + this.url + ") center 0 no-repeat;width:" + width + "px;height:" + height + 'px">'),
            r.push('    <div class="page-item"><em>' + (i + 1) + "</em></div>"),
            r.push("</div>"),
            r.push('<div class="clear"></div>');
        });
        r.push("</br>");
        r = r.join("");
        this.docPanel.append($(r));
        this.scrollPage();
        setTimeout(function() {
            $("#docContent").niceScroll({
                cursorcolor: "#615D5F",
                cursoropacitymax: 1,
                touchbehavior: !1,
                cursorwidth: "8px",
                cursorborder: "0",
                cursorborderradius: "8px"
            }),
            $("#doc-container").css({
                "height": tHeight,
                "width": width
            });
            $("#validate").length > 0 && validateContract();
        },
        500)
    }

    // doc related
    DocListService.prototype.initDocs = InitDocs;
    DocListService.prototype.buildDoc = BuildDoc;

    DocListService.prototype.scrollPage = function() {
        service = this;
        this.docPanel.parent().scroll(function(t) {
            var n = Math.ceil(($(this).scrollTop() + 20) / service.imgHeight);
            if (n - service.cp != 0) {
                service.cp = n;
                service.setPage(service.cp);
            }
        })
    };

    DocListService.prototype.setPage = function(e, t) {
        $("#currentPage").html(e);
        if (t) $("#totalPage").html(t);
    };

    DocListService.prototype.goPage = function() {
        if (this.cp > this.tp) this.cp = this.tp;
        if (this.cp < 1) this.cp = 1;
        this.docPanel.parent().scrollTop((this.cp - 1) * this.imgHeight);
        this.setPage(this.cp);
    };

    DocListService.prototype.firstPage = function() {
        this.cp = 1;
        this.goPage();
    };
    DocListService.prototype.prevPage = function() {
        this.cp--;
        this.goPage();
    };
    DocListService.prototype.nextPage = function() {
        this.cp++;
        this.goPage();
    };
    DocListService.prototype.lastPage = function() {
        this.cp = this.tp;
        this.goPage();
    };
    DocListService.prototype.goSign = function() {
    	console.log(contractCode);
        parent.tab && parent.tab.open("sign" + contractCode, "合同签署", "account/contract/contractSign.html?id=" + contractCode, window.event);
    };
    return DocListService;
})