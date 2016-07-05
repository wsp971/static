define([
	"jquery",
	"common/views",
	"../service/overviewService",
	"highcharts"     
], function ($, view,overviewService) {
	
    return view.extend({
    	
        init: function () {
            var self = this;
            this.overviewService=new overviewService(self);
            this.more();
        },
        more:function(){
        	var url='/page/lobby/main.html?tabmodule=myaccount&pageurl=';
        	$('#investMore').click(function(){
        		tab.link("myaccount","acc-inv-orderlist","account/myinvest/orderlist.html")
        	})
        	$('#productMore').click(function(){
        		tab.link("myaccount","acc-pub-productlist","account/mypublish/productlist.html")
        	})
        	
        }
      
    });

});