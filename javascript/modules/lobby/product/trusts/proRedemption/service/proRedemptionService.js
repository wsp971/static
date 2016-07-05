/**
 * Created by HOUCHUNYANG742 on 2016-06-09.
 */
define([
'common/uploadFileService',
'common/datautil',
'jquery.fileupload',
'../base/common',
'../base/menutabs'
], function(Ufs,DataUtil) {
    var _this, icon = '<i class="iconfont red">&#xe60e;</i>', cookies = parent.cookies ? parent.cookies : parent.parent.cookies;
    var fileType = /(\.|\/)(doc|txt|docx|pdf)$/i;//上传文件格式
    function ProRedemptionService(){
        _this = this;
        this.ufs = new Ufs();
        $('.hiddenInput').hide();// 设置上传按钮格式
        $('.hiddenInput-down').hide();
        renderRequest();// 渲染界面
        initValidator();
    }
    
    function renderRequest(){
        var paramData = {"productNum" : "30010016061200001"};// 参数数据
        $.loadAjax({
            url: "/product/queryTrustProductDetail",// 产品详情
            type: "POST",
            contentType:"application/x-www-form-urlencoded",
            data: paramData,
            success: function(res){
                if(res.rtnCode == "000" && res.data){
                    _this.data = res.data;
                    $('.product-name').text(res.data.productName);
                    $('.product-ID').text(res.data.productId);
                    $('#redemption-downUrl').attr('href',res.data.redemptionFormUrl);
                    $('#redemption-downUrl').text(res.data.redemptionFormName);
                    if(res.data.contractSignMode == "c_contract_sign_mode_1"){// 在线赎回
                        $('.redemption-online').show();
                        $('.redemption-offline').hide();
                        DataUtil.renderEle("redemption-online-contract",res.data.contract);
                    }else{// 线下签署
                        $('.redemption-online').hide();
                        $('.redemption-offline').show();
                        DataUtil.renderEle("redemption-offline-contract",res.data.contract);
                    }
                }else{
                }
            },
            error:function(err){
            }
        });
    }
    
    function initValidator(){
        $("#redempform").validate({
            debug: true, // 调试模式取消submit的默认提交功能
            focusInvalid: false, // 当为false时，验证无效时，没有焦点响应
            onkeyup: false,
            rules: {
                inputMoneyNum: {
                    required: true,
                    number:true,
                    min:0
                }
            },
            messages: {
                inputMoneyNum : icon + "请输入正确的金额"
            },
			errorPlacement : function(error, element) {
				error.appendTo(element.parent());
			},
			submitHandler: function(redempform) { 
				var paramData = initParamData();
				$.loadAjax({
					url : "/trade/trust/order/createBaseInfo",// 赎回接口
					type : "POST",
					contentType : "application/x-www-form-urlencoded",
					data : paramData,
					success : function(res) {
					    if (res.rtnCode == "000") {
							tab.open("30", "购买产品","product/trusts/preorder/trustSuc.html?id=30",window);
						} else {
						}
					},
					error : function(err) {
					}
				});
	            return false; 
	        }
        });
    }
    // 初始化参数
    function initParamData(){
    	var paramData,uploadDataJson;
        var uploadData = {};
        if (_this.data && _this.data.contractSignMode &&_this.data.contractSignMode == "c_contract_sign_mode_1"){//线上上传文件参数
        	uploadData.contract = DataUtil.collectChildData("fileNamed","li","file");
        }else{//线下上传文件参数
        	uploadData.contract = DataUtil.collectChildData("fileNamed-down","li","file");
        }
        uploadDataJson = JSON.stringify(uploadData);
        paramData = {"orderType":"05","instCode":cookies.get("instCode"),
            "targetInstCode":_this.data.publisherOrgID,"productName":_this.data.productName,
            "productCode":_this.data.productNum,"productType":_this.data.productType,
            "valueDate":_this.data.valueDate,"expireDate":_this.data.maturityDate,
            "term":_this.data.productTerm,"price":$('#inputMoneyNum').val(),"executionType":"NEW",
            "redemptionFormDocName":rfname , "redemptionFormDocPath":rfPath ,"redemptionFormDocType":"1",
            "redemptionFormDocUse":"1","contractSignMode":_this.data.contractSignMode};
        return paramData;
    }
    // 上传文件线上与线下
    ProRedemptionService.prototype.uploadFile = function(){
       this.ufs.uploadFile($('.hiddenInput'),$('.fileNamed'),'/file/upload',fileType);
    };
    
    ProRedemptionService.prototype.uploadFileDown = function(){
        this.ufs.uploadFile($('.hiddenInput-down'),$('.fileNamed-down'),'/file/upload',fileType);
    };
    
    ProRedemptionService.prototype.cancelBtnClicked = function (){
    	
    };
    
    return ProRedemptionService;
});