define(["jquery",
        "common/views",
        "layer",
        "../service/shareAndTransferService"
],	function ($, view, layer, shareAndTransferService) {
    return new view.extend({
    	
        init: function () {
        	var self = this;
        	var orderId = utils.getParameter("orderId");
        	this.shareAndTransferService = new shareAndTransferService();
        	this.shareAndTransferService.queryData(orderId);
        },
        events: {
        	"click #submitBtn": "submitBtn"
        },
	    handlers: {
		    submitBtn: function () {
		    	var index = parent.layer.getFrameIndex(window.name);
          		parent.layer.close(index);
		    }
	    }	
    });
}); 