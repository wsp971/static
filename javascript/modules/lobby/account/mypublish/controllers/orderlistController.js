define(["jquery",
        "common/views",
        "table"
], function ($, view, myorderService, table) {
    return new view.extend({
        init: function () {
            //表格参数
            var options = {},
                $table = $('#table');
            //数据地址investor/order/list
            options.url = "/trade/publisher/order/list";
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
                                      if (row.productType == '2') { //跳转至基金页面
                                          return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{0}","详情", "product/fund/detail.html?productNum={1}", event)\'>{2}<br/>{3}</a>'.format(row.orderId, row.productCode, value, row.productCode);
                                      } else if (row.productType == '3') {//跳转至信托页面
                                          return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{0}","详情", "product/trusts/detail.html?productNum={1}", event)\'>{2}<br/>{3}</a>'.format(row.orderId, row.productCode, value, row.productCode);
                                      } else {
                                          return value && '<a href="javascript:;" class="link" onclick=\'tab.open("{0}","详情", "product/trusts/detail.html?productNum={1}", event)\'>{2}<br/>{3}</a>'.format(row.orderId, row.productCode, value, row.productCode);
                                      }
                                  }
                              },
                              {
                                  title: '产品类型',
                                  field: 'productType',
                                  sortable: true,
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
                                          default:
                                              text = '-';
                                              break;
                                      }
                                      return text;
                                  }
                              },
                              {
                                  title: '投资机构',
                                  field: 'buyerInstitutionInfo',
                                  formatter: function (value, row, index) {
                                      return value && value.instName || "-";
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
                                   field: 'expireDate',
                                   sortable: true,
                                   formatter: function (value, row, index) {
                                       return value && value.formatDate("yyyy-MM-dd") || "-";
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
                                             default:

                                         }
                                         return value && value + '' + termUnit || "-";
                                     }
                                 },
                               {
                                   title: '预期年化收益率（%）',
                                   field: 'expAnnYield'
                               },
                               {
                                   title: '订单金额（元）',
                                   field: 'orderAmount',
                                   sortable: true,
                                   formatter: function (value, row, index) {
                                       return value && value.toString().formatMoney() || "-";
                                   }
                               },
                               {
                                   title: '确认份额',
                                   field: 'orderShare',
                                   sortable: true,
                                   formatter: function (value, row, index) {
                                       if (row.productType == 3) {
                                           return "-"
                                       } else {
                                           return value || "-";
                                       }
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
                                   title: '订单类型',
                                   field: 'orderType',
                                   sortable: true,
                                   formatter: function (value, row, index) {
                                       var text = "";
                                       switch (value) {
                                           case "00":
                                               text = "预约";
                                               break;
                                           case "01":
                                               text = "申购";
                                               break;
                                           case "02":
                                               text = "认购";
                                               break;
                                           case "03":
                                               text = "兑付";
                                               break;
                                           case "04":
                                               text = "转让";
                                               break;
                                           case "05":
                                               text = "赎回";
                                               break;
                                           default:
                                               text = "-";
                                               break;

                                       }
                                       return text;
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
                                   field: 'orderId',
                                   formatter: function (value, row, index) {
                                       var op = ''; //操作根据具体的订单状态来调整,我的发行为卖方操作
                                       if (row.nextOperations) {
                                           for (var i = 0; i < row.nextOperations.length; i++) {
                                               var operation = row.nextOperations[i];
                                               if (operation.originalSide == "S" || operation.originalSide == "P") {
                                                   if (operation.oprCode == "000") { //000  撤销   买方  卖方都有   ok
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 backout" data-orderId="{0}" data-code="{1}" data-status="{2}" data-side="{3}">{4}</button>'.format(row.orderId, operation.oprCode, operation.oprOrderStatus, operation.originalSide, operation.oprName);
                                                   } else if (operation.oprCode == "001") { //001  签合同  OK 卖方
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "account/contract/contractList.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "002") { //002  划款   买方
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "003") { //003 交易审核
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "004") { //004 查看划款信息  卖方  ok
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 drawinfo" data-orderid="{0}">{1}</button>'.format(row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "005") { //005 查看兑付信息   卖方  ok
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 cashinfo" data-orderid="{0}">{1}</button>'.format(row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "006") { //006 修改  卖方 OK
                                                       if (row.productType == '2') { //跳转至基金页面
                                                           op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","购买", "product/fund/buy.html?productNum={1}", event)\'>{2}</button>'.format(row.orderId + operation.oprCode, row.productCode, operation.oprName);
                                                       } else if (row.productType == '3') {//跳转至信托页面
                                                           op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","购买", "product/trusts/productBuy/buyTrust.html?productNum={1}", event)\'>{2}</button>'.format(row.orderId + operation.oprCode, row.productCode, operation.oprName);
                                                       }
                                                   } else if (operation.oprCode == "007") { //007 份额划转    卖方  ok
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 shareTransfer" data-orderid="{0}" data-code="{1}" data-status="{2}" data-side="{3}">{4}</button>'.format(row.orderId, operation.oprCode, operation.oprOrderStatus, operation.originalSide, operation.oprName);
                                                   } else if (operation.oprCode == "008") { //008 查看划转材料   卖方 ok
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 shareAndTransfer" data-orderid="{0}">{1}</button>'.format(row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "009") { //009 成交单  OK  卖方
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}&productNum={3}", event)\'>{4}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, row.productCode, operation.oprName);
                                                   } else if (operation.oprCode == "010") { //010 确认申请    卖方 ok
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 buyApply" data-orderid="{0}" data-status="{2}" data-side="{3}">{1}</button>'.format(row.orderId, operation.oprName, operation.oprOrderStatus, operation.originalSide);
                                                   } else if (operation.oprCode == "011") { //011 下载合同
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 downloadContract" data-orderid="{0}" data-status="{1}" data-side="{2}">{3}</button>'.format(row.orderId, operation.oprOrderStatus, operation.originalSide, operation.oprName);
                                                   } else if (operation.oprCode == "012") { //012 上传
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 uploadContract" data-orderid="{0}" data-status="{1}" data-side="{2}">{3}</button>'.format(row.orderId, operation.oprOrderStatus, operation.originalSide, operation.oprName);
                                                   } else if (operation.oprCode == "013") {//013 划款确认  卖方
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 transferMoneyConfirm" data-orderId="{0}" data-code="{1}" data-status="{2}" data-side="{3}">{4}</button>'.format(row.orderId, operation.oprCode, operation.oprOrderStatus, operation.originalSide, operation.oprName);
                                                   } else if (operation.oprCode == "014") { //014 兑付确认  卖方
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "015") { //015 份额确认    卖方
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "016") { //016 交易审核通过
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "017") { //017 交易审核不通过
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "account/contract/contractList.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "018") { //018 份额确认成功
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 lotConfirmSuc" data-orderId="{0}" data-code="{1}" data-status="{2}" data-side="{3}">{4}</button>'.format(row.orderId, operation.oprCode, operation.oprOrderStatus, operation.originalSide, operation.oprName);
                                                   } else if (operation.oprCode == "019") { //019 份额确认失败
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 lotConfirmFail" data-orderId="{0}" data-code="{1}" data-status="{2}" data-side="{3}">{4}</button>'.format(row.orderId, operation.oprCode, operation.oprOrderStatus, operation.originalSide, operation.oprName);
                                                   } else if (operation.oprCode == "020") { //020  划款确认成功
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "account/contract/contractList.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "021") { //021划款确认失败
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "022") { //022 份额划转成功
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "023") { //023 份额划转失败
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "024") { //024  订单新增
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5" onclick=\'tab.open("{0}","{1}", "product/trusts/dealTicket.html?orderId={2}", event)\'>{3}</button>'.format(row.orderId + row.oprCode, operation.oprName, row.orderId, operation.oprName);
                                                   } else if (operation.oprCode == "025") { //025 申请确认成功
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 lotConfirmSuc" data-orderId="{0}" data-code="{1}" data-status="{2}" data-side="{3}">{4}</button>'.format(row.orderId, operation.oprCode, operation.oprOrderStatus, operation.originalSide, operation.oprName);
                                                   } else if (operation.oprCode == "026") {//026 申请确认失败
                                                       op += '<button type="button" class="btn btn-outline btn-default mr5 lotConfirmFail" data-orderId="{0}" data-code="{1}" data-status="{2}" data-side="{3}">{4}</button>'.format(row.orderId, operation.oprCode, operation.oprOrderStatus, operation.originalSide, operation.oprName);
                                                   } else {
                                                       op += '';
                                                   }
                                               } else if (operation.originalSide == "B") {
                                                   op += '';
                                               } else if (operation.originalSide == "S") {
                                                   op += '';
                                               }

                                           }

                                           return op;
                                       }
                                   }
                               }
            //,events: {
            //'click .remove': function (e, value, row, index) {
            //		 parent.layer.alert("你确定撤销么？");
            //	}
            //}
                          ];

            //初始化查询参数
            options.queryParams = {
                operator: cookies.get("username") || "",   //用户ID username
                productCode: utils.getParameter("productNum") || "",
                instId: cookies.get("instId") || ""
                //                sortAttribute: "createdTime",
                //                sortType: "desc"
            }

            //绑定table
            $table.fictable(options);

            //004 查看划款信息  卖方操作弹窗
            $("#table").on("click", ".drawinfo", function (e) {
                var orderId = $(this).data("orderid");
                parent.layer.open({
                    type: 2,
                    title: ['划款信息', 'background:#fff;'],
                    shadeClose: true,
                    shade: 0.8,
                    scrollbar: false,
                    area: ['505px', '580px'],
                    content: 'account/myinvest/drawInfo.html?orderId={0}'.format(orderId)
                });
                return false;
            });

            $("#table").on("click", ".shareTransfer", function (e) {
                var orderId = $(this).data("orderid");
                var oprCode = $(this).data("code");
                var oprOrderStatus = $(this).data("status");
                var originalSide = $(this).data("side");
                parent.layer.open(
                    {
                        type: 2,
                        title: ['份额划转', 'background:#C6C6C6;'],
                        shadeClose: true,
                        shade: 0.2,
                        area: ['720px', '580px'],
                        content: ['../../../../../page/lobby/account/mypublish/order/shareTransfer.html?orderId=' + orderId + '&oprCode=' + oprCode + '&oprOrderStatus=' + oprOrderStatus + '&originalSide=' + originalSide, 'no']
                    }
                );
                    return false;
            }).on("click", ".shareAndTransfer", function (e) {
                var orderId = $(this).data("orderid");
                parent.layer.open(
                    {
                        type: 2,
                        title: ['划款凭证与转让合同', 'background:#C6C6C6;'],
                        shadeClose: true,
                        shade: 0.2,
                        area: ['520px;', '300px'],
                        content: ['../../../../../page/lobby/account/mypublish/order/shareAndTransfer.html?orderId=' + orderId, 'no']
                    }
                );
                return false;
            }).on("click", ".buyApply", function (e) {
                var orderId = $(this).data("orderid");
                var oprOrderStatus = $(this).data("status");
                var originalSide = $(this).data("side");
                parent.layer.open(
                         {
                             type: 2,
                             title: ['提示', 'background:#C6C6C6;'],
                             shadeClose: true,
                             shade: 0.2,
                             area: ['520px;', '400px'],
                             content: ['../../../../../page/lobby/account/mypublish/order/buyApply.html?orderId=' + orderId + '&oprOrderStatus=' + oprOrderStatus + '&originalSide=' + originalSide, 'no']
                         }
                     );
                return false;
            });


            //005 查看兑付信息   卖方   操作弹窗
            $("#table").on("click", ".cashinfo", function (e) {
                var orderId = $(this).data("orderid");
                parent.layer.open({
                    type: 2,
                    title: ['兑付信息', 'background:#fff;'],
                    shadeClose: true,
                    shade: 0.8,
                    scrollbar: false,
                    area: ['505px', '580px'],
                    content: 'account/myinvest/drawInfo.html?orderId={0}'.format(orderId)
                });
                return false;
            });

            //撤销的相关操作
            $("#table").on("click", ".backout", function (e) {
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
                        area: ['320px', '200px'],
                        content: '<div class="tc pt12p">确认要撤销该订单吗？</div>',
                        btn: ['确认', '取消'],
                        yes: function () {
                            var data = {
                                orderId: orderId,
                                oprCode: oprCode,
                                oprOrderStatus: oprOrderStatus,
                                originalSide: originalSide
                            }
                            loadAjax({
                                url: "/product/updateProduct",
                                data: JSON.stringify(data), //用户邮件点击链接参数：username,oldEmail,email,userId
                                type: "post",
                                contextType: "application/json",
                                success: function (msg) {
                                    if (msg && msg.rtnCode == 000) {
                                        parent.layer.closeAll();
                                        parent.layer.msg('操作成功！');

                                        $table.bootstrapTable("destroy");
                                        $table.fictable(options);
                                    } else {
                                        parent.layer.msg('异常错误！');
                                    }

                                }
                            })

                        }
                    }
                );
                return false;
            });

            //划款确认的相关操作013
            $("#table").on("click", ".transferMoneyConfirm", function (e) {
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
                        area: ['320px', '200px'],
                        content: '<div class="tc pt12p">是否进行划款确认？</div>',
                        btn: ['确认', '取消'],
                        yes: function () {
                            var data = {
                                orderId: orderId,
                                oprCode: oprCode,
                                oprOrderStatus: oprOrderStatus,
                                originalSide: originalSide
                            }
                            loadAjax({
                                url: "/trade/order/update",
                                data: JSON.stringify(data), //用户邮件点击链接参数：username,oldEmail,email,userId
                                type: "post",
                                contextType: "application/json",
                                success: function (msg) {
                                    if (msg && msg.rtnCode == 000) {
                                        parent.layer.closeAll();
                                        parent.layer.msg('操作成功！');

                                        $table.bootstrapTable("destroy");
                                        $table.fictable(options);
                                    } else {
                                        parent.layer.msg('异常错误！');
                                    }

                                }
                            })

                        }
                    }
                );
                return false;
            });
            //份额确认成功 018 /申请确认成功 025 
            $("#table").on("click", ".lotConfirmSuc", function (e) {
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
                        area: ['320px', '200px'],
                        content: '<div class="tc pt12p">您确定提交该操作么？</div>',
                        btn: ['确认', '取消'],
                        yes: function () {
                            var data = {
                                orderId: orderId,
                                oprCode: oprCode,
                                oprOrderStatus: oprOrderStatus,
                                originalSide: originalSide
                            }
                            loadAjax({
                                url: "/trade/order/update",
                                data: JSON.stringify(data), //用户邮件点击链接参数：username,oldEmail,email,userId
                                type: "post",
                                contextType: "application/json",
                                success: function (msg) {
                                    if (msg && msg.rtnCode == 000) {
                                        parent.layer.closeAll();
                                        parent.layer.msg('确认成功！');
                                        $table.bootstrapTable("destroy");
                                        $table.fictable(options);
                                    } else {
                                        parent.layer.msg('异常错误！');
                                    }

                                }
                            })

                        }
                    }
                );
                return false;
            })

            //份额确认失败 019 /申请确认失败 026
            $("#table").on("click", ".lotConfirmFail", function (e) {
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
                        area: ['320px', '200px'],
                        content: '<div class="tc pt12p">您确定提交该操作么？</div>',
                        btn: ['确认', '取消'],
                        yes: function () {
                            var data = {
                                orderId: orderId,
                                oprCode: oprCode,
                                oprOrderStatus: oprOrderStatus,
                                originalSide: originalSide
                            }
                            loadAjax({
                                url: "/trade/order/update",
                                data: JSON.stringify(data), //用户邮件点击链接参数：username,oldEmail,email,userId
                                type: "post",
                                contextType: "application/json",
                                success: function (msg) {
                                    if (msg && msg.rtnCode == 000) {
                                        parent.layer.closeAll();
                                        parent.layer.msg('提交成功！');

                                        $table.bootstrapTable("destroy");
                                        $table.fictable(options);
                                    } else {
                                        parent.layer.msg('异常错误！');
                                    }

                                }
                            })

                        }
                    }
                );
                return false;
            })

            //绑定自定义查询，具体看业务要求
            $('#btnSearch, #btnQuery').click(function () {
                options.queryParams.search = $("#search").val();
                options.queryParams.expireDateFrom =(new Date( $("#startDate").val())).getTime();
                options.queryParams.expireDateTo = (new Date($("#endDate").val())).getTime();
                options.queryParams.productType = $("#productType").val();
//                options.queryParams.tradeAccount = $("#tradeAccount").val();
                options.queryParams.orderType = $("#orderType").val();
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