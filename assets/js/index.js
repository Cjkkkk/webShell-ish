var command_history = []
var current_command = 0
var COMMAND = {
    "clear":clear,
    "signup":signup,
    "help":help,
    "notCommand":notCommand
} 
//命令
function clear(){
    var output = document.getElementById("output")
    var children = output.childNodes
    while(children.length > 0){
        output.removeChild(children[0])
    }
}

function signup(){
    window.location.href='https://recruit.zjuqsc.com'
}

function help(){
    var response = getResponse()
    output(response)
}

function notCommand(){
    var response = getResponse()
    output(response)
}

//获取输出内容
function getResponse(){
    return "test"
}
//输出内容
function output(response){
    var command = document.getElementById("command")
    var newElem = document.createElement("div")
    var hint = document.getElementById("hint")
    var output = document.getElementById("output")
    newElem.innerHTML = `${hint.innerText}${command.value}<br/>${response}`
    newElem.setAttribute("class", "result")
    output.appendChild(newElem) 
}

//执行命令
function execute(command){
    if(command.value in COMMAND)COMMAND[command.value]()
    else{
        COMMAND.notCommand()
    }
}

//更新命令历史
function update_command_history(command){
    command_history.push(command.value)
    current_command = command_history.length
    command.value = ""
}

function EnterPress(e){
    var e = e || window.event
    if(e.keyCode == 13){ 
        var command = document.getElementById("command")
        execute(command)
        update_command_history(command)
    } 
}

document.addEventListener("keydown", function(e) {
    var command = document.getElementById("command")
    if(document.activeElement.isEqualNode(command)){
        if(e.keyCode === 38){
            //page up
            if(current_command > 0){
                current_command -- 
                command.value = command_history[current_command]
            }
        }else if(e.keyCode === 40){
            //page down
            if(current_command < command_history.length - 1){
                current_command ++
                command.value = command_history[current_command]
            }
        }
    }
})