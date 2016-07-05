/**
* Created by EX-XIALU001 on 2016-06-12.
*/
define(["jquery", "common/views"], function ($, view) {
    return new view.extend({
        //初始化方法
        init: function () {
            this.productNum =utils.getQueryString("productNum");
            this.publisherOrgID = utils.getQueryString("publisherOrgID");
           var publisherOrgID = utils.getQueryString("publisherOrgID");
            this.getDetails();
            this.getOpreate();
        },
        getDetails: function () {
            loadAjax({
                url: "/product/queryProductDetail",
                data: JSON.stringify({ productNum: this.productNum }),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    if (result) {
                        if (result["rtnCode"] === "000") {
                            //机构名称
                            if(result.data.redeemApplySheet){
                                $("#download").append('<p class="list01  ml10" >购买申请表<em>（产品交易过程中，需要双方签署）</em></p>')
                                $("#download").append('<p class="list01 bg01  ml10" ></p>')
                                    var file =result.data.redeemApplySheet.split("|");
                                    $("#download p:eq(1)").append('<a download="download">'+file[1]+'</a>');
                                    $("#download p:eq(1) a").attr("href",encodeURI(file[2]));    
                            };
                            if(result.data.purchaseApplySheet){
                                $("#download").append('<p class="list01  ml10" >赎回详情表<em>（产品交易过程中，需要双方签署）</em></p>')
                                $("#download").append('<p class="list01 bg01  ml10" ></p>')
                                 var filenone =result.data.purchaseApplySheet.split("|");
                                if(!result.data.redeemApplySheet){
                                      $("#download p:eq(1)").append('<a download="download">'+filenone[1]+'</a>');
                                      $("#download p:eq(1) a").attr("href",encodeURI(file[2]));  
                                }else{
                                    $("#download p:eq(3)").append('<a download="download">'+filenone[1]+'</a>');
                                    $("#download p:eq(3) a").attr("href",encodeURI(file[2]));
                                }
                            };
                            if (result.data.productName) {
                                $("#productName span:eq(0)").html(result.data.productName);  
                            };
                            // 机构代码
                            if (result.data.productNum) {
                                $("#productName span:eq(1) ").html("基金代码:"+result.data.productNum).css({"font-size":"14px","margin-left":"10px"});    
                            };
                            //机构类型
                            if (result.data.productTypeLV2Text) {
                                $("#productName p").html(result.data.productTypeLV2Text);
                            };
                            //发行机构 
                            if (result.data.publisherOrg) {
                                $("#list tr:eq(0) td:eq(1)").html(result.data.publisherOrg);
                            };
                            //发行机构类型
                            if (result.data.publisherOrgType) {
                                $("#list tr:eq(0) td:eq(3)").html(result.data.publisherOrgType);
                            };
                            //7日年化收益率
                            if (result.data.sevenDayYield) {
                                $("#list tr:eq(1) td:eq(1)").html(result.data.sevenDayYield + '%');
                            };
                            //管理人
                            if (result.data.manager) {
                                $("#list tr:eq(1) td:eq(3)").html(result.data.manager);
                            };
                            //T+0赎回 
                            if (result.data.supportRedemption && result.data.supportRedemption === 'yes') {
                                $("#list tr:eq(2) td:eq(1)").html('是');
                            } else if (result.data.supportRedemption && result.data.supportRedemption === 'no') {
                                $("#list tr:eq(2) td:eq(1)").html('否');
                            };
                            //日期
                            if (result.data.netDate) {
                                $("#list tr:eq(2) td:eq(3)").html(result.data.netDate);
                            };
                            //净值
                            if (result.data.netValue) {
                                $("#list tr:eq(3) td:eq(1)").html(result.data.netValue); 
                            };
                            //日增长率
                            if (result.data.growthRate) {
                                $("#list tr:eq(3) td:eq(3)").html(result.data.growthRate + '%');
                            };
                            //累计净值
                            if (result.data.totalNetValue) {
                                $("#list tr:eq(4) td:eq(1)").html(result.data.totalNetValue); 
                            };
                            //产品介绍
                            if (result.data.productIntro) {
                                $("#productIntro").html(result.data.productIntro);
                            };
                            
                            $("#transaction-process,#transaction-process+div").hide();
                        }
                    }
                }
        
            });
   
            //this.toDoOpreate(result.data);
        },

       getOpreate: function (publisherOrgID,productNum) {
            var productNum = this.productNum;
            var publisherOrgID = this.publisherOrgID;
            //test targetInstId = 8846
           $("#nextSetp").on("click", function (event) {
           /* var instId = this.instId;*/
              // console.log(publisherOrgID)
                var instId = cookies.get("instId"); 
            loadAjax({
                url: "/trade/account/status",
                //data: JSON.stringify({ instId: "8902", targetInstId: "8846" }),
                data: JSON.stringify({ instId: instId, targetInstId: publisherOrgID }),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    if (result && result["rtnCode"] === "000") {                     
                        if (result.data.dataStatus == "Y") {//是否已开户
                             tab.open("","购买","product/fund/buy.html?productNum="+productNum,event);
                        } else if(result.data.dataStatus == "N"){
                            parent.layer.confirm('您还未开基金户，请确认是否开户？', {
                                   title:"开户提示",
                                    btn: ['确认', '取消']
                                }, function () {
                                    tab.link("myaccount","acc-open_account_list","account/myinvest/openaccount/open_account.html?instId="+publisherOrgID+"&targetInstId="+instId+"&flag=0")
                                    parent.layer.closeAll();
                                    return false;
                                });
                        }
                    }else{
                    	parent.layer.alert(
                    			"获取交易信息失败，请稍后再试"
                    	)
                    	console.log(result.rtnMsg)
                    }
                }
            });
        })
       }
/*
        toDoOpreate: function (result) {
            $("#nextSetp").on("click", function () {
              
            });
        }*/
    });
});
