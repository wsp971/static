define(["jquery",
        "common/views",
        "table"
],
		function ($, view, table) {
		    return new view.extend({
		        init: function () {
		        	 //数据地址
		        	var options = {},$table = $('#table');
		         
		            options.url = "/product/getProductList";
		            //定义表头和字段
		            options.columns = [
		                              {
		                                  title: '产品名称',
		                                  field: 'productName',
		                                    formatter: function (value, row, index) {                                                                                     
                                              return '<a href="javascript:;" class="link" onclick="tab.open(&quot;{0}&quot;,&quot;{1}&quot;, &quot;product/fund/detail.html?productNum={2}&publisherOrgID={3}&quot;,event)">{4}</a>'.format(row.productNum,"产品详情",row.productNum, row.publisherOrgID, row.productName);
                                          }
		                              },
		                              {
		                                  title: '产品代码',
		                                  field: 'productNum'
		                              },
                                       {
                                           title: '产品分类',
                                           field: 'productTypeLV2Text',
                                        
                                       },
                                       {
                                           title: '管理人',
                                           field: 'manager'
                                         
                                       },
                                       {
                                           title: '7日年化收益率（%）',
                                           field: 'sevenDayYield',
                                           sortable: true,
                                         
                                       },
                                      {  //无
                                          title: 'T+0赎回',
                                          field: 'supportRedemptionText'

                                      },
                                      {
                                          title: '发布日期',
                                          field: 'createdDate',
                                          sortable: true,
                                          formatter: function (value, row, index) {
                                              return value && value.formatDate("yyyy-MM-dd") || "-";
                                          }
                                      },
                                      {
                                          title: '净值',
                                          field: 'netValue',
                                          sortable: true
                                          
                                      },
                                      {
                                          title: '日增长率（%）',
                                          field: 'growthRate',
                                           sortable: true
                                      },
                                      {
                                          title: '累计净值',
                                          field: 'totalNetValue',
                                          sortable: true
                                      },
		                               {
		                                   title: '操作',
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
                                                      //userType判断用户是否为普通用户
                                                      //side判断是买方权限
                                                      if (operation.oprCode == "101") {
                                                      if(cookies.get("userType") =="1"){
                                                       if(operation.side =="B"){
                                                          op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                       }else if(operation.side =="S"){
                                                         op += '';
                                                       }
                                                      }else if(cookies.get("userType") =="0"){
                                                       if(operation.side =="B"){
                                                 		  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                         }else if(operation.side =="S"){
                                                            op += '';
                                                         }else if(operation.side =="M"){
                                                         	op += '';
                                                         } 
                                                      }
                                                          
                                                      } else if (operation.oprCode == "102") {
                                                       if(cookies.get("userType") =="1"){ 
                                                       if(operation.side =="B"){
                                                          op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                       }else if(operation.side =="S"){
                                                        
                                                       }
                                                       }else if(cookies.get("userType") =="0"){
                                                    	   if(operation.side =="B"){
                                                     		  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                             }else if(operation.side =="S"){
                                                                op += '';
                                                             }else if(operation.side =="M"){
                                                             	op += '';
                                                             } 
                                      
                                                      }
                                                     
                                                      } else if (operation.oprCode == "103") {
                                                        if(cookies.get("userType") =="1"){ 
                                                       if(operation.side =="B"){
                                                            //op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                         }else if(operation.side =="S"){
                                                            op += '';
                                                         }
                                                       }else if(cookies.get("userType") =="0"){
                                                    	   if(operation.side =="B"){
                                                     		  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                             }else if(operation.side =="S"){
                                                                op += '';
                                                             }else if(operation.side =="M"){
                                                             	op += '';
                                                             } 
                                      
                                                      }
                                                        
                                                      } else if (operation.oprCode == "104") {
                                                         if(cookies.get("userType") =="1"){ 
                                                       if(operation.side =="B"){
                                                         op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                       }else if(operation.side =="S"){
                                                         op += '';
                                                       }
                                                        }else if(cookies.get("userType") =="0"){
                                                        	 if(operation.side =="B"){
                                                       		  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                               }else if(operation.side =="S"){
                                                                  op += '';
                                                               }else if(operation.side =="M"){
                                                               	op += '';
                                                               } 
                                      
                                                      }
                                                         
                                                      } else if (operation.oprCode == "105") {
                                                         if(cookies.get("userType") =="1"){ 
                                                       if(operation.side =="B"){
                                                    	   op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                              
                                                       }else if(operation.side =="S"){
                                                         op += '';
                                                       }
                                                        }else if(cookies.get("userType") =="0"){
                                                        	 if(operation.side =="B"){
                                                       		  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                               }else if(operation.side =="S"){
                                                                  op += '';
                                                               }else if(operation.side =="M"){
                                                               	op += '';
                                                               } 
                                      
                                                      }
                                         
                                                      } else if (operation.oprCode == "106") {
                                                    	 if(cookies.get("userType") =="1"){ 
                                                         if(operation.side =="B"){
                                                           op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "account\mypublish\chequelist.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                         }else if(operation.side =="S"){
                                                         op += '';
                                                       }
                                                     }}else if(cookies.get("userType") =="0"){
                                                    	 if(operation.side =="B"){
                                                   		  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                           }else if(operation.side =="S"){
                                                              op += '';
                                                           }else if(operation.side =="M"){
                                                           	op += '';
                                                           } 
                                      
                                                      } 
                                                     else if (operation.oprCode == "107") {
                                                         if(cookies.get("userType") =="1"){ 
                                                       if(cookies.get("userType") =="1"){ 
                                                         if(operation.side =="B"){
                                                           op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                         }else if(operation.side =="S"){
                                                         op += '';
                                                       }
                                                       }
                                                      }else if(cookies.get("userType") =="0"){
                                                    	  if(operation.side =="B"){
                                                    		  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                            }else if(operation.side =="S"){
                                                               op += '';
                                                            }else if(operation.side =="M"){
                                                            	op += '';
                                                            } 
                                      
                                                      }   
                                                      } else if (operation.oprCode == "108") {
                                                          if(cookies.get("userType") =="1"){       
                                                       if(operation.side =="B"){
                                                          op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/preorder/preorder.html?productId={2}",event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
                                                        }else if(operation.side =="S"){
                                                         op += '';
                                                        }
                                                      }else if(cookies.get("userType") =="0"){
                                                    	  if(operation.side =="B"){
                                                    		  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                            }else if(operation.side =="S"){
                                                               op += '';
                                                            }else if(operation.side =="M"){
                                                            	op += '';
                                                            } 
                                      
                                                      }   
                                                         
                                                      } else if (operation.oprCode == "109") {
                                                          if(cookies.get("userType") =="1"){

                                                       if(operation.side =="B"){
                                                          op += '<button type="button" data-value="{0}" data-valuenum="{1}" data-orgid="{2}"  class="btn btn-outline btn-default buy mr5">立即购买</button>'.format(row.productId,row.productNum,row.publisherOrgID);
                                                        }else if( operation.side =="S"){
                                                          op += '';
                                                        }
                                                       }else if(cookies.get("userType") =="0"){
                                                    	   if(operation.side =="B"){
                                                     		  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                             }else if(operation.side =="S"){
                                                                op += '';
                                                             }else if(operation.side =="M"){
                                                             	op += '';
                                                             } 
                                      
                                                      }    
                                                       
                                                      }else if (operation.oprCode == "110") {
                                                          if(cookies.get("userType") =="1"){
                                                              if(operation.side =="B"){
                                                                op += '<button type="button" data-value="{0}" data-valueNum="{1}" data-orgid="{2}" class="btn btn-outline btn-default buy mr5">立即购买</button>'.format(row.productId,row.productNum,row.publisherOrgID);
                                                              }else if( operation.side =="S"){
                                                                op += '';
                                                              }else if(operation.side =="M"){
                                                              	op += '';
                                                              }
                                                              }else if(cookies.get("userType") =="0"){
                                                              	  if(operation.side =="B"){
                                                              		  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
                                                                      }else if( operation.side =="S"){
                                                                        op += '';
                                                                      }else if(operation.side =="M"){
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

                        //是否开放
		            var assignedMembers = cookies.get("instId");
		            	//推送机构
		            var pushSetting  = cookies.get("username") ? "" : "c_push_setting_2";

		            //初始化查询参数
		            options.queryParams = {
		           		productType:"2"||"",
		           		productStatus:['13'],
		           		assignedMembers:assignedMembers,
    					pushSetting:pushSetting
//                        sortName:"createdDate",
//                        sortOrder:"desc"
                    }

		        //绑定table
		        $table.fictable(options);
		     

		        //自定义列表操作事件
		        $("#table").on("click", ".buy", function (event) {
		                  var value = $(this).data("value");
                         	var productId = $(this).data("value");
                         	var productNum =$(this).data("valuenum");
                          var orgid = $(this).data("orgid")+"";
                          var instId = cookies.get("instId");
                            var param = {instId : instId, targetInstId :orgid };
                              			loadAjax({
                                    	url: "/trade/account/status",
                                    	data: JSON.stringify(param),
                                   		type: "POST",
                                    	dataType: "json",
                                    	contentType: "application/json",
                                    		success: function (result) {
                                    			if(result.rtnCode =="000"){
                                    				if(result.data.dataStatus =="Y"){
                                				tab.open(productId,"产品购买","product/fund/buy.html?productNum="+productNum,event)
                								}else if(result.data.dataStatus =="N"){
                									parent.layer.confirm('您还未开基金户，请确认是否开户？', {
                								 		   title:"开户提示",
                								            btn: ['确认', '取消']
                								    	}, function () {
                								    		tab.link("myaccount","acc-open_account_list","account/myinvest/openaccount/open_account.html?instId={0}&targetInstId={1}&flag=0".format(instId,orgid))
                								    		parent.layer.closeAll();
                								    		return false;
                								    	});

                								}
                								}else{
                									parent.layer.alert(
                			                    			"获取交易信息失败，请稍后再试"
                			                    	)
                			                    	console.log(result.rtnMsg)
                                    			}
                                }
                               	});
 
		        });
		        $("#table").on("click", ".errors", function (e) { 
		              parent.layer.open({
		                type: 1,
		                skin: 'layui-layer-demo', //样式类名
		                shift: 2,
		                area: ['420px', '240px'], //宽高
		                shadeClose: true, //开启遮罩关闭
		                content: '<p class="tc f16 mt20 ">您还是普通会员，请升级为高级会员</br>更多产品服务等着您！</p><button type="button" class="link btn btn-outline btn-up btn-default mr5 mt20" onclick=\'tab.link("myaccount","acc-myaccount_com","account/actmanage/myaccount_com.html"),function(){parent.layer.closeAll()}\' style="margin: 0 auto;display:block;width:100px;margin-top:20px">立即升级</button>',
		             
		              });
		             
		            })
		       $('.search').click(function (e) {
               		options.queryParams.productNum = $("#search").val();
               	  options.queryParams.productName = $("#search").val();
                	$table.bootstrapTable("destroy");
                	$table.fictable(options);
           		 });			         
          	$("#body").on("click",".link",function(){
        	  tab.link("account","acc-myaccount_com","account/actmanage/myaccount_com.html").close();
          	});
		        $("#tab_btn span").on("click",function(){
		        	var value = $(this).attr("data-value")
		        	$(this).addClass('active').siblings().removeClass('active');
		    		options.queryParams.productTypeLV2 = value+'';
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
		    }
});
}); 