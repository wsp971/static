define(function() {
	var _parent = parent,_this,options
	
	function CtListService() {
			_this = this;
	}
	CtListService.prototype.typeSelected = function(em){
		$(em).addClass("active");
		$(em).siblings().removeClass("active");
		getCond();
		$("#btnSearch").trigger("click");
			
	};
	
	CtListService.prototype.getData=function(){
		var self = this;
		options = {},
			$table = $('#table');
		options.url = "/contract/byuser/query";
		options.columns = [
			{
				title: '产品名称',
				field: 'name'
			},
			{
				title: '产品类型',
				field: 'type'
			},
			{
				title: '合同标题',
				field: 'title',
				formatter: function (value, row, index) {
					var op = '';
					op += '<a class="link" href="javascript:;" onclick=\'parent.tab.open("{0}","合同详情", "account/contract/contractDetail.html?id={0}", window.event)\'>{1}</a>'.format(row.contractCode,row.title);
					return op;
				}
			},
			{
				title: '创建时间',
				field: 'creatTime',
				sortable: true,
				formatter: function (value, row, index) {
					return value && new Date(value).format("yyyy-MM-dd") || "-";
				}
			},
			{
				title: '有效期',
				field: 'activeTime',
				sortable: true,
				formatter: function (value, row, index) {
					return value && new Date(value).format("yyyy-MM-dd") || "-";
				}
			},
			{
				title: '合同对手方',
				field: 'partner',
			},
			{
				title: '合同状态',
				field: 'status'
			},
			{
				title: '操作',
				field: 'code',
				formatter: function (value, row, index) {
					var op = '';
					if (row.code == 0) {
						op += '<button type="button" class="btn btn-outline btn-default" onclick=\'parent.tab.open("sign{0}","合同签署", "account/contract/contractSign.html?id={0}", window.event)\'>签署</button>'.format(row.contractCode);
					}
					else if (row.code == 1) {
						op += '<button class="btn btn-outline btn-default cancel ct-remind-page" data-value="{0}">提醒签署</button>'.format(row.partner);
					}else {
						op += '<span>&nbsp;&nbsp;&nbsp;--</span>';
					}
					return op;
				}
			}];

		options.queryParams = {
			userCode : parent.cookies.get("username")
		}
		options.contentType = "application/x-www-form-urlencoded";
		$table.fictable(options);
		
		$('#btnSearch').click(function () {
			getCond();
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
	
	}
	
	//get condition to search
	function getCond(){
		options.queryParams.contractName = $("#search").val();
		console.log($(".myStatus").attr('isended'));
		options.queryParams.isEnded = $(".myStatus.active").attr('isended');
	}
	
	function emailSuccessed(){
		
		parent.layer.open({
			type : 2,
			skin : 'layui-layer-lan',
			title:false,
			fix : false,
			area : [ '350px', '200px' ],
			content : "account/contract/emailSuccessed.html",
			cancel:function(){/*return false;*/},
			end: function(){}
		});
	}
	
	CtListService.prototype.remind = function(toEmail){

		parent.$.loadAjax({
			url: "/contract/remind/email",
			type: "POST",
			contentType:"application/x-www-form-urlencoded",
			data: {emailToUser:toEmail},
			success: function(res){
				if(res.rtnCode == "000"){
					emailSuccessed();
				}else{
					
				}
			},
			error:function(err){
				parent.layer.msg("网络问题请稍后再试！");
			}
		});
	};
	return CtListService;
})
