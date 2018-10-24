import a from './a'
import b from './b'
import c from './c'


import './assets/css/main.css'

//js中引入参与编译的图片资源  两种引入方法
import bgimg from './assets/img/1.jpg'
// const bgimg = require('./assets/img/1.jpg')
console.log(bgimg);

a();
b();
c();