define([
	"/javascript/lib/jquery/1.9.1/jquery",
	"../../../../common/views",
	"../service/agentPwdService",
	"../service/agentEmailService",
	    
], function ($, view,agentPwdService,agentEmailService) {
	
    return view.extend({
    	
        init: function () {
            var self = this;
            this.agentPwdService=new agentPwdService(self);
            this.agentEmailService=new agentEmailService(self);
        },
        valiIsEmpty:function(selector,callback){
			$('#'+selector).blur(function(){
				if(validator.isEmpty($(this).val().trim())){
					if(selector=='newPwd'){
						$(this).parent().next().after('<span class="wrong tip ml20">当前输入内容不能为空</span>')
					}else{
						$(this).parent().after('<div class="form-control-static wrong">当前输入内容不能为空</div>')
					}
				}else{
					if(callback){
						callback(selector);
					}
				}
			}).focus(function(){
				if(selector=='newPwd'){
					$(this).parent().next().next().remove();
				}else{
					$(this).parent().next().remove();
				}
			})
        }
      
    });

});