define(["jquery",
        "common/views",
        "table"
], function ($, view, table) {
    return new view.extend({
        init: function () {
            //表格参数
            var options = {},
             $table = $('#table');
            var pushSetting  = cookies.get("username") ? "" : "c_push_setting_2";
            options.url = "/product/getProductList";
            //定义表头和字段
            options.columns = [
		                              {
		                                  title: '产品名称',
		                                  field: 'productName',
		                                  formatter: function (value, row, index) {
		                                      return '<a href="javascript:;" class="link" onclick="tab.open(&quot;detail22&quot;,&quot;产品详情&quot;, &quot;product/tradingassets/detail.html?productNum=' + row.productNum + '&quot;,event)">' + row.productName + '</a>'
		                                  }
		                              },
		                              {
		                                  title: '产品分类',
		                                  field: 'productTypeLV2Text'
		                              },
		                              {
                                          title: '产品期限',
                                          field: 'productTerm',
                                          formatter: function (value, row, index) {
                                              return (row.productTerm || "-") + (row.productTermUnitText || "-");
                                          }

                                      },
                                       {
                                           title: '剩余期限',
                                           field: 'remainTerm',
                                        	formatter: function (value, row, index) {
                                        		return value? (value+"天"):"-"
                                             }
                                       },
                                       {
                                           title: '初始利率（%）',
                                           field: 'expRtnRate',
                                          	formatter: function (value, row, index) {
                                                return row.expRtnRate || "-"
                                          }
                                       },
                                       {
                                           title: '票面利率（%）',
                                           field: 'couponRate',
                                           formatter: function (value, row, index) {
                                               return row.couponRate || "-"
                                           }
                                       },
                                       {
                                           title: '转让利率（%）',
                                           field: 'transferRate'
                                       },
                                       {
                                           title: '转让价格',
                                           field: 'transferPrice'
                                       },
                                       
                                      {
                                          title: '产品交易',
                                          field: 'createdDate',
                                          sortable: true,
                                          formatter: function (value, row, index) {
                                              var op = '';
                                              if (row.nextOperations) {
                                                  for (var i = 0; i < row.nextOperations.length; i++) {
                                                      var operation = row.nextOperations[i];
                                                      //正式发行 101
                                                      //延长募集期  102
                                                      //下架 103
                                                      //延长发行期  104
                                                      //交易记录 105
                                                      //兑付 106
                                                      //撤销 107
                                                      //预约 108
                                                      //立即购买 109
                                                      //userType判断用户是否为普通用户
                                                      //side判断是买方权限
                                                      if (operation.oprCode == "101") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              }
                                                          } else if (cookies.get("userType") == "0") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              } else if (operation.side == "M") {
                                                                  op += '';
                                                              }
                                                          }

                                                      } else if (operation.oprCode == "102") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                              } else if (operation.side == "S") {

                                                              }
                                                          } else if (cookies.get("userType") == "0") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              } else if (operation.side == "M") {
                                                                  op += '';
                                                              }

                                                          }

                                                      } else if (operation.oprCode == "103") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              }
                                                          } else if (cookies.get("userType") == "0") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              } else if (operation.side == "M") {
                                                                  op += '';
                                                              }

                                                          }

                                                      } else if (operation.oprCode == "104") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              }
                                                          } else if (cookies.get("userType") == "0") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              } else if (operation.side == "M") {
                                                                  op += '';
                                                              }

                                                          }

                                                      } else if (operation.oprCode == "105") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);

                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              }
                                                          } else if (cookies.get("userType") == "0") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              } else if (operation.side == "M") {
                                                                  op += '';
                                                              }

                                                          }

                                                      } else if (operation.oprCode == "106") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "account\mypublish\chequelist.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              }
                                                          } 
                                                      } else if (cookies.get("userType") == "0") {
                                                          if (operation.side == "B") {
                                                              op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                          } else if (operation.side == "S") {
                                                              op += '';
                                                          } else if (operation.side == "M") {
                                                              op += '';
                                                          }

                                                      }
                                                      else if (operation.oprCode == "107") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (cookies.get("userType") == "1") {
                                                                  if (operation.side == "B") {
                                                                      op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                                  } else if (operation.side == "S") {
                                                                      op += '';
                                                                  }
                                                              }
                                                          } else if (cookies.get("userType") == "0") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              } else if (operation.side == "M") {
                                                                  op += '';
                                                              }

                                                          }
                                                      } else if (operation.oprCode == "108") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/preorder/preorder.html?productId={2}")\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              }
                                                          } else if (cookies.get("userType") == "0") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              } else if (operation.side == "M") {
                                                                  op += '';
                                                              }

                                                          }

                                                      } else if (operation.oprCode == "109") {
                                                    	  if(cookies.get("username") == row.publisherMemberID){
                                                    		  op += '';
                                                    	  }else{
                                                          if (cookies.get("userType") == "1") {
                                                        	  
                                                              if (operation.side == "B") {
                                                            	  op += '<button type="button" data-value="{0}" data-valueNum="{1}" data-orgid="{2}" class="btn btn-outline btn-default buy mr5">立即购买</button>'.format(row.productId, row.productNum, row.publisherOrgID);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              } else if(operation.side == "M"){
                                                            	  op += '';
                                                              }
                                                          } else if (cookies.get("userType") == "0") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              } else if (operation.side == "M") {
                                                                  op += '';
                                                              }
                                                          	}
                                                    	  }
                                                      } else if (operation.oprCode == "110") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" data-value="{0}" data-valueNum="{1}" data-orgid="{2}" class="btn btn-outline btn-default mr5">立即购买</button>'.format(row.productId, row.productNum, row.publisherOrgID);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              } else if (operation.side == "M") {
                                                                  op += '';
                                                              }
                                                          } else if (cookies.get("userType") == "0") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                              } else if (operation.side == "S") {
                                                                  op += '';
                                                              } else if (operation.side == "M") {
                                                                  op += '';
                                                              }

                                                          }

                                                      }
                                                  }
                                              }
                                              return op;
                                          }
                                      }
		                          ];

            var assignedMembers = cookies.get("instId");
            //推送机构
            //var pushSetting  = cookies.get("username") ? "" : "c_push_setting_2";
            
            //初始化查询参数 
            options.queryParams = {
            		productType:"6",
	           		productStatus:["8", "9", "10"],
	           		assignedMembers: assignedMembers,
	           		pushSetting:pushSetting
            };

            //绑定table
            $table.fictable(options);
            $("#table").on("click", ".buy", function (event) {
                var value = $(this).data("value");
                var productId = $(this).data("value");
                var productNum = $(this).data("valuenum");
                var orgid = $(this).data("orgid");
                var instId = cookies.get("instId");
                tab.open(productNum, "购买", "account/myinvest/secondaryTransfer/buy.html?productNum=" + productNum, event)
                /* var param = {instId : instId, targetInstId : orgid+""};
                loadAjax({
                url: "trade/account/status",
                data: JSON.stringify(param),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                if(result.rtnCode && result.rtnCode =="000"){
                if(result.data.dataStatus && result.data.dataStatus =="Y"){
                tab.open("22","购买","product/trusts/productBuy/buyTrust.html?productNum="+productNum)
                }else if(result.data.dataStatus && result.data.dataStatus =="N"){
                tab.link("myaccount","acc-open_account_list","account/myinvest/openaccount/open_account.html?instId="+orgid+"&targetInstId="+instId+"&flag=0")
                }
                }else{
                parent.layer.msg('网络繁忙,请重试',{
                offset:['50%','50%']
                });
                }
                }
                });

                //这里处理具体业务
		                
                parent.layer.alert("你确定赎回么？");*/
            });
            //自定义列表操作事件
            $("#table").on("click", ".cancel", function (e) {
                var value = $(this).data("value");
                //这里处理具体业务
                parent.layer.alert("你确定赎回么？");
            });

            //绑定自定义查询，具体看业务要求
            $('#btnQuery').on(function (e) {

                $table.bootstrapTable("destroy");
                $table.fictable(options);
            });
		       $('.search').click(function (e) {
              		options.queryParams.productNum = $("#search").val();
              	  options.queryParams.productName = $("#search").val();
               	$table.bootstrapTable("destroy");
               	$table.fictable(options);
          		 });

            $(".choocebar span").on("click", function () {
            	var from = $(this).data("from");
            	var to = $(this).data("to");
                $(this).addClass('active').siblings().removeClass('active');
                if ($(this).data("type") == "productTerm") {
                    options.queryParams.productTermDaysFrom = from+''
                    options.queryParams.productTermDaysTo = to+''
                }
                if ($(this).data("type") == "productTypeLV2") {
                	var value = $(this).data("value");
                    options.queryParams.productTypeLV2 = value+'';
                }

                //options.queryParams.productType = "5";
                $table.bootstrapTable("destroy");
                $table.fictable(options);
            })

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