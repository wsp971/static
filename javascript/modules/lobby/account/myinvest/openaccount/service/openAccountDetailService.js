define(function() {
 
	function OpenAccountService(){
	
	}
	function getTemplate(instId, targetInstId){
		loadAjax({
			url : "/trade/account/open/template/create",
			data : JSON.stringify({instId: targetInstId, nopage: "1"}),
			contentType : "application/json",
			dataType : "html",
			type : "post",
			isLoading: true,
			success : function(result) {
				$("#loadForm").html(result);
				$("#open_account").hide();
				$("#loadForm table").find("tr").find("td:eq(0)").hide();
				$("#loadForm table").find("tr").find("td:eq(1)").css("width","70%");
				$("#loadForm table").find("tr").find("td:eq(2)").find("a").text("-");
				$("#loadForm table").find("tr").find("td:eq(3)").hide();
				$("#loadForm table").find("tr").find("td:eq(4)").hide();
				queryInistInfo(instId, targetInstId);
			}
		});
	}
	function queryInistInfo(instId, targetInstId){
		loadAjax({
			url : "/trade/account/query",
			data : JSON.stringify({instId: instId, targetInstId:targetInstId}),
			contentType : "application/json",
			dataType : "json",
			type : "post",
			isLoading: true,
			success : function(result) {
				if(result && result.rtnCode === "000"){
					if(!result.data){
						redirectPage("查询开户信息失败");
						return false;
					}
					$("#loadForm :input[type=text]").each(function(i){
		        		var elementName = $("#loadForm :input[type=text]").eq(i).attr("name");
		        		$("#loadForm :input[type=text]").eq(i).val(result.data[elementName]);
		        	});
					
		        	$("#loadForm .layer-date-type").each(function(i){
		        		var elementName = $("#loadForm .layer-date-type").eq(i).attr("name");
		        		$("#loadForm .layer-date-type").eq(i).val(result.data[elementName]);
		        	});
		        	
		        	$("#loadForm select").each(function(i,item){
		        		var elementName = $("#loadForm select").attr("name");
		        		var elementValue = result.data[elementName];
		        		$(item).find("option[value='"+ elementValue +"']").attr("selected","selected");
		        		var elementText = $(item).find("option:selected").text();
		        		$(item).parent().html('<input type="text" name="'+ elementName +'" maxlength="18" class="form-control fl" value="'+ elementText +'"/>');
		        	})
		        	
		        	$("#loadForm :input[type=text]").removeClass("form-control");
					$("#loadForm :input[type=text]").addClass("form-control-detail");
					$("#loadForm :input[type=text]").attr("readonly","readonly");
		        	
		        	$("#loadForm table tr").each(function(i){
		        		var elementName = $("#loadForm table tr").eq(i+1).find("td:eq(4)").find("input:eq(0)").attr("name");
		        		if(result.data[elementName]){
		        			var arr= new Array()
		        			arr = result.data[elementName].split("|");
		        			filename = arr[1];
		        			elementNameValue = arr[2];
		        			if(filename){
		        				$("#loadForm table tr").eq(i+1).find("td:eq(2)").html('<a class="watchPic link" href="javascript:void(0)" value="'+elementNameValue+'">'+filename+'</a>');	
		        			}
		        		}
		        	});
				}else{
					redirectPage("查询开户信息失败");
				}
			}
		});
	}
	
	function redirectPage(msg){
		parent.layer.msg(msg,{
			  time: 3000,
			  shade : [0.5 , '#000' , true]
		},function(){
			tab.link("myaccount","acc-open_account_list", "account/myinvest/openaccount/open_account_list.html");
		});
	}
	
	OpenAccountService.prototype.getTemplate = getTemplate;
	OpenAccountService.prototype.queryInistInfo = queryInistInfo;
   return OpenAccountService;
})