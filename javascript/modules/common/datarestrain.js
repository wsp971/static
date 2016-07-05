define(['jquery'], function($) {
	var floatSetting = {"2":/^(\-)*(\d+)\.(\d\d).*$/, "4":/^(\-)*(\d+)\.(\d\d\d\d).*$/};
	
	$.fn.bindRestrain = function () {
		var $container = $(this);
        $container.find('.noSpecial').each(function(index, element) {
            $(element).bind("keyup", DataRestrain.noSpecialChar);
            $(element).bind("afterpaste", DataRestrain.noSpecialChar);
        });
        $container.find('.numOnly').each(function(index, element) {
            $(element).bind("keyup", DataRestrain.numOnly);
            $(element).bind("afterpaste", DataRestrain.numOnly);
        });
        $container.find('.amountFloat').each(function(index, element) {
            $(element).bind("keyup", DataRestrain.amountFloat);
            $(element).bind("afterpaste", DataRestrain.amountFloat);
        });
        $container.find('.rateFloat').each(function(index, element) {
            $(element).bind("keyup", DataRestrain.rateFloat);
            $(element).bind("afterpaste", DataRestrain.rateFloat);
        });
        $container.find('.intOnly').each(function(index, element) {
            $(element).bind("keyup", DataRestrain.intOnly);
            $(element).bind("afterpaste", DataRestrain.intOnly);
        });
    };
	
    function cleanNoNum(obj){
		if(obj) {
			obj.value = obj.value.replace(/[^\d.]/g,"");
			obj.value = obj.value.replace(/^\./g,""); 
			obj.value = obj.value.replace(/\.{2,}/g,".");
			obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
		}
	}
	
	function setFloat(obj, precision){
		obj && (obj.value = obj.value.replace(floatSetting[precision],'$1$2.$3'));
	}
    
	var DataRestrain = {
		noSpecialChar : function(){
			this && (this.value = this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, ''));
		},	
		intOnly : function(){
			this && ((this.value.length==1)?(this.value=this.value.replace(/[^1-9]/g,'')):(this.value=this.value.replace(/\D/g,'')));
		},
		numOnly : function(){
			this && cleanNoNum(this);
		},
		amountFloat : function(){
			this && cleanNoNum(this) || setFloat(this, 2);
		},
		rateFloat : function(){
			this && cleanNoNum(this) || setFloat(this, 4);
		}
	}
})