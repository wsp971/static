define(["common/views" ],function(view) {
			return new view.extend(
					{
						init : function() {
			        		parent.layer.closeAll();
							var _this = this;
							// this.myaccountComService = new
							// myaccountComService(_this);
							this.getUserName();
							this.checkAccountState();
							this.getUserType();

						},

						getUserName : function() {
							$('#username').html(cookies.get('username'));
						},

						getUserType : function() {
							var userType = cookies.get('userType');
							if (userType == 0) {
								$('#account_state').html('普通');
							} else if (userType == 1) {
								$('#account_state').html('高级');
							}
						},
						checkAccountState : function() {
							// var data = "username=" +
							// cookies.get(username)+"";
							var data = {username : cookies.get('username')};
							loadAjax({
										url : "/user/queryByUserName",
										data : data,
										contentType : "application/x-www-form-urlencoded",
										dataType : "json",
										type : "post",
										success : function(result) {
											if (result && result.rtnCode == "000") {
												$('#instName').html(result.data.instName);
												if (result.data.instStatus == 0) {
													$('.content_body .fail_reason')
															.show()
															.html('您的账户升级申请已提交，请耐心等待……')
															.addClass('verify');
													$('#but').addClass(
															'disabled').prop(
															'disabled', true)
												}  else if (result.data.instStatus == 1) {
													if (result.data.comments) {
														$('.content_body .fail_reason')
																.show()
																.html('退回原因： '+result.data.comments+ '，&nbsp;请立即&nbsp;<a style="color:#286090">重新升级</a>');
														$('.content_body .fail_reason a').click(function(event){
															tab.open("upgradeAccount","升级账户","account/actmanage/reUpgrade_account.html?instId="
																									+ result.data.instId, event);
														});
														$('#but')
														.html('立即升级')
														.click(
																function(event) {
																	tab
																			.open(
																					"upgradeAccount",
																					"升级账户",
																					"account/actmanage/reUpgrade_account.html?instId="
																							+ result.data.instId, event);
																});
													} else {
														$('#but')
																.html('立即升级')
																.click(
																		function(event) {
																			tab
																					.open(
																							"upgradeAccount",
																							"升级账户",
																							"account/actmanage/reUpgrade_account.html?instId="
																									+ result.data.instId, event);
																		});
													}
												} else if(result.data.instStatus == 3){
													$('.content_body .fail_reason')
													.show()
													.html('您的账户升级成功，请用高级账户登录')
													.addClass('verify');
													$('#but').addClass(
															'disabled').prop(
															'disabled', true)
													
													
												} else {
													$('#but')
															.html('立即升级')
															.click(
																	function(event) {
																		tab
																				.link(
																						"myaccount",
																						"acc-myaccount_com",
																						"account/actmanage/upgrade_account.html", event);
																	});
									
												
												}
											}
										}
									});
						}
					});
		});