define(["jquery",
		"common/views",
		"lobby/account/contract/service/contractListService",
		"table"
	],
	function($, view, CtListService,table) {
		var signatureList = new Array;
		return view.extend({
			init : function() {
				var self = this;
				this.ctListService = new CtListService();
				this.ctListService.getData();
			},
			events : {
				"click .badge":"typeSelectClick",
				"click .ct-remind-page" : "remindClick",
				"focus .searchbox" : "focusClick",
				"blur .searchbox" : "blurClick"
			},
			handlers : {
				typeSelectClick : function(e,el){
					var em = e.currentTarget || e.target;
					this.ctListService.typeSelected(em);
				},
				remindClick : function(e,el){
					var toEmail=$(e.currentTarget || e.target).attr("data-value")
					this.ctListService.remind(toEmail);
				},
				focusClick : function(){
					$('.searchbox').addClass('active');
				},
				blurClick : function(){
					$('.searchbox').removeClass('active');
				}

			}
		});
	});
