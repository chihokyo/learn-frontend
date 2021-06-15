# jQuery 基础复习

>这是在学习JQ的时候自己写的一份快速入门，有时候项目中会遇到的问题。回过头会看看。总之，基本上遇到的问题在网络上都可以查找到。现在JQ的技术其实新项目用的不多，但是日本一些老的公司还在继续用JQ进行搭建。所以做一下备份。**随时更新**

## 1. 入口函数

**Q：$是什么?$()和jQuery()有区别吗？**
其实没区别，就是为了区分开来，都属于函数名字。都能直接调用。
**Q：JavaScript入口函数是什么？jQuery入口函数是什么？**
`$(function(){})` 这就是jQuery的入口函数

```javascript
$(document).ready(function(){}) // 入口函数
$(function(){})  // 入口函数
```

这里有一个感觉，就是写JavaScript的时候多用 `obj = function(){}` 但是写jQuery的时候都在方法()里面写。比如`ready(function(){})`
JavaScript是在整个dom加载完，包括图片和文档。但是jQuery则在dom框架加载完就开始执行，所以速度上要比JavaScript快一点。

```javascript
window.onload = function(){
  console.log('JS!!!')
}
$(document).ready(function(){
  console.log(' JQ method 1')
})
$(function(){
  console.log('JQ method 2')
})
// 有图片和文档等加载的情况下，jQuery是明显快于js的。
```

## 2. DOM对象问题

**Q：jQuery对象和JavaScript对象有区别吗？JavaScript能用jQuery的对象吗？jQuery能用JavaScript的对象吗？**
jQuery其实就是封装了JavaScript一堆方法的伪数组（没有数组的方法，有自己的方法），是一个对象的集合。里面封装了大量的方法。JavaScript是原生的dom对象，而jQuery对象则是数组对象
不要混用，不是同一个对象，DOM是DOM对象。jQuery是jQuery对象。

```javascript
var buttonObj = document.getElementById('#button')
// 一般加上$表示是一个jQuery对象
```

JavaScript DOM对象不能调用jQuery对象方法。PS：但是入口函数里可以写JS！（感觉这是废话

```javascript
console.log($()) // 打印一下就出来了
console.log(document.getElementById('#button'))
```

那怎么才能调用的，进行对象转换。

### 互相转换问题

#### jQuery 转换 JavaScript

```javascript
// jQuery => js jQuery是一个伪数组，index为0的就是一个DOM对象
var buttonDom = $buttonObj[0] // 方法1 推荐使用
var buttonDom = $buttonObj.get(0) // 方法2
```

#### JavaScript 转换成 jQuery

```javascript
// jQuery => JavaScript jQuery是一个伪数组，index为0的就是一个DOM对象
var buttonDom = $buttonObj[0] // 方法1 推荐使用
var buttonDom = $buttonObj.get(0) // 方法2
// JavaScript => jQuery 用$()把DOM对象包装起来，就可得到jQuery对象
var buttonObj = document.getElementById('#button')
var $buttonObj = $(buttonObj)

// 测试一下（记得要加载jQuery）
var bodyObj = document.querySelector('body')
var $bodyJqObj = $(bodyObj)
var bodyJqObjEle = $bodyJqObj[0]
console.log(bodyObj === bodyJqObjEle) // true
```

> 后面自己在做案例的时候一个心得就是这俩对象拥有的方法不一样，所以在使用的时候，尤其在遍历或者获得一些属性的时候，就需要互相转换。比如播放音乐load() play() 这两个方法在jQuery里并没有，所以需要的就是通过jQuery.get(index)，转换成JS对象才能使用。

### 小案例：隔行变色

```javascript
$(function(){
    // Q: 为什么这里的DOM对象可以使用jQuery的方法
    // A: lis是一个jQuery对象，但是lis[i]是DOM对象
    let lis = document.getElementsByTagName("li")
    for(let i = 0;i<lis.length;i++){
        if (i % 2 == 0) {
            lis[i].style.backgroundColor = 'green'
        } else {
            lis[i].style.backgroundColor = 'purple'
        }
    }
})
```

**Q：$是什么?能干什么？**
$本质上就是一个函数，`console.log($)`这样就可以查看到了。

