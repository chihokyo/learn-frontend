let emailInp = document.getElementById('email')
let info = document.getElementById('info')
emailInp.onblur = function () {
    let email = this.value
    let reg = "" 
    if(!reg.test(email)){
        return 
    }
}