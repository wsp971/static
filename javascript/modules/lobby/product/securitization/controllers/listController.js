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
		                                        return '<a href="javascript:;" class="link" onclick="tab.open(&quot;detail22&quot;,&quot;产品详情&quot;, &quot;product/trusts/detail.html?productNum=' + row.productNum + '&quot;,event)">' + row.productName + '</a>'
                                          }
		                              },
		                              {
		                                  title: '产品分类',
		                                  field: 'productTypeLV2Text'
		                              },
                                       {
                                           title: '产品期限',
                                           field: 'productTerm'                                            
                                             /* formatter: function (value, row, index) {
                                              return  row.productTerm  +  (row.productTermUnit || "");
                                          }*/
                                           
                                       },
                                       {
                                           title: '预期年化收益率（%）',
                                           field: 'publisherName'
                                         
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
                                          field: 'createdDate',
                                          sortable: true,
                                          formatter: function (value, row, index) {
                                              return value && value.formatDate("yyyy-MM-dd") || "-";
                                          }
                                      }
		                          ];
		            //初始化查询参数 买方ID
		            options.queryParams = {
		           		//nopage: "1", 
   						 page: "2", 
    					rows: "2" ,
    					productType : "5"
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
                    	  options.queryParams.productTermDaysfrom  =  $(this).data("from");
                          options.queryParams.productTermDaysto =  $(this).data("to");  
                    } 
                    if($(this).data("type") =="productTypeLV2"){
                        options.queryParams.productTypeLV2 =$(this).data("value");
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