define(["jquery",
        "common/views",
        "table",
        "layer"
], function ($, view, table, layer) {
    return new view.extend({
        init: function () {
            //表格参数
            var options = {},
                $table = $('#table');
            //数据地址
            options.url = "/trade/position/list";
            //定义表头和字段
            options.columns = [
                              {
                                  title: '投资机构',
                                  field: 'firmName'
                              },
                              {
                                  title: '产品类型',
                                  field: 'productType',
	                              formatter: function (value, row, index) {
	                                    var text = "-";
	                                    switch (value) {
	                                       case "1":
	                                            text = "银行理财";
	                                            break;
	                                        case "2":
	                                            text = "基金";
	                                            break;
	                                        case "3":
	                                            text = "信托";
	                                            break;
	                                        case "4":
	                                            text = "资管";
	                                            break;
	                                        case "5":
	                                            text = "结构化资产";
	                                            break;
	                                        case "6":
	                                            text = "交易资产";
	                                            break;                                          
	
	                                    }
	                                    return text;
	                              }
                              },
                               {
                                   title: '订单份额',
                                   field: 'totalShare',
                                   sortable: true
                               },
                              {
                                  title: '到期时间',
                                  field: 'expireDate',
                                  sortable: true,
                                  formatter: function (value, row, index) {
                                      return value && value.formatDate("yyyy-MM-dd") || "-";
                                  }
                              },
                               {
                                   title: '操作',
                                   field: 'orderId',
                                   formatter: function (value, row, index) {
                                       var op = '<button type="button" data-firmaccount="{0}" data-orderamount="{1}" data-ordershare="{2}" data-productcode="{3}" data-term="{4}" data-orderid="{5}" class="btn btn-outline  btn-default confirm" >{6}</button>'.format(row.firmAccount, row.totalAmount, row.totalShare, row.productCode, row.term, row.orderId, "确认划款");
                                       return op;
                                   }
                                   //,events: {
                                   //'click .remove': function (e, value, row, index) {
                                   //		 parent.layer.alert("你确定赎回么？");
                                   //	}
                                   //}

                               }
                          ];

            //初始化查询参数
            options.queryParams = {
                orderType: "03", //兑付值
                counterParty: cookies.get("instId") || "",
                //productCode: "30010016062700119"
                productCode: utils.getQueryString("productNum") || ""
            }

            //绑定table
            $table.fictable(options);

            //自定义列表操作事件
            $("#table").on("click", ".confirm", function (e) {
                //这里处理具体业务
                var firmAccount = $(this).data("firmaccount");
                var orderAmount = $(this).data("orderamount");
                var orderShare = $(this).data("ordershare");
                var productCode = $(this).data("productcode");
                var term = $(this).data("term");
                var orderId = $(this).data("orderid");
                parent.layer.open({
                    type: 2,
                    title: ['划款确认', 'background:#fff;'],
                    shadeClose: false,
                    shade: 0.8,
                    scrollbar: false,
                    area: ['505px', '425px'],
                    content: 'account/mypublish/drawConfirm.html?firmAccount={0}&orderAmount={1}&orderShare={2}&productCode={3}&term={4}&orderId={5}'.format(firmAccount, orderAmount, orderShare, productCode, term, orderId),
                    end: function () {
                        //重新加载table数据 
                        $table.bootstrapTable("destroy");
                        $table.fictable(options);
                    }
                });
            });

            //快捷查询
            $('#btnSearch').click(function (e) {
                options.queryParams.search = $("#search").val();
                $table.bootstrapTable("destroy");
                $table.fictable(options);
            });

            //绑定自定义查询
            $('#btnQuery').click(function (e) {
                options.queryParams.expireDateFrom = $("#startDate").val();
                options.queryParams.expireDateTo = $("#endDate").val();
                options.queryParams.productType = $("#productType").val();
                options.queryParams.productStatus = $("#productStatus").val();
                options.queryParams.productPhase = $("#productPhase").val();
                $table.bootstrapTable("destroy");
                $table.fictable(options);
            });

            //绑定自定义查询ENTER事件
            $(".searchbox").keyup(function (e) {
                var e = e || event,
                    keycode = e.which || e.keyCode;
                if (keycode == 13) {
                    $("#btnSearch").trigger("click");
                }
            });


        },
        events: {
        //"click #ct-sign": "signCtClick"
    },

    handlers: {
    //signCtClick: function () {
    //    this.ctDetailService.signCt();
    //}

    }
});
}); 