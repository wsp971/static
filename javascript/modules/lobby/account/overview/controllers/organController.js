define([
	"jquery",
	"common/views",
	"../service/organService",
	    
], function ($, view,organService) {
	
    return view.extend({
    	
        init: function () {
            var self = this;
            this.organService=new organService(self);
        },
      
    });

});