define(["jquery",
        "common/views",
        "jquery.ui.widget",
        "jquery_iframe_transport",
        "jquery.fileupload",
        "jquery.fileupload-process",
        "jquery.fileupload-validate",
        "layer",
        "../../../../../lobby/account/myinvest/redeem/service/redeemService" 
],
		function ($, view, jquery_ui_widget, jquery_iframe_transport, fileupload, fileuploadProcess, fileuploadValidate, layer, RedeemService) {
		    return new view.extend({
		        init: function () {
		            var _this = this;
		            this.redeemService = new RedeemService();
		            // this.bindTips();  
		            this.getInfo();
		        },
		        //关闭按钮
		        closeBefore : function() {
			    	parent.window.coloseBefore = function(){
			            parent.layer.confirm('确认关闭基金赎回页吗？', {
				 		   	title:"提示",
				            btn: ['确定', '取消']
				    	}, function () {
				    		parent.layer.closeAll('dialog');
				    		parent.tab.close();
				    		return false;
				    	});
			       }
			    },
		        //转化为金钱格式（不带小数）
		        formatMoney : function (num) {
		        	if (num){
				    var l = num.split('.')[0].split('').reverse();
				    var t = '';
				    for (var i = 0; i < l.length; i++) {
				        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
				    }
				    return t.split('').reverse().join('');}
				    return num;
				},
				//基金代码的六位数字显示
				// formatCode : function(num) {
					// if (num && num.length<6){
					// var productCode = "";
					// for (var i=6-num.length; i>0; i--) {
					// 	productCode += "0";
					// }
					// return productCode += num;}
					// return num;
				// },
				//提示的显示与隐藏执行
				showTips : function(msg) {
					$('#warn-tips').addClass('visible');
				},
				hideTips : function() {
					$('#warn-tips').removeClass('visible');
				},
				//提示的显示与隐藏触发
				// bindTips : function(){
				// 	var _this = this;
				// 	$('#amount').focus(function() {
				// 			_this.showTips();
				// 	}).blur(function() {
				// 		if (! $('#amount').val()) {
				// 			_this.hideTips();
				// 		};
				// 	})
				// },
				// 获取产品信息
				getInfo : function () {
					var _this = this;
					var url = window.location.href;
					// var data = {
					// 	orderId: utils.getQueryString("orderId")
					// 	// orderId: "5338750386696192" //test
					// };
					// loadAjax({
					// 	url : "/trade/order/query",
					// 	data : JSON.stringify(data),
					// 	type: "POST",
					// 	dataType : "json",
					// 	contentType:"application/json",
					// 	success : function(result) {
					// 		// console.log(result);//test
					// 		if (result) {
					// 			//提交成功
					// 			if (result.rtnCode === "000") {
					// 				//份额以1,111,111显示
					// 				$('#orderShare').text(result.data.orderShare);
					// 				$('#max').text(_this.formatMoney($('#orderShare').text()));
					// 			} else {
					// 				parent.layer.msg('网络繁忙,请稍后再试！');
					// 			}
					// 		} else {
					// 			parent.layer.msg('网络繁忙,请稍后再试！');
					// 		}
					// 	}
					 	
					// });//ajax
					var orderShare = utils.getQueryString("totalShare");
					$('#orderShare').text(orderShare);
					$('#max').text(_this.formatMoney($('#orderShare').text()));
					var productNum = utils.getQueryString("productNum");
        			// alert(productNum);//test
        			//基金代码显示
					$('#productCode').text(productNum);
					var data2 = {
						productNum: utils.getQueryString("productNum")
						// productNum : "062521"//test
					};
					loadAjax({
						url : "/product/queryProductDetail",
						data : JSON.stringify(data2),
						type: "POST",
						dataType : "json",
						contentType:"application/json",
						success : function(result) {
							// console.log(result);//test
							if (result) {
								//提交成功
								if (result.rtnCode === "000" && result.data) {
									// var info1 = new Array();
									// info1[0] = "productName";
									// info1[1] = "department"; 
									// info1[2] = "dailyMaxAmount";//隐藏域+显示dailyMax
									// info1[3] = "redemptionDeadline";
									// info1[4] = "redeemBookDate";
									// info1[5] = "supportRedemption";
									// // info1[6] = "publisherOrgID"; //不需要获取了
								
									if (result.data.productName) {
										$('#productName').text(result.data.productName);
									} else {
										$('#productName').text('');
									} 
									if (result.data.department) {
										$('#department').text(result.data.department);
									} else {
										$('#department').text('');
									} 
									if (result.data.dailyMaxAmount) {
										$('#dailyMaxAmount').text(result.data.dailyMaxAmount);
									} else {
										$('#dailyMaxAmount').text('');
									} 
									if (result.data.redemptionDeadline) {
										$('#redemptionDeadline').text(result.data.redemptionDeadline);
									} else {
										$('#redemptionDeadline').text('');
									} 
									if (result.data.redeemBookDate) {
										$('#redeemBookDate').text(result.data.redeemBookDate);
									} else {
										$('#redeemBookDate').text('');
									} 
									if (result.data.supportRedemption) {
										$('#supportRedemption').text(result.data.supportRedemption);
									} else {
										$('#supportRedemption').text('');
									} 
									//赎回申请表redeemApplySheet材料下载地址
									if (result.data.redeemApplySheet) {
										var address = result.data.redeemApplySheet;
										splitAddress = address.split("|"); 
										// console.log(splitAddress);//test
										href = '/file/innerDownload?filename=' + splitAddress[1] + '&uuid=' + splitAddress[0] ;
										// alert(href);//test
										$('#sheet').attr("href",href);
									}
									//若是鹏华，则隐藏材料上传模块
									if ($('#department').text().trim() == "0001")
										$('#material').hide();
									//七日年化收益率%显示
									if (!result.data.sevenDayYield) {
										$('#sevenDayYield').text('');
									} else {
										$('#sevenDayYield').text(result.data.sevenDayYield + '%');
									}
									//每万份单位收益
									if (!result.data.unitProfit) {
										$('#unitProfit').text('');
									} else {
										$('#unitProfit').text(result.data.unitProfit + '元');
									}
								
									//单日赎回上限dailyMax以1,111,111显示
									if (!result.data.dailyMaxAmount) {
										$('#dailyMax').text('');
									} else if (result.data.dailyMaxAmount == '0') {
										$('#dailyMax').text('不限');
									} else {
										$('#dailyMax').text(_this.formatMoney(result.data.dailyMaxAmount) + '元');
									};
									//是否支持T+0赎回'yse'/'no'
									if ($('#supportRedemption').text().trim() == 'yes') {
										$('#support').text('是');
									} else if ($('#supportRedemption').text().trim() == 'no') {
										$('#support').text('否');
									};
								} else {
									parent.layer.msg('网络繁忙,请稍后再试！');
								}
							} else {
								parent.layer.msg('网络繁忙,请稍后再试！');
							}
						}
					 	
					});//ajax
					// event.preventDefault(); 
					// if(event.preventDefault) {
					// 	event.preventDefault();
					// } else {
					// 	window.event.returnValue = false;//注意加window
					// }
					return false;
				},

		         events: {
		        	"click #btnredeem": "doSubmitAjax",
		        	"click #btncancel": "doCancelConfirm",
		        	"click #fileupload": "fileuploadFiles"
		    	},
		    	handlers: {
			    	doSubmitAjax: function (event) {
				        this.redeemService.doSubmit(event);
				    },
				    doCancelConfirm: function (event) {
				        this.redeemService.doConfirm(event);
				    },
				    fileuploadFiles: function (event) {
		    			this.redeemService.uploadFile(event);
			    	}
				}
			});
		}
); 

