define(["jquery", "common/views", "common/datautil", 'common/autocompleter',
    'bootstrap-suggest.min'], function ($, view, DataUtil) {
    var extView = view.extend({
        init: function () {
            var self = this;
            this.initSuggest();
            var productNum = utils.getParameter("productNum");//测试ID:30020016062000021
            var productStatus = utils.getParameter("productStatus");//操作后产品状态
            var productPhase = utils.getParameter("productPhase");//操作后产品阶段
            var pushSetting = decodeURIComponent(utils.getParameter("pushSetting"));//公开还是指定机构
            //var purchDeadLine = $("#purchDeadLine").val();
            if (pushSetting == "c_push_setting_1") {
                $("#row2").show();
            } else {
                $("#row2").hide();
            }
            var submitCount = 0;//是否允许提交标志位
            $("#submit").on("click", function () {
                submitCount++;
                if (submitCount == 1) {
                    var purchDeadLine = $("#purchDeadLine").val();//认购截止日
                    if (pushSetting == "c_push_setting_1") {//指定机构
                        var $assignedMembers = $("#selectedTags").children("a");
                        var assignedMembers = [];
                        $assignedMembers.each(function () {
                            var instId = $(this).data("id");
                            assignedMembers.push(instId);
                        });
                        if (!validator.isEmpty(assignedMembers.join(","))) {//机构非空
                            var data = {
                                products: [{
                                    productNum: productNum,
                                    productPhase: productPhase,
                                    productStatus: productStatus,
                                    attributes: {
                                        purchDeadLine: purchDeadLine,
                                        assignedMembers: assignedMembers.join(",")
                                    }
                                }]
                            };
                            if (!validator.isEmpty(purchDeadLine)) {//认购截止非空
                                loadAjax({
                                    url: "/product/updateProduct",
                                    data: JSON.stringify(data),
                                    type: "POST",
                                    dataType: "json",
                                    contentType: "application/json",
                                    success: function (result) {
                                        if (result && result["rtnCode"] === "000") {
                                            self.openLayer('<p style="width: 135px;margin:auto; font-size: 18px;line-height: 120px;">产品开放购买中!</p>', function () {
                                                tab.link("myaccount", "acc-pub-productlist", "account/mypublish/productlist.html");
                                                parent.layer.closeAll();
                                            });
                                        } else {
                                            self.openLayer('<p style="width: 150px;margin:auto; font-size: 18px;line-height: 120px;">产品开放购买失败!</p>',function(){
                                                parent.layer.closeAll();
                                            });
                                        }
                                    }
                                });
                            } else {
                                submitCount = 0;
                                parent.layer.msg("认购截止不能为空");
                            }
                        } else {
                            submitCount = 0;
                            parent.layer.msg("机构不能为空");
                        }
                    } else {//公开
                        var data = {
                            products: [{
                                productNum: productNum,
                                productPhase: productPhase,
                                productStatus: productStatus,
                                attributes: {
                                    purchDeadLine: purchDeadLine
                                }
                            }]
                        };
                        if (!validator.isEmpty(purchDeadLine)) {
                            loadAjax({
                                url: "/product/updateProduct",
                                data: JSON.stringify(data),
                                type: "POST",
                                dataType: "json",
                                contentType: "application/json",
                                success: function (result) {
                                    //console.log(result);
                                    if (result && result["rtnCode"] === "000") {
                                        self.openLayer('<p style="width: 135px;margin:auto; font-size: 18px;line-height: 120px;">产品开放购买中!</p>', function () {
                                            tab.link("myaccount", "acc-pub-productlist", "account/mypublish/productlist.html");
                                            parent.layer.closeAll();
                                        });
                                    } else {
                                        self.openLayer('<p style="width: 150px;margin:auto; font-size: 18px;line-height: 120px;">产品开放购买失败!</p>',function(){
                                            parent.layer.closeAll();
                                        });
                                    }
                                }
                            });//ajax
                        } else {
                            submitCount = 0;
                            parent.layer.msg("认购截止不能为空");
                        }
                    }
                }
            });
            $("#cancle").on("click", function (){
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
            })
        },
        openLayer: function (content, endFn) {
            parent.layer.open(
                {
                    type: 1,
                    title: ['提示', 'background:#EFEFEF;'],
                    shadeClose: true,
                    shade: 0.2,
                    shadeClose: false,
                    time: 3000,
                    area: ['300px', '200px'],
                    content: content,
                    end: endFn || null
                });
        },

        events: {
            //"click #submit" : "submitPush",
            //"click #cancle": "canclePush"
        },
        handlers: {
            //canclePush: function () {
            //    var index = parent.layer.getFrameIndex(window.name);
            //    parent.layer.close(index);
            //}
        },
        initSuggest: function () {
            $("#autocomplete").ficSuggest();
        }

    });
    return new extView();
});