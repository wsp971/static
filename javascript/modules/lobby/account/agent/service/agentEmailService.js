define(function() {
	var flag;
	
	var check = function(selector) {
		if(!validator.isEmail($('#'+selector).val().trim())){
			$('#'+selector).parent().after('<p class="form-control-static wrong">邮箱地址格式错误</p>')
		}else{
			if(selector=='curEmail'){//验证原邮箱地址是否正确
				
				var email=cookies.get('email');
				if(email==$('#'+selector).val().trim()){
					$('#newEmail').removeAttr("disabled");
					$('#'+selector).parent().after('<p class="form-control-static right"></p>')
				}else{
					$('#'+selector).parent().after('<p class="form-control-static wrong">原邮箱地址错误</p>')
				}
				
			}else if(selector=='newEmail'){
				if ($('#newEmail').val().trim() === $('#curEmail').val().trim()){
					$('#'+selector).parent().after('<p class="form-control-static wrong">原邮箱地址与当前重复</p>')
				} else {
					$('#submite').removeAttr("disabled");
					$('#'+selector).parent().after('<p class="form-control-static right"></p>')
					flag=true;
				}
			}
			
		}
	}
	
	function init(self){
		self.valiIsEmpty('curEmail',check);
		self.valiIsEmpty('newEmail',check);
		$('#submite').click(function() {
			var name=cookies.get('username');
			$('#username').text(name);
			
			var userId=cookies.get('userId');
			var newEmail=$('#newEmail').val().trim();
			var oldEmail=$('#curEmail').val().trim();
			

			var url=utils.getHost()+'/page/lobby/account/agnet/turn.html?'
				+"userId="+userId +"&email="+newEmail+"&oldEmail="+oldEmail+'&username='+name;
			$('#changeEmail').attr('href',url);
			var context=$('#emailContext').html();
			context=context.replace(/[\s]/g," ").replace(/&amp;/g,"&");
			var data ={
					userId:userId,
					username:name,
					email:newEmail,
					oldEmail:oldEmail,
					emailsubject:"邮箱验证",
					emailcontext:context							
			}
			if(flag){//执行发送邮件
					loadAjax({
						async: false,
                        url : "/email/sendEmailByLink",
                        data : JSON.stringify(data),
                        type : "post",
                        contentType:"application/json",
                        success:function(msg){
                        	if(msg&&msg.rtnCode==000){
                        		success();
                        	}
                        	
                        },
                        error:function(xhr, textStatus, errorThrown) {
                           error();
                        }
					})
				}
			})

	}
	function success(){
		parent.layer.open({
		  type: 1,
	 	  title: ['邮件已发送', ''],
		  shadeClose: true,
		  shade: 0.6,
		  area: ['350px;', '100px'],
		  content: '<div Style="margin:15px 5px;">如未收到邮件，请检查新邮箱是否输入正确，并重新点发送邮件</div>'
		}); 
	}
	function error(){
		parent.layer.msg('邮件发送失败',{
			offset:['18%','40%']
		});
	}
	init.prototype.success = success;
	init.prototype.success = error;
	return init;
})
