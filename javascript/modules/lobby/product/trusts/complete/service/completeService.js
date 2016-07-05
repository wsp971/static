/**
 * Created by HOUCHUNYANG742 on 2016-06-09.
 */
define(function() {
	var _this;
	function CompleteService() {
		_this = this;
	};
	CompleteService.prototype.myOrder = function() {
		parent.tab.link("myaccount", "acc-inv-orderlist",
				"account/myinvest/orderlist.html").close();
	};
	CompleteService.prototype.contractManger = function() {
		parent.tab.link("myaccount", "acc-contractList",
				"account/contract/contractList.html").close();
	};
	CompleteService.extendSettings = {
		events : {
			"click #orderSuc" : "myOrderClick",
			"click #onlineOrder" : "myOrderClick",
			"click #offlineOrder" : "myOrderClick",
			"click #contractManager" : "contractMangerClick",
		},
		handlers : {
			myOrderClick : function() {
				this.completeService.myOrder();
			},
			contractMangerClick : function() {
				this.completeService.contractManger();
			}
		}
	};
	return CompleteService;
});