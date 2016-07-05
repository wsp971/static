define(["jquery",
        "common/views",
        "jquery.ui.widget",
        "jquery_iframe_transport",
        "jquery.fileupload",
        "jquery.fileupload-process",
        "jquery.fileupload-validate",
        "../service/uploadService"
    ],
    function ($, view, jquery_ui_widget, jquery_iframe_transport, fileupload, fileuploadProcess, fileuploadValidate, uploadService) {
        return new view.extend({
            init: function () {
                var _this = this;
                this.upload = new uploadService();
                var orderId = utils.getParameter("orderId");
                var oprCode = utils.getParameter("oprCode");
                var oprOrderStatus = utils.getParameter("oprOrderStatus");
                var originalSide = utils.getParameter("originalSide");
                var isSubmit = 0;

                $("#submit").on("click", function () {
                    if ($("#fileName").html().length == 0) {
                        parent.layer.msg("请上传文件");
                        return;
                    }
                    isSubmit++;
                    if (isSubmit == 1) {
                        //var orderDocs = [];//上传文件信息
                        var docName = $("#fileName").html(); //文件名
                        var docPath = $("#file").val(); //文件上传完返回的UUID
                        var docType = "PDF"; //文件格式
                        var docUse = "09"; //合同
                        var fileData = [{ docName: docName, docPath: docPath, docType: docType, docUse: docUse}];
                        var data = { orderId: orderId, oprCode: oprCode, oprOrderStatus: oprOrderStatus, originalSide: originalSide, orderDocs: fileData };
                        loadAjax({
                            url: "/trade/order/update",
                            data: JSON.stringify(data),
                            contentType: "application/json",
                            dataType: "json",
                            type: "post",
                            success: function (result) {
                                if (result && result.rtnCode === "000") {
                                    parent.layer.msg("合同信息已提交！");
                                    tab.link("myaccount", "acc-trans-orderlist", "account/mytransfer/orderlist.html");
                                    var index = parent.layer.getFrameIndex(window.name);
                                    parent.layer.close(index);
                                } else {
                                    isSubmit = 0;
                                    parent.layer.msg("合同提交失败");
                                }
                            }
                        });
                    }
                })
            },
            events: {
                "click #fileupload": "fileuploadFiles",
                "click #cancle": "cancle"
            },
            handlers: {
                fileuploadFiles: function (event) {
                    this.upload.uploadFile(event);
                },
                cancle: function () {
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                }
            }
        });
    }
);