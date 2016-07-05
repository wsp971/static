define([
    'jquery',
    'common/views'
], function ($, view) {
    return new view.extend({
        //初始化方法
        init: function () {

            var status = utils.getQueryString('status');
            if (status == '1') {
                $('#apply-success').show();
                $('a.mytransfer').on('click', function () {
                    tab.close();
                    tab.link('myaccount', 'acc-trans-productlist', 'account/mytransfer/productlist.html');
                });
                $('a.productDetail').on('click', function (event) {
                    var productNum = utils.getQueryString('productNum');
                    tab.close();
                    tab.open(productNum, '产品详情', 'product/tradingassets/detail.html?productNum=' + productNum, event);
                });
            }
            if (status == '2') {
                $('#buy-suc-online').show();
                $('a.contract').on('click', function () {
                    tab.close();
                    tab.link('myaccount', 'acc-contractList', 'account/contract/contractList.html');
                });
                $('a.myorder').on('click', function () {
                    tab.close();
                    tab.link('myaccount', 'acc-inv-orderlist', 'account/myinvest/orderlist.html');
                });
            }
            if (status == '3') {
                $('#buy-fail-online').show();
            }
        },
        events: {},
        handlers: {}

    });
});




