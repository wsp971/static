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
    spriter: fis.plugin('csssprites')
})

// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
})

//清除其他配置，只剩下如下配置
fis.match('*.{js,css,png}', {
    useHash: true
});


// 生产发布要进行压缩、加签处理
fis.media('prod')
      .match('*.js', {
          // fis-optimizer-uglify-js 插件进行压缩，已内置
          optimizer: fis.plugin('uglify-js')
      }).match('*.css', {
          // 对 CSS 进行图片合并
          useSprite: true
      }).match('*.css', {
          // fis-optimizer-clean-css 插件进行压缩，已内置
          optimizer: fis.plugin('clean-css')
      }).match('*.png', {
          // fis-optimizer-png-compressor 插件进行压缩，已内置
          optimizer: fis.plugin('png-compressor')
      }).match('*.{js,css,less,png}', {
          useHash: true,  // 加 md5
          release: '/static/$0'   // 发布的文件夹结构
      }).match('::package', {
          postpackager: fis.plugin('loader', {
              allInOne: true
          })
      });

// 发布到测试环境
fis.media('qa')
    .match('*', {
        deploy: fis.plugin('http-push', {
            receiver: 'http://cq.01.p.p.baidu.com:8888/receiver.php', //接受处理页面
            to: '/home/work/htdocs' // 注意这个是指的是测试机器的路径，而非本地机器
        })
    });

//本地调试
fis.media('debug')
    .match('*.{js,css,png}', {
        useHash: false,
        useSprite: false,
        optimizer: null
    })
