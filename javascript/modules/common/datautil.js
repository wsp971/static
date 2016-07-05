define(function() {
    var DataUtil = {
        collectData: function() {
            var name, jsonData = {};
            $('.data-common').each(function(index, element) {
                name = $(element).attr('name');
                name && (jsonData[name] = $(element).val());
            });
            $('.data-radio').each(function(index, element) {
                name = $(element).attr('name');
                name && (jsonData[name] = eval('$("input[name=\'' + name + '\'][checked]").val()'));
            });
            $('.data-hide').each(function(index, element) {
                id = $(element).attr('id');
                id && (jsonData[id] = $(element).data("val"));
            });
            //			$('ul.data-list').each(function(index, element) {
            //				name = $(element).attr('name');
            //				jsonData[name] = {};
            //				
            //			});
            return jsonData;
        },

        collectChildData: function(params) {
            var jsonDataArray = [],
            strResult = "";
            $('#' + params.id).children(params.ele + '.data-common').each(function(index, element) {
                var jsonData = {};
                if (params.keyName) {
                    jsonData[params.keyName] = $(element).data(params.dataName);
                    jsonDataArray.push(jsonData);
                } else if (params.spliter) { 
                	(index > 0) && (strResult += params.spliter); 
                	(index === 0) ? strResult = String($(element).data(params.dataName)) : strResult += String($(element).data(params.dataName));
                } else {
                    jsonDataArray.push($(element).data(params.dataName));
                }
            });
            return params.spliter ? strResult: jsonDataArray;
        },
        //		trustChildData : function(id, ele, dataName) {
        //			var key, jsonDataArray = [];
        //			$('#'+id).children(ele + '.data-common').each(
        //					function(index, element) {
        //						var jsonData = $(element).data(dataName);
        //						jsonDataArray.push(jsonData);
        //				});
        //			return jsonDataArray;
        //		},
        appendUserData: function(object, cookies) {
            object.publisherMemberID = cookies.get("username").trim(),
            object.createBy = cookies.get("username");
            object.publisherOrgID = cookies.get("instId");
            return object;
        },

        getUrlParam: function(name, loc) {
            var e = new RegExp("[&,?]" + name + "=([^\\&]*)", "i"),
            i = e.exec(loc.search);
            return i ? i[1] : ""
        },
        //id： 需要操作的元素  data：元素上面需要增加的数据
        renderEle: function(id, data, linkCode) {
            var dataArray = [];
            $.each(data,
            function(index, element) {
                var fileArray = element.file.split('|');
                dataArray.push(fileArray);
            });
            $.each(dataArray,
            function(index, element) {
            	var container = $('#' + id);
            	container.append(("<li>" + "<a>" + element[1] + "</a>" + "<em>" + "请点击下载" + "</em>" + "</li>"));
            	//container.children('li:last-child').find('a').attr('href',element[2]);
            	var url =encodeURI("/file/innerDownload?filename=" + element[1] + "&uuid=" + element[0]);
	        	container.children('li:last-child').find('a').attr('href', url);
	        	container.find('a').addClass("download link trust-downUrl");
	        	container.children('li:last-child').find('em').css('padding-left', '10px');
            });
        },
        retrieveFileInfo : function(fileData){
        	var result = {}, fileArray;
        	fileData && (fileArray = fileData.file.split('|'));
        	fileArray && (result.fileName = fileArray[1], result.uuid = fileArray[0], result.link = fileArray[2]);
        	return result;
        }
    }

    return DataUtil;
})