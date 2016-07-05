define(["jquery",
        "citys",
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
        "../service/upgradeAccountService"
],
		function ($, citys, view, steps, jquery_ui_widget, jquery_iframe_transport, fileupload, fileuploadProcess, fileuploadValidate, validate, messages_zh, layer, AccountService) {
		    return new view.extend({
		        init: function () {
		            var self = this;
		            this.accountService = new AccountService();
		            this.accountService.initSteps();
		            $("#confirm").click(function(){
		            	if($("#confirm").is(':checked')==false){
							$(".actions .next").attr("disabled","disabled");
							$(".actions .next").attr("href","javascript:void(0)");
							$(".actions .next").css("background","gray");
						}else{
							$(".actions .next").removeAttr("disabled","disabled");
							$(".actions .next").attr("href","#next");
							$(".actions .next").css("background","#1777CD");
						}
		            });
					$("#userId").val(cookies.get('userId'));
					$("#username").val(cookies.get('username'));
					$(".cont-err").hide();
					$(".cont-suc").hide();
					$(".cont-scs").hide();
					//隐藏分页
					$(".actions .previous").hide();
					$(".actions .finish").hide();
					$(".actions .cancel").hide();
					$(":radio").click(function() {
						if ($("input[name='orgCertType']:checked").val() === "0") {
							$("#dis").show();
						} else {
							$("#dis").hide();
						}
					});
					$(".lookPicture").click(function(event) {
						var src = $(event.target).attr("value");
							parent.layer.open({
									type : 1,
									title : '查看范例',
									shadeClose : true,
									shade: 0.2,
									area : [ '687px','495px' ],
									content:'<div style="text-align:center;margin-top:20px"><img src="'+src+'" style="text-align:center;max-width:600px;max-height:400px;"></div>'
								});
					});
					$('body').on('click','#downfiles',function(event){
		            	tab && tab.open("download", "委托书下载", "../../../../doc/account/legalAccredit.pdf",event);
		            	return false;
		            })
		        },
		        events: {
		        	"click #fileupload": "fileuploadFiles"
		    },
		    handlers: {
		    	fileuploadFiles: function (event) {
		    		this.accountService.uploadFile(event);
			    }

		}
});
}); 