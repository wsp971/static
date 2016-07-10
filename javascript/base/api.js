define(["base/url"],function(url){
    /*配置环境*/
    var envConfig = {
        dev: true,
        test: false,
        prod: false
    };
    /*挡板开关*/
    var mockflag=false;
    var rootPath=""
    !function () {
        if (envConfig.dev) {
            rootPath = ""; // 测试环境的接口地址前缀
        } else if (envConfig.test) {
            rootPath = "/fic_web_ii"; // 开发环境的接口地址前缀
        } else if (envConfig.prod) {
            rootPath = ""; // 生产环境的接口地址前缀
        }
    } ();
    /*加密公钥*/
    var publicKey="";
    var service={};
    if(!!mockflag){
        for(key in url){
            service[kye]="/data"+url[key];
        }
    }else{
        for(key in url){
            service[key]=rootPath+url[key];
        }
    }
    return {
        publicKey:publicKey,
        service:service,
        rootPath:rootPath
    }
});