define(["jquery",
        "common/views",
        "table"
],
		function ($, view, table) {
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
			                                  title: '产品名称',
			                                  field: 'productName',
			                                    formatter: function (value, row, index) {
	                                              return '<a href="javascript:;" class="link" onclick="tab.open(&quot;detail22&quot;,&quot;产品详情&quot;, &quot;product/trusts/detail.html?id={0}&quot;)">{1}</a>'.format(row.productName,row.productName)
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
	                                              return  (row.productTermDays || "" ) +  (row.productTermUnitText|| "" );
	                                          }
	                                           
	                                       },
	                                       {
	                                           title: '预期年化收益率（%）',
	                                           field: 'expRtnRate'
	                                         
	                                       },
	                                       {
	                                           title: '发行机构',
	                                           field: 'publisherOrg'
	                                         
	                                       },
	                                      {  //无
	                                          title: '剩余额度（元）',
	                                          field: 'remainAmount',
	                                          formatter: function (value, row, index) {
	                                              return value && (+value / 10000).toString().formatMoney() || "-";
	                                          }
	                                         
	                                      },
	                                      {
	                                          title: '认购截止日',
	                                          field: 'purchDeadLine',
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
	                                               if (operation.oprCode == "101") {
	                                                if(cookies.get("userType") =="1"){
	                                                    if(operation.side =="B"){
	                                                        op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}", event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
	                                                    }else if(operation.side =="S"){
	                                                      op += '';
	                                                    }
	                                                  }else if(cookies.get("userType") =="0"){
	                                                     op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
	                                      
	                                                  }
	                                                   
	                                               } else if (operation.oprCode == "102") {
	                                                if(cookies.get("userType") =="1"){
	                                                    if(operation.side =="B"){
	                                                        op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}", event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
	                                                    }else if(operation.side =="S"){
	                                                     
	                                                    }
	                                                }else if(cookies.get("userType") =="0"){
	                                                     op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
	                                      
	                                                  }
	                                               } else if (operation.oprCode == "103") {
	                                                if(cookies.get("userType") =="1"){
	                                                    if(operation.side =="B"){
	                                                        op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}", event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
	                                                    }else if(operation.side =="S"){
	                                                     op += '';
	                                                    }
	                                                 }else if(cookies.get("userType") =="0"){
	                                                    op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
	                                                 }
	                                               } else if (operation.oprCode == "104") {
	                                                if(cookies.get("userType") =="1"){
	                                                if(operation.side =="B"){
	                                                    op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}", event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
	                                                }else if(operation.side =="S"){
	                                                  op += '';
	                                                }}else if(cookies.get("userType") =="0"){
	                                                    op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
	                                                }
	                                                  
	                                               } else if (operation.oprCode == "105") {
	                                                if(cookies.get("userType") =="1"){
	                                                if(operation.side =="B"){
	                                                    op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}", event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
	                                                }else if(operation.side =="S"){
	                                                  op += '';
	                                                }}else if(cookies.get("userType") =="0"){
	                                                  op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
	                                                }
	                                  
	                                               } else if (operation.oprCode == "106") {
	                                                if(cookies.get("userType") =="1"){
	                                                  if(operation.side =="B"){
	                                                      op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "account\mypublish\chequelist.html?productId={2}", event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
	                                                  }else if(operation.side =="S"){
	                                                  op += '';
	                                                }}else if(cookies.get("userType") =="0"){
	                                                    op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
	                                                }
	                                                   
	                                               } else if (operation.oprCode == "107") {
	                                                if(cookies.get("userType") =="1"){
	                                                  if(operation.side =="B"){
	                                                      op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "/account/myproduct/3.html?productId={2}", event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
	                                                  }else if(operation.side =="S"){
	                                                  op += '';
	                                                 }}else if(cookies.get("userType") =="0"){
	                                                   op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
	                                                }
	                                                   
	                                               } else if (operation.oprCode == "108") {

	                                                if(cookies.get("userType") =="1"){
	                                                    if(operation.side =="B"){
	                                                        op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/preorder/preorder.html?productId={2}", event)\'>{3}</button>'.format(row.productId + row.oprCode, operation.oprName, row.productId, operation.oprName);
	                                                    }else if(operation.side =="S"){
	                                                      op += '';
	                                                    }
	                                                  }else if(cookies.get("userType") =="0"){
	                                                     op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
	                                      
	                                                  }
	                                               } else if (operation.oprCode == "109") {
	                                                 if(cookies.get("userType") =="1"){
	                                                 if(operation.side =="B"){
	                                                   op += '<button type="button" data-value="{0}" class="btn btn-outline btn-default buy mr5">立即购买</button>'.format(row.productId);
	                                                 }else if( operation.side =="S"){
	                                                   op += '';
	                                                 }}else if(cookies.get("userType") =="0"){
	                                                    op += '<button type="button" class="btn btn-outline btn-default mr5 errors" >{0}</button>'.format(operation.oprName);
	                                                 }
	                                                 
	                                                }
	                                               
	                                           }
	                                       }
	                                       return op;
	                                   }
	                                }
			                          ];
		            //初始化查询参数 买方ID
		            options.queryParams = {
    					productType : "1"
		        }

		        //绑定table
		        $table.fictable(options);

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
		        $('#btnSearch').click(function (e) {
               		 options.queryParams.productName = $("#search").val();
               		 options.queryParams.productNum = $("#search").val();
                	$table.bootstrapTable("destroy");
                	$table.fictable(options);
           		 });
		       $(".choocebar span").on("click",function(){
		        	$(this).addClass('active').siblings().removeClass('active');
                    if($(this).data("type") =="productTerm"){
                         options.queryParams.productTermFrom =  $(this).data("from");
                         options.queryParams.productTermTo=  $(this).data("to"); 
                    } 
                    if($(this).data("type") =="productTypeLV2"){
                        options.queryParams.productTypeLV2 =$(this).data("value");
                    }
                    
		    		//options.queryParams.productType = "5";
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