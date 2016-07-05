define(["jquery", "common/views"], function ($, view) {
    return new view.extend({
        init: function () {
            var self = this;
            var orderId = utils.getParameter("orderId");
            var data = { orderId: orderId,
                         docUse: '08'};
            //根据订单id获取订单信息
            loadAjax({
                url: "/trade/order/query",
                data: JSON.stringify(data),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    if (result && result.rtnCode === "000") {
                        if (result.data.payType == "00") {
                            $("#payType").html("划款凭证号");
                            $("#payNo").html(result.data.payNo || "-");
                            //调用订单docs接口获取图片地址
                            var dataFile = { orderId: orderId, docUse: "08" };
                            loadAjax({
                                url: "/trade/order/doc/query",
                                data: JSON.stringify(data),
                                type: "POST",
                                dataType: "json",
                                contentType: "application/json",
                                success: function (resultFile) {
                                    if (resultFile && resultFile.rtnCode === "000" && resultFile.data.rows.length > 0) {
                                        $(".draw-group").show();
                                        var imgPath = resultFile.data.rows[0].docPath.split('|');
                                        var src = "";
                                        (imgPath && imgPath.length > 2) && (src = imgPath[2]);
                                        src && $("#pic").attr("src", src);
                                    }
                                }
                            });
                        }
                        if (result.data.payType == "01") {
                            $("#payType").html("大额支付号");
                            $("#payNo").html(result.data.payNo || "-");
                        }
                    }
                }
            });

        }
    });
}); 