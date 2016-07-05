define(function() {
 
	function buyApplyService(){
	
	}
	
	function queryData(orderId){
		loadAjax({
			url : "/trade/order/query",
			data : JSON.stringify({"orderId":orderId}),
			contentType : "json",
			async: true,
			dataType : "json",
			type : "post",
			success : function(result) {
				if(result && result.rtnCode==="000"){
					var res = result.data;
					$("#firmAccount").val(res.firmAccount);
	        		$("#counterParty").val(res.counterParty);
	        		$("#orderShare").val(res.orderShare);
	        		$(".organization").val(res.firmAccount);
				}else{
					parent.layer.msg("查询订单信息失败!");
				}
			}
		});
	}
	
	function submitData(orderId, oprOrderStatus, originalSide){
		loadAjax({
			url : "/trade/order/update",
			data : JSON.stringify({"orderId":orderId,
									"oprCode":"010", 
									"oprOrderStatus":oprOrderStatus,
									"originalSide":originalSide}),
			contentType : "json",
			async: true,
			dataType : "json",
			type : "post",
			success : function(result) {
				if(result && result.rtnCode==="000"){
	        		parent.layer.msg("划款确认信息已提交！");
	        		var index = parent.layer.getFrameIndex(window.name);
	          		parent.layer.close(index);
				}
			}
		});
	}
	buyApplyService.prototype.queryData = queryData;
	buyApplyService.prototype.submitData = submitData;
   return buyApplyService;
})