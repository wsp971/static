define([ "jquery", "common/views",'common/datautil',
		"lobby/account/contract/service/pwdConfirmService"],
		function($, view, DataUtil, PwdConfirmService) {

			return view.extend({
				init : function() {
					this.pwdser=new PwdConfirmService();
				},
				
				events : {
					"click #submitPwd" : "submitPwd",
					"click #cancelBtn" : "cancelConfirm",
					"input #logpwd" : "logPwdChanged"
						
						
				},
				handlers : {
					logPwdChanged:function(e){
						this.pwdser.logPwdChanged(e);
					},
					cancelConfirm:function(){
						this.pwdser.cancelConfirm();
					},
					submitPwd: function (){
						this.pwdser.submitPwd();
					}
				}
			});
		});
