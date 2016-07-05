define(["jquery",
        "common/views",
        "common/datautil",
        "jquery.ui.widget",
        "jquery_iframe_transport",
        "jquery.fileupload",
        "jquery.fileupload-process",
        "jquery.fileupload-validate",
        "jquery.validate.min",
        "messages_zh.min",
        "layer",
        "../service/drawConfirmService"
],	function ($, view, datautil, jquery_ui_widget, jquery_iframe_transport, fileupload, fileuploadProcess, fileuploadValidate, validate, messages_zh, layer, drawConfirmService) {
    return new view.extend({
        init: function () {
        	var self = this;
        	var counterParty = cookies.get("instId").trim();
        	var firmAccount = utils.getParameter("firmAccount");//持仓机构编号-传到data
        	var orderAmount = utils.getParameter("orderAmount");//金额-传到data
        	var orderShare = utils.getParameter("orderShare");//份额-传到data
        	var productCode = utils.getParameter("productCode");//产品编号-传到data
        	var tradeDate = Date.parse(new Date());//交易时间-传到data
        	var term = utils.getParameter("term");//期限-传到data
        	var orderId = utils.getParameter("orderId");//订单id-传到data
        	var operator = cookies.get("username");
        	
        	firmAccount = firmAccount == "undefined" ? "" : firmAccount ;
        	orderAmount = orderAmount == "undefined" ? "" : orderAmount ;
        	orderShare = orderShare == "undefined" ? "" : orderShare ;
        	productCode = productCode == "undefined" ? "" : productCode ;
        	term = term == "undefined" ? "" : term ;
        	orderId = orderId == "undefined" ? "" : orderId ;
        	
        	this.drawConfirmService = new drawConfirmService();
        	
        	$("input:radio[name='drawMsg']").change(function(){
    			var value = $('input:radio:checked').val();
    			if(value == "00"){
    				$(".voucher").show();
    				$(".pay").hide();
    			}
    			if(value == "01"){
    				$(".voucher").hide();
    				$(".pay").show();
    			}
    		});
        	
        	$(".cancel").click(function(){
        		var index = parent.layer.getFrameIndex(window.name);
        		parent.layer.close(index);
        	});
        	
        	//完成提交
        	$(".finish").click(function(){
        		var payType = $('input:radio:checked').val();//划款信息反馈,单选框-传到data
        		var payNo = "";//大额支付号-传到data
        		var orderDocs = [];//上传文件信息
        		var docName = "";//文档名称
        		var docPath = ""//划款凭证文件的uuid-传到data
    			var docType = "";//文档类型-传到data
        		if(typeof(payType) == "undefined"){
        			parent.layer.alert("请选择划款信息反馈！");
        			return;
        		}
        		if(payType == "00"){
        			payNo = $("#voucherNo").val();
        			if(payNo == ""){
        				parent.layer.alert("请填写划款凭证号！");
        				return;
        			}
        			docName = $("#docName").val();
        			docPath = $("#docPath").val();
        			docType = $("#docType").val();
        			var fileData = {docName:docName, docPath:docPath, docType:docType, docUse:"08"};
        			orderDocs[0] = fileData;
        		}
        		if(payType == "01"){
        			payNo = $("#payNo").val();
        			if(payNo == ""){
        				parent.layer.alert("请填写大额支付号！");
        				return;
        			}
    				if(isNaN(payNo)){
    					parent.layer.alert("大额支付号必须为数字！");
    					return;
    				}
    				if(payNo.length != 12){
    					parent.layer.alert("请输入12位的大额支付号！");
    					return;
    				}
        		}
        		
        		var isSubmit = 0;
        		//传值给data，提交到后台
        		var data = {firmAccount:firmAccount, operator:operator, orderAmount:orderAmount, orderShare:orderShare, orderType:"03", productCode:productCode, reviewer:"",term:term, payType:payType, payNo:payNo, tradeDate:tradeDate, counterParty:counterParty, oprCode:"024", originalOrderId:orderId};
        		if (docName && docPath) {
                    data.orderDocs = orderDocs;
                }
        		//提交操作
        		if(isSubmit == 0){
            		loadAjax({
    					url : "/trade/order/create",
    					data : JSON.stringify(data),
    					contentType : "application/x-www-form-urlencoded",
    					dataType : "json",
    					type : "post",
    					success : function(result) {
    						isSubmit++;
    						if(result&&result.rtnCode==="000"){
    			        		parent.layer.msg("划款确认信息已提交！");
    			        		var index = parent.layer.getFrameIndex(window.name);
    			          		parent.layer.close(index);
    						}else{
    							isSubmit = 0;
    							parent.layer.msg("网络繁忙，请稍后再试！");
    						}
    					}
            		});
        		}
        	});
        },
        events: {
    	"click #upload": "fileuploadFiles"
        },
	    handlers: {
	    	fileuploadFiles: function (event) {
	    		this.drawConfirmService.uploadFile(event);
		    }
	    }	
    });
}); 