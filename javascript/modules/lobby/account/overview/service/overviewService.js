define(function() {
	function init(){
		showQkl();
		getInfo();
		closeQkl();
		getProductChart('#productChart');
		getInvestChart('#investChart');
		getInvest();
		getProduct();
		
	} 
	function showQkl(){
		var userCode=cookies.get('username');
		var data='userCode='+userCode;
		$('#qkl-close').click(function(){
			loadAjax({
				url:'/contract/countContSid/byuser/query',
				type:'post',
				data:data,
				contentType:"application/x-www-form-urlencoded",
				success:function(msg){
					if(msg&&msg.rtnCode==000){
						var qkl=msg.data;
						$('#statis').text(qkl.StatisData);
						$('#userStatis').text(qkl.StatisDataByUser);
						$('#qkl-close').hide();
						$('#qkl-open').show();
					}else{
						layer.msg('网络错误,请稍后再试');
					}
				},
				error:function(){
					layer.msg('网络错误,请稍后再试');
				}
			})
			
		});
		
	}
	function closeQkl(){
		$('#qkl-toclose').click(function(){
			$('#qkl-open').hide();
			$('#qkl-close').show();
		})
	}
	function getInvest(){
		var username=cookies.get('username');
		var instId=cookies.get('instId');
		
		var data={"nopage":"0","pageSize":"5","pageNo":"1","sortAttribute":"","sortType":"","firmAccount":instId,"operator":username};
		loadAjax({
			url:'/trade/investor/order/list',
			type:'post',
			data:JSON.stringify(data),
			dataType:'json',
			contentType:"application/json",
			success:function(msg){
				if(msg&&msg.rtnCode==000){
					$('#investRCome').hide();
					var invests=msg.data.rows;
					if(msg.data.total==0){
						$('#investData').show();
						$('#investRNone').show();
					}else{
						$('#investData').show();
						$('#investTable').siblings().hide();
						$('#investList').show();
						$('#investTable').show();
						$('#investMore').show();
						var context='';
						for(var i in invests){

						var invest=invests[i];
						context+='<tr>';
						context+='<td>'+(invest.productName||'-')+'</td>';
						context+='<td>'+(invest.valueDate && new Date(invest.valueDate).format("yyyy-MM-dd")||'-')+'</td>';
						context+='<td>'+(invest.orderAmount&&(invest.orderAmount/10000).toString().formatMoney()||'-')+'</td>';
						context+='</tr>';
						}

						$('#investlist').after(context)
					}
				}else{
					$('#investRCome').hide();
					$('#investData').show();
					$('#investRFail').siblings().hide();
					$('#investRFail').show();
				}
			},
			error:function(){
				$('#investRCome').hide();
				$('#investData').show();
				$('#investRFail').siblings().hide();
				$('#investRFail').show();
			}
		})
	}
	function getProduct(){
		var username=cookies.get('username');
		var data={"nopage":"0","pageSize":"5","pageNo":"1","sortAttribute":"","sortType":"","publisherMemberID":username,productType: ["1", "2", "3", "4", "5"]};
		loadAjax({
			url:'/product/getProductList',
			type:'post',
			data:JSON.stringify(data),
			dataType:'json',
			contentType:"application/json",
			success:function(msg){
				if(msg&&msg.rtnCode==000){
					$('#productCome').hide();
					var products=msg.data.rows;
					if(msg.data.total==0){
						$('#productData').hide();
						$('#productNone').show();
					}else{
						$('#productData').show();
						$('#productRFail').hide();
//						$('#productList').show();
						$('#productTable').show();
						$('#productMore').show();
						var context='';
						for(var i in products){
							var product=products[i];
							context+='<tr>';
							context+='<td>'+(product.productName||'-')+'</td>';
							context+='<td>'+(product.productPhaseText||'-')+'</td>';
							context+='<td>'+(product.publishAmount&&(product.publishAmount/10000).toString().formatMoney()||'-')+'</td>';
							context+='</tr>';
						}
						$('#productlist').after(context)
					}
				}else{
					$('#productRFail').siblings().hide();
					$('#productRFail').show();
				}
			},
			error:function(){
				$('#productRFail').siblings().hide();
				$('#productRFail').show();
			}
		})
	}
	function getInfo(){
		var username=cookies.get('username');
		$('#username').text(username);
		var data='username='+username;
		loadAjax({
			url : "/user/queryByUserName",
            data:data,
            type : "post",
            contentType:"application/x-www-form-urlencoded",
			success:function(msg){
				if(msg&&msg.rtnCode==000){
					var info=msg.data;
					$('#username').text(cookies.get('username'));
					$('#lastlogin').text(info.lastLoginTime);// 有用字段
					var instId=cookies.get('instId');
					$('#company').text(info.instName);
					var mobile=info.mobile;
					var ogarnHref=$('#toOrgan').attr('href');
					$('#toOrgan').attr('href',ogarnHref+'?instId='+instId+'&mobile='+(mobile||'-')+'&email='+info.email)
				}
			},
			error:function(){
				
			}
		})
	}
	
	function charts(selector,data){
		$(selector).highcharts({
	        chart: {
	            type: 'column',
  	            height:250,
 	            marginRight:20,
 	            marginTop:20,
	        },
	        title: {
	            text: ''
	        },
	        xAxis: {
	        	lineColor:'#ccc',
	        	lineWidth:1.3,
	        	tickLength : 0,
	            labels:{ 
	            	enabled: false
	            },
	            categories: ['', '' ,''],
	          
	        },
	        yAxis: {
	            title: {
	                text: ''
	            },
	            labels:{ 
	            	enabled: false
	            } ,
	            gridLineWidth: 0

	        },
	        labels:{
	        	items:[{
	        		html:'单位：万元',
	        		style:{
	        			left:'20px',
	        			top:'10px',
	        			color:'#999',
	        			cursor:'default'
	        		}
	        		
	        	}]
	        },
	        legend: {
	            enabled: true,
	            layout:'vertical',
	            verticalAlign:'top',
	            align:'right',
	            symbolRadius:10,
	            symbolWidth:8,
	            symbolHeight:8,
	            itemMarginTop:10,
	            floating:true,
	            y:10,
	            itemStyle:{
	            	color:'#999',
	            	fontWeight:'100'
	            },
	            itemHoverStyle:{
	            	color:'#999',
	            	cursor:'default'
	            }
	        }, 
	        plotOptions: {
	            series: {
	                borderWidth: 0,
	                dataLabels: {
	                    enabled: true,
	                    format: '{point.y:.2f}'
	                },
		            events: {
		                legendItemClick: function(e) {
		                    return false; //可禁用图例点击事件
		                }
		            }
	            },
	            column:{
	            	pointPadding:0.2,
	            	minPointLength: 1,
	            	pointWidth: 60
	            }
	        },
	        colors: [
	                 '#cba487',
	                 '#87cb9a',
	                 '#7cb4d9'
	    	],
	        tooltip: {
	        	enabled : false
	        },
	        credits:{
	        	enabled:false
	        },
	        series: data

	    });
	}
	function getInvestChart(selector){
		var username=cookies.get('username');
		var instId=cookies.get('instId');
		var data={
			    "operator": username,
			    "firmAccount": instId
			}
		loadAjax({
			url:'/trade/position/statistics',
			type:'post',
			data: JSON.stringify(data),
			dataType:'json',
			contentType:"application/json",
			success:function(msg){			
				if(msg&&msg.rtnCode==000){
					$('#investLCome').hide();
					$(selector).show();
					$(selector).siblings().hide();
					var data=msg.data;
					if(data.length==0){
						$('#investLCome').hide();
						$('#investData').show();
						$('#investLNone').show();
						$('#investChart').hide();
					}else{
						charts(selector,formartData(data));
						$('#investData').show();
						$('#investChart').show();
					}			
				}else{
					$('#investLCome').hide();
					$('#investData').show();
					$("#investLFail").show();
					$("#investLFail").siblings().hide();
				}
			},
			error:function(){
				$('#investLCome').hide();
				$('#investData').show();
				$("#investLFail").show();
				$("#investLFail").siblings().hide();
			}
		})
	}
	
	function getProductChart(selector){
		var data={
//				"productStatus":["2","6","7"],
				"publisherMemberID":cookies.get('username'),
				"queryCountField":"publishAmount"
			}
		loadAjax({
			url:'/product/getCountProduct',
			type:'post',
			data: JSON.stringify(data),
			dataType:'json',
			contentType:"application/json",
			success:function(msg){
				$('#productCome').hide();
				if(msg&&msg.rtnCode==000){
					$(selector).siblings().hide();
					$(selector).show();
					var data=msg.data.rows;
					var total=msg.data.total;
					if(total&&total==0){
						$('#productNone').show();
						$('#productData').hide();
					}else{
						charts(selector,formartProduct(data));
						$('#productData').show();
						$('#productChart').show();
					}
				}else{
					$("#productLFail").siblings().hide();
					$("#productLFail").show();
				}
			},
			error:function(){
				$("#productLFail").siblings().hide();
				$("#productLFail").show();
			}
		})
	}
	function formartData(data){
		var chartdata=[];
		for(var i in data){
			var chart={
					"name": data[i].PRODUCTTYPE,
				    "data": [(data[i].TOTALAMOUNT/10000)]
			}
			chartdata.push(chart)
		}
		return chartdata;
	}
	//只显示信托
	function formartProduct(data){
		var chartdata=[];
		for(var i in data){
			if(data[i].productType==3){
				var chart={
					"name": "信托",
					"data": [(data[i].sumAmount/10000)]
				}
				chartdata.push(chart);
			}
		}
		var chart2={
				"name": "基金",
				"data": [0]
			}
		var chart3={
				"name": "交易资产",
				"data": [0]
		}
		chartdata.push(chart2);
		chartdata.push(chart3);
		return chartdata;
	}
	//全部显示
//	function formartProduct(data){
//		var chartdata=[];
//		for(var i in data){
//			var productType=Number(data[i].productType);
//			switch(productType){
////				case 2:
////					productType="基金";
////					break;
//				case 3:
//					productType="信托";
//					break;
////				case 6:
////					productType="交易资产";
////					break;
//			}
//			var chart={
//					"name": productType,
//				    "data": [(data[i].sumAmount/10000)]
//			}
//			chartdata.push(chart);
//		}
//		return chartdata;
//	}
	return init;
})
