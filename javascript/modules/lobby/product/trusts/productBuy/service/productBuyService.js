/**
 * Created by HOUCHUNYANG742 on 2016-06-09.
 */
define(['common/uploadFileService', 'common/datautil', 'jquery.fileupload', '../base/common'],
function(Ufs, DataUtil) {
    var _this, icon = '<i class="iconfont red">&#xe60e;</i>',
    cookies = parent.cookies ? parent.cookies: parent.parent.cookies;
    var fileType = /(\.|\/)(pdf)$/i; // 上传文件格式线上
    var fileTypeDown = /(\.|\/)(pdf|bmp|jpg)$/i; // 上传文件格式线下
    function ProductBuyService() {
        _this = this;
        _this.data = {};
        renderRequest(); // 渲染界面
        searchBanks(); // 查询银行
        this.ufs = new Ufs(); // 初始化上传文件界面
//        closeBefore(); // 初始化关闭窗口
    }
    function renderRequest() {
        var productNum = parent.utils.getQueryString('productNum', window.location);
        var paramData = {
            "productNum": productNum,
            "firmAccount": cookies.get("instId"),
            "orderType": "00"
        }
        parent.$.loadAjax({
            url: "/product/queryTrustProductDetail",
            // 产品详情
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: paramData,
            isLoading: true,
            success: function(res) {
                if (res.rtnCode == "000" && res.data) {
                    _this.data = res.data;
                    initValidator(); // 初始化验证逻辑
                    $('.product-name').text(res.data.productName);
                    $('.product-ID').text(res.data.productNum);
                    $('#prodcut-order-money').html(res.data.money && res.data.money.formatMoney(0));
                    if (res.data.minSubAmount && res.data.minSubAmount != "") {
                        var buyLowest = res.data.minSubAmount && res.data.minSubAmount.formatMoney(0);
                        $('#buy-lowest').text(buyLowest);
                        if(res.data.minSubAmount == "0"){
                        	$('#buy-lowest-money').html('单笔最低限额：不限');
                        }
                    }else{
                    	$('#buy-lowest-money').html('单笔最低限额：不限');
                    }
                    if (res.data.dailyMaxAmount && res.data.dailyMaxAmount != "") {
                        var buyMost = res.data.dailyMaxAmount && res.data.dailyMaxAmount.formatMoney(0);
                        $('#buy-most').text(buyMost);
                        if(res.data.dailyMaxAmount == "0"){
                    		$('#buy-most-money').html('单笔最高限额：不限');
                    	}
                    }else{
                    	$('#buy-most-money').html('单笔最高限额：不限');
                    }
                    if (res.data.contractSignMode == "c_contract_sign_mode_1") { // 在线签署
                        $('.pro-online').show();
                        $('.pro-offline').hide();
                        if(res.data.contract && res.data.contract != ""){
                            DataUtil.renderEle("buy-online-contract", res.data.contract);
                        }
                        if(res.data.agreement && res.data.agreement != ""){
                            DataUtil.renderEle("buy-online-protocol", res.data.agreement);
                        }
                    } else { // 线下签署
                        $('.pro-online').hide();
                        $('.pro-offline').show();
                        if(res.data.contract && res.data.contract != ""){
                            DataUtil.renderEle("buy-offline-contract", res.data.contract);
                        }
                        if(res.data.agreement && res.data.agreement != ""){
                            DataUtil.renderEle("buy-offline-protocol", res.data.agreement);
                        }
                    }
                } else {
                    parent.layer.msg('网络问题请稍后再试！');
                }
            },
            error: function(err) {
                parent.layer.msg('网络问题请稍后再试！');
            }
        });
    }
    //发送银行数据请求
    function searchBanks() {
        var paramData = {
            dictCategoryCode: "BANK_CODE"
        }
        parent.$.loadAjax({
            url: "/trade/dict/list",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(paramData),
            success: function(res) {
                if (res.rtnCode == "000") {
                    res && res.data;
                    setupBank(res.data);
                } else {}
            },
            error: function(err) {}
        });
        return false;
    }
    //处理银行数据
    function setupBank(data) {
        var categoryOptions = ['<option value="">请选择开户银行</option>'];
        $.each(data,
        function(index, ele) {
            categoryOptions.push('<option value="' + data[index].dictCode + '">' + data[index].dictName + '</option>');
        });
        $('#investorsBank').append(categoryOptions);
    }
    function initValidator() {
        $(".pre-form").validate({
            debug: true,
            // 调试模式取消submit的默认提交功能
            focusInvalid: false,
            // 当为false时，验证无效时，没有焦点响应
            onkeyup: false,
            rules: {
                inputMoneyNum: {
                    required: true,
                    number: true,
                    min: _this.data.minSubAmount,
                    max:_this.data.dailyMaxAmount
                },
                investorsName: {
                    required: true
                },
                investorsBank: {
                    required: true
                },
                investorsBankNum: {
                    required: true
                }
            },
            messages: {
                inputMoneyNum: icon + "请输入正确的金额",
                investorsName: icon + "请输入账户名称",
                investorsBank: icon + "请选择开户银行",
                investorsBankNum: icon + "请输入银行卡号"
            },
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            }
        });
    }
    //submit 
    function submitForm(){
    	if(!$(".pre-form").valid()){
    		return false;
    	}
    	 if (_this.data.contractSignMode == "c_contract_sign_mode_1") { // 在线签署
             if ($("#fileNamed1 li").length === 0) {
                 parent.parent.layer.msg("请上传合同文件");
                 return false;
             }
             if ($("#fileNamed2 li").length === 0) {
                 parent.parent.layer.msg("请上传协议文件");
                 return false;
             }
         } else {
             if ($("#fileNamed-down1 li").length === 0) {
                 parent.parent.layer.msg("请上传合同文件");
                 return false;
             }
             if ($("#fileNamed-down2 li").length === 0) {
                 parent.parent.layer.msg("请上传协议文件");
                 return false;
             }
         }
         var paramData = initParamData();
         parent.$.loadAjax({
             url: "/trade/trust/order/createBaseInfo",// 购买
             type: "POST",
             contentType: "application/json",
             data: paramData,
             isLoading: true,
             success: function(res) {
                 if (res.rtnCode == "000" && _this.data.contractSignMode) {
                 	$("#buyTrustDiv").remove();
                     if (_this.data.contractSignMode == "c_contract_sign_mode_1") {
                         $("#buy-suc-online").removeClass("hidden");
                     } else {
                         $("#buy-suc-offline").removeClass("hidden");
                     }
                 } else if (res.rtnCode != "999") {
                     parent.layer.msg(res.rtnMsg);
                 }
             },
             error: function(err){
            	 parent.layer.msg("网络问题请稍后再试！");
             }
         });
         return false;
    }
    // 初始化参数
    function initParamData() {

        var paramData, uploadDataJson;
        var uploadData = {},
        uploadArray1 = [],
        uploadArray2 = [],
        uploadArray = [];
        if (_this.data.contractSignMode == "c_contract_sign_mode_1") { // 线上上传文件参数
            uploadArray1 = DataUtil.collectChildData({
                "id": "fileNamed1",
                "ele": "li",
                "dataName": "buycontract"
            });
            uploadArray2 = DataUtil.collectChildData({
                "id": "fileNamed2",
                "ele": "li",
                "dataName": "buyprotocol"
            });
            uploadArray = $.merge(uploadArray1, uploadArray2);
        } else { // 线下上传文件参数
            uploadArray1 = DataUtil.collectChildData({
                "id": "fileNamed-down1",
                "ele": "li",
                "dataName": "buycontract"
            });
            uploadArray2 = DataUtil.collectChildData({
                "id": "fileNamed-down2",
                "ele": "li",
                "dataName": "buyprotocol"
            });
            uploadArray = $.merge(uploadArray1, uploadArray2);
        }
        var obj = {
            "bankAcct": $('#investorsName').val(),
            "bankNo": $("#investorsBank  option:selected").val(),
            "bankName": $("#investorsBank  option:selected").text(),
            "bankNum": $('#investorsBankNum').val()
        };
        var time = new Date();
        uploadDataJson = JSON.stringify(uploadArray);
        var orderId = parent.utils.getQueryString('orderId',window.location);
        var oprCode = parent.utils.getQueryString('oprCode',window.location);
        var oprStatus = parent.utils.getQueryString('oprStatus',window.location);
        if(orderId && orderId != ""){
        	paramData = { 
             firmAccount: cookies.get("instId"),
             operator: cookies.get('username'),
             counterParty: _this.data.publisherOrgID,
             productCode: _this.data.productNum,
             price: "1",
             orderShare: $('#inputMoneyNum').val(),
             tradeDate: time.getTime().toString(),
             bankInfo: obj,
             term: _this.data.productTerm,
             orderAmount: $('#inputMoneyNum').val(),
             file: uploadDataJson,
             orderId:orderId,
             oprCode:oprCode,
             orderStatus:oprStatus
             };
        }else{
        	paramData = {
                    orderType: "02",
                    firmAccount: cookies.get("instId"),
                    oprCode: "024",
                    operator: cookies.get('username'),
                    counterParty: _this.data.publisherOrgID,
                    productCode: _this.data.productNum,
                    price: "1",
                    orderShare: $('#inputMoneyNum').val(),
                    tradeDate: time.getTime().toString(),
                    bankInfo: obj,
                    term: _this.data.productTerm,
                    orderAmount: $('#inputMoneyNum').val(),
                    file: uploadDataJson
                };
        }
        
        return JSON.stringify(paramData);
    };
    // 上传文件线上与线下
    ProductBuyService.prototype.uploadFile1 = function() {
        this.ufs.uploadFile({
            ele: $('#fileupload1'),
            ulEle: $('.fileNamed1'),
            fileType: fileType
        });
    };
    ProductBuyService.prototype.uploadFile2 = function() {
        this.ufs.uploadFile({
            ele: $('#fileupload2'),
            ulEle: $('.fileNamed2'),
            fileType: fileType
        });
    };
    ProductBuyService.prototype.uploadFileDown1 = function() {
        this.ufs.uploadFile({
            ele: $('#fileupload-down1'),
            ulEle: $('.fileNamed-down1'),
            fileType: fileTypeDown
        });
    };
    ProductBuyService.prototype.uploadFileDown2 = function() {
        this.ufs.uploadFile({
            ele: $('#fileupload-down2'),
            ulEle: $('.fileNamed-down2'),
            fileType: fileTypeDown
        });
    };
    ProductBuyService.prototype.cancelBtnClicked = function() {
        confirm();
    };
    ProductBuyService.prototype.submitClicked = function() {
    	submitForm();
    };
    // 处理输入金额的显示
    ProductBuyService.prototype.inputMoneyClicked = function() {
        // var formatMoney = $('#inputMoneyNum').val().formatMoney(0);
        // $('#inputMoneyNum').val(formatMoney);
    }
    // 关闭窗口前的处理  不再需要
//    function closeBefore() {
//        parent.window.coloseBefore = function() {
//            confirm();
//        }
//    }
    function confirm() {
        parent.layer.confirm('确认不购买，并关闭产品购买页吗？', {
            title: "提示",
            btn: ['确定', '取消']
        },
        function() {
            parent.layer.closeAll('dialog');
            parent.tab.close();
            return false;
        });
    }
    return ProductBuyService;
})