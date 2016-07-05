define(["jquery",
        "common/views",
        "table"
],
		function ($, view, table) {
		    return new view.extend({
		        init: function () {
		            var options = {},
                        $table = $('#table');
		            options.url = "/trade/account/list";
		            options.columns = [{
											field : 'targetInstName',
											title : '发行方',
										}, {
											field : 'instName',
											title : '账户名称',
										}, {
											field : 'bankName',
											title : '开户银行',
										}, {
											field : 'bankNum',
											title : '银行账号',
										}, {
											field : 'accountStatus',
											title : '状态',
											formatter: function (value, row, index) {
			                                       var text = "";
			                                       switch (value) {
			                                           case "01":
			                                               text = "待审核";
			                                               break;
			                                           case "02":
			                                               text = "审核通过";
			                                               break;
			                                           case "03":
			                                               text = "审核失败";
			                                               break;
			                                           case "04":
			                                               text = "待提交";
			                                               break;
			                                           case "05":
			                                               text = "已提交";
			                                               break;
			                                           case "06":
			                                               text = "开户成功";
			                                               break;
			                                           case "07":
			                                               text = "开户失败";
			                                               break;
			                                           case "08":
			                                               text = "已销户";
			                                               break;
			                                           default:
			                                        	   text = "-";
			                                           	   break;
			                                       }
			                                       return text;
			                                   }
										}, {
											field : 'openInfo',
											title : '开户资料',
											formatter: function (value, row, index) {
												var op = '';
			                                       switch (row.accountStatus) {
			                                           case "01":
			                                           case "02":
			                                           case "05":
			                                           case "06":
			                                           case "08":
			                                               op += '<a class="btn btn-white ml15" href="open_account_detail.html?instId='+ row.instId + '&targetInstId=' + row.targetInstId +' ">查看</a>';
			                                               break;
			                                           case "03":
			                                           case "07":
			                                               op += '<a class="btn btn-white ml15" href="open_account.html?instId='+ row.instId + '&targetInstId=' + row.targetInstId + '&flag=1">编辑</a>';
			                                               break;
			                                           case "04":
			                                               op += '<a class="btn btn-white ml15" href="open_account.html?instId='+ row.instId + '&targetInstId=' + row.targetInstId + '&flag=0">开户</a>';
			                                               break;
			                                           default:
			                                        	   op +=  '-';
			                                           	   break;
			                                       }
			                                       return op;
											}
										}];
		            options.queryParams = {
		                instId:cookies.get("instId")
		            }

		            $table.fictable(options);

		            $('#btnSearch').click(function () {
		                options.queryParams.targetInstName = $("#search").val();
		                $table.bootstrapTable("destroy");
		                $table.fictable(options);
		            });

		            $(".searchbox").keyup(function (e) {
		                var e = e || event,
                            keycode = e.which || e.keyCode;
		                if (keycode == 13) {
		                    $("#btnSearch").trigger("click");
		                }
		            });
		        },
		        events: {
		        
		    },
		    handlers: {
		    

		}
});
}); 