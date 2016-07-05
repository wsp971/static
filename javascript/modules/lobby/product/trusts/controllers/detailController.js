/**
 * Created by EX-XIALU001 on 2016-06-12.
 */
define(["jquery", "common/views"], function ($, view) {
    return new view.extend({
        //初始化方法
        init: function () {
            var productNum = utils.getQueryString("productNum");
            var publisherOrgID = decodeURI(utils.getQueryString("publisherOrgID") || ""); //发行机构ID
            var data = { productNum: productNum };
            loadAjax({
                url: "/product/queryProductDetail",
                data: JSON.stringify(data),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    if (result && result["rtnCode"] === "000") {
                        var systemTime = result.nowDate; //服务器系统时间
                        var contractSignModeText = result.data.contractSignModeText; //是否在线签署
                        $("#productName span:eq(0)").html(result.data.productName + " ID: " + result.data.productNum); //产品名称+ID
                        $("#productName span:eq(2)").html(result.data.productTypeLV2Text); //产品类型
                        $("table tr:eq(3),table tr:eq(4),table tr:eq(5),table tr:eq(6)").hide(); //隐藏4567行表格内容
                        if (result.data.productPhase == "1") {//咨询期详情
                            result.data.productPhaseText ? $("#productName span:eq(1)").html(result.data.productPhaseText) : "-"
                            $("#trusts-btn").show().html("咨询");
                            $("#productIntro>p").html(result.data.productIntro); //产品简介
                            $("#transaction-process").hide(); //咨询期交易流程隐藏
                            $("table tr:eq(0) td:eq(0)").html("目标规模(元)");
                            $("table tr:eq(0) td:eq(1)").html(result.data.aimAmount); //目标规模
                            $("table tr:eq(1) td:eq(2)").html("最低认购金额(元)");
                            $("table tr:eq(1) td:eq(3)").html(result.data.minSubAmount); //最低认购金额
                            $("table tr:eq(2) td:eq(0)").html("预期收益率");
                            $("table tr:eq(2) td:eq(1)").html("年化" + result.data.expRtnRate); //预期收益率
                            $("table tr:eq(2) td:eq(2)").html("计息基准");
                            $("table tr:eq(2) td:eq(3)").html(result.data.interestStandardText); //计息基准
                            $("#trusts-btn").on("click", function () {
                                window.open("/page/home/aboutus.html#contact", "_blank");
                            });
                        } else if (result.data.productPhase == "2") {//募集期详情
                            var subEndDate = result.data.subEndDate; //预约截止时间
                            $("#productName span:eq(1)").html(result.data.productPhaseText);
                            $("#productIntro>p").html(result.data.productIntro); //产品简介
                            $("#transaction-process").hide();
                            if(cookies.get("userType") == "1"){//高级用户
                                if (publisherOrgID != cookies.get('instId')) {//不是自己发行的产品
                                    if(result.data.productStatus!="5"){//产品已下架
                                        new Date(subEndDate).getTime() < new Date(systemTime).getTime() ? $("#trusts-btn").hide()
                                                                                                         : $("#trusts-btn").show().html("预约");
                                    }else{
                                        $("#trusts-btn").hide();
                                    }
                                }else{
                                    $("#trusts-btn").hide();
                                }
                            }else{
                                $("#trusts-btn").hide();
                            }
                            $("table tr:eq(3),table tr:eq(4)").show(); //显示4 5行表格内容
                            $("table tr:eq(0) td:eq(0)").html("目标规模(元)");
                            $("table tr:eq(0) td:eq(1)").html(result.data.aimAmount); //目标规模
                            $("table tr:eq(0) td:eq(2)").html("剩余额度(元)");
                            $("table tr:eq(0) td:eq(3)").html(result.data.remainAmount); //剩余额度
                            $("table tr:eq(0) td:eq(2)").html("预约期间起始");
                            $("table tr:eq(0) td:eq(3)").html(result.data.subBeginDate); //预约期间起始
                            $("table tr:eq(1) td:eq(0)").html("预约期间结束");
                            $("table tr:eq(1) td:eq(1)").html(result.data.subEndDate); //预约期间结束
                            $("table tr:eq(1) td:eq(2)").html("最低认购金额(元)");
                            $("table tr:eq(1) td:eq(3)").html(result.data.minSubAmount); //最低认购金额
                            $("table tr:eq(2) td:eq(0)").html("预期收益率");
                            $("table tr:eq(2) td:eq(1)").html("年化" + result.data.expRtnRate); //预期收益率
                            $("table tr:eq(2) td:eq(2)").html("计息基准");
                            $("table tr:eq(2) td:eq(3)").html(result.data.interestStandardText); //计息基准
                            $("table tr:eq(3) td:eq(0)").html("管理人");
                            $("table tr:eq(3) td:eq(1)").html(result.data.manager); //管理人
                            $("table tr:eq(3) td:eq(2)").html("托管人");
                            $("table tr:eq(3) td:eq(3)").html(result.data.trusteeAgency); //托管人
                            $("table tr:eq(4) td:eq(0)").html("投资范围");
                            $("table tr:eq(4) td:eq(1)").html(result.data.investScope); //投资范围
                            $("#trusts-btn").on("click", function (event) {
                                tab.open("24", "份额预约", "product/trusts/preorder/preorder.html?productNum=" + productNum, event);
                            });
                        } else if (result.data.productPhase == "3") {//成立期详情
                            var purchDeadLine = result.data.purchDeadLine; //认购截止时间
                            $("#productName span:eq(1)").html(result.data.productPhaseText);
                            $("#productIntro>p").html(result.data.productIntro); //产品简介
                            $("#transaction-process").hide();
                            if(cookies.get("userType") == "1"){//高级用户
                                if (publisherOrgID != cookies.get('instId')) {//不是自己发行的产品
                                    if(result.data.productStatus!="5"){//产品已下架
                                        new Date(purchDeadLine).getTime() < new Date(systemTime).getTime() ? $("#trusts-btn").hide()
                                                                                                             : $("#trusts-btn").show().html("立即购买");
                                    }else{
                                        $("#trusts-btn").hide();
                                    }
                                }else{
                                    $("#trusts-btn").hide();
                                }
                            }else{
                                $("#trusts-btn").hide();
                            }
                            $("table tr:eq(3),table tr:eq(4),table tr:eq(5),table tr:eq(6)").show(); //显示4567行表格内容
                            $("table tr:eq(0) td:eq(0)").html("目标规模(元)");
                            $("table tr:eq(0) td:eq(1)").html(result.data.aimAmount); //目标规模
                            $("table tr:eq(0) td:eq(2)").html("剩余额度(元)");
                            $("table tr:eq(0) td:eq(3)").html(result.data.remainAmount); //剩余额度
                            $("table tr:eq(1) td:eq(0)").html("认购截止日");
                            $("table tr:eq(1) td:eq(1)").html(result.data.purchDeadLine); //认购截止日
                            $("table tr:eq(1) td:eq(2)").html("最低认购金额(元)");
                            $("table tr:eq(1) td:eq(3)").html(result.data.minSubAmount); //最低认购金额
                            $("table tr:eq(2) td:eq(0)").html("起息日");
                            $("table tr:eq(2) td:eq(1)").html(result.data.valueDate); //起息日
                            $("table tr:eq(2) td:eq(2)").html("到期日");
                            $("table tr:eq(2) td:eq(3)").html(result.data.maturityDate); //到期日
                            $("table tr:eq(3) td:eq(0)").html("期限");
                            $("table tr:eq(3) td:eq(1)").html(result.data.productTerm + result.data.productTermUnitText); //期限
                            $("table tr:eq(3) td:eq(2)").html("发行规模(元)"); //发行金额
                            $("table tr:eq(3) td:eq(3)").html(result.data.publishAmount); //发行金额
                            $("table tr:eq(4) td:eq(0)").html("预期收益率");
                            $("table tr:eq(4) td:eq(1)").html("年化" + result.data.expRtnRate); //预期收益率
                            $("table tr:eq(4) td:eq(2)").html("计息基准"); //计息基准
                            $("table tr:eq(4) td:eq(3)").html(result.data.interestStandardText); //计息基准
                            $("table tr:eq(5) td:eq(0)").html("管理人"); //管理人
                            $("table tr:eq(5) td:eq(1)").html(result.data.manager); //管理人
                            $("table tr:eq(5) td:eq(2)").html("托管人"); //托管人
                            $("table tr:eq(5) td:eq(3)").html(result.data.trusteeAgency); //托管人
                            $("table tr:eq(6) td:eq(0)").html("投资范围"); //投资范围
                            $("table tr:eq(6) td:eq(1)").html(result.data.investScope); //投资范围
                            $("#trusts-btn").on("click", function (event) {
                                    if (contractSignModeText == "在线签署") {
                                        tab.open("24", "产品购买", "product/trusts/productBuy/buyTrust.html?productNum=" + productNum, event);
                                    } else {
                                        tab.open("24", "产品购买", "product/trusts/productBuy/buyTrust.html?productNum=" + productNum, event);
                                    }
                            });
                        } else if (result.data.productPhase == "4") {//存续期详情
                            $("#productName span:eq(1)").html(result.data.productPhaseText);
                            $("#trusts-btn").hide();
                            $("#productIntro>p").html(result.data.productIntro); //产品简介
                            $("#transaction-process").hide();
                            $("table tr:eq(3),table tr:eq(4),table tr:eq(5),table tr:eq(6)").show(); //显示4567行表格内容
                            $("table tr:eq(0) td:eq(0)").html("目标规模(元)");
                            $("table tr:eq(0) td:eq(1)").html(result.data.aimAmount); //目标规模
                            $("table tr:eq(0) td:eq(2)").html("剩余额度(元)");
                            $("table tr:eq(0) td:eq(3)").html(result.data.remainAmount); //剩余额度
                            $("table tr:eq(1) td:eq(0)").html("认购截止日");
                            $("table tr:eq(1) td:eq(1)").html(result.data.purchDeadLine); //认购截止日
                            $("table tr:eq(1) td:eq(2)").html("最低认购金额(元)");
                            $("table tr:eq(1) td:eq(3)").html(result.data.minSubAmount); //最低认购金额
                            $("table tr:eq(2) td:eq(0)").html("起息日");
                            $("table tr:eq(2) td:eq(1)").html(result.data.valueDate); //起息日
                            $("table tr:eq(2) td:eq(2)").html("到期日");
                            $("table tr:eq(2) td:eq(3)").html(result.data.maturityDate); //到期日
                            $("table tr:eq(3) td:eq(0)").html("投资剩余期限");
                            $("table tr:eq(3) td:eq(1)").html(result.data.productTerm); //投资剩余期限
                            $("table tr:eq(3) td:eq(2)").html("发行规模(元)");
                            $("table tr:eq(3) td:eq(3)").html(result.data.publishAmount); //发行金额
                            $("table tr:eq(4) td:eq(0)").html("预期收益率");
                            $("table tr:eq(4) td:eq(1)").html("年化" + (result.data.expRtnRate ? result.data.expRtnRate : "-"));
                            $("table tr:eq(4) td:eq(2)").html("计息基准"); //计息基准
                            $("table tr:eq(4) td:eq(3)").html(result.data.interestStandardText); //计息基准
                            $("table tr:eq(5) td:eq(0)").html("管理人"); //管理人
                            $("table tr:eq(5) td:eq(1)").html(result.data.manager); //管理人
                            $("table tr:eq(5) td:eq(2)").html("托管人"); //托管人
                            $("table tr:eq(5) td:eq(3)").html(result.data.trusteeAgency); //托管人
                            $("table tr:eq(6) td:eq(0)").html("投资范围"); //投资范围
                            $("table tr:eq(6) td:eq(1)").html(result.data.investScope); //投资范围
                        }
                        if (result.data.contract) {
                            $("#download").append('<p class="list01  ml10" >合同<em>（产品交易过程中，需要双方签署）</em></p>')
                            $("#download").append('<p class="list01 bg01  ml10 ct" ></p>')
                            var contract = result.data.contract;
                            var length = result.data.contract.length;
                            for (var i = 0; i < length; i++) {
                                var file = result.data.contract[i].file.split("|");
                                $("#download .ct").append('<a class="link">' + file[1] + '</a>');
                                $("#download .ct a").attr("href", encodeURI("/file/innerDownload?filename=" + file[1] + "&uuid=" + file[0]));

                            }
                        }
                        if (result.data.agreement) {
                            $("#download").append('<p class="list01  ml10" >协议<em>（产品交易过程中，需要投资方单方面签署）</em></p>')
                            $("#download").append('<p class="list01 bg01  ml10 ag" ></p>')
                            var agreement = result.data.agreement;
                            var length = result.data.agreement.length;
                            for (var i = 0; i < length; i++) {
                                var file = result.data.agreement[i].file.split("|");
                                $("#download .ag").append('<a class="link">' + file[1] + '</a>');
                                $("#download .ag a").attr("href", encodeURI("/file/innerDownload?filename=" + file[1] + "&uuid=" + file[0]));
                            }
                        }
                        if (result.data.specification) {
                            $("#download").append('<p class="list01  ml10" >产品说明书<em>（产品交易过程中，需要双方签署）</em></p>')
                            $("#download").append('<p class="list01 bg01  ml10 sp" ></p>')
                            var specification = result.data.specification;
                            var length = result.data.specification.length;
                            for (var i = 0; i < length; i++) {
                                var file = result.data.specification[i].file.split("|");
                                $("#download .sp").append('<a class="link">' + file[1] + '</a>');
                                $("#download .sp a").attr("href", encodeURI("/file/innerDownload?filename=" + file[1] + "&uuid=" + file[0]));
                            }
                        }
                        if (result.data.otherMaterial) {
                            $("#download").append('<p class="list01  ml10" >其他材料<em>（产品交易过程中，需要双方签署）</em></p>')
                            $("#download").append('<p class="list01 bg01  ml10 om" ></p>')
                            var contract = result.data.otherMaterial;
                            var length = result.data.otherMaterial.length;
                            for (var i = 0; i < length; i++) {
                                var file = result.data.otherMaterial[i].file.split("|");
                                $("#download .om").append('<a class="link">' + file[1] + '</a>');
                                $("#download .om a").attr("href", encodeURI("/file/innerDownload?filename=" + file[1] + "&uuid=" + file[0]));
                            }
                        }
                        if (result.data.transferContract) {
                            $("#download").append('<p class="list01  ml10" >转让合同<em>（产品交易过程中，需要双方签署）</em></p>')
                            $("#download").append('<p class="list01 bg01  ml10 tfc" ></p>')
                            var transferContract = result.data.transferContract;
                            var length = result.data.transferContract.length;
                            for (var i = 0; i < length; i++) {
                                var file = result.data.transferContract[i].file.split("|");
                                $("#download .tfc").append('<a class="link">' + file[1] + '</a>');
                                $("#download .tfc a").attr("href", encodeURI("/file/innerDownload?filename=" + file[1] + "&uuid=" + file[0]));
                            }
                        }
                    }
                }
            });
        }
    });
});
