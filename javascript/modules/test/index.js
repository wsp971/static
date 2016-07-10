define(["common","testView"],function(common,testView){
      var testController= common.controller.extend({
        actions:{
            "test":"test",
            "wsp":"wsp"
        },
        init:function(){
            this.go("wsp");
        },
        wsp:function(){
            // alert("wsp");
            new testView();
        },
        test:function(){
            // alert("test");
            // new testView();
            // this.go("wsp");
            // testController.go("wsp");
            // this.wsp();
        }
    });
    return new testController();
});