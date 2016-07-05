define([ "jquery", "common/views",
		'lobby/account/publish/service/assetsSltService',
		'lobby/account/publish/service/fastPublishService',
		'lobby/account/publish/service/materialUploadService',
		'common/datarestrain','common/autocompleter',
		'jquery.steps.amd', 'jquery.ui.widget', 'jquery.validate.min',
		'messages_zh.min', 'jquery.fileupload' ], function($, view, Acs, Fps,
		Ufs) {
	var extendSetting = {
		init : function() {
			var self = this;
			this.acs = new Acs();
			this.acs.initialize();
			this.fsp = new Fps();
			this.ufs = new Ufs();
			this.ufs.initialize();
			
			$(function() {
				self.fsp.initialize();
				$('#autocomplete').ficSuggest({
		        	url: '/product/queryInstByNameLike?instName='
	            });
				$('#fastCont').bindRestrain();
				self.acs.retriveBankData("#openAccountBank","fast");
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
			$('.hiddenInput-1').hide();
		},
		events : {
			"click #fastUploadFile" : "uploadFile",
			"change #productType" : "assCateChanged",
			"change #productTypeLV2" : "typeLv2Changed",
			"click #resubmit" : "resubmit",
			"click #goProduct" : "goProduct",
			"click #refreshAccountBank" : "refreshAccountBank",
			"click a.next": "scrollBack"
		},
		handlers : {
			scrollBack : function(){
				var errorEle = $("#fastCont").find("i.red")[0];
				$(errorEle).parent().prev() && $(errorEle).parent().prev().focus();
			},
			refreshAccountBank: function(){
				this.acs.retriveBankData("#openAccountBank", "standard");
			},
			goProduct : function() {
				tab.link("myaccount","acc-pub-productlist","account/mypublish/productlist.html").close();
			},
			assCateChanged : function() {
				this.acs.categoryChanged();
			},
			// 快速发布上传文件ele,ulEle,url,fileType,callBack
			uploadFile : function(){
				this.ufs.fastUploadFile( function(){$(".actions .next").show();} );
			},
			typeLv2Changed : function() {
				$("#selectedType").text($('#productType').children('option:selected').text());
				$("#selectedTypeLv2").text($('#productTypeLV2').children('option:selected').text());
				this.acs.provideTemplate($('#productTypeLV2').val());
			},
			assCateChanged : function() {
				this.acs.categoryChanged();
			},
			resubmit : function() {
				this.sps.submit();
			}
		}
	}
	var options = $.extend(true, {}, extendSetting, Ufs.settings);
	return view.extend(options);
});