- 参数是一个 function 入口函数
- 参数是一个字符串，用来找对象
- 转换 DOM 对象为 jQuery

```javascript
$(function(){});console.log(typeof $) // 参数是一个function入口函数
$("#id");$("div");$(".class")  // 参数是一个字符串，用来找对象
$(document).ready(function(){}) // 转换DOM对象为jQuery对象，$(document)本来并没有ready这个方法哦
```

## 3. 选择器问题

首先要给自己说一下就是选择一个元素的时候并不是只有一种方法，很多选择器都可以指向同一个目标。所以不必纠结正确方法，只要完成目标和目的，我觉得就可以理解。而且基本选择器的写法跟CSS真的有很多不谋而合之处。学好了CSS之后再来看会更加容易。

**基本选择器 层级选择器 过滤选择器** 
**筛选选择器（方法）**除了它 其他都写在字符串里面
这些在官方文档上都有详细的例子，自己要知道的就是选择器有哪几种种类，这样在遇到问题的时候可以快速定位到就好。
因为自己每一次需要查找的时候都绞尽脑汁，所以差不多就这样做了。其实直接增加一个id属性是最快的。
筛选选择器的问题，筛选选择器和过滤选择器都可以。只不过筛选选择器是方法。
this只是一个DOM对象，但是用`$(this)`包裹之后就是一个 jQuery 对象了

## 4. 隐式迭代问题

一次性设置多个属性

```javascript
// 普通书写方式
$("li").css("backgroundColor", "red")
$("li").css("fontSize", "50px")
$("li").css("color", "green")
$("li").css("width", "100px")

// 可以直接修改多个样式写成对象的形式
$("li").css({
    backgroundColor: "pink",
    fontSize: "50px",
    color: "green",
    width: "100px"
})
```

设置的时候可以使用隐式迭代这样进行设置，但是获取一个元素属性的时候。不可以一次性获取全部的样式。

```javascript
console.log($("li").css("backgroundColor")) // rgb(255, 192, 203)
// 但是如果想直接获取所有li元素的背景颜色，只会输出第一个属性的值
```

## 5. 链式操作问题

`$().css().parent()` 这样每一次调用返回的都是一个 jQuery 对象，所以可以进行链式操作。
链式操作每一次的返回值都是一个jQuery对象，如果返回的不是，或者那个时候this已经改变了指向，那么就要重新进行。
这里引入一个`end()`方法。其实使用`$(this)`增加可读性比较好。

> 大多数 jQuery 的遍历方法会操作一个 jQuery 对象实例，并生成一个匹配不同 DOM 元素集的新对象。当发生这种情况时，应该会把新的元素集推入维持在对象中的堆栈内。每次成功的筛选方法调用都会把新元素推入堆栈中。如果我们需要老的元素集，可以使用 end() 从堆栈中弹出新集合。

比如下面这个案例。五星案例。

```html
<ul class="comment">
	<li>☆</li>
	<li>☆</li>
  <li>☆</li>
  <li>☆</li>
  <li>☆</li>
</ul>
<script>
    $(function(){
        let = starSolid = "★"
        let = starHollow = "☆"
        // $(".comment>li") 表示comment类下面所有li
        // 鼠标经过，所有前面变成实心
        $(".comment>li").on("mouseenter", function(){
          	console.log($(this).text(starSolid)) // 下面图片有log
            console.log($(this).text(starSolid).prevAll())
            console.log($(this).text(starSolid).prevAll().text(starSolid)) 
            $(this).text(starSolid).prevAll().text(starSolid) //这里要注意为什么不继续链式下去了
            $(this).nextAll().text(starHollow) // 因为这里this并不是指licurrent那个jQ对象了，而是前面所有
          // 解决这个问题其实还有一个方法。就是使用end()这个方法。
            $(this).text(starSolid).prevAll().text(starSolid).end().nextAll().text(starHollow)
        })
        $(".comment").on("mouseleave", function(){
            $(this).children().text(starHollow)
            $("li.current").text(starSolid).prevAll().text(starSolid)
        })
        $(".comment>li").on("click", function(){
            $(this).addClass("current").siblings().removeClass("current")
        })
    })
</script>
```

