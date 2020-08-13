import $ from 'jquery'
// 引入css文件
import './css/common.css'

$(function () {
  $('li:odd').css('backgroundColor', 'pink')
  $('li:even').css('backgroundColor', 'green')
})
