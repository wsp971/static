define(["jquery",
        "common/views",
        "table"
], function ($, view, myorderService, table) {
    return new view.extend({
        init: function () {
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
                                    if (row.productType == '6') {//跳转至信托页面
                                        return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{1}","详情", "product/tradingassets/detail.html?productNum={1}", event)\'>{2}<br/>{3}</a>'.format(row.orderId, row.productNum, value, row.productNum);
                                      } 
//                                      else {
                                    //  return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{0}","详情", "product/trusts/detail.html?productNum={1}", event)\'>{2}<br/>{3}</a>'.format(row.orderId, row.productNum, value, row.productNum);
//                                      }
                                  }
                              },
                              {
                                  title: '产品类型',
                                  field: 'productTypeText'
                              },
                              {
                                  title: '剩余期限',
                                  field: 'remainDate',
                                  sortable: true,
                                  formatter: function (value, row, index) {
                                      return value? (value+"天"):"-"
                                  }
                              },
                               {
                                   title: '转让价格（元）',
                                   field: 'transferPrice',
                                   sortable: true,
                                   formatter: function (value, row, index) {
                                       return value && value.toString().formatMoney() || "-";
                                   }
                               },
                               {
                                   title: '初始利率（%）',
                                   field: 'expRtnRate',
                                   sortable: true
                               },
                               {
                                   title: '转让利率（%）',
                                   field: 'transferRate',
                                   sortable: true
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
                                    title: '产品状态',
                                    field: 'productStatusText'
                                },
                               {
                                   title: '操作',
                                   field: 'productId',
                                   formatter: function (value, row, index) {
                                       var op = '';
                                       if (row.nextOperations) {
                                           for (var i = 0; i < row.nextOperations.length; i++) {
                                               var operation = row.nextOperations[i];
                                               
                                               //正式发行	101
                                               //延长募集期	102
                                               //下架	103
                                               //延长发行期	104
                                               //交易记录	105
                                               //兑付	106
                                               //撤销	107
                                               //预约	108
                                               //立即购买	109
                                               if (operation.side == "T") {
	                                               if (operation.oprCode == "107") {
	                                            	   op += '<button type="button" class="btn btn-outline btn-default mr5 backout" data-productnum="{0}" data-productstatus="{1}">撤销</button>'.format(row.productNum,operation.nextProductStatus);
	                                               } 
                                               } else {
                                                   op += '';
                                               }       
                                           }
                                       }
                                       return op;
                                   }
                                   //,events: {
                                   //'click .remove': function (e, value, row, index) {
                                   //		 parent.layer.alert("你确定撤销么？");
                                   //	}
                                   //}

                               }
                          ];

            //初始化查询参数
            options.queryParams = {
                publisherMemberID: cookies.get("username"),
                productType: "6"
            }

            //绑定table
            $table.fictable(options);

            //自定义列表操作事件
            
          //撤销的相关操作
            $("#table").on("click",".backout",function(e){
            	var productNum = $(this).data("productnum") || "";
                var productStatus = $(this).data("productstatus") || ""; //下一步操作后产品状态
                //var productPhase = $(this).data("productphase") || ""; //下一步操作后产品阶段
                 parent.layer.open(
                    {
                        type: 1,
                        title: ['提示', 'background:#EFEFEF;'],
                        shadeClose: true,
                        shade: 0.2,
                        shadeClose: false,
                        area:  ['320px','200px'],
                        content: '<div class="tc pt12p">确认要撤销该订单吗？</div>',
                        btn: ['确认', '取消'],
                        yes : function () {
                        	var data ={products:[{
                        			productNum : productNum,
                                    productStatus:productStatus,
                        			}]
                			}
                        	loadAjax({
                                url : "/product/updateProduct",
                                data : JSON.stringify(data),//用户邮件点击链接参数：username,oldEmail,email,userId
                                type : "post",
                                contextType:"application/json",
                                success:function(msg){
                                	if(msg&&msg.rtnCode==000){
                                		parent.layer.closeAll();
                                		parent.layer.msg('操作成功');                                		
                                		$table.bootstrapTable("destroy");
                                        $table.fictable(options);
                                	} else {
                                		parent.layer.msg('异常错误');
                                	}
                                	
                                }
        					})

                        }
                    }
                );
            });

            //快捷查询
            $('#btnSearch').click(function (e) {
                options.queryParams.search = $("#search").val();
                $table.bootstrapTable("destroy");
                $table.fictable(options);
            });

            //绑定自定义查询
            $('#btnQuery').click(function (e) {
                options.queryParams.maturityDateFrom = $("#startDate").val();
                options.queryParams.maturityDateTo = $("#endDate").val();
                options.queryParams.productType = $("#productType").val();
                options.queryParams.productStatus = $("#productStatus").val();
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