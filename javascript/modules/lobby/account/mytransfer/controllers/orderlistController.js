
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
            options.url = "/trade/transfer/order/list";
            //定义表头和字段
            options.columns = [
                              {
                                  title: '订单号',
                                  field: 'orderId'
                              },
                              {
                                  title: '产品名称/ID',
                                  field: 'productName',
                                  formatter: function (value, row, index) {
                                       if (row.productType=='3') {//跳转至信托页面
	                       				   return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{0}","详情", "product/trusts/detail.html?productNum={1}", event)\'>{2}<br/>{3}</a>'.format(row.orderId, row.productCode,value, row.productCode);
	                       			   } 
                                       else {
	                       				   return value && '<a href="javascript:;" class="link">{0}<br/>{1}</a>'.format(value, row.productCode);
	                       			   }
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
                                   title: '转让价格（元）',
                                   field: 'price',
                                   sortable: true,
                                   formatter: function (value, row, index) {
                                       return value && value.toString().formatMoney() || "-";
                                   }
                               },
                               {
                                   title: '转让利率（%）',
                                   field: 'yield',
                                   sortable: true
                               },
                               {
                                   title: '受让机构',
                                   field: 'buyerInstitutionInfo',
                                   formatter: function (value, row, index) {
                                       return value && value.instName || "-";
                                   }
                               },
                              {
                                  title: '提交时间',
                                  field: 'createdTime',
                                  sortable: true,
                                  formatter: function (value, row, index) {
                                      return value && value.formatDate("yyyy-MM-dd") || "-";
                                  }
                              },
                              {
                            	  title: '订单状态',
                                  field: 'orderStatus',
                                  formatter: function (value, row, index) {
                                      var text = "";
                                      switch (value) {
                                          case "000":
                                              text = "预约成功";
                                              break;
                                          case "001":
                                              text = "预约中";
                                              break;
                                          case "002":
                                              text = "等待卖方签署";
                                              break;
                                          case "003":
                                              text = "待划款";
                                              break;
                                          case "004":
                                              text = "交易成功";
                                              break;
                                          case "005":
                                              text = "兑付中";
                                              break;
                                          case "006":
                                              text = "已兑付";
                                              break;
                                          case "007":
                                              text = "已撤销";
                                              break;
                                          case "008":
                                              text = "交易失败";
                                              break;
                                          case "009":
                                              text = "合同待审核";
                                              break;
                                          case "010":
                                              text = "审核不通过";
                                              break;
                                          case "011":
                                              text = "等待买方签署";
                                              break;
                                          case "012":
                                              text = "份额待划转";
                                              break;
                                          case "014":
                                              text = "份额已划转";
                                              break;
                                          case "015":
                                              text = "准备在线合同";
                                              break;
                                          case "016":
                                              text = "划款待确认";
                                              break;
                                          case "017":
                                              text = "份额待确认";
                                              break;
                                          case "018":
                                              text = "购买申请中";
                                              break; 
                                          case "019":
                                              text = "购买申请成功";
                                              break;
                                          case "020":
                                              text = "购买申请失败";
                                              break;
                                          case "021":
                                              text = "赎回申请中";
                                              break; 
                                          case "022":
                                              text = "赎回申请成功";
                                              break;
                                          case "023":
                                              text = "赎回申请失败";
                                              break; 
                                          default:
                                          	text = "-";
                                          	break;

                                      }
                                      return text;
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
                                               if(operation.originalSide =="T"){//转让方可执行操作
                                                   if (operation.oprCode == "001") { //001  签合同 ok
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "account/contract/contractList.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "002") { //002  划款
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}")\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "004") { //004 查看划款信息
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 drawinfo" data-orderid="{0}">{1}</button>'.format(row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "009") { //009 成交单
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}&productNum={3}", event)\'>{4}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, row.productCode, operation.oprName);
                                                   } else if (operation.oprCode == "011") { //011 下载合同
                                                       op += '<a class="btn btn-outline btn-default mr5 download" data-docpath="{1}">{0}</a>'.format(operation.oprName,row.orderDocInfo.docPath);
                                                   } else if (operation.oprCode == "012") { //012 上传
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 upload" data-orderid="{0}" data-oprcode="{1}" data-oprorderstatus="{3}" data-originalside="{4}">{2}</button>'.format(row.orderId , operation.oprCode, operation.oprName,operation.oprOrderStatus,operation.originalSide );
                                                   } else if (operation.oprCode == "013") {//013 划款确认
                                                	   op += '<button type="button" class="btn btn-outline btn-default mr5 transferMoneyConfirm" data-orderId="{0}" data-code="{1}" data-status="{2}" data-side="{3}">{4}</button>'.format(row.orderId,operation.oprCode, operation.oprOrderStatus, operation.originalSide,operation.oprName);
                                                   } else  {
                                                       op += '';
                                                   }
                                               } 
                                               else {
                                                      op += '';
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
               counterparty: cookies.get("instId"), //机构ID
               operator: cookies.get("username"),   //用户ID username
               orderType: "04"
            }

            //绑定table
            $table.fictable(options);
            //011下载合同
            $("#table").on("click", ".download", function(e){
                var docPath = $(this).data("docpath");
                var contract = docPath.split("|");
                //console.log(contract);
                //var length = contract.length;
                $(".download").attr("href", encodeURI("/file/innerDownload?filename=" + contract[1] + "&uuid=" + contract[0]));
            })
            //012上传
            $("#table").on("click", ".upload", function (e) {
                var orderId = $(this).data("orderid");
                var oprCode = $(this).data("oprcode");
                var oprOrderStatus = $(this).data("oprorderstatus");
                var originalSide = $(this).data("originalside");
                //这里处理具体业务
                parent.layer.open(
                    {
                        type: 2,
                        title: ['上传', 'background:#EFEFEF;'],
                        shadeClose: true,
                        shade: 0.2,
                        shadeClose: false,
                        area: ['640px;', '350px'],
                        content: '../../../../../page/lobby/account/mytransfer/upload.html?orderId='+orderId+'&oprCode='+oprCode+'&oprOrderStatus='+oprOrderStatus+'&originalSide='+originalSide
                    }
                );
            });
          //划款确认的相关操作013
            $("#table").on("click",".transferMoneyConfirm",function(e){
                var orderId = $(this).attr("data-orderId");
                var oprCode = $(this).data("code");
                var oprOrderStatus = $(this).data("status");
                var originalSide = $(this).data("side");
                 parent.layer.open(
                    {
                        type: 1,
                        title: ['提示', 'background:#EFEFEF;'],
                        shadeClose: true,
                        shade: 0.2,
                        shadeClose: false,
                        area:  ['320px','200px'],
                        content: '<div class="tc pt12p">是否进行划款确认？</div>',
                        btn: ['确认', '取消'],
                        yes : function () {
                        	var data ={
                        			orderId:orderId,
                        			oprCode:oprCode,
                        			oprOrderStatus:oprOrderStatus,
                					originalSide:originalSide
                			}
                        	loadAjax({
                                url : "/trade/order/update",
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
          //004 查看划款信息  卖方操作弹窗
            $("#table").on("click", ".drawinfo", function (e) {
                var orderId = $(this).data("orderid");
	       	 	parent.layer.open({
	   	            type: 2,
	   	            title: ['划款信息', 'background:#fff;'],
	   	            shadeClose: true,
	   	            shade: 0.8,
	   	            scrollbar : false,
	   	            area: ['505px','580px'],
	   	            content: 'account/myinvest/drawInfo.html?orderId={0}'.format(orderId)
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
                options.queryParams.createdDateFrom = $("#startDate").val();
                options.queryParams.createdDateTo = $("#endDate").val();
                options.queryParams.productType = $("#productType").val();
                options.queryParams.orderStatus = $("#orderStatus").val();
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