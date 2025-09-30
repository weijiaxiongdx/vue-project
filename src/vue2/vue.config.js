module.exports = {
    pages: {
        index: {
            entry: './main.js', // 可以自定义入口文件
        },
    },

    lintOnSave:false, // 关闭语法检查

    // 开启代理服务器方式一，解决跨域问题。缺点：不能配置多个代理、不能灵活控制请求是否走代理。优先匹配前端中的资源，只有当前端不存在该资源时，才会将请求转发给服务器
    // devServer: {
    //     proxy: 'http://localhsot:5500' // 与浏览器地址栏中看到的三要素保持一致
    // },

    // 开启代理服务器方式二，解决跨域问题。实际工作中肯定使用这种方式
    devServer: {
        proxy:{
            '/api': {
                target:'http://localhost:5000',
                pathRewrite:{'^/api':''},
                // ws:true, // ws表示websocket，默认值为true，用于支持websocket
                // changeOrigin:true // 控制请求头中的host值，默认值为true。为true时，服务器收到的请求头中的host为localhost:5000
                //                                                     为false时，服务器收到的请求头中的host为请求的初始源
            },

            '/api2': {
                target:'http://localhost:5000',
                pathRewrite:{'^/api2':''},
            },
        }
    }
}