define(["jquery", "common/views",
		'lobby/account/publish/service/assetsSltService',
		'lobby/account/publish/service/stdPublishService',
		'lobby/account/publish/service/materialUploadService',
		'common/datarestrain',
		'common/autocompleter', 'bootstrap-suggest.min', 'jquery.steps.amd',
		'jquery.ui.widget', 'jquery.validate.min', 'messages_zh.min',
		'jquery.fileupload' ], function($, view, Acs, Sps, Ufs) {
	var extendSetting = {
		init : function() {
			var self = this;
			this.acs = new Acs();
			this.acs.initialize();
			this.sps = new Sps();
			this.ufs = new Ufs();
			this.ufs.initialize();
			$(function() {
				self.sps.initialize();
				$('#autocomplete').ficSuggest({
		        	url: '/product/queryInstByNameLike?instName='
	            });
				$('#standardCont').bindRestrain();
				self.acs.retriveBankData("#openAccountBank", "standard");
			});	
			
			setTimeout(function(){
				view.initLayerDates([
				    {start: "#purchDeadLine"},
					{start: "#subBeginDate",end: "#subEndDate"},
					{start: "#estEstDate", end: "#estMatDate", mid: "#estValDate"}
				]);
				view.initRadioHandlers(
					[{radios:["#realTimeR","#norealTimeR"]},{radios:["#online","#offline"]},
					 {radios:["#subRedeem","#noSubRedeem"], inputs:[["#subValueDate","#redeemBookDate"],[]],containers:[["#subValueDateDiv","#redeemBookDateDiv"],[]]},
					 {radios:["#canTransfer","#cannotTransfer"], inputs:[["#transferFee","",""],[]],containers:[["#transferFeeDiv","#transferHeadTr","#transferFileTr"],[]]},
					 {radios:["#privatePropose","#publicPropose"], inputs:[["#selectedTags a"],[]],containers:[["#autoCompDiv"],[]]},
					 {radios:["#raisePeriod","#establishPeriod"], inputs:[["#estValDate","#estMatDate"],["#purchDeadLine"]],containers:[["#estValDateDiv","#estMatDateDiv"],["#purchDeadLineDiv"]]}]);
			}, 500);
		},
		events : {
			"change #productType" : "assCateChanged",
			"click #resubmit" : "resubmit",
			"click #goProduct" : "goProduct",
			"click #refreshAccountBank" : "refreshAccountBank",
			"keydown .layer-date": "dateChanged",
			"click a.next": "scrollBack"
//			"click #viewProduct" : "viewProduct"
			
		},
		handlers : {
			scrollBack : function(){
				var errorEle = $("#standardCont").find("i.red")[0];
				$(errorEle).parent().prev() && $(errorEle).parent().prev().focus();
			},
			refreshAccountBank: function(){
				this.acs.retriveBankData("#openAccountBank", "standard");
			},
			goProduct : function() {
				tab.link("myaccount","acc-pub-productlist","account/mypublish/productlist.html").close();
			},
//			viewProduct : function() {
//				var a = tab.close();
//				a.open("asdasd","详情", "product/trusts/detail.html?productNum=30010016062600035", window.event);
//			},
			assCateChanged : function() {
				this.acs.categoryChanged();
			},
			resubmit : function() {
				this.sps.submit();
			},
			dateChanged : function(e){
				laydate.reset();
			}
		}
	}
	var options = $.extend(true, {}, extendSetting, Ufs.settings);
	return view.extend(options);
});