![](https://raw.githubusercontent.com/chihokyo/image_host/master/20200717165535.png)



## 6.设置style类的问题

修改样式的时候不一定这样css一个个进行添加，也可以统一设置成一个类，然后统一进行添加一个类

```html
<style>
    .small {
        font-size: 5px;
    }
    .big {
        font-size: 200px;
    }
</style>
<button id="makesmall" type="submit">变小</button>
<button id="makebig" type="submit">变大</button>
<div id="div1">1111</div>
<script>
    // js原生写法 这样写并不好维护，因为类名如果变了，那么js里也要修改
    let smallButton = document.getElementById("makesmall")
    let bigButton = document.getElementById("makebig")
    let divObj = document.getElementById("div1") //这里用id才行，tagName失败
    smallButton.onclick = function(){
        divObj.className = "small"
    }
    bigButton.onclick = function(){
        divObj.className = "big"
    }
    // jq
    $("#makesmall").on("click", function(){
        $("#div1").addClass("small")
    })
    $("#makebig").on("click", function(){
        $("#div1").addClass("big")
    })
    $("#removebig").on("click", function(){
        $("#div1").removeClass("big")
    })
    $("#issmall").on("click", function(){
        console.log($("#div1").hasClass("small"))
    })
    // 写法1 切换
    $("#shiftclass").on("click", function(){
        if($("#div1").hasClass("small")){
            $("#div1").removeClass("small")
        } else {
            $("#div1").addClass("small")
        }
    })  
    // 写法2 切换 toggleClass
    $("#shiftclass").on("click", function(){
        $("#div1").toggleClass("small")
    })
</script>
```

这个道理和attr也是共通的。
attr表示的是属性操作，是操作标签内的内容。样式可以用css来操作`$(obj).css("","")`这样写，但是标签内的属性。就必须使用attr了。

```javascript
<img src="" alt="" title="修改前">
// 修改title的名字
$(function(){
  $("img").attr("title", "修改后") ○
  $("img").css("title", "修改后") ×
})
```

一次性设置多个属性

```javascript
$(function(){
    $("img").attr({
        title: "修改后2",
        alt: "新的alt",
        test: "自定义属性"
    })
})
```

先补一个小tips,为了防止冒泡，JQ里面使用 `return false` 下面也有解释阻止冒泡的方法。

## 7. 关于prop和attr问题

在一些属性为Boolean值的上面，需要使用prop来进行获取。比如`checked,disabled,selected`这样的数值。
这里可以有一个案例来实现。并非完全版本的小demo

```

```



## 8. 关于动画animate()

`show() hide()`
`fadeIn() fadeOut() fadeToggle()` 
`slideUp() slideDown() slideToggle()`  发现一个坑，就是JQ版本3并不支持这个。
`animate()=>` 这个函数的参数太多，自己查。
这些动画效果都会有一个动画队列，就是当你触发一个事件之后这个动画事件一直在队列中进行等待。一个接着一个这样按照顺序。
jQuery可以通过在调用动画函数之前利用 `stop()` 进行终止这个队列
好处：可以使动画有顺序的进行移动
坏处：会有残余
**参数问题:**https://api.jquery.com/animate/

```javascript
<button id="start" type="submit">开始</button>
<button id="stop" type="submit">结束</button>
<div class="div1"></div>

$(function(){
    $("#start").on("click", function(){
        $(".div1").slideDown(2000).slideUp(2000)
    })
    $("#stop").on("click", function(){
       // 参数1 clearQueue 是否清除动画队列
			 // 参数2 jumpToEnd 是否跳转到当前动画最终效果
			 // 默认是false false
        $(".div1").stop(true,true)
    })
})
```

## 9. 操作节点问题

### 动态创建节点

```html
<div id="box" >ok</div>
<script>
    // 如果要创建一个节点 例如
    // <a href="https://google.com" target="_blank">HELLO Google</a>
    $(function(){
        // JS写法
        let box = document.getElementById("box")
        let a = document.createElement("a")
        box.appendChild(a)
        a.setAttribute("href", "https://google.com")
        a.setAttribute("target", "_blank")
        a.innerHTML = "HELLO Google"
        // JQ写法1
        let a = "<a href='https://google.com' target='_blank'>HELLO Google</a>"
        $("#box").append(a)
        // JQ写法2
        $a = $("<a href='https://google.com' target='_blank'>HELLO Google</a>")
        $("#box").append($a)
    })
</script>
```

`append()` 最后面
`appendTo() `虽然也是最后面，但是就是调用者不一样。
`prepend() `最前面
`prependTo() `同上
`after() `添加到自己后面 作为兄弟元素
`before() `添加到自己前面 作为兄弟元素

### 清空节点

`html() `这个可能会造成内存泄漏，因为html只能清空内容不能清空事件。（占用客户端内存。
`empty()` 这个就不会。
`remove()` 可以自己删除自己。自杀。
`val("")` 这种清空的是内容

### 克隆的话

`$("#id").clone()`克隆出来的是深度复制。
false` clone(false) `深复制 不会复制事件。
true  `clone(true) ` 深复制 会复制事件。

## 10. 获取属性 val()

`attr() val()` 其实都可以获取值，但一般会使用`val()`,操作value属性的方法。

```javascript
<input type="button" value="hello" id="btn">
$(function(){
  console.log($("#btn").val()) // hello
	console.log($("#btn").attr("value")) // hello
})
```

## 11. html() PK text()

本质上是JavaScript的 innerHTML 和 innerText 的区别 

```javascript
//<div><h3>>我是h3</h3></div
$(function(){
  console.log($("div").html()) // <h3>>我是h3</h3>
  console.log($("div").text()) // 我是h3
  $("div").html("<p>我是P文本</p>") // 解释标签
  $("div").text("<p>我是P文本</p>") // 直接输出 所以可以防止XSS攻击那种
})
```

css 宽高 方法
有参数就是设置，没参数就是获取。

```javascript
css("width",400) 
width(400) // 效果一样
innerWidth() // 包括width + padding
outerWidth() // 包括width + padding + border
outerWidth(true) // 包括width + padding + border + margin
```

## 12.事件委托

事件委托使用的场景之一就是，动态创建元素。

### bind() delegate() on()

`bind() `现在几乎不用了 动态创建元素无法有事件
`delegate()` 利用冒泡触发父元素给子元素触发事件  动态创建元素有事件

```javascript
$("#div").delegate("p", "click", function(){}{console.log(this)// p元素}) 
```

**on就是集大成了，现在是统一方案。既可以给自己注册简单事件，也可以委托事件。**
到底什么是事件委托呢。本质就是冒泡给父亲，父亲触发给孩子执行的玩意儿。
一个案例实现以下动态创建事件的问题。代码如下。
设置一个table，每添加一条数据就有一个删除键。

```javascript
// 正常创建元素 
// 会发现新增的行无法进行删除
$("button").on("click", function(){
    $(`<tr>
        <td>新的NEW香蕉</td>
        <td>新的NEW2公斤</td>
        <td>新的NEW6元/公斤</td>
        <td><a href="javascript:void(0);" class="delete">×</a></td>
    </tr>`).appendTo("tbody")
})
$(".delete").on("click", function(){
    $(this).parent().parent().remove()
})

// 动态绑定 注意！这时候不能给 .delete这个类进行绑定，需要给共通的父元素。也就是tbody进行绑定
$("tbody").on("click", ".delete", function(){
    //console.log(this) // 会发现这个this <a href="javascript:void(0);" class="delete">×</a>
    $(this).parent().parent().remove() // 所以跟上面写法一模一样
})
```

### 事件解绑VS事件触发

和`on()` 相对应 `off()`，用`off()`可以直接接触绑定。
也可以直接使用
`对象.trigger(事件名)`
`对象.事件名()`

### 事件对象

```javascript
// 那个function里面的e
$("tbody").on("click", ".delete", function(e){
    console.log(e)
})
```

重点的几个事件对象里面的属性，`e.data`。这个方法输出的就是在`on()`触发事件的时候，第三个参数。可以把外面的参数拿进来。

```javascript
// 由于let是一个全局变量的情况下。那么想把这个age传送到事件的回调函数里面的话。就可以使用e.data进行传递	
$(function(){
 		var age = 18
    $("div").on("click", function(){
      console.log(age)
    })
    var age = 20
		$("p").on("click", age, function(e){
      console.log(e.data) // 这样就可以传送进去了
    })
  })
```

### 事件执行顺序

结论；自身事件，委托事件，父元素自身事件。
代码验证。

```html
<button type="submit">点我添加</button>
<div><p> 我是老P </p></div>
<script>
$("button").on("click",function(){
    $("<p>我是新增的P</p>").appendTo("div")
})
$("div").on("click", function(){
    console.log(this)
    console.log("我是爸爸")
})
$("div").on("click", "p", function(){
    console.log(this)
    console.log("P元素委托事件")
})
$("p").on("click", function(){
    console.log(this)
    console.log("P元素自身事件")
})
// 点击新增的p <p>我是新增的P</p> // 元素委托事件 我是爸爸
// 点击老P P元素自身事件->P元素委托事件->我是爸爸
</script>
```

## 13. 冒泡和默认行为

冒泡。自己干的老子也要连累触发的东西。
默认行为。标签自带属性。比如a就是点击跳转。

```html
<a href="https://google.com" class="delete">×</a>
<script>
$("a").on("click", function(){
  console.log("click a")
})
// 如果这时候进行点击发现还有a标签自带的跳转属性存在，如果想阻止这种默认跳转行为就需要有这几个方法
$("a").on("click", function(){
  console.log("click a")
  e.preventDefault()
  e.stopPropagation()
  return false    // 既能阻止冒泡又能阻止默认行为
})
</script>
```

这些只是常用的用法。节流阀问题。就是设置一个flag，如果一个事件没完成那么下一个就不会立起flag。

#### 关于each()

```javascript
// 使用JQ的方法进行遍历对每一个li元素进行遍历改变透明度
// 使用这个可能会有变量污染的问题 其实es6之后let可以避免
for(var i = 0;i < $("li").length;i++){
  $("li").eq(i).css("opacity", (i+1)/10)
}
// 使用each()
// @index  下标 
// @element DOM元素
$("li").each(function(index,element){
  $(element).css("opacity", (index+1)/10) // 转换成JQ元素
})

```

#### 解决冲突问题

引入不同模块的$问题，万一两个模块都有同一个$可以使用JQ的方法进行释放。

```html
<script src="引入非jq模块"></script>
<script src="引入jQuery模块"></script>
console.log($) // 这样后面JQ模块会覆盖掉前面的$
// 解决方法 
$.noConflict() // 方法1：JQ主动释放$对象 以后$就可以用jQuery代替 这样的情况下入口函数就是jQuery
let dollar = $.noConflict() // 方法2：赋值给一个替身，这样dollar就是$
let $$ = $.noConflict() // 这样写也很直观
```

## 14. 关于插件问题

#### 如何使用插件？

仔细阅读插件文档。**学好英语！！！**

#### 如何自己制作一个插件?

原理就是使用构造函数给jQuery增加一个公共方法。插件的本质不就是自己写一个函数大家都能用吗。。
比如，一个超简单的插件

```javascript
// 原理
jQuery.prototype.plugins = function(){
    console.log("自制插件")
}
// 在js里可以查找到 jQuery.fn = jQuery.prototype = {} 
// 简化版本
$.fn.plugins = function(){
    console.log("自制插件")
}
$(document).plugins()
```

实现一个超级简单的插件，调用`big()`字体就能变大。
平常使用jq的时候就是。
`$("p").css("font-size", "100px")`

```html
<p>hello</p>
<script>
$(function(){
	$.fn.big = function(size){
	// 这里this是JQ对象 console.log(this)
	this.css("font-size", size+"px")
}
	$("p").big(200)
})
  // 但是这样把big方法导入到新的js发现会无法继续链式调用。
  // 这时候在方法里要加上return this 把JQ对象推出去
  $(function(){
    $.fn.big = function(size){
        this.css("font-size", size+"px")
    }
    return this
})
</script>
```

> 此处缺少一个像样的插件demo