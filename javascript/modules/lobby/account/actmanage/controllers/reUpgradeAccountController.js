define(["jquery",
        "common/views",
        "jquery.steps.amd",
        "jquery.ui.widget",
        "jquery_iframe_transport",
        "jquery.fileupload",
        "jquery.fileupload-process",
        "jquery.fileupload-validate",
        "jquery.validate.min",
        "messages_zh.min",
        "layer",
        "../service/reUpgradeAccountService" 
],
		function ($, view, steps,jquery_ui_widget, jquery_iframe_transport, fileupload, fileuploadProcess, fileuploadValidate, validate, messages_zh, layer, AccountService) {
		    return new view.extend({
		        init: function () {
		            var self = this;
		            $('#userId').val(cookies.get('userId'));
		            $('#username').val(cookies.get('username'));
		            $('#confirm').trigger('change');
		            this.accountService = new AccountService();
		            this.accountService.initSteps();
		            this.accountService.reUpdate();
		            this.accountService.getRegionHeight ();
		            this.accountService.getFileName();
		           
					$(".cont-err").hide();
					$(".cont-suc").hide();
					//隐藏分页
					$(".actions .previous").hide();
					$(".actions .finish").hide();
					$(".actions .cancel").hide();
					$(":radio")
							.click(
									function() {
										
										if ($(
												"input[name='orgCertType']:checked")
												.val() === "0") {
											
											$("#dis").show();
										} else {
											$("#dis").hide();
										}
										self.accountService.getRegionHeight ();
									});
					$("#lookPicture")
							.click(
									function() {
										layer
												.open({
													type : 2,
													//skin: 'layui-layer-lan',
													title : '查看范例',
													fix : false,
													shadeClose : true,
													maxmin : true,
													area : [ '687px',
															'495px' ],
													content : 'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&pn=10&spn=0&di=146724565600&pi=&rn=1&tn=baiduimagedetail&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=1903957143%2C479133575&os=914622453%2C1064137853&simid=0%2C0&adpicid=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=11&oriquery=&objurl=http%3A%2F%2Fwww.wed114.cn%2Fjiehun%2Fuploads%2Fallimg%2F160426%2F39_160426110638_1.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Boj1889_z%26e3BvgAzdH3F3tji7gAzdH3Fy7wgstwg37wguwuwxtg2AzdH3Fda8ma9dm89cn8l_d_z%26e3Bip4s&gsm=0'
												});
									})
					
		        },
		        events: {
		        	"click #fileupload": "fileuploadFiles",
		        	"change #confirm": "removeDidabled",
		        	"click #submit_btn":"subEvent"
		    },
		    handlers: {
		    	fileuploadFiles: function (event) {
			        this.accountService.uploadFile(event);
			    },
			    removeDidabled : function () {
			    	if($('#confirm').prop('checked') == true){
			    		$('#submit_btn').prop('disabled',false);
			    	} else {
			    		$('#submit_btn').prop('disabled',true);
			    	}
			    },
			    subEvent : function () {
			    	this.accountService.subEventFun();
			    }

		    }
});
}); 