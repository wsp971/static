/**	
* Created by EX-XIALU001 on 2016-06-12.
*/
define(["jquery", "common/views"], function ($, view) {
    return new view.extend({
        //初始化方法
        init: function () {
            var orderId = utils.getQueryString("orderId");
            var productNum = utils.getQueryString("productNum");
            
            var code = "";
            var publishT = "";
            var publishOne = "";
            var publishTwo = "";
            var invest = "";
            var investOneT = "";
            var investTwo = "";
            var productName = "";
            var productType = "";
            var productCode = "";
            var tradeDate = "";
            var expAnnYield = "";
            var term = "";
            var valueDate = "";
            var expireDate = "";
            var insterstBase = "";
            var couponFrequency = "";
            var orderAmount = "";
            var orderAmountUpper = "";
            var subValueDate = "";
            var expEstabDate = "";
            var bankAcct = "";
            var bankName = "";
            var bankNum = "";
            var trustAccountName = "";
            var trustBankAccount = "";
            var trustAccount = "";
            
            var data = { orderId: orderId };
            loadAjax({
                url: "/trade/order/confirminfo/query",
                data: JSON.stringify(data),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    if (result && result.rtnCode === "000") {
                    	 var value = result.data.productType;
                    	 var text = '-';
                    	 var termUnit = result.data.termUnit;
                    	 var textUnit = '';
	              		 switch (value) {
	              		     case '1':
	              		    	text = '银行理财';
	              		    	break;
	              		     case '2': 
	              		    	text = '基金';
	              		    	break;
	              		     case '3': 
	              		    	text = '信托';
	              		    	break;
	              		     case '4':
	              		    	text = '资管';
	              		    	break;
	              		     case '5': 
	              		    	text = '结构化资产';
	              		    	break;
	              		     case '6': 
	              		    	text = '交易资产';
	              		    	break;
	              		}
	              		 switch (termUnit) {
              		     case 'd':
              		    	textUnit = '天';
              		    	break;
              		     case 'm': 
              		    	textUnit = '月';
              		    	break;
              		     case 'y': 
              		    	textUnit = '年';
              		    	break;
	              		 }
	              		 
	              		code = orderId || "-";
	              		productName = result.data.productName || "-";
	              		productType = text || "-";
	              		productCode = result.data.productCode || "-";
	              		tradeDate = result.data.tradeDate && result.data.tradeDate.formatDate("yyyy-MM-dd") || "-";
	              		expAnnYield = result.data.expAnnYield || "-";
	              		term = result.data.term + textUnit || "-";
	              		valueDate = result.data.valueDate && result.data.valueDate.formatDate("yyyy-MM-dd") || "-";
	              		expireDate = result.data.expireDate && result.data.expireDate.formatDate("yyyy-MM-dd") || "-";
	              		insterstBase = result.data.insterstBase || "-";
	              		couponFrequency = result.data.couponFrequency || "-";
	              		orderAmount = result.data.orderAmount && result.data.orderAmount.toString().formatMoney() || "0";
	              		orderAmountUpper = rmb.toUperCase(result.data.orderAmount || "-");
	              		subValueDate = result.data.valueDate && result.data.valueDate.formatDate("yyyy-MM-dd") || "-";
	              		//expEstabDate = result.data. || "-";
	              		bankAcct = result.data.bankAcct || "-";
	              		bankName = result.data.bankName || "-";
	              		bankNum = result.data.bankNum || "-";
	              		
                        if(typeof(result.data.buyerInstitutionInfo) == "undefined"){
                        	publishT = "-";
                        	publishOne = "-";
                        	publishTwo = "-";
                        }else{
                        	publishT = result.data.publisherInstitutionInfo.instName;
                        	publishOne = result.data.publisherInstitutionInfo.instName;
                        	publishTwo = result.data.publisherInstitutionInfo.instName;
                        }
                        if(typeof(result.data.buyerInstitutionInfo) == "undefined"){
                        	invest = "-";
                        	investOneT = "-";
                        	investTwo = "-";
                        }else{
                        	invest = result.data.buyerInstitutionInfo.instName;
                        	investOneT = result.data.buyerInstitutionInfo.instName;
                        	investTwo = result.data.buyerInstitutionInfo.instName;
                        }
                        $("#code").html(code);//成交编号
                    	$("#publish").html(publishT); //产品发行方
                    	$("#publishOne").html(publishOne); //产品发行方
                    	$("#publishTwo").html(publishTwo); //产品发行机构名称
                    	$("#invest").html(invest); //产品认购方
                    	$("#investOne").html(investOneT); //产品认购方
                    	$("#investTwo").html(investTwo); //产品认购机构名称
                        $("#productName").html(productName); //产品名称
                        $("#productType").html(productType); //产品类型
                        $("#productCode").html(productCode); //产品编号
                        $("#tradeDate").html(tradeDate)  ; //成交日期
                        $("#expAnnYield").html(expAnnYield); //预期年化收益率
                        $("#term").html(term); //产品期限
                        $("#valueDate").html(valueDate); //起息日
                        $("#expireDate").html(expireDate); //到期日
                        $("#insterstBase").html(insterstBase); //计息标准
                        $("#couponFrequency").html(couponFrequency); //付息频率
                        $("#orderAmount").html(orderAmount); //投资金额（小写）
                        $("#orderAmountUpper").html(orderAmountUpper); //投资金额（大写）
                        $("#subValueDate").html(subValueDate); //认购/申购起息日
                        //$("#expEstabDate").html(expEstabDate); //预期成立日期
                        $("#bankAcct").html(bankAcct); //投资方收款账户名称
                        $("#bankName").html(bankName); //投资方方开户银行
                        $("#bankNum").html(bankNum); //投资方账号
                        
                        var dataPro = {productNum:productNum}
                        loadAjax({
                            url: "/product/queryProductDetail",
                            data: JSON.stringify(dataPro),
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json",
                            success: function (result) {
                            	if (result && result.rtnCode === "000") {
                            		trustAccountName = result.data.collectionAccountName || "-";
                            		trustBankAccount = result.data.openAccountBankText || "-";
                            		trustAccount = result.data.bankAccount || "-";
                                    $("#trustAccountName").html(trustAccountName); //信托专户名称
                                    $("#trustBankAccount").html(trustBankAccount); //信托专户开户银行
                                    $("#trustAccount").html(trustAccount); //信托专户账号

                                    var dataPdf = {
                                    	    code: code,
                                    	    publishT: publishT,
                                    	    publishOne: publishOne,
                                    	    publishTwo: publishTwo,
                                    	    invest: invest,
                                    	    investOneT: investOneT,
                                    	    investTwo: investTwo,
                                    	    productName: productName,
                                    	    productType: productType,
                                    	    productCode: productCode,
                                    	    tradeDate: tradeDate,
                                    	    expAnnYield: expAnnYield,
                                    	    term: term,
                                    	    valueDate: valueDate,
                                    	    expireDate: expireDate,
                                    	    insterstBase: insterstBase,
                                    	    couponFrequency: couponFrequency,
                                    	    orderAmount: orderAmount,
                                    	    orderAmountUpper: orderAmountUpper,
                                    	    subValueDate: subValueDate,
                                    	    expEstabDate: expEstabDate,
                                    	    bankAcct: bankAcct,
                                    	    bankName: bankName,
                                    	    bankNum: bankNum,
                                    	    trustAccountName: trustAccountName,
                                    	    trustBankAccount: trustBankAccount,
                                    	    trustAccount : trustAccount
                                    } 
                            	}
                            }
                        });
                    }
                }
            });
            
        },
        events: {
        	"click .print-img": "printFile"
        },
	    handlers: {
	    	printFile: function (event) {
	    		var html = window.document.body.innerHTML;
	    		window.document.body.innerHTML = $(".wcontent").html();
	    		window.print(); 
	    		window.document.body.innerHTML = html;
		    }
	    }	
    });
});
