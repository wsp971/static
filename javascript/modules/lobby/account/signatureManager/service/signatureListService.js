define(function() {
	var cookies = parent.cookies? parent.cookies : parent.parent.cookies;
	var view,userCode = cookies.get("username");
	var requestData = {
			"userCode" : userCode
		};
	
	// load the page
	function LoadPageService(selfView) {
		view = selfView;
		/*$.ajax({
			url : "../../../../javascript/modules/lobby/account/signatureManager/service/signatureList.json",
			debug : true,
			type : 'GET',
			success : function(result) {
				view.render("#sig-name-list", {sigList : result}, $("#my-sig-name-list"), true);
				view.render("#sig-stamp-list", {sigList : result}, $("#my-sig-stamp-list"), true);
			},
			error : function() {
				parent.layer.msg('网络异常,请稍后再试');
			}
		});*/
		renderPage();
	}
	
	function renderPage(){
		$("#my-sig-name-list").html("");
		$("#my-sig-stamp-list").html("");
		parent.$.loadAjax({
			url : "/contract/signature/list",
			data : JSON.stringify(requestData),
			debug : true,
			type : 'POST',
			targets:[$("#my-sig-name-title"),$("#my-sig-stamp-title")],
			isLoading: true,
			async: true,
			contentType:"application/json",
			success : function(result) {
				if(result.data){
					view.render("#sig-name-list", {sigList : result.data}, $("#my-sig-name-list"), true);
					view.render("#sig-stamp-list", {sigList : result.data}, $("#my-sig-stamp-list"), true);
				} else{
					parent.layer.msg('网络异常,请稍后再试');
				}
			},
			error : function() {
				parent.layer.msg('网络出错,请稍后再试');
			}
		});
	}
	// when click the '删除',prompt with layer
	function showLayerDel(target) {
		var type = target.data('type'), signId = target.data("signid"), content, title;
		type == 0 ? (content = "确定删除该签名？", title = "删除签名") : (content = "确定删除该签章？",title = "删除签章");
		
		parent.layer.confirm(content, {
			btn : [ "是", "否" ],
			title : title,
			cancel : function() {
				
			}
		}, function() {
			var requestData = {
					"userCode" : userCode,
					"signatureCode" : signId
				};

			parent.$.loadAjax({
				url : "/contract/signature/delete",
				data : JSON.stringify(requestData),
				contentType:"application/json",
				debug : true,
				isLoading: true,
				type : 'POST',
				success : function(result) {
					parent.layer.msg("删除成功!"), $("#"+signId).remove();
				},
				error : function() {
					parent.layer.msg('网络异常,请稍后再试');
				}
			});
		});
	}
	
	
	// hide all layers
	function hideUploadLayer() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index);
	}

	// add signature name or stamp
	function addSig(type) {
		type == 0 ? openLayer("上传签名", "account/signature/addSignatureName.html","315px") : openLayer("上传签章", "account/signature/addSignatureStamp.html","440px");
	}

	LoadPageService.prototype.showLayerDel = showLayerDel;
	LoadPageService.prototype.addSig = addSig;

	// open the layer
	function openLayer(title, content,height) {
		var flag=1;
		parent.layer.open({
			type : 2,
			skin : 'layui-layer-lan',
			title : title,
			fix : false,
			area : [ '550px', height ],
			content : content,
			cancel:function(){
				flag=0;//do not refresh the page
			},
			end: function(){ 
				if(parent.layer.isCancel == "cancel"|| !parent.layer.isCancel||flag==0){return;}
				renderPage();
			}
		});
	}

	return LoadPageService;
})
