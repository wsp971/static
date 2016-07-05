define(["jquery",
        "common/views",
        "layer",
        "../service/openAccountDetailService" 
],
		function ($, view, layer, OpenAccountDetailService) {
		    return new view.extend({
		        init: function () {
		        	var self = this;
		        	this.openAccountDetailService = new OpenAccountDetailService();
		        	
		        	var instId = utils.getQueryString('instId');
		        	var targetInstId = utils.getQueryString('targetInstId');
		        	if(instId == "" || instId == undefined || instId == null){
		    			parent.layer.msg("系统错误，请稍后再试！");
		    			return false;
		        	}
		    		if(targetInstId == "" || targetInstId == undefined || targetInstId == null){
		    			parent.layer.msg("系统错误，请稍后再试！");
		    			return false;
		        	}
		        	this.openAccountDetailService.getTemplate(instId, targetInstId);
		        	$("input[name='instId']").val(instId);
		        	$("input[name='targetInstId']").val(targetInstId);
		        	
		        	$('body').on('click','.watchPic',function(event){
		        		var src = $(event.target).attr("value");
						parent.layer.open({
								type : 1,
								title : '查看预览',
								shadeClose : true,
								shade: 0.2,
								area : [ '687px','495px' ],
								content:'<div style="text-align:center;margin-top:20px"><img src="'+src+'" style="text-align:center;max-width:600px;max-height:400px;"></div>'
							});
		            })
		        },
		        events: {
		        	
		    },
		    handlers: {
			    
		}
});
});