define(function() {
	var view,type,category,_parent;//real view
	view=self;
	//load the page
	function AddSigService(self){
		_parent=parent;
		type = $("#typeFlag").val();
		category= type=="name"?0:1;
		var formData={
				"userCode":parent.cookies.get('username'),
				"imageID":"",
				"category":category,
				"password":"123",
				"name":"321"
		};
		
		$('#addSignatureForm').fileupload({
            url : window.rootPath + "/file/upload",
            formData: {'isAlpha': true},
            dataType : 'json',
            type:"POST",
            autoUpload : false,
            acceptFileTypes : /(\.|\/)(gif|jpe?g|png)$/i,
            maxFileSize : 5000000, // 5 MB
            previewMaxWidth : 200,
            previewMaxHeight : 200,
            previewCrop : false,
            maxNumberOfFiles:1
        });
		
        $('#addSignatureForm')
        		.bind('fileuploadadd', function (e, data) {
        			$("#submitInput").remove();
        			
                    data.context = $('<input class="btn btn-info"  id="submitInput" type="submit" value="提交">').prependTo('#subAndCancel');
                    $("#fileName").remove();
                    var fileName="<span id='fileName' class='fileNameSpan'>"+data.files[0].name+"</span>";
                	$("#triggerDiv").after(fileName);
                    $(data.context).click(function(){
                    	data.submit();
                    });
                })
                .bind('fileuploadprocessdone', function (e, data) {
                	var file = data.files[0];
                	
                	preSeeImg(data);
                    
                    if (file.error) {
                    	$(".img-pre div").append('<br>').append(
                                $('<span/>').text(file.error));
                    }
                    //check the size of img,if legal,remove the disabled from the submit button
                	checkImgSize(file,data);
                	
                	})
                .bind('fileuploadprocessfail', function (e, data) {
                	alert("fileuploadprocessfail")
                	$(".img-pre div").html("");
                	var msg=data.files[0].error;
                	
                	msg=="File type not allowed" ? parent.layer.alert("请上传jpg,png,gif,jpeg格式的图片"):parent.layer.alert("上传文件不合法");
                	

                })
                .bind('fileuploadfail', function (e, data) {
                	alert('fileuploadfail');})
                .bind('fileuploaddone', function (e, data) {
                	
                	var afterUpload= data._response? data._response.result : data.jqXHR.responseText;
                	var obj =data._response? data._response.result : JSON.parse(afterUpload); // --> parse error 
                	
                	if(obj.rtnCode == 000){
                		
                		formData.imageID=obj.data;
                    	
                    	parent.$.loadAjax({
                			url: "/contract/signature/add",
                			contentType:"application/json",
                			data:JSON.stringify(formData),
                            debug: true,
                            isLoading: true,
                            type:'POST',
                            success: function (result) {
                            	if(result.rtnCode=="000"){
                            		parent.layer.isCancel='notCancel';
                            		parent.layer.msg("上传成功")
                            		
                            		//hide current layer
                            		var index=parent.layer.getFrameIndex(window.name);
                            		parent.layer.close(index);
                            	}else{
                            		_parent.layer.alert("上传失败,请重新上传");
                            	}
                            	
                            },
                            error: function () {
                            	parent.layer.msg('网络异常,请稍后再试');
                            }
                        });
                    	
                	}
                
                	
                
                })
                .bind('fileuploadprogressall', function (e, data) {
                	var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css('width', progress + '%');
                })
                .bind('fileuploadprocessalways', function (e, data) {

                });
    
	}
	
	//pre see img before uploading
	function preSeeImg(data){
		var file = data.files[0];
		if (file.preview) {
        	$(".img-pre div").html("");
        	$(".img-pre div").prepend(file.preview);
        }else{
        	var url = data.fileInput[0].value;
        	var imgStr="<img id='imgPre' src='"+url+"'  style='border: none;' />";
        	$(".img-pre div").html(imgStr);
        }
	}
	
	//hide all layers
	function hideUploadLayer(){
		parent.layer.isCancel='cancel';
		var index=parent.layer.getFrameIndex(window.name);
    	parent.layer.close(index);
	}
	
	
	AddSigService.prototype.hideUploadLayer=hideUploadLayer;
	
	return AddSigService;
	function getUrlByImg(file){
		var url;
    	if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
            url = file.value;
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
            url = window.URL.createObjectURL(file);
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
            url = window.URL.createObjectURL(file);
        }
    	return url;
	}
    //check the size of img in fileupload
    function checkImgSize(file,data){
    	var url;
    	var isRight=true;
    	if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
    		var url = data.fileInput[0].value;
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
            url = window.URL.createObjectURL(file);
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
            url = window.URL.createObjectURL(file);
        }
        var img=new Image();
        img.src=url;
        
        img.onload=function(data){
        	var flag = $("#typeFlag").val();
        	if(flag==="name"){
        		if(img.width>200||img.height>75){
                	$(".img-pre div").html("");
                	parent.layer.alert("请上传符合要求尺寸的签名")
                }else{
                	$("#submitInput").prop("disabled",false);
                }
        	}else{
        		if(img.width>200||img.height>200||img.width!==img.height){
                	$(".img-pre div").html("");
                	parent.layer.alert("请上传高宽相等，符合要求尺寸的签章。")
                }else{
                	$("#submitInput").prop("disabled",false);
                }
        	}
            
        }
    }
    
})
