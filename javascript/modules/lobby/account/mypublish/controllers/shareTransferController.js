define(["jquery",
        "common/views",
        "jquery.ui.widget",
        "jquery_iframe_transport",
        "jquery.fileupload",
        "jquery.fileupload-process",
        "jquery.fileupload-validate",
        "layer",
        "../service/shareTransferService"
],	function ($, view, jquery_ui_widget, jquery_iframe_transport, fileupload, fileuploadProcess, fileuploadValidate, layer, shareTransferService) {
    return new view.extend({
    	valuse:{
    		orderId:"",
    		oprCode:"",
    		oprOrderStatus:"",
    		originalSide:""
    	},
        init: function () {
        	var self = this;
        	var orderId = utils.getParameter("orderId");
			var oprCode = utils.getParameter("oprCode");
			var oprOrderStatus = utils.getParameter("oprOrderStatus");
			var originalSide = utils.getParameter("originalSide");
        	this.shareTransferService = new shareTransferService();
        	if(validator.isEmpty(orderId)){
        		parent.layer.msg('系统出错，请稍后再试！');
        		return false;
        	}
        	if(validator.isEmpty(oprCode)){
        		parent.layer.msg('系统出错，请稍后再试！');
        		return false;
        	}
        	if(validator.isEmpty(oprOrderStatus)){
        		parent.layer.msg('系统出错，请稍后再试！');
        		return false;
        	}
        	if(validator.isEmpty(originalSide)){
        		parent.layer.msg('系统出错，请稍后再试！');
        		return false;
        	}
        	this.valuse.orderId = orderId;
        	this.valuse.oprCode = oprCode;
        	this.valuse.oprOrderStatus = oprOrderStatus;
        	this.valuse.originalSide = originalSide;
        	this.shareTransferService.queryData(orderId);
        	$("#cancelBtn").click(function(){
        		var index = parent.layer.getFrameIndex(window.name);
        		parent.layer.close(index);
        	});
        },
        events: {
        	"click #fileupload": "fileupload",
        	"click #submitBtn": "submitBtn"
        },
	    handlers: {
	    	fileupload: function (event) {
	    		this.shareTransferService.uploadFile(event);
		    },
		    submitBtn: function (event) {
		    	this.shareTransferService.submitData(this.valuse.orderId, this.valuse.oprCode, this.valuse.oprOrderStatus, this.valuse.originalSide);
		    }
	    }	
    });
}); 