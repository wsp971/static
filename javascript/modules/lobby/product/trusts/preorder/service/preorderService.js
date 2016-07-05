/**
 * Created by HOUCHUNYANG742 on 2016-06-09.
 */
define(function() {
    var _this, icon = '<i class="iconfont red">&#xe60e;</i>', cookies = parent.cookies ? parent.cookies : parent.parent.cookies;
    var _this;
    function PreService(){
        _this = this;
        _this.data = {};
        renderRequest();//渲染界面
//        closeBefore();//初始化关闭窗口
    };
    function renderRequest(){
    	var productNum = parent.utils.getQueryString('productNum',window.location);
    	var paramData = {"productNum":productNum}
        parent.$.loadAjax({
            url: "/product/queryTrustProductDetail",//产品详情
            type: "POST",
            contentType:"application/x-www-form-urlencoded",
            data: paramData,
            isLoading:true,
            success: function(res){
                if(res.rtnCode == "000" && res.data){
                    _this.data = res.data;
                    initValidator();//验证初始化
                    $('.product-name').text(res.data.productName);
                    $('.product-ID').text(res.data.productNum);
                    $('.product-rate').text(res.data.expRtnRate);
                    $('.product-term').text(res.data.productTerm);
                    $('.product-term-unit').text(res.data.productTermUnitText);
                    if(res.data.aimAmount && res.data.aimAmount != ""){
                        $('#aimAmount').text(res.data.aimAmount && res.data.aimAmount.formatMoney(0));
                        if(res.data.aimAmount == "0"){
                        	$('#aimAmountLabel').html("（总额度：不限）");
                        }
                    }else{
                    	$('#aimAmountLabel').html("（总额度：不限）");
                    }
                }else{
                	console.log(res);
                }
            },
            error:function(err){
                console.log(err);
            }
        });
    };
    function initValidator(){
        $(".pre-form").validate({
            debug: true, //调试模式取消submit的默认提交功能
            focusInvalid: false, //当为false时，验证无效时，没有焦点响应
            onkeyup: false,
            rules: {
                inputMoneyNum: {
                    required: true,
                    number:true,
                    min:0,
                    max:_this.data.aimAmount
                }
            },
            messages: {
                inputMoneyNum : icon
                + "请输入正确的金额"
            },
            errorPlacement : function(error, element) {
				error.appendTo(element.parent());
			}
        });

    };
    //提交表单
    function submitForm(){
    	if(!$(".pre-form").valid()){
    		return false;
    	}
    	var paramData = initParamData();
        parent.$.loadAjax({
            url:"/trade/trust/order/createBaseInfo",//预约接口
            type: "POST",
            contentType:"application/json",
            data: JSON.stringify(paramData),
            isLoading:true,
            success: function(res){
                if(res.rtnCode == "000"){
                	$("#preorderDiv").remove();
                	$("#preorder-success").removeClass("hidden");
                } else if (res.rtnCode != "999") {
                	layer.msg(res.rtnMsg);
                }
            }
        });
        return false; 
    }
  //初始化参数
    function initParamData(){
        var paramData;
        var time = new Date();
        paramData = {orderType:"00",firmAccount:cookies.get("instId"),oprCode:"024",counterParty:_this.data.publisherOrgID,
    	            productCode:_this.data.productNum,price:"1",orderShare:$('#inputMoneyNum').val(),operator:cookies.get('username'),
    	            tradeDate: time.getTime().toString(),term:_this.data.productTerm,orderAmount:$('#inputMoneyNum').val()
    	            };
        return paramData;
    };
  //关闭窗口前的处理 不再需要
//    function closeBefore(){
//    	parent.window.coloseBefore = function(){
//            confirm();
//       }
//    }
    PreService.prototype.cancelBtnClicked = function (){
    	confirm();
    };
    PreService.prototype.submitClicked = function (){
    	submitForm();
    };
    function confirm(){
    	parent.layer.confirm('确认不预约，并关闭份额预约页吗？', {
 		   	title:"提示",
 		   	btn: ['确定', '取消']
    	}, function () {
    		parent.layer.closeAll('dialog');
    		parent.tab.close();
    		return false;
    	});
    }
    return PreService;
})