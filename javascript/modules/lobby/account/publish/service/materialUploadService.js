define([ 'common/uploadFileService' ], function(UploadFileService) {
	function PublishUploadService(firstname) {
		UploadFileService.call(this);
	}
	PublishUploadService.prototype = new UploadFileService();
	PublishUploadService.prototype.fastUploadFile = function(callback) {
		this.uploadFile({
			ele:$('#fastUploadFile'),
			ulEle:$('#contractFiles-fast'),
			url:'/product/parseExcel',
			fileType:/(\.|\/)(xlsx)$/i,
			success: function(res){
				var data = JSON.parse(res.result).data;
				$("input[type=radio]").each(function(index,element){
					var name= $(element).attr("name");
					data[name] == "是" && $(element).val()=="yes" && !$(element).attr("checked") && $(element).trigger("change");
					data[name] == "成立期" && $(element).val()=="3" && !$(element).attr("checked") && $(element).trigger("change");
				});
				$(".data-common").each(function(index, element){
					var id = $(element).attr("id"), value;
					if($(element).is('select')){
						var filter = "#" + id + " option:contains('"+data[id]+"')";
						value = $(filter).val();
					} else {
						value = data[id];
					}						
					id && data[id] && $(element).val(value);
				});
				$.isFunction(callback) && callback();
			}
		});
	};
	
	PublishUploadService.settings = {
		events : {
			"click #fileupload1" : "contractUpload",
			"click #fileupload2" : "protocolUpload",
			"click #fileupload3" : "otherUpload",
			"click #fileupload4" : "transferUpload",
			"click #fileupload5" : "specification",
			"click #readAnno" : "readAnnot",
			"click #offline" : "setRelatedCheck",
			"click #openAnno" : "readAnnot"
		},
		handlers : {
			// 标准发布上传文件
			contractUpload : function() {
				this.ufs.uploadFile({
					ele : $('#fileupload1'),
					fileType : /(\.|\/)(doc|docx)$/i,
					ulEle : $('#contractFiles')
				});
			},
			protocolUpload : function() {
				this.ufs.uploadFile({
					ele : $('#fileupload2'),
					fileType : /(\.|\/)(doc|docx)$/i,
					ulEle : $('#protocolFiles')
				});
			},
			otherUpload : function() {
				this.ufs.uploadFile({
					ele : $('#fileupload3'),
					fileType : /(\.|\/)(doc|docx)$/i,
					ulEle : $('#otherFiles')
				});
			},
			transferUpload : function() {
				this.ufs.uploadFile({
					ele : $('#fileupload4'),
					fileType : /(\.|\/)(doc|docx)$/i,
					ulEle : $('#transferContractFiles')
				});
			},
			specification : function() {
				this.ufs.uploadFile({
					ele : $('#fileupload5'),
					fileType : /(\.|\/)(pdf)$/i,
					ulEle : $('#specification')
				});
			},
			readAnnot : function(e){
				!$("#readAnno").prop("checked") && (e.target.id == "openAnno") && $("#readAnno").prop("checked",true);
				if($("#readAnno").prop("checked")){
					layer.open({
	                    type: 2,
	                    title: false,
	                    shade: [0.8, '#393D49'],
	                    area: ['550px;', '450px'],
	                    content: '../../../page/lobby/account/publish/onlineStatement.html'
	                });
				}
			},
			setRelatedCheck : function(){
				$("#readAnno").attr("checked", false);
			}
		}
	}
	return PublishUploadService;
})
