fis.hook('amd', {
	baseUrl: './javascript',
	paths: {
		'jquery': './lib/jquery/1.9.1/jquery.min.js',
		'underscore': './lib/underscore/underscore.js',
		'layer': './lib/layer/2.2/layer/layer.js',
		'jQueryPlugin': './lib/jquery',
		'layPage': './lib/laypage/1.2/laypage.js',
		'bootstrap': './lib/bootstrap/js/bootstrap.min.js',
		'table': './lib/bootstrap/table.js',
		'bootstrap-suggest.min': './lib/bootstrap/js/bootstrap-suggest.min.js',
        'jquery.steps.amd':'./lib/jquery/jquery.steps.amd.js',
        'jquery.ui.widget': './lib/fileupload/js/vendor/jquery.ui.widget.js',
        'load-image': './lib/fileupload/js/load-image.js',
        'canvas-to-blob': './lib/fileupload/js/canvas-to-blob.min.js',
        'load-image-meta': './lib/fileupload/js/load-image-meta.js',
        'load-image-exif': './lib/fileupload/js/load-image-exif.js',
        'jquery_iframe_transport': './lib/fileupload/js/jquery.iframe-transport.js',
        'jquery.fileupload': './lib/fileupload/js/jquery.fileupload.js',
        'jquery.fileupload-process': './lib/fileupload/js/jquery.fileupload-process.js',
        'jquery.fileupload-image': './lib/fileupload/js/jquery.fileupload-image.js',
        'jquery.fileupload-validate': './lib/fileupload/js/jquery.fileupload-validate.js',
        'jquery.validate.min' : './lib/validate/jquery.validate.min.js',
        'messages_zh.min' : './lib/validate/messages_zh.min.js',
        'highcharts' : './lib/highcharts/highcharts.js',
        'citys' : './base/city.js',
        "text":"./lib/text/text.js",
        "common":"./base/commons.js"
	}, 

	shim: {
	    'bootstrap': {
	        deps: ['jquery']
	    },
	    'table': {
	        deps: ['jquery']
	    },
	    'jquery.fileupload': {
	        deps : ["jquery"],
	        exports:"JqueryFileUpload"
	    },
	    'highcharts': {
	    	deps : ["jquery"]
	    },
	    'jquery.validate.min': {
	    	deps : ["jquery"]
	    },
	    'bootstrap-suggest.min' : {
	    	deps : ['bootstrap']
	    }
	}
});

fis.match('/javascript/modules/**/*.js', {
    isMod: true,
    moduleId: '$1'
});
fis.match('/javascript/modules/login/first.js', {
    isMod: false
});
fis.match('/javascript/modules/home/*.js', {
      isMod: false
});
fis.match('/javascript/modules/common/cbbkeyboard.js', {
     isMod: false
 });

 fis.match('javascript/lib/bootstrap/autosuggest.js', {
     isMod: false
 });


fis.set('charset', 'gbk');
//fis.set('project.charset', 'gbk');

fis.match('*.less', {
    // fis-parser-less 插件进行解析
    parser: 'less2',
    // .less 文件后缀构建后被改成 .css 文件
    rExt: '.css'
})

//启用 fis-spriter-csssprites 插件
fis.match('::package', {
    spriter: fis.plugin('csssprites'),
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        useInlineMap: true })
})

// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
})

//清除其他配置，只剩下如下配置
fis.match('*.{js,css,png}', {
    useHash: false
});

//发布到本地server
 fis.match('*', {
     deploy: fis.plugin('local-deliver', {
         to: './output'
     })
 })

fis.media('prod').match('**.**', {
    release : '../output$0',
    url : '/new$0'
});