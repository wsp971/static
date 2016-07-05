define([ "jquery",
	"common/views",
	"lobby/product/trusts/proRedemption/service/proRedemptionService",
	'jquery.validate.min',
	"messages_zh.min"
],
		function($, view,Prs,validate) {
			return view.extend({
				init : function() {
					this.prs = new Prs();
				},
				events : {
					"click .uploadBtn" : "uploadFile",
					"click .uploadBtn-down" : "uploadFileDown",
					"click .pro-cancelbtn" : "cancelClick"
				},
				handlers : {
					uploadFile : function(){
						this.prs.uploadFile();
					},
					uploadFileDown : function(){
						this.prs.uploadFileDown();
					},
					cancelClick:function(){
						this.prs.cancelBtnClicked();
					}
				}
			});
		});
