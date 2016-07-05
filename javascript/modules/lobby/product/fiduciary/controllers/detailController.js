/**
 * Created by EX-XIALU001 on 2016-06-12.
 */
define([ "jquery", "common/views"], function($, view) {
    return new view.extend({
        //初始化方法
        init : function() {
            var data = {productNum :'20030016061200003'}
            console.log(data)
            loadAjax({
                url : "/product/queryProductDetail",
                data : data,
                type : "GET",
                //dataType : "json",
                contentType : "application/json",
                success : function(result) {
                    console.log(result);
                    $("table tr:eq(0) td:eq(1)").html(result.data.aimAmount);
                    //$("table tr:eq(0) td:eq(3)").html(result.data.publisherOrg);
                    $("table tr:eq(1) td:eq(1)").html(result.data.purchDeadLine);
                    $("table tr:eq(1) td:eq(3)").html(result.data.minSubAmount);
                    $("table tr:eq(2) td:eq(1)").html(result.data.valueDate);
                    $("table tr:eq(2) td:eq(3)").html(result.data.maturityDate);
                    $("table tr:eq(3) td:eq(1)").html(result.data.productTerm);
                    $("table tr:eq(3) td:eq(3)").html(result.data.minSubAmount);
                    $("table tr:eq(4) td:eq(1)").html(result.data.expRtnRate);
                    $("table tr:eq(4) td:eq(3)").html(result.data.interestStandard);
                    $("table tr:eq(5) td:eq(1)").html(result.data.manager);
                    $("table tr:eq(5) td:eq(3)").html(result.data.trusteeAgency);
                    $("table tr:eq(6) td:eq(1)").html(result.data.investScope);
                    //$("table tr:eq(6) td:eq(3)").html(result.data.);
                }
            });
        }
    });
});
