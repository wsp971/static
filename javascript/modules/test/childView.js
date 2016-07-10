define(["jquery","underscore","text","common","text!../../../page/test/bodytest1.html"],function($,_,text,common,bodytest){
    return common.view.extend({
        _template:_.template(bodytest),
        init:function(options){
            var data={
                "name":"模板-王世平",
                "username":"模板-wsp971",
                "role":"模板-经纪人",
                "state":"模板-启用"
            }
            this.render("",data,options.container);
        },
        events:{
            "click #forbid":"forbid"
        },
        handlers:{
            forbid:function(){
                alert("forbid this user");
            }
        }
    })
});
