define([
    'jquery',
    'common/views',
    "jquery.ui.widget",
    "jquery_iframe_transport",
    "jquery.fileupload",
    "jquery.fileupload-process",
    "jquery.fileupload-validate"
], function ($, view, jquery_ui_widget, jquery_iframe_transport, fileupload, fileuploadProcess, fileuploadValidate) {
    var layer = layer ? layer : (parent.layer ? parent.layer : parent.parent.layer);
    return new view.extend({
        values: {
            publishAmount: 0,  // 转让份额
            holdDays: 0,      // 持有天数
            yield: 0,        // 原产品收益率
            remainingDays: 0, // 剩余投资期限
            gotInterest: 0,   // 已收取利息,
            payMoney: null    // 转让实付金额
        },
        //初始化方法
        init: function () {
            $('.sysDate').html(new Date().format('yyyy年MM月dd日'));
            this.setProductInfo();
            this.closeBefore();
            this.loadDropList();
        },
        events: {
            'click #btnBuy': 'btnBuyClick',
            'blur #bankAccountName': 'inputOnBlur',
            'blur #depositBank': 'inputOnBlur',
            'blur #bankAccountId': 'inputOnBlur',
            'focus #bankAccountName': 'inputOnFocus',
            'focus #depositBank': 'inputOnFocus',
            'focus #bankAccountId': 'inputOnFocus',
            'click .fileupload': 'fileuploadFiles'
        },
        handlers: {
            btnBuyClick: function () {

                $('#bankAccountName').blur();
                $('#depositBank').blur();
                $('#bankAccountId').blur();
                var errors = $('.form-error:visible');
                if (errors.length > 0) {
                    return;
                }
                var doc1list = [];
                $('.materials1 div').each(function (index, element) {
                    var doc = {};
                    doc.docPath = $(element).find('input').eq(0).val();
                    doc.docName = $(element).find('input').eq(1).val();
                    doc.docUse = '13'; //转让合同
                    doc.docType = 'PDF';
                    doc1list.push(doc);
                });
                if (doc1list.length == 0) {
                    layer.msg('需双方签署材料未上传');
                    return;
                }
                var doc2list = [];
                $('.materials2 div').each(function (index, element) {
                    var doc = {};
                    doc.docPath = $(element).find('input').eq(0).val();
                    doc.docName = $(element).find('input').eq(1).val();
                    doc.docUse = '10'; //转让合同
                    doc.docType = 'PDF';
                    doc2list.push(doc);
                });
                if (doc2list.length == 0) {
                    layer.msg('需投资方签署材料未上传');
                    return;
                }
                var params = {
                    oprCode: '024',
                    firmAccount: cookies.get('instId'),
                    productCode: utils.getQueryString('productNum'),
                    orderType: '04',
                    orderAmount: this.values.payMoney.toFixed(2),
                    orderShare: this.values.payMoney.toFixed(2),
                    price: '1',
                    tradeDate: new Date().getTime(),
                    operator: cookies.get('username'),
                    orderDocs: doc1list.concat(doc2list),
                    bankInfo: {
                        bankAcct: $('#bankAccountName').val(),
                        bankNum: $('#bankAccountId').val(),
                        bankCode: $('#depositBank').val(),
                        bankName: $('#depositBank').find('option:selected').text()
                    }
                };

                loadAjax({
                    url: '/trade/order/create',
                    data: JSON.stringify(params),
                    type: 'POST',
                    dataType: 'json',
                    isLoading: true,
                    contentType: 'application/json',
                    success: function (result) {
                        if (result.rtnCode == '000') {
                            location.href = 'resultInfo.html?status=2';
                        } else {
                            console.info(result.rtnMsg);
                            layer.alert(result.rtnMsg);
                        }
                    }
                });
            },
            inputOnBlur: function (e) {
                var errorElement = $(e.currentTarget).parent().find('.form-error');
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
            },
            fileuploadFiles: function (e) {
                var $num = $(e.target).parent().prev();
                var num = $num.val();
                $(e.target).parents('tr').find('td').eq(1).find('.progress').remove();
                $(e.currentTarget).fileupload({
                    url: '/file/upload',
                    type: 'POST',
                    dataType: 'text',
                    autoUpload: false,
                    acceptFileTypes: /(\.|\/)(pdf)$/i,
                    maxFileSize: 5 * Math.pow(1024, 2),
                    processalways: function (e, data) {
                        if (data.files[0].error == 'File type not allowed') {
                            layer.msg('文件格式不符合');
                            return false;
                        }
                        if (data.files[0].error == 'File is too large') {
                            layer.msg('文件太大了');
                            return false;
                        }
                        data.submit();
                    },
                    progressall: function (e, data) {
                        $(e.target).parents('tr').find('td').eq(1).append('<div class="progress"><div class="bar" style="width: 0%;"></div></div>');
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        $(e.target).parents('tr').find('td').eq(1).find('.progress .bar').css('width', progress + '%');
                    },
                    done: function (e, data) {
                        var num = $num.val();
                        $(e.target).parents('tr').find('td').eq(1).find('.progress').remove();
                        $(e.target).parents('tr').find('td').eq(1).append(
                            '<div><span style="float:left;" class="fileNames' + num + "\"></span>" +
                            '<i class="iconfont del" onclick="deleteFile(this)">&#xe60e;</i>' +
                            '<input type="hidden" class="fileDetail' + num + '" value="">' +
                            '<input type="hidden" class="fileName' + num + '" value=""></div>');
                        var $fileNames = $(e.target).parents('tr').find('td').eq(1).find('.fileNames' + num);
                        var $fileDetail = $(e.target).parents('tr').find('td').eq(1).find('.fileDetail' + num);
                        var $fileName = $(e.target).parents('tr').find('td').eq(1).find('.fileName' + num);
                        if (data.result != null && data.result != '') {
                            var res = JSON.parse(data.result);
                            if (res.rtnCode == '000') {
                                $fileDetail.val(res.data); //返回的id
                                $fileNames.text(data.files[0].name);
                                $fileName.val(data.files[0].name);
                                $(e.target).prev().text("继续上传");
                                num++;
                                $num.val(num);
                            } else {
                                $fileNames.parent('div').remove();
                                $(e.currentTarget).parents('tr').find('td').eq(1).append('<div id="fail">上传失败，请重新上传</div>');
                            }
                        } else {
                            $fileNames.parent('div').remove();
                            $('#fileupload').parents('tr').find('td').eq(1).append('<div id="fail">上传失败，请重新上传</div>');
                        }
                    },
                    fail: function (e, data) {
                        console.log("上传失败：" + data.errorThrown);
                        $(e.target).parents('tr').find('td').eq(1).find('.progress').remove();
                        var $fileNames = $(e.target).parents('tr').find('td').eq(1).find('.fileNames' + num);
                        $fileNames.text("上传失败，请重新上传");
                    }
                })
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
                isLoading: true,
                dataType: 'json',
                contentType: 'application/json',
                success: function (result) {
                    if (!result || result.rtnCode != "000" || !result.data) {
                        console.info('queryProductDetail failed');
                        console.info(result);
                    } else {
                        var data = result.data;

                        // KEEP VALUE
                        _this.values.yield = +data.expRtnRate;
                        _this.values.publishAmount = +data.publishAmount;
                        _this.values.holdDays = data.valueDate && now.diff(new Date(data.valueDate)) + 1;
                        _this.values.remainingDays = data.remainDate;

                        $('#productName').html(data.productName);
                        $('#productNum').html(productNum);
                        $('#remainingDays').val(data.remainDate);
                        data.contract && _this.renderFile('down_contract', data.contract);
                        data.agreement && _this.renderFile('down_agreement', data.agreement);

                        // 按转让利率
                        if (data.transferMode == 'c_transfer_mode_1') {
                            $('#transferType').html('<span class="red">*</span>' + '转让利率');
                            $('#unit').html('%');
                            $('#transferType2').html('转让实付金额');
                            $('#unit2').html('元');

                            $('#transferValue').val(data.transferRate);
                            $('#transferValue2').val(data.transferPrice.formatMoney(2));
                            _this.values.payMoney = +data.transferPrice;
                        }
                        // 按转让价格
                        else if (data.transferMode == 'c_transfer_mode_2') {
                            $('#transferType').html('<span class="red">*</span>' + '转让实付金额');
                            $('#unit').html('元');
                            $('#transferType2').html('转让利率');
                            $('#unit2').html('%');

                            $('#transferValue').val(data.transferPrice.formatMoney(2));
                            $('#transferValue2').val(data.transferRate);
                            _this.values.payMoney = +data.transferPrice;
                        }
                    }
                }
            });
        },
        closeBefore: function () {
            parent.window.coloseBefore = function () {
                parent.layer.confirm('确认不购买，并关闭产品购买页吗？', {
                    title: "提示",
                    btn: ['确定', '取消']
                }, function () {
                    parent.layer.closeAll('dialog');
                    parent.tab.close();
                    return false;
                });
            }
        },
        renderFile: function (id, data) {
            if (JSON.stringify(data).length == 4) {
                return;
            }
            var dataArray = [];
            $.each(data,
                function (index, element) {
                    var fileArray = element.file.split('|');
                    dataArray.push(fileArray);
                });
            $.each(dataArray,
                function (index, element) {
                    var container = $('#' + id);
                    container.text(element[1]);
                    container.attr('href', '/file/innerDownload?filename=' + element[1] + '&uuid=' + element[0]);
                });
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
                isLoading: true,
                contentType: 'application/json',
                success: function (result) {
                    if (!result || result.rtnCode != '000' || !result.data) {
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




