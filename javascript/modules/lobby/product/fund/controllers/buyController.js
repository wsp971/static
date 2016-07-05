define(["jquery",
        "common/views",
        "jquery.ui.widget",
        "jquery_iframe_transport",
        "jquery.fileupload",
        "jquery.fileupload-process",
        "jquery.fileupload-validate",
        "layer",
        "../service/buyService" 
],
		function ($, view, jquery_ui_widget, jquery_iframe_transport, fileupload, fileuploadProcess, fileuploadValidate, layer, BuyService) {
		    return new view.extend({
		        init: function () {
		            var _this = this;
		            this.buyService = new BuyService();
		            this.bindTips();  
		            this.getInfo();
		            this.getBankInfo();
		            // _this.showTips();//test
		        },
		        //关闭按钮
		        closeBefore : function() {
			    	parent.window.coloseBefore = function(){
			            parent.layer.confirm('确认关闭基金购买页吗？', {
				 		   	title:"提示",
				            btn: ['确定', '取消']
				    	}, function () {
				    		parent.layer.closeAll('dialog');
				    		parent.tab.close();
				    		return false;
				    	});
			       }
			    },
				//提示的显示与隐藏执行
				showTips : function(msg) {
					$('#warn-tips').addClass('visible');
				},
				hideTips : function() {
					$('#warn-tips').removeClass('visible');
				},
				//提示的显示与隐藏触发
				bindTips : function(){
					var _this = this;
					$('#amount').keyup(function() {
						if ($('#amount').val()) {
							_this.showTips();
							return true;
						};
						_this.hideTips();
						return false;
					})	
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
					// 	var productCode = "";
					// 	for (var i=6-num.length; i>0; i--) {
					// 		productCode += "0";
					// 	}
					// 	return productCode += num;
					// }
					// return num;
				// },
				// 获取产品信息
				getInfo : function () {
					_this = this;
					var url = window.location.href;
        			var productNum = utils.getQueryString("productNum");
        			// alert(productNum);//test
        			//基金代码显示
					$('#productCode').text(productNum);
					var data = {
						productNum: utils.getQueryString("productNum")
						// productNum : "062521"//test
					};
					loadAjax({
						url : "/product/queryProductDetail",
						data : JSON.stringify(data),
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
									// info1[2] = "minSubAmount";//隐藏域min+显示min
									// info1[3] = "dailyMaxAmount";//隐藏域max
									// info1[4] = "fundPurchaseDeadline";//申购资金到账截止时间
									// info1[5] = "perMaxAmount";//隐藏域perMax
									// info1[6] = "publisherOrgID"; //不需要获取了
									// $.each(info1, function(){
									// 	_this = this;
									// 	if (result.data[_this]) {
									// 		$('#' + _this).text(result.data._this);
											
									// 	} else {
									// 		$('#' + _this).text('');
											
									// 	} 
									
									// });
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
									if (result.data.minSubAmount) {
										$('#minSubAmount').text(result.data.minSubAmount);
									} else {
										$('#minSubAmount').text('');
									} 
									if (result.data.dailyMaxAmount) {
										$('#dailyMaxAmount').text(result.data.dailyMaxAmount);
									} else {
										$('#dailyMaxAmount').text('');
									} 
									if (result.data.fundPurchaseDeadline) {
										$('#fundPurchaseDeadline').text(result.data.fundPurchaseDeadline);
									} else {
										$('#fundPurchaseDeadline').text('');
									} 
									if (result.data.perMaxAmount) {
										$('#perMaxAmount').text(result.data.perMaxAmount);
									} else {
										$('#perMaxAmount').text('');
									} 
									// var info2 = new Array();// 百分号%显示
									// info2[0] = "sevenDayYield";//七日年化收益率
									// info2[1] = "redeemFee";//赎回费率
									// info2[2] = "salesFee";//销售服务费率
									// info2[3] = "manageFee";//管理费率
									// info2[4] = "depositFee";//托管费率
									// info2[5] = "subscribeFee";//认购费率
									// info2[6] = "purchaseFee";//申购费率
									// $.each(info2, function(){
									// 	_this = this;
									// 	if (result.data.sevenDayYield) {
									// 		// alert(" y result.data[_this]:"+result.data[_this]);
									// 		$('#' + sevenDayYield).text(result.data.sevenDayYield + "%");
									// 		// console.log(result.data._this);
									// 	} else {
									// 		// alert("n result.data[_this]:"+result.data[_this]);
									// 		$('#' + _this).text('');
									// 	} 
									// });
									if (result.data.sevenDayYield) {
										$('#sevenDayYield').text(result.data.sevenDayYield + "%");
									} else {
										$('#sevenDayYield').text('');
									} 
									if (result.data.redeemFee) {
										$('#redeemFee').text(result.data.redeemFee + "%");
									} else {
										$('#redeemFee').text('');
									} 
									if (result.data.salesFee) {
										$('#salesFee').text(result.data.salesFee + "%");
									} else {
										$('#salesFee').text('');
									} 
									if (result.data.manageFee) {
										$('#manageFee').text(result.data.manageFee + "%");
									} else {
										$('#manageFee').text('');
									} 
									if (result.data.depositFee) {
										$('#depositFee').text(result.data.depositFee + "%");
									} else {
										$('#depositFee').text('');
									} 
									if (result.data.subscribeFee) {
										$('#subscribeFee').text(result.data.subscribeFee + "%");
									} else {
										$('#subscribeFee').text('');
									} 
									if (result.data.purchaseFee) {
										$('#purchaseFee').text(result.data.purchaseFee + "%");
									} else {
										$('#purchaseFee').text('');
									} 

									//购买申请表purchaseApplySheet材料下载地址
									if (result.data.purchaseApplySheet) {
										var address = result.data.purchaseApplySheet;
										splitAddress = address.split("|"); 
										// console.log(splitAddress);//test
										href = '/file/innerDownload?filename=' + splitAddress[1] + '&uuid=' + splitAddress[0] ;
										// alert(href);//test
										$('#sheet').attr("href",href);
									}
									//若是鹏华，则隐藏材料上传模块
									if ($('#department').text().trim() == "0001")
										$('#material').hide();
									//每万份单位收益
									if (result.data.unitProfit) {
										$('#unitProfit').text(result.data.unitProfit + '元');
									}
									//最低购买额min以1,111,111显示
									if (!result.data.minSubAmount) {
										$('#min').text('');
									} else if (result.data.minSubAmount == 0) {
										$('#min').text('不限');
									} else {
										$('#min').text(_this.formatMoney($('#minSubAmount').text()) + '元');
									};
									//申购资金到账截止日期
									if (result.data.purchasePay) {
										var n = parseInt(result.data.purchasePay);
										var newDate = new Date;
										var day = newDate.getDay();
										//若当日不为工作日，则找最近的工作日
								        while ( day == 6 || day == 0 ){
								            newDate = newDate.setDate(newDate.getDate() + 1);
								            newDate = new Date(parseInt(newDate));
								            day = newDate.getDay();
								        } 
								        //T+n个工作日后
								        for (var i = 0; i < n; i++) {
								            newDate = newDate.setDate(newDate.getDate() + 1);
								            newDate = new Date(parseInt(newDate));
								            day = newDate.getDay();
								            while ( day == 6 || day == 0 ){
								                newDate = newDate.setDate(newDate.getDate() + 1);
								                newDate = new Date(parseInt(newDate));
								                day = newDate.getDay();
								            } 
								        }
										var date = newDate.format("yyyy-MM-dd");
										$('#date').text(date);
									}
									
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
				//获取银行字典列表
				getBankInfo : function () {
					var data = {
						dictCategoryCode: "BANK_CODE"
					};
					loadAjax({
						url : "/trade/dict/list",
						data : JSON.stringify(data),
						type: "POST",
						dataType : "json",
						contentType:"application/json",
						success : function(result) {
							// console.log(result);//test
							if (result) {
								//提交成功
								if (result.rtnCode === "000") {
									var len = result.data.length;
									for(var i = 0; i < len; i++) {
										document.getElementById("bank").options.add(new Option(result.data[i].dictName , result.data[i].dictCode));
										// $('#bank').append('<option value="' + result.data[i].dictCode + '">' + result.data[i].dictName + '</option>');
									}

								} else {
									parent.layer.msg('网络繁忙,请稍后再试！');
								}
							} else {
								parent.layer.msg('网络繁忙,请稍后再试！');
							}
						}
					});//ajax
				},
		        events: {
		        	"click #btnbuy": "doSubmitAjax",
		        	"click #btncancel": "doCancelConfirm",
		        	"click #fileupload": "fileuploadFiles"
		    	},
		    	handlers: {
			    	doSubmitAjax: function (event) {
				        this.buyService.doSubmit(event);
				    },
				    doCancelConfirm: function (event) {
				        this.buyService.doConfirm(event);
				    },
				    fileuploadFiles: function (event) {
		    			this.buyService.uploadFile(event);
			    	}
				}
			});
		}
); 

