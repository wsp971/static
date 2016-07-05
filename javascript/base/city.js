var citys = new Array(
    new Array("南京","徐州","连云港","淮安","盐城","扬州","南通","镇江","常州","无锡","苏州","泰州","宿迁","昆山","其他"),
    new Array("东城区","西城区","崇文区","宣武区","朝阳区","丰台区","石景山区","海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","怀柔区","平谷区","其他"),
    new Array("和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区","大港区","东丽区","西青区","津南区","北辰区","武清区","宝坻区"),
    new Array("黄浦区","卢湾区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区","杨浦区","闵行区","宝山区","嘉定区","浦东新区","金山区","松江区","青浦区","南汇区","奉贤区"),
    new Array("万州区","涪陵区","渝中区","大渡口区","江北区","沙坪坝区","九龙坡区","南岸区","北碚区","万盛区","双桥区","渝北区","巴南区","黔江区","长寿区"),
    new Array("广州","深圳","珠海","汕头","韶关","河源","梅州","惠州","汕尾","东莞","中山","江门","佛山","阳江","湛江","茂名","肇庆","清远","潮州","揭阳","云浮","其他"),
    new Array("杭州","宁波","温州","嘉兴","绍兴","金华","衢州","舟山","台州","丽水","湖州","其他"),
    new Array("福州","厦门","三明","莆田","泉州","漳州","南平","宁德","龙岩","其他"),
    new Array("长沙","株洲","湘潭","衡阳","邵阳","岳阳","常德","张家界","娄底","郴州","永州","怀化","益阳","湘西","其他"),
    new Array("武汉","黄石","襄樊","十堰","宜昌","荆州","鄂州","孝感","黄冈","咸宁","荆门","随州","天门","仙桃","潜江","神农架","恩施","其他"),
    new Array("济南","青岛","淄博","枣庄","东营","潍坊","烟台","威海","济宁","泰安","日照","莱芜","德州","滨州","临沂","荷泽","聊城","其他"),
    new Array("沈阳","铁岭","抚顺","大连","本溪","营口","锦州","盘锦","辽阳","鞍山","丹东","朝阳","阜新","其他"),
    new Array("长春","吉林","通化","四平","辽源","白城","延边","白山","松原","其他"),
    new Array("昆明","曲靖","大理","玉溪","丽江","楚雄","迪庆","文山","昭通","保山","其他"),
    new Array("成都","宜宾","泸州","内江","攀枝花","德阳","雅安","遂宁","南充","绵阳","广元","华鉴","乐山","其他"),
    new Array("合肥","芜湖","马鞍山","蚌埠","铜陵","淮北","淮南","亳州","巢湖","黄山","宿州","阜阳","六安","滁州","池州","安庆","其他"),
    new Array("南昌","九江","鹰潭","宜春","新余","萍乡","赣州","吉安","抚州","上饶","其他"),
    new Array("哈尔滨","佳木斯","牡丹江","大庆","齐齐哈尔","绥化","伊春","鹤岗","七台河","双鸭山","鸡西","黑河","其他"),
    new Array("石家庄","邯郸","保定","张家口","秦皇岛","邢台","唐山","廊坊","衡水","沧州","承德","其他"),
    new Array("西安","咸阳","宝鸡","铜川","渭南","延安","汉中","榆林","其他"),
    new Array("海口","三亚","琼海","儋州","其他"),
    new Array("郑州","洛阳","开封","鹤壁","焦作","许昌","驻马店","周口","新乡","安阳","濮阳","信阳","平顶山","三门峡","南阳","商丘","其他"),
    new Array("太原","大同","忻州","临汾","运城","长治","阳泉","晋城","其他"),
    new Array("呼和浩特","赤峰","包头","乌兰察布","锡林浩特","通辽","其他"),
    new Array("南宁","桂林","北海","柳州","玉林","百色","河池","钦州","梧州","其他"),
    new Array("贵阳","遵义","铜仁","六盘水","铜仁","安顺","其他"),
    new Array("银川","固原","吴忠","石嘴山","其他"),
    new Array("西宁","海东","海北","玉树","其他"),
    new Array("乌鲁木齐","石河子","哈密","阿克苏","昌吉","伊犁","吐鲁番","喀什","和田","其他"),
    new Array("拉萨","那曲","其他"),
    new Array("兰州","酒泉","临夏","张掖","嘉峪关","金昌","平凉","白银","武威","天水","其他"),
    new Array("台湾"),
    new Array("香港"),
    new Array("澳门"),
    new Array("海外")
);

function scity(xf, cs){
	var province=['江苏省','北京','天津','上海','重庆','广东省','浙江省','福建省','湖南省','湖北省','山东省','辽宁省','吉林省','云南省','四川省','安徽省','江西省','黑龙江','河北省','陕西省','海南省','河南省','山西省','内蒙古','广西','贵州省','宁夏','青海省','新疆','西藏','甘肃省','台湾省','香港','澳门','国外'];



	//var pro=document.getElementById('pro');
	var selContent1 = "";
	selContent1+='<option value="">省份</option>';
	var a=0;
	for(var i=0; i<province.length; i++){
		if(typeof(xf)!="undefined"){
			if(province[i]==xf){
				var sel="selected";
				a=i;
			}else
				var sel="";
		}else{
			var sel="";
		}
		
		
		selContent1+='<option class="op1" '+sel+' value="'+province[i]+'">'+province[i]+'</option>';
	}
	



	$('#pro').append(selContent1);
	
	
	var selContent2='<option class="op2" value="">城市</option>';
	var city=document.getElementById('city');
	$('#city').append(selContent2);


	if(a > 0)
		selectc(document.getElementById("pro"), a, cs);
		
}


	function selectc(pobj, a, cs){
		if(typeof(a)!="undefined"){
			var index=a;
		}else{
			var index=pobj.selectedIndex-1;
		}
		var cobj=document.getElementById("city");
		cobj.innerHTML="";
		if(index >=0 ){
			for(var i=0; i<citys[index].length; i++){
				if(typeof(cs)!="undefined"){
					if(citys[index][i]==cs)
						var sel="selected";
					else
						var sel="";
				}

				var option=document.createElement("option");
				var text=citys[index][i];
				option.value=text;
				option.selected=sel;
				option.innerHTML=text;
				cobj.appendChild(option);	
			}
		}else{
				var option=document.createElement("option");
				option.value="";
				option.innerHTML="城市";
				cobj.appendChild(option);
		}
		if($('.uoj_listbox_city').val()==""){
			
			$('.uoj_listbox_city').css("color","#999")
			$('.uoj_listbox_classify').css("color","#999")
		}else{
			$('.uoj_listbox_city').css("color","#333")
			$('.uoj_listbox_classify').css("color","#333")
		}
		
		

	}
	
	scity()
	//下拉菜单选择默认为#333，其他为#999
	function _changestate(obj,info){
		if(obj.value==info){
			obj.style.color="#999"
		}else{
			obj.style.color="#333"
		}
	}
	
     $('.adress').focus(function(){
    	 $(this).css("color","#333")
     })

	
