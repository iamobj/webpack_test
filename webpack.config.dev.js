//此文件是用nodejs来跑的  所以用的nodejs语法

const path = require('path'); //引入node的path对象
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件


//module.exports导出，这里导出一个对象
module.exports = {
  entry: './src/app.js',  //入口文件
  output: {               //输出配置，打包后的文件
    path: path.resolve(__dirname,'dist/'),  //输出到哪里，只能用绝对路径，这里使用node path模块，放到项目根目录下dist文件夹
    filename: 'assets/js/main.js', //文件名
    publicPath: './',  //所有资源的基础路径，而且一定是/结尾
  },
  plugins: [  //插件
    new HtmlWebpackPlugin({ //利用这个插件打包自动生成index文件
      filename: 'index.html', //打包后的文件名 路径 这里因为上面配置了统一打包到assets文件夹，因此index文件跳出一层
      template: 'src/index.html'  //文件模板
    })
  ],
  module: { //预编译设置
    rules: [
      // {
      //   test: /\.vue$/, //文件匹配规则，这里举例匹配vue文件
      //   loader: '',  //使用什么loader处理匹配到的文件,比如vue-loader
      //   options: {  //配置loader
          
      //   }
      // },
      {
        test: /\.css$/,
        //先启用css-loader处理css内容，在交给style-loader处理添加到结构文档中(index.html)
        // loader: ['style-loader','css-loader']  // 如果默认配置 可以这样写 需要单独配置 则下面写法
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              //这里设置css-loader的配置
              module: false,  //是否开启模块化，默认false，开启后 类名会改变
              // localIdentName: '[path]-[name]-[local]-[hash:base64:6]'  //设置编译后的名字 变量path所在文件夹,name文件名，local代码里编译前写的名字   这个值默认是hash:base64(一串哈希值) 后面跟个冒号6 是生产6个字符的哈希值
            }
          }
        ],
        // include: [  // 包含，只处理这里面的
        //   path.resolve(__dirname, 'src')
        // ],
        // exclude: [  //排除，不处理这里面的
        //   path.resolve(__dirname, 'node_modules')
        // ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader', //url-loader默认都转换为base64编码形式，可以使用limit约束
        options: {
          limit: 10000, //以b为单位，1024b=1kb，超过这个值就会交给file-loader打包处理，小于则使用base64转码
          name: 'assets/img/[name]_[hash:6].[ext]',  // 设置编译后的文件名 路径

        }
      },
      //字体也是用url-loader/file-loader处理
      {
        test: /\.(woff2|woff|ttf|eot|svg)$/,
        loader: 'url-loader',
      }
    ]
  },
  devServer: {
    port: 9966, //服务端口
    open: false, //是否自动打开到浏览器
    publicPath: '/',  // 服务器打包资源后的输出路径
  }
}