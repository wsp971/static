define(function() {

    function uploadService(){
    }
    function uploadFile(event) {
        //var i = $(event.target).parents('tr').find('td').eq(0).text().trim();
        $(event.target).parents('tr').find('td').eq(0).html('<div id="progress"><div class="bar" style="width: 0%;"></div></div>');
        $(event.target).fileupload(
            {
                url : "/file/upload",
                type : "POST",
                dataType : "text",
                autoUpload : false,
                acceptFileTypes : /(\.|\/)(pdf)$/i,
                maxFileSize : "5000000",
                processalways: function(e, data) {
                    if(data.files[0].error == 'File type not allowed'){
                        parent.layer.msg('文件格式不符合');
                        return false;
                    }
                    if(data.files[0].error == 'File is too large'){
                        parent.layer.msg('文件太大');
                        return false;
                    }
                    data.submit();
                },
                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .bar').css(
                        'width',
                        progress + '%'
                    )
                },
                done : function(e, data) {
                    if (data.result != null && data.result != '') {
                        var res = JSON.parse(data.result);
                        if(res.rtnCode == "000"){
                            $("#file").val(res.data);//uuid
                            $("#fileName").html(data.files[0].name);//上传文件名
                            $("#upbtn").text("重新上传");
                        }else {
                            parent.layer.msg("文件上传失败");
                        }
                    } else {
                        parent.layer.msg("文件上传失败");
                    }

                },
                fail : function(e, data) {
                    console.log("上传失败：" + data.errorThrown);
                }
            }).prop('disabled', !$.support.fileInput).parent()
            .addClass($.support.fileInput ? undefined : 'disabled');
    }
    uploadService.prototype.uploadFile = uploadFile;
    return uploadService;
})