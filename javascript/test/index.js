define(["jquery","common/views"],function($,view){
    return new view.extend({
        actions:{
            "test1":"test1",
            "test2":"test2"
        },
        init:function(){
            debugger;
        },
        events:{},
        handles:{

        },
        test1:function(){
            alert("test1");
        },
        test2:function(){
            alert("test2");
        }
    })
});