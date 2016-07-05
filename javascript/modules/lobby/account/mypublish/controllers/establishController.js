define([ "jquery", "common/views", "common/datautil", 'common/autocompleter',
    'bootstrap-suggest.min'], function($, view, DataUtil) {
    var extView = view.extend({
        init : function() {
            var self = this;
            var productNum = utils.getParameter("productNum");//测试ID:30020016062000021
            var productStatus = utils.getParameter("productStatus");//更新后产品状态
            var productPhase = utils.getParameter("productPhase");//更新后产品阶段
            var submitCount = 0;//是否允许提交标志位
            $("#submit").on("click", function () {
                var valueDate = $("#valueDate").val();//起息日
                var maturityDate = $("#maturityDate").val();//到息日
                var publishAmount = $("#publishAmount").val();//发行规模
                submitCount++;
                if(submitCount==1){
                    var data ={products:[{
                        productNum : productNum,
                        productPhase: productPhase,
                        productStatus:productStatus,
                        attributes:{
                            valueDate:valueDate,
                            maturityDate:maturityDate,
                            publishAmount:publishAmount
                        }
                    }]
                    };
                    if(validator.isMoney(publishAmount)){
                        if(!validator.isEmpty(valueDate)&&!validator.isEmpty(maturityDate)){
                            if(new Date(valueDate).getTime() <  new Date(maturityDate).getTime()){
                                loadAjax({
                                    url: "/product/updateProduct",
                                    data: JSON.stringify(data),
                                    type: "POST",
                                    dataType: "json",
                                    contentType: "application/json",
                                    success: function (result) {
                                        if(result&&result["rtnCode"]==="000"){
                                            self.openLayer('<p style="width: 150px;margin:auto; font-size: 18px;line-height: 120px;">您的产品正式成立!</p>', function () {
                                                tab.link("myaccount", "acc-pub-productlist", "account/mypublish/productlist.html");
                                                parent.layer.closeAll();
                                            });
                                        }else{
                                            self.openLayer('<p style="width: 140px;margin:auto; font-size: 18px;line-height: 120px;">产品发行失败!</p>', function () {
                                                parent.layer.closeAll();
                                            });
                                        }
                                    }
                                });
                            }else{
                                submitCount = 0;//提交失败标志位清零
                                parent.layer.msg("起息日必须早于到期日");
                            }
                        }else{
                            submitCount = 0;
                            parent.layer.msg("日期输入不能为空");
                        }
                    }else{
                        submitCount = 0;
                        parent.layer.msg("发行规模输入有误");
                    }
                }
                //console.log(submitCount);
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
        events : {
            //"click #submit" : "submitEstablish",
            //"click #cancle" : "cancleEstablish"
        },
        handlers : {
            //cancleEstablish : function() {
            //    var index = parent.layer.getFrameIndex(window.name);
            //    parent.layer.close(index);
            //}
        }
    });
    return new extView();
});