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
           
        },
        getDetails: function () {
            loadAjax({
                url: "/product/queryProductDetail",
                data: JSON.stringify({ productNum: this.productNum }),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                	   var systemTime = result.nowDate;//服务器系统时间
                       //var publisherOrgID = result.data.publisherOrgID;//发行机构编码
                       var contractSignModeText = result.data.contractSignModeText;//是否在线签署
                       if(result){
                       if(result.data.contract){
                           $("#download").append('<p class="list01  ml10" >合同<em>（产品交易过程中，需要双方签署）</em></p>')
                           $("#download").append('<p class="list01 bg01  ml10 ct" ></p>')
                           var contract = result.data.contract;
                           var length = result.data.contract.length;
                           for(var i=0; i<length;i++ ){
                               var file =result.data.contract[i].file.split("|");
                               $("#download .ct").append('<a class="link">'+file[1]+'</a>');
                               $("#download .ct a").attr("href",encodeURI("/file/innerDownload?filename=" + file[1] + "&uuid=" + file[0]));
                           }
                       }

                       if(result.data.agreement){
                           $("#download").append('<p class="list01  ml10" >协议<em>（产品交易过程中，需要投资方单方面签署）</em></p>')
                           $("#download").append('<p class="list01 bg01  ml10 ag" ></p>')
                           var agreement = result.data.agreement;
                           var length = result.data.agreement.length;
                           for(var i=0; i<length;i++ ){
                               var file =result.data.agreement[i].file.split("|");
                               $("#download .ag").append('<a class="link">'+file[1]+'</a>');
                               $("#download .ag a").attr("href",encodeURI("/file/innerDownload?filename=" + file[1] + "&uuid=" + file[0]));
                           }

                       }
                       if(result.data.specification){
                           $("#download").append('<p class="list01  ml10" >产品说明书<em>（产品交易过程中，需要双方签署）</em></p>')
                           $("#download").append('<p class="list01 bg01  ml10 sp" ></p>')
                           var specification = result.data.specification;
                           var length = result.data.specification.length;
                           for(var i=0; i<length;i++ ){
                               var file =result.data.specification[i].file.split("|");
                               $("#download .sp").append('<a class="link">'+file[1]+'</a>');
                               $("#download .sp a").attr("href",encodeURI("/file/innerDownload?filename=" + file[1] + "&uuid=" + file[0]))
                           }
                       }
                       if(result.data.otherMaterial){
                           $("#download").append('<p class="list01  ml10" >其他材料<em>（产品交易过程中，需要双方签署）</em></p>')
                           $("#download").append('<p class="list01 bg01  ml10 om" ></p>')
                           var contract = result.data.otherMaterial;
                           var length = result.data.otherMaterial.length;
                           for(var i=0; i<length;i++ ){
                               var file =result.data.otherMaterial[i].file.split("|");
                               $("#download .om").append('<a class="link">'+file[1]+'</a>');
                               $("#download .om a").attr("href",encodeURI("/file/innerDownload?filename=" + file[1] + "&uuid=" + file[0]))
                           }
                       }
                       if(result.data.transferContract){
                           $("#download").append('<p class="list01  ml10" >转让合同<em>（产品交易过程中，需要双方签署）</em></p>')
                           $("#download").append('<p class="list01 bg01  ml10 tfc" ></p>')
                           var transferContract = result.data.transferContract;
                           var length = result.data.transferContract.length;
                           for(var i=0; i<length;i++ ){
                               var file =result.data.transferContract[i].file.split("|");
                               $("#download .tfc").append('<a class="link">'+file[1]+'</a>');
                               $("#download .tfc a").attr("href",encodeURI("/file/innerDownload?filename=" + file[1] + "&uuid=" + file[0]))
                           }
                       }//存续期详情
                $("#productName span:eq(1)").html("ID:"+result.data.productNum).css({"font-size":"16px","margin-left":"10px"})
                    $("#trusts-btn").hide();
                    $("#productIntro>p").html(result.data.productIntro);//产品简介
                    $("#transaction-process").hide();
                    if(result.data.publisherMemberID == cookies.get("username")){
                    	$("#btn-buy").hide();
                    }
                    $("#btn-buy").on("click",function(event){
                		tab.open(result.data.publisherMemberID , "购买", "account/myinvest/secondaryTransfer/buy.html?productNum=" + result.data.productNum, event)
                	})
                    $("#productName span:eq(0)").html(result.data.underlyingProductName)
                    $("#productName+div span:eq(0)").html("转让收益率："+result.data.transferRate);
                    $("table tr:eq(3),table tr:eq(4),table tr:eq(5),table tr:eq(6)").show();//显示4567行表格内容
                    $("table tr:eq(0) td:eq(0)").html("目标规模(元)");
                    $("table tr:eq(0) td:eq(1)").html(result.data.aimAmount);//目标规模
                    $("table tr:eq(0) td:eq(2)").html("最低认购金额(元)");
                    $("table tr:eq(0) td:eq(3)").html(result.data.minSubAmount);//剩余额度
                    $("table tr:eq(1) td:eq(0)").html("发行金额");
                    $("table tr:eq(1) td:eq(1)").html(result.data.publishAmount);//认购截止日
                    $("table tr:eq(1) td:eq(2)").html("最低认购金额(元)");
                    $("table tr:eq(1) td:eq(3)").html(result.data.minSubAmount);//最低认购金额
                    $("table tr:eq(2) td:eq(0)").html("起息日");
                    $("table tr:eq(2) td:eq(1)").html(result.data.valueDate);//起息日
                    $("table tr:eq(2) td:eq(2)").html("到期日");
                    $("table tr:eq(2) td:eq(3)").html(result.data.maturityDate);//到期日
                    $("table tr:eq(3) td:eq(0)").html("投资剩余期限");
                    $("table tr:eq(3) td:eq(1)").html(result.data.remainDate);//投资剩余期限
                    $("table tr:eq(3) td:eq(2)").html("发行规模(元)");
                    $("table tr:eq(3) td:eq(3)").html(result.data.publishAmount);//发行金额
                    $("table tr:eq(4) td:eq(0)").html("预期收益率");
                    $("table tr:eq(4) td:eq(1)").html((result.data.expRtnRate ? "年化"+ result.data.expRtnRate : ""));
                    $("table tr:eq(4) td:eq(2)").html("计息基准");//计息基准
                    $("table tr:eq(4) td:eq(3)").html(result.data.interestStandardText);//计息基准
                    $("table tr:eq(5) td:eq(0)").html("产品类型");
                    $("table tr:eq(5) td:eq(1)").html(result.data.productTypeText);

                }
                }
            });
        }
    });
});
