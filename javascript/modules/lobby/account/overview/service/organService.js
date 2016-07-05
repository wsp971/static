define(function() {
	function init(){
		var instId=utils.getParameter('instId');
		getAccount(instId);
		getOrgan(instId);
		changeEmail();
	}
	function getAccount(instId){
		var username=cookies.get('username');
		var mobile=utils.getParameter('mobile');
		$('#username').text(username);
		var email=utils.getParameter('email');
		var at=email.lastIndexOf('@');
		email=email.slice(0,2)+'***'+email.slice(at)
		$('#email').text(email);
		var type=cookies.get('userType');
		if(type==2){
			$('#userType').text('后台管理员');
		}else if(type==1){
			$('#userType').text('高级用户');
		}else{
			$('#userType').text('普通用户');
		}
		if(mobile!="-"){
			mobile=mobile.slice(0,3)+'****'+mobile.slice(7);
		}
		$('#mobile').text(mobile);
	};
	function getOrgan(instId){
		loadAjax({
			url : "/user/upgradeQueryInfo",
            data:"instId="+instId,
            type : "post",
            contentType:"application/x-www-form-urlencoded",
			success:function(msg){
				if(msg&&msg.rtnCode==000){
					var info=msg.data;
					$('#instName').text(info.instName);
					
	                 var institutionType=info.institutionType;
	                 if(institutionType=='GY'){
	                	 $('#institutionType').text('国有银行');
	                 }else if(institutionType=='GF'){
	                	 $('#institutionType').text('股份制银行');
	                 }else if(institutionType=='NSH'){
	                	 $('#institutionType').text('农商行');
	                 }else if(institutionType=='CSH'){
	                	 $('#institutionType').text('城商行');
	                 }else if(institutionType=='XYS'){
	                	 $('#institutionType').text('信用合作社');
	                 }else if(institutionType=='ZQ'){
	                	 $('#institutionType').text('证券公司');
	                 }else if(institutionType=='JJ1'){
	                	 $('#institutionType').text('基金公司');
	                 }else if(institutionType=='JJ2'){
	                	 $('#institutionType').text('经纪公司');
	                 }else if(institutionType=='XT'){
	                	 $('#institutionType').text('信托公司');
	                 }else if(institutionType=='QT'){
	                	 $('#institutionType').text('其他');
	                 }
					
					var orgCertType=info.orgCertType;
					if(orgCertType==0){
						$('#orgCertType').text("企业三证");
						$('#busiLicence').text(info.busiLicence);
						$('#orgNo').text(info.orgNo);
						$('#taxCertNo').text(info.taxCertNo);
						$('#orgNo1').show();
						$('#taxCertNo1').show();
					}else if(orgCertType==1){
						$('#orgCertType').text('三证合一');
						$('#busiLicence').text(info.busiLicence);
					}
					$('#orgAddress').text(info.orgAddress);
					$('#legalName').text(info.legalName);
					var legalCertType=info.legalCertType;
					if(legalCertType==1){
						$('#legalCertType').text('身份证');
					}else if(legalCertType==2){
						$('#legalCertType').text('护照');
					}
					$('#legalCertNo').text(info.legalCertNo);
				}
			},
			error:function(){
				
			}
		});
		loadAjax({
			url : "/user/upgradeQueryFile",
            data:"instId="+instId,
            type : "post",
            contentType:"application/x-www-form-urlencoded",
			success:function(msg){
				if(msg&&msg.rtnCode==000){
					var info=msg.data;
					var len=0;
					for(var i in info){
						len++;
						if(info['fileName'+(len)]&&info['fileUuid'+(len)]){
							if(len==5){
								var filename=info['fileName'+(len)];
								filename=encodeURI(filename);
								$('#oragnfile1').append('<a class="imgs" style="border:1px solid gray;padding-left: 10px;padding-top: 60px;height:138px;width:184px;vertical-align: middle;" href="/file/innerDownload?filename='+filename+'&uuid='+info['fileUuid'+(len)]+'">法人代表授权委托书(点击下载)</a>');
							}else{
								$('#oragnfile1').append('<img class="imgs" id="file1" src="/file/innerDownload?filename='+info['fileName'+(len)]+'&uuid='+info['fileUuid'+(len)]+'" alt="" width="184px" height="138px"/>')
							}
						}
					}
				}
			},
			error:function(){
				
			}
		})
	}
	function changeEmail(){
		$('#changeEmail').click(function(){
			tab.link("myaccount","acc-agent_safety","account/agnet/agent_safety_change_email.html");
		})
	}
	return init;
})
