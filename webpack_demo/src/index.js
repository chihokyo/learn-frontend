import $ from 'jquery'
// 引入css文件
import './css/common.css'
import './css/common.less'

$(function () {
  $('li:odd').css('backgroundColor', 'pink')
  $('li:even').css('backgroundColor', 'green')
})
