define(["jquery",
        "common/views",
        "jquery.ui.widget",
        "jquery_iframe_transport",
        "jquery.fileupload",
        "jquery.fileupload-process",
        "jquery.fileupload-validate",
        "jquery.validate.min",
        "messages_zh.min",
        "layer",
        "../service/openAccountService" 
],
		function ($, view, jquery_ui_widget, jquery_iframe_transport, fileupload, fileuploadProcess, fileuploadValidate, validate, messages_zh, layer, OpenAccountService) {
		    return new view.extend({
		        values:{
		        	flag:"",
		        	instId:"",
		        	targetInstId:"",
		        	userId:""
		        },
		    	init: function () {
		        	var self = this;
		        	this.openAccountService = new OpenAccountService();
		        	var flag = utils.getQueryString('flag');
		        	if(flag == "0"){
		        		$(".lobby .title").text("申请开户");
		        	}
		        	var instId = utils.getQueryString('instId');
		        	var targetInstId = utils.getQueryString('targetInstId');
		        	var userId = cookies.get('userId');
		        	if(flag == "" || flag == undefined || flag == null){
		    			parent.layer.msg("系统错误，请稍后再试！");
		    			return false;
		        	}
		        	if(instId == "" || instId == undefined || instId == null){
		    			parent.layer.msg("系统错误，请稍后再试！");
		    			return false;
		        	}
		    		if(targetInstId == "" || targetInstId == undefined || targetInstId == null){
		    			parent.layer.msg("系统错误，请稍后再试！");
		    			return false;
		        	}
		        	if(userId == "" || userId == undefined || userId == null){
		    			parent.layer.msg("系统错误，请稍后再试！");
		    			return false;
		        	}
		        	this.values.flag = flag;
		        	this.values.instId = instId;
		        	this.values.targetInstId = targetInstId;
		        	this.values.userId = userId;
		        	
		        	this.openAccountService.getTemplate(flag, instId, targetInstId, userId);
		        	
		        	$('body').on('click','.lookPicture',function(event){
		        		var src = $(event.target).attr("value");
		        		if(src.length==2){
		        			src = "../../../../../../../doc/account/"+ src +".jpg";
		        		}
						parent.layer.open({
								type : 1,
								title : '查看范例',
								shadeClose : true,
								shade: 0.2,
								area : [ '687px','495px' ],
								content:'<div style="text-align:center;margin-top:20px"><img src="'+src+'" style="text-align:center;max-width:600px;max-height:400px;"></div>'
							});
		            });
		        	$('body').on('click','.watchPic',function(event){
		        		var src = $(event.target).attr("value");
						parent.layer.open({
								type : 1,
								title : '上传预览',
								shadeClose : true,
								shade: 0.2,
								area : [ '687px','495px' ],
								content:'<div style="text-align:center;margin-top:20px"><img src="'+src+'" style="text-align:center;max-width:600px;max-height:400px;"></div>'
							});
		            })
		        },
		        events: {
		        	"click #fileupload": "fileuploadFiles",
		        	"click #open_account": "openAccount"
		    },
		    handlers: {
		    	fileuploadFiles: function (event) {
		    		this.openAccountService.uploadFile(event);
			    },
			    openAccount: function () {
			    	var self = this;
		    		this.openAccountService.openAccount(self.values.flag);
			    }
		}
});
});