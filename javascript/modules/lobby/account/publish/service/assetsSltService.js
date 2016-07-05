define(function() {
	var assetsType = [
// [ "单期型", "开放型", "净值型" ],
			[ "暂不支持" ],
// [ "货币基金", "债券基金", "基金专户", "其他基金" ],
			[ "暂不支持" ],
			[ "集合资金信托计划", "单一资金信托计划" ],
// ["定向资产管理计划", "集合资产管理计划", "专项资产管理计划"],
			[ "暂不支持" ],
// [ "信贷资产证券化", "应收帐款证券化", "不动产证券化", "收益权资产证券化", "租赁资产证券化", "其他结构化资产" ],
			[ "暂不支持" ],
// [ "票据", "同业存款", "受益权/收益权", "券商收益凭证", "企业债", "金融债", "贵金属", "其他交易资产" ] ];
			[ "暂不支持" ]];

	function AssetsSelectorService() {

	}

	function initSelectors() {

		var categoryOptions = [ '<option value="">请选择</option>' ];
		var assetsCategory = [ '银行理财', '基金', '信托', '资管', '结构化资产', '交易资产' ];
		$('#productType').empty();
		$.each(assetsCategory, function(index, category) {
			(index == 2) &&categoryOptions.push('<option value="' + (index + 1) + '">'
					+ category + '</option');
		});

		$('#productType').append(categoryOptions);
	}

	AssetsSelectorService.prototype.initialize = function() {
		initSelectors();
	}

	AssetsSelectorService.prototype.categoryChanged = function() {
		var cateIndex = $('#productType').children('option:selected').val(), typeOptions;
		$('#productTypeLV2').empty();
		if (!cateIndex) {
			typeOptions = [ '<option value="">请先选择大类</option>' ];
		} else {
			cateIndex = cateIndex - 1;
			typeOptions = [ '<option value="">请选择</option>' ];
			$.each(assetsType[cateIndex], function(index, type) {
				var tmpLv2 = cateIndex === 2 ? (cateIndex + 1) * 1000 + index + 1 : "";
					
				typeOptions.push('<option value="'
						+ tmpLv2 + '">' + type
						+ '</option');
			});
		}
		$('#productTypeLV2').append(typeOptions);
	}
	
	AssetsSelectorService.prototype.provideTemplate = function(typeLv2) {
		(typeLv2 == "3001" || typeLv2 == "3002") ? ($("#trustsTemplate").removeClass("hidden"), $("#templateInfo").addClass("hidden")) : ($("#templateInfo").removeClass("hidden"), $("#trustsTemplate").addClass("hidden"));
		
	}
	
	AssetsSelectorService.prototype.retriveBankData = function(selectContainer, pt) {
        var paramData = {
            dictCategoryCode: "BANK_CODE",
            pt: pt
        }
        $.loadAjax({
            url: "/trade/dict/list",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(paramData),
            targets: [$(selectContainer)],
            isLoading: true,
            before : function(){
            	$("#refreshAccountBank").addClass("hidden");
            	$(selectContainer).empty();
            },
            success: function(res) {
                if (res.rtnCode == "000") {
                    res && res.data;
                    var categoryOptions = ['<option value="">请选择开户银行</option>'];
                    $.each(res.data, function(index, ele) {
                        categoryOptions.push('<option value="' + 'c_open_account_bank_' + res.data[index].dictCode + '">' + res.data[index].dictName + '</option>');
                    });
                    $(selectContainer).append(categoryOptions);
                } else {
                	$(selectContainer).append('<option value="">获取银行列表失败</option>')
                	$("#refreshAccountBank").removeClass("hidden");
                }
            },
            error: function(err) {
            	$(selectContainer).append('<option value="">获取银行列表失败</option>')
            	$("#refreshAccountBank").removeClass("hidden");
            },
            timeouthandler : function() {
            	$(selectContainer).append('<option value="">获取银行列表超时</option>')
            	$("#refreshAccountBank").removeClass("hidden");
            }
        });
    }

	return AssetsSelectorService;
})
