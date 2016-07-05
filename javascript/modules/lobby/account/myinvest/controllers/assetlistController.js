
define(["jquery",
        "common/views",
        "table"
], function ($, view, table) {
    return new view.extend({
        init: function () {
            //表格参数
            var options = {},
                $table = $('#table');
            //数据地址
            options.url = "/trade/position/list"; // /trade/position/list
            //定义表头和字段
            options.columns = [
                              {
                                  title: '产品名称/ID',
                                  field: 'productName',
                                  formatter: function (value, row, index) {
                                      if (row.productType=='2'){ //跳转至基金页面
                                    	  return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{0}","详情", "product/fund/detail.html?productNum={1}", event)\'>{2}<br/>{3}</a>'.format(row.orderId, row.productCode,value,row.productCode);
	                       			   } else if (row.productType=='3') {//跳转至信托页面
	                       				   return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{0}","详情", "product/trusts/detail.html?productNum={1}", event)\'>{2}<br/>{3}</a>'.format(row.orderId, row.productCode,value,row.productCode);
                       			   } 
//                                   else {
//	                       				   return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{0}","详情", "product/trusts/detail.html?productNum={1}", event)\'>{2}<br/>{3}</a>'.format(row.orderId, row.productCode,value,row.productCode);
//	                       			   }

                                  }
                              },
                              {
                                  title: '产品类型',
                                  field: 'productType',
                                  formatter: function (value, row, index) {
                            		  var text = '';
                            		  switch (value) {
                            		      case '1':
                            		    	  text = '银行理财';
                            		    	  break;
                            		      case '2': 
                            		    	  text = '基金';
                            		    	  break;
                            		      case '3': 
                            		    	  text = '信托';
                            		    	  break;
                            		      case '4':
                            		    	  text = '资管';
                            		    	  break;
                            		      case '5': 
                            		    	  text = '结构化资产';
                            		    	  break;
                            		      case '6': 
                            		    	  text = '交易资产';
                            		    	  break;
                            		      default : 
                            		    	  text = '-';
                        		    	  	  break;
                            		  }
                                      return text;
                                  }
                              },
                              {
                                  title: '期限',
                                  field: 'term',
                                  formatter: function (value, row, index) {
                            		  var termUnit = row.termUnit || '';
                            		  switch (termUnit) {
                            		      case 'y':
                            		    	  termUnit = '年';
                            		    	  break;
                            		      case 'm': 
                            		    	  termUnit = '月';
                            		    	  break;
                            		      case 'd': 
                            		    	  termUnit = '日';
                            		    	  break;
                            		      default : 
                            		  
                            		  }
                                      return value && value+''+termUnit || "-";
                                  }
                              }
                               ,
                               {
                                   title: '预期年化收益率（%）',
                                   field: 'expAnnYield'
                               },
                               {
                                   title: '持仓金额（元）',
                                   field: 'totalAmount',
                                   sortable: true,
                                   formatter: function (value, row, index) {
                                       return value && value.toString().formatMoney() || "-";
                                   }
                               },
                                {
                                    title: '持有份额',
                                    field: 'totalShare',
                                    sortable: true
                                },
                              {
                                  title: '待结转收益（元）',
                                  field: 'undistributedIncome',
                                  formatter: function (value, row, index) {
                                      return value && value.toString().formatMoney() || "-";
                                  }
                              },
                              {
                                  title: '到期日',
                                  field: 'expireDate',
                                  sortable: true,
                                  formatter: function (value, row, index) {
                                      return value && value.formatDate("yyyy-MM-dd") || "-";
                                  }
                              },
                               {
                                   title: '操作',
                                   field: 'positionId',
                                   formatter: function (value, row, index) {
                                       var op = ''; //操作根据具体的订单状态来调整
                                       if (row.productType=='3') {  // 3信托
                                    	   if (row.productPhase == '4') {
                                    		   op += '<button type="button" class="btn btn-outline btn-default" onclick=\'tab.open("{0}","转让", "account/myinvest/secondaryTransfer/transferApply.html?positionId={1}&productNum={2}", event)\'>转让</button>'.format(value, value, row.productCode);  
                                    	   } else {
                                    		   op += ''
                                    	   }
                                       } else if (row.productType=='2') { //2 基金
                                           op += '<button type="button" class="btn btn-outline btn-default" onclick=\'tab.open("{0}","赎回", "account/myinvest/fundredeem/redeem.html?totalShare={1}&productNum={2}" , event)\'>赎回</button>'.format(row.orderId, row.totalShare, row.productCode);
                                       } else {
                                    	   op += '';
                                       }
                                       return op;
                                   }
                            /*  formatter: function (value, row, index) {
                                  var op = '';
                                  if (row.nextOperations) {
                                      for (var i = 0; i < row.nextOperations.length; i++) {
                                          var operation = row.nextOperations[i];
                                          //撤销	    000
                                          //签合同	001
                                          //确认划款	002
                                          //查看划款信息	004
                                          //查看兑付信息	005
                                          //修改	    006
                                          //份额划转	007
                                          //成交单	009
                                          //下载合同	011
                                          //上传                012
                                          //划款确认        013
                                          if (operation.oprCode == "000") {
                                              op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, operation.orderId, operation.oprName);
                                          } else if (operation.oprCode == "001") {
                                              op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, operation.orderId, operation.oprName);
                                          } else if (operation.oprCode == "002") {
                                              op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, operation.orderId, operation.oprName);
                                          } else if (operation.oprCode == "004") {
                                              op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, operation.orderId, operation.oprName);
                                          } else if (operation.oprCode == "005") {
                                              op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, operation.orderId, operation.oprName);
                                          } else if (operation.oprCode == "006") {
                                              op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, operation.orderId, operation.oprName);
                                          } else if (operation.oprCode == "007") {
                                              op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, operation.orderId, operation.oprName);
                                          } else if (operation.oprCode == "009") {
                                              op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, operation.orderId, operation.oprName);
                                          } else if (operation.oprCode == "011") {
                                              op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, operation.orderId, operation.oprName);
                                          } else if (operation.oprCode == "012") {
                                              op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, operation.orderId, operation.oprName);
                                          }else if (operation.oprCode == "013") {
                                              op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, operation.orderId, operation.oprName);
                                          }
                                      }
                                  }
                                  return op;
                              }*/
                                   //,events: {
                                   //'click .remove': function (e, value, row, index) {
                                   //		 parent.layer.alert("你确定赎回么？");
                                   //	}
                                   //}

                               }
                          ];
            //初始化查询参数
            options.queryParams = {
               firmAccount: cookies.get("instId") //机构ID
            }

            //绑定table
            $table.fictable(options);

            //自定义列表操作事件
            $("#table").on("click", ".cancel", function (e) {
                var value = $(this).data("value");
                //这里处理具体业务
                parent.layer.alert("你确定赎回么？");
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