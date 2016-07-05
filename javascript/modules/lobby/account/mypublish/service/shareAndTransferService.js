define(function() {
 
	function shareAndTransferService(){
	
	}
	
	function queryData(orderId){
		loadAjax({
			url : "/trade/order/doc/query",
			data : JSON.stringify({"orderId":orderId}),
			contentType : "json",
			async: true,
			dataType : "json",
			type : "post",
			success : function(result) {
				if(result && result.rtnCode==="000"){
					var res = result.data;
					$.each(res.rows, function(i){
					   var item = res.rows[i]; 
					   if(item.docUse == "08"){
						   $("#credentials").attr("href","/file/innerDownload?filename="+item.docName+"&uuid="+item.docPath);
					   }else if(item.docUse == "13"){
						   $("#contract").attr("href","/file/innerDownload?filename="+item.docName+"&uuid="+item.docPath);
					   }
						}); 
				}else{
					parent.layer.msg("查询订单信息失败!");
				}
			}
		});
	}
	
	shareAndTransferService.prototype.queryData = queryData;
   return shareAndTransferService;
})