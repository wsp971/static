/**
 * Created by HOUCHUNYANG742 on 2016-06-12.
 */
define([
        "jquery_iframe_transport",
        "jquery.fileupload",
        "jquery.fileupload-process",
        "jquery.fileupload-validate"],function() {
    var _this;
    function UploadFileService() {
        _this = this;
    }

    function initSelectors() {
    }
    UploadFileService.prototype.initialize = function() {
        initSelectors();
    }
    //ele 上传的input； showEle 上传文件后需要显示的文字；  url 请求路径 ;fileType 上传文件格式;ele,ulEle,url,fileType,success,failure
    UploadFileService.prototype.uploadFile = function(options){
    	var defaults = {
    		ele: null,
    		ulEle: null,
    		url: '/file/upload',
    		fileType:/(\.|\/)(doc|txt|xlsx|docx|jpg|png|bmp|pdf)$/i,
    		success:function(data){},
			failure:function(data){}
    	};
    	var paramData = $.extend({}, defaults, options);
//    	paramData.ele && paramData.ele.trigger("click");
//        var i = paramData.ele.parents('tr').find('td').eq(0).text().trim();
        paramData.ele.fileupload(
            {
                url : window.rootPath + paramData.url,
                type : "POST",
                dataType : "text",
                autoUpload : false,
                processalways: function(e, data) {
                    var acceptFileTypes = paramData.fileType;
                    var name = data.files[0].name;
                    var acceptType = name.substring(name.lastIndexOf('.'),name.length);
                    if(acceptType == "" || !acceptFileTypes.test(acceptType)) {
                        parent.parent.layer.msg('文件格式不符合');
                        return false;
                    }
                    if(data.originalFiles[0]['size'] > 5000000) {
                    	parent.parent.layer.msg('文件太大');
                        return false;
                    }
                    if(data.originalFiles[0]['size'] == "") {
                    	parent.parent.layer.msg('文件不能为空');
                        return false;
                    }
                    data.submit();
                	paramData.ulEle.append('<div id="progress"><div class="bar" style="width: 0%;"></div></div>');
                },
                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .bar').css( 'width',progress + '%');
                },
                done : function(e, data) {  
                	paramData.ulEle.find('div').remove();
                    if (data.result != null && data.result != '') {
                        var res = JSON.parse(data.result);
                        if(res.rtnCode == "000"){
                        	setupElement(paramData.ulEle,res,data);//处理添加的元素
                        	paramData.success && paramData.success(data);
                        }else {
                        	parent.parent.layer.msg("上传文件异常");
                        	if (paramData.failure && typeof(paramData.failure)=="function"){
                        		paramData.failure(data);
                        	}
                        }
                    } else {
                    	parent.parent.layer.msg("上传文件异常");
                    	if (paramData.failure && typeof(paramData.failure)=="function"){
                    		paramData.failure(data);
                    	}
                    }

                },
                fail : function(e, data) {
                	paramData.ulEle.find('div').remove();
                	parent.parent.layer.msg("上传文件失败");
                	if (paramData.failure && typeof(paramData.failure)=="function"){
                		paramData.failure(data);
                	}
                }
            })
    }
    function setupElement(ulEle,res,data){
    	ulEle.append("<li>" + data.files[0].name + "<i>" + "&#xe60e;" + "</i>" + "</li>");
    	var li = ulEle.children('li:last-child');
    	var docType, docTypes = data.files[0].name.split('.');
    	docType = docTypes[docTypes.length - 1];
    	ulEle.children().css('list-style-type','none');
    	ulEle.children('li:last-child').attr('data-contract',res.data + '|' + data.files[0].name);
    	ulEle.children('li:last-child').attr('data-buycontract',res.data + '|' + data.files[0].name + '|' + docType + '|' + '09');
    	ulEle.children('li:last-child').attr('data-buyprotocol',res.data + '|' + data.files[0].name + '|' + docType + '|' + '10');
    	ulEle.children('li:last-child').addClass('data-common');
    	ulEle.find('i').addClass('iconfont cuo'); 
    	ulEle.find('i').css('padding-left','10px'); 
    	ulEle.find('i').css('cursor','pointer'); 
    	ulEle.find('i').click(function(){
    		$(this).parent().remove();
    		$(this).remove();
    	}); 
    	
    }
    return UploadFileService;

})
