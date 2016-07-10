define(["jquery","common","childView"],function( $,common,childView){
    return common.view.extend({
        init:function(){
            alert("hello world");
        },
        events:{
            "click #test":"test"
        },
        regions:{
            container:"#container"
        },
        handlers:{
            test:function(){
                alert("click test button!");
                new childView({container:this.regions.container});
                // this.regions.container.show(new childView({container:this.regions.container}));
            }
        }
    });
});