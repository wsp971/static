define([ "jquery", "common/views",
		"lobby/product/trusts/preorder/service/preorderService",
		"lobby/product/trusts/complete/service/completeService",
		'common/datarestrain',
		'jquery.validate.min', "messages_zh.min" ], function($, view,
		PreService, CompleteService, validate) {
	var extendSetting = {
		init : function() {
			this.preService = new PreService();
			this.completeService = new CompleteService();
			$(function() {
				$('#preorderDiv').bindRestrain();
			});	
		},
		events : {
			"click .pre-cancelbtn" : "cancelClick",
			"click .pre-surebtn" : "submitClick"
		},
		handlers : {
			cancelClick : function() {
				this.preService.cancelBtnClicked();
			},
			submitClick : function(){
				this.preService.submitClicked();
			}
		}
	}
	var options = $.extend(true, {}, extendSetting,
			CompleteService.extendSettings);
	return view.extend(options);
});
