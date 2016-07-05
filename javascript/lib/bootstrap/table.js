__inline('js/bootstrap.min.js');
__inline('js/bootstrap-table.min.js');
__inline('js/bootstrap-table-zh-CN.min.js');
//__inline('dataTables.editor.min.js');

$.fn.fictable = function (options) {
    var $tableId = $(this);
    var defaults = {
        url: "",
        sortable: true,
        queryParams: null,
        columns: []
    }
    if ($tableId == 'undefined') {
        console.log('没有指定绑定表容器ID');
    };
    var settings = _.extend({}, defaults, options);

    var oTable = new TableInit($tableId, settings);
    oTable.Init();

};

var TableInit = function ($tableId, settings) {
    var oTableInit = {};
    //初始化Table
    oTableInit.Init = function () {
        $tableId.bootstrapTable({
            url: window.rootPath + settings.url, //settings.url
            method: 'post',
            dataType: settings.dataType || "json",
            striped: true, 				  //是否显示行间隔色
            cache: false, 				   //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true, 			   //是否显示分页（*）
            sortable: settings.sortable, 	//是否启用排序
//            sortName: "createdDate",
//            sortOrder: "desc",				   //排序方式
            queryParams: oTableInit.queryParams, //传递参数（*）
            sidePagination: "server", 	   //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1, 				   //初始化加载第一页，默认第一页
            pageSize: 20, 				   //每页的记录行数（*）
            //pageList: [10, 25, 50, 100], 	//可供选择的每页的行数（*）
            contentType: settings.contentType || "application/json",
            strictSearch: true,
            //clickToSelect: true, 			//是否启用点击选中行
            queryParamsType: "limit",
            //height: 500, 					//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            //uniqueId: "id", 				 //每一行的唯一标识，一般为主键列
            columns: settings.columns,
            responseHandler: oTableInit.responseHandler
        });
    }
    //获取查询参数，更多参数通过extend扩展
    oTableInit.queryParams = function (params) {
        var page = params.offset / params.limit === 0 ? 1 : params.offset / params.limit + 1;  
        var temp = {
            nopage: "0",
            pageSize: params.limit + "",
            pageNo: page + "",
            sortAttribute: params.sort,
            sortType: params.order
        };
        if (settings != undefined) {
            return _.extend(temp, settings.queryParams);
        } else {
            return temp;
        }
    };
    //处理返回的数据适配table格式要求 
    oTableInit.responseHandler = function (res) {
        if (res.rtnCode == "00" || res.rtnCode == "000" || res.rtnCode == "0000" || res.rtnCode == "00000") {
            var resultStr = res.data;
            return {
                "rows": resultStr.rows,
                "total": resultStr.total
            };

        } else {
            return {
                "rows": [],
                "total": 0
            };
        }
    }
    return oTableInit;
}