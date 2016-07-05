define(["jquery",
        "common/views",
        "table"
], function ($, view, table) {
    return new view.extend({
        init: function () {
            var publisherMemberID = cookies.get("username");
            //表格参数
            var options = {},
                $table = $('#table');
            //数据地址
            options.url = "/product/getProductList";
            //定义表头和字段
            options.columns = [
                              {
                                  title: '产品名称/ID',
                                  field: 'productName',
                                  formatter: function (value, row, index) {
                                      if (row.productType == '2') { //跳转至基金页面
                                          return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{0}","详情", "product/fund/detail.html?productNum={1}", event)\'>{2}<br/>{3}</a>'.format(row.productNum, row.productNum, value, row.productNum);
                                      } else if (row.productType == '3') {//跳转至信托页面
                                          return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{0}","详情", "product/trusts/detail.html?productNum={1}&publisherOrgID={2}", event)\'>{3}<br/>{4}</a>'.format(row.productNum, row.productNum, row.publisherOrgID, value, row.productNum);
                                      } 
//                                      else {
                                      //                                          return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{0}","详情", "product/trusts/detail.html?productNum={1}", event)\'>{2}<br/>{3}</a>'.format(row.productNum, row.productNum, value, row.productNum);
//                                      }
                                  }
                              },
                              {
                                  title: '产品类型',
                                  field: 'productTypeText'
                              },
                               {
                                   title: '剩余额度（元）',
                                   field: 'remainAmount',
                                   sortable: true,
                                   formatter: function (value, row, index) {
                                       return value && value.toString().formatMoney() || "-";
                                   }
                               },
                               {
                                   title: '发行规模（元）',
                                   field: 'publishAmount',
                                   sortable: true,
                                   formatter: function (value, row, index) {
                                       return value && value.toString().formatMoney() || "-";
                                   }
                               },
                               {
                                   title: '起息日',
                                   field: 'valueDate',
                                   sortable: true,
                                   formatter: function (value, row, index) {
                                       return value && value.formatDate("yyyy-MM-dd") || "-";
                                   }
                               },
                              {
                                  title: '到期日',
                                  field: 'maturityDate',
                                  sortable: true,
                                  formatter: function (value, row, index) {
                                      return value && value.formatDate("yyyy-MM-dd") || "-";
                                  }
                              },
                              {
                                  title: '期限',
                                  field: 'productTerm',
                                  sortable: true,
                                  formatter: function (value, row, index) {
                                      return value && value + row.productTermUnitText;
                                  }
                              },
                              {
                                  title: '提交时间',
                                  field: 'createdDate',
                                  sortable: true,
                                  formatter: function (value, row, index) {
                                      return value && value.formatDate("yyyy-MM-dd") || "-";
                                  }
                              },
                              {
                                  title: '产品阶段',
                                  field: 'productPhaseText'
                              },
                              {
                                  title: '产品状态',
                                  field: 'productStatusText',
                                  formatter: function (value, row, index) {
                                        if(row.productStatus=="3"){
                                           return value+'<a href="javascript:;" class="link failed" data-signcomment="{0}"><br/>查看原因</a>'.format(row.signComment || "暂无");
                                        }else{
                                            return value;
                                        }
                                  }
                              },
                               {
                                   title: '操作',
                                   field: 'productId',
                                   formatter: function (value, row, index) {
                                       var op = '';
                                       if (row.nextOperations) {
                                           for (var i = 0; i < row.nextOperations.length; i++) {
                                               var operation = row.nextOperations[i];

                                               if (operation.oprCode == "110") { //正式成立	101
                                                   if (operation.side == "S") {
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 establish" data-productnum="{0}" data-productstatus="{3}" data-productphase="{2}">{1}</button>'.format(row.productNum, operation.oprName, operation.nextProductPhase, operation.nextProductStatus);
                                                   } else if (operation.side == "B") {
                                                       op += '';
                                                   }

                                               } else if (operation.oprCode == "102") {//延长募集期	102   待定
                                                   if (operation.side == "S") {
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "account/myproduct/?productId={2}", event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                   } else if (operation.side == "B") {
                                                       op += '';
                                                   }

                                               } else if (operation.oprCode == "104") {//延长发行期	104   待定
                                                   if (operation.side == "S") {
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "account/myproduct/?productId={2}", event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                   } else if (operation.side == "B") {
                                                       op += '';
                                                   }

                                               }
                                               else if (operation.oprCode == "105") {//交易记录	105
                                                   if (operation.side == "S") {
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.link("myaccount","acc-pub-orderlist", "account/mypublish/orderlist.html?productNum={0}")\'>{1}</button>'.format(row.productNum, operation.oprName);
                                                   } else if (operation.side == "B") {
                                                       op += '';
                                                   }

                                               }
                                               else if (operation.oprCode == "106") {//兑付	106
                                                   if (operation.side == "S") {
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "account/mypublish/chequelist.html?productNum={2}", event)\'>{3}</button>'.format(row.productNum, operation.oprName, row.productNum, operation.oprName);
                                                   } else if (operation.side == "B") {
                                                       op += '';
                                                   }

                                               } else if (operation.oprCode == "108") {//预约
                                                   if (operation.side == "S") {
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/preorder/preorder.html?productId={2}", event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                   } else if (operation.side == "B") {
                                                       op += '';
                                                   }

                                               } else if (operation.oprCode == "101") {//开放购买
                                                   if (operation.side == "S") {
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 openbuy" data-productnum="{0}" data-productstatus="{3}" data-productphase="{2}" data-pushsetting="{4}">{1}</button>'.format(row.productNum, operation.oprName, operation.nextProductPhase, operation.nextProductStatus, row.pushSetting);
                                                   } else if (operation.side == "B") {
                                                       op += '';
                                                   }
                                               }
                                           }
                                       }
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
                // createUser: cookies.get("userId")
                publisherMemberID: publisherMemberID,
                productType:["1","2","3","4","5"]
            }

            //绑定table
            $table.fictable(options);

            //自定义列表操作事件
            $("#table").on("click", ".cancel", function (e) {
                var value = $(this).data("value");
                //这里处理具体业务
                parent.layer.alert("你确定赎回么？");
            });
            $("#table").on("click", ".openbuy", function (e) {
                var productNum = $(this).data("productnum") || "";
                var nextProductStatus = $(this).data("productstatus") || ""; //下一步操作后产品状态
                var nextProductPhase = $(this).data("productphase") || ""; //下一步操作后产品阶段
                var pushSetting = $(this).data("pushsetting") || ""; //推送机构设置
                parent.layer.open(
                {
                    type: 2,
                    title: ['开放购买', 'background:#EFEFEF;'],
                    shadeClose: true,
                    shade: 0.2,
                    shadeClose: false,
                    area: ['450px', '350px'],
                    content: '../../../../../page/lobby/account/mypublish/openbuy.html?productNum=' + productNum + '&productStatus=' + nextProductStatus + '&productPhase=' + nextProductPhase + "&pushSetting=" + pushSetting
                }
            );
            }).on("click", ".establish", function (e) {
                var productNum = $(this).data("productnum") || "";
                var nextProductStatus = $(this).data("productstatus") || ""; //下一步操作后产品状态
                var nextProductPhase = $(this).data("productphase") || ""; //下一步操作后产品阶段
                parent.layer.open(
                {
                    type: 2,
                    title: ['正式成立', 'background:#EFEFEF;'],
                    shadeClose: true,
                    shade: 0.2,
                    shadeClose: false,
                    area: ['520px;', '380px'],
                    content: '../../../../../page/lobby/account/mypublish/establish.html?productNum=' + productNum + '&productStatus=' + nextProductStatus + '&productPhase=' + nextProductPhase
                }
            );
            });

            $("#table").on("click", ".failed", function (e) {
               var signComment = $(this).data("signcomment");//审核不通过失败原因
                if(signComment){
                  parent.layer.msg(signComment);                   
                }               
            });

            //快捷查询
            $('#btnSearch').click(function (e) {
                options.queryParams.search = $("#search").val();
                $table.bootstrapTable("destroy");
                $table.fictable(options);
            });

            //绑定自定义查询
            $('#btnQuery').click(function (e) {
                options.queryParams.createdDateFrom = $("#startDate").val();
                options.queryParams.createdDateTo = $("#endDate").val();
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