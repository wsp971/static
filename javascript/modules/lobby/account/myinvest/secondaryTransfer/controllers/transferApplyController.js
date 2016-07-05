define([
    'jquery',
    'common/views',
    'common/autocompleter'
], function ($, view) {
    var layer = layer ? layer : (parent.layer ? parent.layer : parent.parent.layer);
    return new view.extend({
        values: {
            transferPrice: 0, // 转让价格
            transferRate: 0,  // 转让利率
            holdAmount: 0,    // 转让份额
            holdDays: 0,      // 持有天数
            yield: 0,        // 原产品收益率
            remainingDays: 0, // 剩余投资期限
            gotInterest: 0,    // 已收取利息
            transferValue1: 0, //价格
            transferValue2: 0  //利率
        },
        //初始化方法
        init: function () {

            $('.sysDate').html(new Date().format('yyyy年MM月dd日'));
            $('#transferInterest').html('0元');
            this.setProductInfo();
            this.setPositionInfo();
            this.loadDropList();
            this.initSuggest();
        },
        events: {
            'click input[name="transferType"]': 'typeChange',
            'click input[name="pushType"]': 'pushChange',
            'keyup #transferValue': 'valueKeyUp',
            'click #btnApply': 'btnApplyClick',
            'blur #transferValue': 'inputOnBlur',
            'blur #bankAccountName': 'inputOnBlur',
            'blur #depositBank': 'inputOnBlur',
            'blur #bankAccountId': 'inputOnBlur',
            'focus #transferValue': 'inputOnFocus',
            'focus #bankAccountName': 'inputOnFocus',
            'focus #depositBank': 'inputOnFocus',
            'focus #bankAccountId': 'inputOnFocus'
        },
        handlers: {
            typeChange: function (e) {
                var $ele = $(e.target);
                $ele.attr('checked', 'checked');
                if ($ele.attr('id') == 'byRate' && ($ele.attr('checked') == true || $ele.attr('checked') == 'checked')) {
                    $('#unit').html('%');
                    $('#textCal').html('计算后转让价格');
                    $('#unitCal').html('元');
                    $('#transferValue').val('');
                    $('#afterCal').val('');
                    var errorElement = $('#transferValue').parent().parent().find('.error');
                    errorElement.html('<i class="iconfont red">&#xe60e;</i>请输入转让利率');

                } else if ($ele.attr('id') == 'byPrice' && ($ele.attr('checked') == true || $ele.attr('checked') == 'checked')) {
                    $('#unit').html('元');
                    $('#textCal').html('计算后转让利率');
                    $('#unitCal').html('%');
                    $('#transferValue').val('');
                    $('#afterCal').val('');
                    var errorElement = $('#transferValue').parent().parent().find('.error');
                    errorElement.html('<i class="iconfont red">&#xe60e;</i>请输入转让价格');
                }
            },
            pushChange: function (e) {
                var $ele = $(e.target);
                $ele.attr('checked', 'checked');
                if ($ele.attr('id') == 'publicPush' && ($ele.attr('checked') == true || $ele.attr('checked') == 'checked')) {
                    $('.assignInfo').hide();
                } else if ($ele.attr('id') == 'privatePush' && ($ele.attr('checked') == true || $ele.attr('checked') == 'checked')) {
                    $('.assignInfo').show();
                }
            },
            valueKeyUp: function (e) {
                var $ele = $(e.target);
                $ele.val($ele.val().replace(/[^\d.]/g, ''));
                var input = $ele.val();
                if (input.length == 0) {
                    $("#afterCal").val('');
                } else {
                    input = parseFloat(input);
                    var cal;
                    if ($('input[name="transferType"]:checked').attr('id') == 'byPrice') {
                        cal = (input + this.values.gotInterest - this.values.holdAmount) * 365 * 100 /
                            (this.values.holdAmount * this.values.holdDays);
                        this.values.transferValue1 = input.toFixed(2).toString();
                        this.values.transferValue2 = (cal / 100).toFixed(6).toString();
                        if (!isNaN(cal)) {
                            $("#afterCal").val(cal.toFixed(2));
                        }
                    } else if ($('input[name="transferType"]:checked').attr('id') == 'byRate') {
                        cal = this.values.holdAmount +
                            this.values.holdAmount * input / 100 * this.values.holdDays / 365
                            - this.values.gotInterest;
                        this.values.transferValue1 = cal.toFixed(2).toString();
                        this.values.transferValue2 = (input / 100).toFixed(6).toString();
                        if (!isNaN(cal)) {
                            $("#afterCal").val(cal.toString().formatMoney(2));
                        }
                    }
                }
            },
            btnApplyClick: function () {

                $('#transferValue').blur();
                $('#bankAccountName').blur();
                $('#depositBank').blur();
                $('#bankAccountId').blur();
                var errors = $('.form-error:visible');
                if (errors.length > 0) {
                    return;
                }
                var params = {
                	positionId: utils.getQueryString('positionId') || '', //传递给backend 发布成功翻转订单状体
                	productType: '6',   // 交易资产
                    originProductNum: utils.getQueryString('productNum'),
                    createBy: cookies.get('username') || '',
                    productTypeLV2: '6003', //受益权/收益权
                    transferAccountName: $('#bankAccountName').val(),
                    transferBank: 'c_open_account_bank_' + $('#depositBank').val(),
                    transferBankAccount: $('#bankAccountId').val(),
                    publisherOrgID: cookies.get('instId') || '',      //机构ID
                    publisherMemberID: cookies.get('username') || ''  //登录人名称
                };

                if ($('input[name="transferType"]:checked').attr('id') == 'byPrice') {
                    params['transferMode'] = 'c_transfer_mode_2';
                    params['transferPrice'] = this.values.transferValue1;
                    params['transferRate'] = this.values.transferValue2;
                } else if ($('input[name="transferType"]:checked').attr('id') == 'byRate') {
                    params['transferMode'] = 'c_transfer_mode_1';
                    params['transferRate'] = this.values.transferValue2;
                    params['transferPrice'] = this.values.transferValue1;
                }

                if ($('input[name="pushType"]:checked').attr('id') == 'privatePush') {
                    params['pushSetting'] = 'c_push_setting_1';
                    params['assignedMembers'] = '';
                    var members = [];
                    $('#selectedTags').find($('a')).each(function (index, element) {
                        members.push($(element).attr('data-id'));
                    });
                    params['assignedMembers'] = members.join();
                } else if ($('input[name="pushType"]:checked').attr('id') == 'publicPush') {
                    params['pushSetting'] = 'c_push_setting_2';
                }
                loadAjax({
                    url: '/product/secondaryRelease',
                    data: JSON.stringify(params),
                    type: 'POST',
                    dataType: 'json',
                    isLoading:true,
                    contentType: 'application/json',
                    success: function (result) {
                        if (result.rtnCode == '000') {
                            location.href = 'resultInfo.html?status=1&productNum=' + utils.getQueryString('productNum');
                        } else {
                            console.info(result);
                            layer.alert(result.rtnMsg);
                        }
                    }
                });
            },
            inputOnBlur: function (e) {
                var errorElement = $(e.currentTarget).parent().parent().find('.form-error');
                if (errorElement.length == 0) {
                    return;
                }
                var inputValue = $(e.currentTarget).val();
                if (inputValue.length == 0) {
                    errorElement.show();
                } else {
                    errorElement.hide();
                }
            },
            inputOnFocus: function (e) {
                var errorElement = $(e.currentTarget).parent().parent().find('.form-error');
                if (errorElement.length == 0) {
                    return;
                }
                errorElement.hide();
            }
        },
        setProductInfo: function () {
            var _this = this;
            var productNum = utils.getQueryString('productNum');
            var data = {'productNum': productNum};
            var now = new Date();
            loadAjax({
                url: '/product/queryProductDetail',
                data: JSON.stringify(data),
                type: 'POST',
                dataType: 'json',
                isLoading:true,
                contentType: 'application/json',
                success: function (result) {
                    if (!result || result.rtnCode != "000" || !result.data) {
                        console.info('queryProductDetail failed');
                        console.info(result);
                    } else {
                        var data = result.data;
                        $('table tr:eq(0) td:eq(1)').html(data.productName);
                        $('table tr:eq(0) td:eq(3)').html(data.productTypeLV2Text);
                        $('table tr:eq(1) td:eq(1)').html(data.valueDate && data.valueDate.formatDate('yyyy年MM月dd日'));
                        $('table tr:eq(1) td:eq(3)').html(data.maturityDate && data.maturityDate.formatDate('yyyy年MM月dd日'));
                        $('table tr:eq(2) td:eq(1)').html(data.maturityDate && now.diff(new Date(data.maturityDate.replace('-', '/'))) + '天');
                        $('table tr:eq(2) td:eq(3)').html(data.publishAmount && data.publishAmount.formatMoney(2));
                        $('table tr:eq(3) td:eq(1)').html('年化' + data.expRtnRate + '%');
                        $('table tr:eq(3) td:eq(3)').html(data.interestStandardText);

                        $('#productName').html(data.productName);
                        $("#realRate").val(data.expRtnRate);

                        // KEEP DATA
                        _this.values.yield = +data.expRtnRate;
                        _this.values.holdDays = data.valueDate && now.diff(new Date(data.valueDate)) + 1;
                        _this.values.remainingDays = data.maturityDate && now.diff(new Date(data.maturityDate));

                    }
                }
            });
        },
        setPositionInfo: function () {
            var _this = this;
            var positionId = utils.getQueryString('positionId');
            var data = {'positionId': positionId};
            loadAjax({
                url: '/trade/position/query',
                data: JSON.stringify(data),
                type: 'POST',
                dataType: 'json',
                isLoading:true,
                contentType: 'application/json',
                success: function (result) {
                    if (!result || result.rtnCode != '000' || !result.data) {
                        console.info('queryPosition failed');
                        console.info(result);
                    } else {
                        var data = result.data;
                        $('#transferPrice').html(data.totalAmount && data.totalAmount.toString().formatMoney(2) + '元');
                        // KEEP DATA
                        //_this.values.gotInterst = data.accumlatedIncome;
                        _this.values.holdAmount = data.totalAmount;

                    }
                }
            });
        },
        initSuggest: function () {
            var suggOptions = {
                url: '/product/queryInstByNameLike?instName='
            };
            $('#autocomplete').ficSuggest(suggOptions);
        },
        loadDropList: function () {
            var params = {
                dictCategoryCode: 'BANK_CODE'
            };
            loadAjax({
                url: '/trade/dict/list',
                data: JSON.stringify(params),
                type: 'POST',
                dataType: 'json',
                isLoading:true,
                contentType: 'application/json',
                success: function (result) {
                    if (!result || result.rtnCode != "000" || !result.data) {
                        console.info('loadDropList failed');
                    } else {
                        var list = result.data;
                        var categoryOptions = [];
                        $.each(list, function (index, ele) {
                            categoryOptions.push('<option value="' + list[index].dictCode + '">'
                                + list[index].dictName + '</option>');
                        });
                        $('#depositBank').append(categoryOptions);
                    }
                }
            });
        }
    });
});




