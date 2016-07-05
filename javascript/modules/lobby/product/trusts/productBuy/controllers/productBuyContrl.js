define([ "jquery", "common/views",
		"lobby/product/trusts/productBuy/service/productBuyService",
		"lobby/product/trusts/complete/service/completeService",
		'jquery.validate.min', "messages_zh.min" ], function($, view,
		ProductBuyService, CompleteService, validate) {
	var extendSetting = {
		init : function() {
			this.productBuyService = new ProductBuyService();
			this.completeService = new CompleteService();
		},
		events : {
			"click #fileupload1" : "uploadFile1",
			"click #fileupload2" : "uploadFile2",
			"click #fileupload-down1" : "uploadFileDown1",
			"click #fileupload-down2" : "uploadFileDown2",
			"click .pro-cancelbtn" : "cancelClick",
			"input #inputMoneyNum" : "inputMoney",
			"click .pro-surebtn" : "submitClick"
		},
		handlers : {
			uploadFile1 : function() {
				this.productBuyService.uploadFile1();
			},
			uploadFile2 : function() {
				this.productBuyService.uploadFile2();
			},
			uploadFileDown1 : function() {
				this.productBuyService.uploadFileDown1();
			},
			uploadFileDown2 : function() {
				this.productBuyService.uploadFileDown2();
			},
			cancelClick : function() {
				this.productBuyService.cancelBtnClicked();
			},
			inputMoney : function() {
				this.productBuyService.inputMoneyClicked();
			},
			submitClick : function(){
				this.productBuyService.submitClicked();
			}
		}
	};

	var options = $.extend(true, {}, extendSetting,
			CompleteService.extendSettings);
	return view.extend(options);
});
