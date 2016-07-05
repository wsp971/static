define(function() {
	//load the page
	var oldpwd = false;
	var newpwd = false;
	var check = function(selector) {
		if (selector!="curPwd") {
			if(!validator.executeExp(regexMap.compassword, $('#' + selector).val().trim())){
				if(selector=="newPwd"){
					$('#' + selector).parent().next().after('<span class="ml20 wrong">密码格式错误</span>')
				}else{
					$('#' + selector).parent().after('<p class="form-control-static wrong">密码格式错误</p>');
				}
			} else if (selector == 'newPwd') {
				$('#' + selector).parent().next().after('<p class="form-control-static ml20 right"> </p>');
			} else if (selector == 'conPwd') {
				if ($('#' + selector).val().trim() != $('#newPwd').val().trim()) {
					$('#' + selector).parent().after('<p class="form-control-static wrong">两次输入密码不一致</p>');
				} else {
					$('#' + selector).parent().after('<p class="form-control-static right bgp"> </p>')
					newpwd = true;
				}
			}
		} else if (selector == 'curPwd') {
			
			var userId=cookies.get('userId');
			var oldPassword=$('#curPwd').val().trim();
			var data='userId='+userId+'&oldPassword='+oldPassword;
			loadAjax({
				url:'/user/validatePwd',
				data : data,
                type : "post",
                contentType:"application/x-www-form-urlencoded",
				success:function(msg){
					if(msg&&msg.rtnCode==000){
						$('#' + selector).parent().after('<p class="form-control-static right bgp"> </p>');
						oldpwd=true;
					}else{
						$('#' + selector).parent().after('<p class="form-control-static wrong">当前密码错误</p>')
					}
				},
				error:function(){
					
				}
			})
				
		} 

	}
	
	function init(self){
		$('#cancelp').click(function(){
			location.href='agent_safety.html';
		})
		self.valiIsEmpty('curPwd',check);
		self.valiIsEmpty('newPwd',check);
		self.valiIsEmpty('conPwd',check);
		
		$('#submitp').click(function() {
			formVai();
			console.log('newpwd:' + newpwd);//test
			console.log('oldpwd:' + oldpwd);//test
			if (newpwd&&oldpwd) {
				var userId=cookies.get('userId');
				var oldPassword=$('#curPwd').val().trim();
				var password=$('#newPwd').val().trim();
				var confirmPassword=$('#conPwd').val().trim();
				var data='userId='+userId+'&oldPassword='+oldPassword+'&password='+password+'&confirmPassword='+confirmPassword;
				//ajax提交数据
				console.log(data);//test
				loadAjax({
					url:'/user/changePwd',
					data : data,
	                type : "post",
	                contentType:"application/x-www-form-urlencoded",
					success:function(msg){
						console.log(msg);//test
						if(msg&&msg.rtnCode==000){
								//密码修改成功
								success();
						}else{
							alert("密码修改失败");//test
							//密码修改失败
						}
					},
					error:function(){
						error();
					}
				}) 
				
			}

		});
	}
	
	function formVai(){
		if(!$('#newPwd').parent().next().next().length>0){
			$('#newPwd').blur();
		}
		if(!$('#curPwd').parent().next().length>0){
			$('#curPwd').blur();
		}
		
		if(!$('#conPwd').parent().next().length>0){
			$('#conPwd').blur();
		}
	}
	
	function success(){
		parent.layer.open({
			  type: 2,
		 	  title: ['提示', 'background:#efefef;'],
			  shadeClose: true,
			  shade: 0.5,
			  area: ['200px;', '150px'],
			  content: '/page/lobby/account/agnet/agent_safety_pwd_success.html',
			  time:3000,
			  end:function(){
				  window.location.href='/page/lobby/account/agnet/agent_safety.html';
			  }
		}); 
	}
	function error(){
		parent.layer.msg('网络繁忙,请重试',{
			offset:['18%','40%']
		});
	}
	init.prototype.error = error;
	init.prototype.success = success;
	return init;
})
