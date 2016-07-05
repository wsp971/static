define(['common/datautil'],
function(DataUtil) {
	var regexMap = !parent.regexMap ? parent.parent.regexMap: parent.regexMap;
    var cookies = !parent.cookies ? parent.parent.cookies: parent.cookies;

    function SubmissionService() {}

    SubmissionService.prototype.initValidate = function() {

        jQuery.validator.addMethod("productTypeLV2",
        function(value, element) {
            return this.optional(element) || $("#productTypeLV2").val() > 0;
        },
        "");

//        jQuery.validator.addMethod("productTerm",
//        function(value, element) {
//            return this.optional(element) || (regexMap.numberic.test($("#productTerm").val()) 
//            		&& ($("#productTerm").val()>0) && $("#productTermType").val());
//        },
//        "");

        jQuery.validator.addMethod("assignedMembers",
        function(value, element) {
            return true;
        },
        "");

        //		jQuery.validator.addMethod("subEndDate", function(value, element) {
        //			var subBeginDate = $("#subBeginDate").val();
        //			return subBeginDate.trim().length == 0 || value.trim().length == 0
        //					|| subBeginDate >= value ? false : true;
        //		}, "");
        jQuery.validator.addMethod("contractFiles",
        function(value, element) {
            return $("#protocolFiles").children().lenght > 0;
        },
        "");

        jQuery.validator.addMethod("protocolFiles",
        function(value, element) {
            return $("#protocolFiles").children().lenght > 0;
        },
        "");

        jQuery.validator.addMethod("trasferContratFiles",
        function(value, element) {
            return $("#trasferContratFiles").children().lenght > 0;
        },
        "");

        var icon = '<i class="iconfont red">&#xe60e;</i>';
        $("#form").validate({
            rules: {
                "productTypeLV2": {
                    required: true,
                    productTypeLV2: true
                },
                "productTermType": {
                    required: true,
                },
                "productTerm": {
                    required: true,
                },
                "subBeginDate": {
                    required: true
                },
                "subEndDate": {
                    required: true
                },
                "postponeTo": {
                    postponeTo: true
                },
                "contractFiles": {
                    contractFiles: true
                },
                "protocolFiles": {
                    protocolFiles: true
                },
                "trasferContratFiles": {
                    contractFiles: true
                },
                "assignedMembers": {
                    assignedMembers: true
                },
                "trustAccountName": {
                	required: true
                },
                "trustBankAccount": {
                	required: true
                },
                "trustAccount": {
                	required: true
                }
            },
            messages: {
                "productTypeLV2": icon + "请选择资产类型",
                "productName": icon + "请填写产品名称",
                "publisherOrg": icon + "请填写发行方机构",
                "publisherOrgType": icon + "请填写发行方机构类型",
                "subBeginDate": icon + "请填起始日期",
                "subEndDate": icon + "请填结束日期",
                "purchDeadLine": icon + "请填写认购截止日",
                "estValDate": icon + "请填写预计起息日",
                "estMatDate": icon + "请填写预计到期日",
                "estEstDate": icon + "请填写预计成立日",
                "profitType": icon + "请填写收益类型",
                "productTermType": icon + "请填写产品期限",
                "productTerm": icon + "请填写产品期限",
                "expRtnRate": icon + "请填写预期年收益率",
                "interestPayFreq": icon + "请选择付息频率",
                "minSubAmount": icon + "请填写最低投资金额",
                "subValueDate": icon + "请填写申购起息日",
                "redeemBookDate": icon + "请填写赎回到账日",
                "minAppendAmount": icon + "请填写最低追加金额",
                "perMaxAmount": icon + "请填写单笔最高金额",
                "transferFee": icon + "请填写转让手续费率",
                "productIntro": icon + "请填写产品简介",
                "investScope": icon + "请填写投资范围",
                "contractFiles": icon + "请上传合同文件",
                "protocolFiles": icon + "请上传协议文件",
                "trasferContratFiles": icon + "请上传转让合同文件",
                "collectionAccountName": icon +　"请填写专户名称",
                "openAccountBank": icon +　"请填写专户开户银行",
                "bankAccount": icon +　"请填写专户账号"
            },
            success: function(label) {
                label.parent().children("label.error").length > 1 && label.remove();
                label.parent().children("input.noneed").length == 0 && label.html('<i class="iconfont green">&#xe60f;</i>'),
                label.add();
            },
            errorPlacement: function(error, element) {
            	(error.children().length != 0) && element.parent().children("label.error").remove();
                
                if (element.hasClass("errorAfter")) {
                    error.insertAfter(element);
                } else {
                    error.appendTo(element.parent());
                }
            }
        })
    }
    
    SubmissionService.prototype.submitPublish = function() {
        var data = DataUtil.appendUserData(DataUtil.collectData(), cookies);
        data.contract = DataUtil.collectChildData({id:"contractFiles", ele: "li", dataName: "contract", keyName: "file"});
        data.agreement = DataUtil.collectChildData({id:"protocolFiles", ele: "li", dataName: "contract", keyName: "file"});
        // 特殊处理...
        data.aimAmount = data.remainAmount;
        data.specification = DataUtil.collectChildData({id:"specification", ele: "li", dataName: "contract", keyName: "file"});
        data.otherMaterial = DataUtil.collectChildData({id:"otherFiles", ele: "li", dataName: "contract", keyName: "file"});
        data.transferContract = DataUtil.collectChildData({id:"transferContractFiles", ele: "li", dataName: "contract", keyName: "file"});
        data.assignedMembers = DataUtil.collectChildData({id:"selectedTags", ele: "a", dataName: "id", spliter: ","});
        console.log(JSON.stringify(data));
        $.loadAjax({
            url: "/product/createProduct",
            data: JSON.stringify(data),
            type: "post",
            dataType: "json",
            isLoading: true,
            targets: [$("#loadTarget")],
            before: function() {
            	$("#loadingDiv").removeClass("hidden");
            },
            success: function(res) {
            	if(res.rtnCode == "000"){
            		$("#completeDiv").removeClass("hidden");
            	}else if(res.rtnCode == "999"){
            		$("#failDiv").removeClass("hidden");
                	$("#failReason").text(res.rtnMsg);
                	$("#timeoutMsg").removeClass("hidden");
            	} else {
            		$("#failDiv").removeClass("hidden");
                	$("#failReason").text(res.rtnMsg);
                	$("#otherMsg").removeClass("hidden");
            	}
            },
            error: function(xhr, textStatus, errorThrown){
            	console.log(errorThrown);
            	$("#failDiv").removeClass("hidden");
            	$("#failReason").text(errorThrown);
            },
            timeouthandler: function(){
            	$("#failDiv").removeClass("hidden");
            	$("#failReason").text("提交请求超时");
            	$("#timeoutMsg").removeClass("hidden");
            },
            complete: function(){
            	$("#loadingDiv").addClass("hidden");
            }
        });
    }
    
    return SubmissionService;
})