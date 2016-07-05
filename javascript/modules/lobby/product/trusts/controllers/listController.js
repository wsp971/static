define(["jquery",
        "common/views",
        "table",
        "layer"
],
		function ($, view, table, layer) {
		    return new view.extend({
		        init: function () {
		            //表格参数
		            var options = {},
                        $table = $('#table');

		            //var publisherMemberID = cookies.get("username");
		            //数据地址
		            options.url = "/product/getProductList";
		            //定义表头和字段
		            options.columns = [
		                              {
		                                  title: '产品名称',
		                                  field: 'productName',
		                                  formatter: function (value, row, index) {
		                                	  return '<a href="javascript:;" class="link" onclick="tab.open(&quot;{0}&quot;,&quot;{1}&quot;, &quot;product/trusts/detail.html?productNum={2}&publisherOrgID={3}&quot;,event)">{4}</a>'.format(row.productNum,"产品详情",row.productNum, row.publisherOrgID, row.productName);
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
                                               return (row.productTerm || "") + (row.productTermUnitText || "");
                                           }

                                       },
                                       {
                                           title: '预期年化收益率（%）',
                                           field: 'expRtnRate',
                                           sortable: true

                                       },
                                       {
                                           title: cookies.get("userType") == "0" ? '发行机构' : '机构类型',
                                           field: cookies.get("userType") == "0" ? 'publisherOrg' : 'publisherOrgType'

                                       },
                                      {  //无
                                          title: '剩余额度（元）',
                                          field: 'remainAmount',
                                          sortable: true,
                                          formatter: function (value, row, index) {
                                              return value && (+value / 10000).toString().formatMoney() || "-";
                                          }
                                      },
                                      {
                                          title: '认购截止日',
                                          field: 'purchDeadLine',
                                          sortable: true,
                                          formatter: function (value, row, index) {
                                              return value && value.formatDate("yyyy-MM-dd") || "-";
                                          }
                                      },
                                      {
                                          title: '产品交易',
                                          field: '',
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
                                                      //开放 110
                                                      //咨询 111
                                                      //userType判断用户是否为普通用户
                                                      //side判断是买方权限
                                                      if (operation.oprCode == "101") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
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

                                                      } else if (operation.oprCode == "102") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
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
                                                      } else if (operation.oprCode == "103") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
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
                                                      } else if (operation.oprCode == "104") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
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
                                                      } else if (operation.oprCode == "105") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.link("myaccount","acc-open_account_list", "account/mypublish/orderlist.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
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
                                                      } else if (operation.oprCode == "106") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "account\mypublish\chequelist.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
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
                                                      } else if (operation.oprCode == "107") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
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
                                                      } else if (operation.oprCode == "108") {//预约

                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                            	  if (row.publisherOrgID == cookies.get('instId')) {
                                                            		  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'layer.confirm("不能预约自己发行的产品")\'>{0}</button>'.format(operation.oprName);
                                                            	  } else {
                                                            		  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/preorder/preorder.html?productNum={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productNum, operation.oprName); 
                                                            	  }
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
                                                      } else if (operation.oprCode == "109") { //立即购买
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                            	  if (row.publisherOrgID == cookies.get('instId')) {
                                                            		  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'layer.confirm("不能购买自己发行的产品")\'>{0}</button>'.format(operation.oprName);
                                                            	  } else {
                                                                    op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","产品购买", "product/trusts/productBuy/buyTrust.html?productNum={1}",event)\'>立即购买</button>'.format(row.productId, row.productNum, row.publisherOrgID);
                                                            	  }
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
                                                      } else if (operation.oprCode == "110") {
                                                          if (cookies.get("userType") == "1") {
                                                              if (operation.side == "B") {
                                                                  op += '<button type="button" data-value="{0}" data-valuenum="{1}" data-orgid="{2}" class="btn btn-outline btn-default buy mr5">立即购买</button>'.format(row.productId, row.productNum, row.publisherOrgID);
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

                                                      } else if (operation.oprCode == "111") { //咨询
                                                          if (operation.side == "B") {
                                                        	  op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'window.open("/page/home/aboutus.html#contact")\'>{0}</button>'.format(operation.oprName);
                                                          } else if (operation.side == "S") {
                                                              op += '';
                                                          } else if (operation.side == "M") {
                                                              op += '';
                                                          }
                                                      }
                                                  }
                                              }
                                              return op;
                                          }
                                      }
		                          ];

		            //是否开放
		            var assignedMembers = cookies.get("instId");
		            //推送机构
		            var pushSetting = cookies.get("username") ? "" : "c_push_setting_2";
		            //账号

		            //初始化查询参数
		            options.queryParams = {
		                productType: "3",
		                productStatus: ["2", "6", "7", "14"],
		                assignedMembers: assignedMembers,
		                pushSetting: pushSetting
//		                sortAttribute: "createdDate",
//                        sortType: "desc"
		            }

		            //绑定table
		            $table.fictable(options);

		            //自定义列表操作事件
		            //$("#table").on("click", ".buy", function (event) {
                    //
		            //    var productNum = $(this).data("valuenum");
                    //
		            //   tab.open(productNum, "购买", "product/trusts/productBuy/buyTrust.html?productNum=" + productNum, event)
                    //
		            //});

		            $("#table").on("click", ".errors", function (e) {
		                parent.layer.open({
		                    type: 1,
		                    skin: 'layui-layer-demo', //样式类名
		                    shift: 2,
		                    area: ['420px', '240px'], //宽高
		                    shadeClose: true, //开启遮罩关闭
		                    content: '<p class="tc f16 mt20 ">您还是普通会员，请升级为高级会员</br>更多产品服务等着您！</p><button type="button" class="link btn btn-outline btn-up btn-default mr5 mt20" onclick=\'tab.link("myaccount","acc-myaccount_com","account/actmanage/myaccount_com.html")\' style="margin: 0 auto;display: block;width:100px;margin-top:20px">立即升级</button>'
		                });

		            })
		            //            $(".layui-layer-demo").find('.link').on("click",function(e){
		            //            	  alert('123')
		            //          		//location.href="account/actmanage/myaccount_com.html"
		            //          		 //tab.link("myaccount","acc-myaccount_com","account/actmanage/myaccount_com.html").close();
		            //             });
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

		    /*        $('table').on('click', '.link', function (event) {
		                var id = $(this).data("pro");
		                tab.close();
		                tab.open(id, '产品详情', 'product/trusts/detail.html?productNum=' + id, event);
		            });*/


		            $(".choocebar span").on("click", function () {
		                $(this).addClass('active').siblings().removeClass('active');
		                if ($(this).data("type") == "productTerm") {
		                	var from =$(this).data("from");
		                	var to =$(this).data("to")
		                    options.queryParams.productTermDaysFrom = from+"";
		                    options.queryParams.productTermDaysTo = to+"";
		                }
		                if ($(this).data("type") == "productTypeLV2") {
		                	var value =$(this).data("value");
		                    options.queryParams.productTypeLV2 = value+"";
		                }

		               
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