define(function(){
    return new views.extend({
        actions:{
            "test1":"test1",
            "test2":"test2"
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