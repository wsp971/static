define(["jquery",
        "common/views",
        "jquery.ui.widget",
        "jquery_iframe_transport",
        "jquery.fileupload",
        "jquery.fileupload-process",
        "jquery.fileupload-validate",
        "layer",
        "../service/buyApplyService"
],	function ($, view, jquery_ui_widget, jquery_iframe_transport, fileupload, fileuploadProcess, fileuploadValidate, layer, buyApplyService) {
    return new view.extend({
    	valuse:{
    		orderId:"",
    		oprOrderStatus:"",
    		originalSide:""
    	},
        init: function () {
        	var self = this;
        	var orderId = utils.getParameter("orderId");
			var oprOrderStatus = utils.getParameter("oprOrderStatus");
			var originalSide = utils.getParameter("originalSide");
        	this.buyApplyService = new buyApplyService();
        	this.buyApplyService.queryData(orderId);
        	this.valuse.orderId = orderId;
        	this.valuse.oprOrderStatus = oprOrderStatus;
        	this.valuse.originalSide = originalSide;
        	
        	$("#cancelBtn").click(function(){
        		var index = parent.layer.getFrameIndex(window.name);
        		parent.layer.close(index);
        	});
        	
        },
        events: {
        	"click #submitBtn": "submitBtn"
        },
	    handlers: {
		    submitBtn: function (event) {
		    	this.buyApplyService.submitData(this.valuse.orderId, this.valuse.oprOrderStatus, this.valuse.originalSide);
		    }
	    }	
    });
}); 