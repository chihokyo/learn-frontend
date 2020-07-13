let taskAry = []
let taskBox = $('#todo-list')
let taskInp = $('#task')
let strong = $('#count')

$(document).on('ajaxStart', function () {
    NProgress.start()
})

$(document).on('ajaxComplete', function () {
    NProgress.done()
})

// 重新渲染
function render() {
    let html = template('taskTpl', {
        tasks: taskAry
    })
    taskBox.html(html)
}

// 计算未完成数量
function calcCount() {
    let count = 0
    let newAry = taskAry.filter(item => item.completed == false)
    count = newAry.length
    strong.text(count)
}

// 渲染计算数量
function renderCal() {
    render()
    calcCount()
}


// 获取全部任务
$.ajax({
    url: '/task',
    type: 'get',
    success: function (response) {
        taskAry = response
        renderCal()
    }
})

// 获取文本框添加键盘输入事件
taskInp.on('keyup', function (event) {
    // 回车键判断
    if (event.keyCode == 13) {
        let taskName = $(this).val()

        if (taskName.trim().length == 0) {
            alert('请输入任务内容')
            return
        }
        // 请求添加	
        $.ajax({
            type: 'post',
            url: '/addTask',
            contentType: 'application/json',
            data: JSON.stringify({ title: taskName }),
            success: function (response) {
                taskAry.push(response)
                render()
                taskInp.val('')
                calcCount()
            }
        })

    }
})


// 删除任务
taskBox.on('click', '.destroy', function () {
    let id = $(this).attr('data-id')
    $.ajax({
        url: '/deleteTask',
        type: 'get',
        data: {
            _id: id
        },
        success: function (response) {
            let index = taskAry.findIndex(item => item._id == id)
            taskAry.splice(index, 1)
            renderCal()
        }
    })
})

// 修改状态
taskBox.on('change', '.toggle', function () {
    let status = $(this).is(':checked')
    let id = $(this).siblings('button').attr('data-id')
    $.ajax({
        type: 'post',
        url: '/modifyTask',
        data: JSON.stringify({ _id: id, completed: status }),
        contentType: 'application/json',
        success: function (response) {
            let task = taskAry.find(item => item._id == id)
            task.completed = response.completed
            renderCal()
        }
    })
})

// 双击修改内容
taskBox.on('dblclick', 'label', function () {
    $(this).parent().parent().addClass('editing')
    $(this).parent().siblings('input').val($(this).text())
    $(this).parent().siblings('input').focus()
})

// 修改内容
taskBox.on('blur', '.edit', function () {
    let newTaskName = $(this).val()
    let id = $(this).siblings().find('button').attr('data-id')
    $.ajax({
        url: '/modifyTask',
        type: 'post',
        data: JSON.stringify({ _id: id, title: newTaskName }),
        contentType: 'application/json',
        success: function (response) {
            let task = taskAry.find(item => item._id == id)
            task.title = response.title
            renderCal()
        }
    })
})
