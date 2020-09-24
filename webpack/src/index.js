import $ from 'jquery'
// 引入css文件
import './css/common.css'
// 引入less文件
import './css/common.less'
// 引入scss文件
import './css/common.scss'

$(function () {
  $('li:odd').css('backgroundColor', 'pink')
  $('li:even').css('backgroundColor', 'green')
})
