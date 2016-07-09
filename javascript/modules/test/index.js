define(["common/controller","testView"],function(controller,testView){
      var testController= new controller.extend({
        actions:{
            "test":"test",
            "wsp":"wsp"
        },
        wsp:function(){
            // alert("wsp");
            new testView();
        },
        test:function(){
            // alert("test");
            new testView();
        }
    });
    return new testController();
});