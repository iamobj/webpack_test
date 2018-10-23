//此文件是用nodejs来跑的  所以用的nodejs语法

const path = require('path'); //引入node的path对象
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件


//module.exports导出，这里导出一个对象
module.exports = {
  entry: './src/app.js',  //入口文件
  output: {               //输出配置，打包后的文件
    path: path.resolve(__dirname,'dist',),  //输出到哪里，只能用绝对路径，这里使用node path模块，放到项目根目录下dist文件夹
    filename: 'main.js' //文件名
  },
  plugins: [  //插件
    new HtmlWebpackPlugin({ //利用这个插件打包自动生成index文件
      filename: 'index.html', //打包后的文件名
      template: 'src/index.html'  //文件模板
    })
  ]
}