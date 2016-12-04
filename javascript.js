var text = ["Welcome to Frankie's Terminal. Feel free to explore as much as you'd like.\n\nTry typing 'help' for more info\n\n"]
/*
 *
 * {
 *   "/": {
 *      "resume.txt":"Contains this information"
 *      "/home": {
 *          "file.txt":"La"
 *      }   
 *   }, 
 *
 *  
 *
 *
 * }
 *
 */

var fileSystem = {}
var directory = "/"
var user = "root"
var withCursor = false
var currentCommand = [];
var specialKeys = {
    "Shift":handleShift,
    "Backspace":handleBackspace,
    "Enter":handleEnter,
    "Control":handleControl,
    "Escape":handleEscape,
    "ArrowUp":handleArrowUp, 
}


var commands = {
    "ls":ls,
    "help":help,
    "cat":cat,
    "clear":clear
}   

// Command Functions

function clear() {
    text = [];
}

function cat() {

}

function ls() {

}

function help() {
    let text = "Here are a list of commands available to you \n\n\
    ls - List all files in directory\n\
    cat - Read file in current directory\n\
    help - Bring up this help prompt\n\
    clear - Clears screen\n\
    "
    return text
}

// Key Functions

function handleArrowUp() {

}

function handleShift() {}

function handleBackspace() {}

function handleEnter() {
    let command = currentCommand.join("")
    currentCommand = []
    var output = executeCommand(command)
    if (output != undefined)
        text.push(output + "\n");
}

function handleControl() {}

function handleEscape() {}

// Other Functions

function executeCommand(command) {
    if (command == undefined) 
        return "Invalid Command"
    command = command.split(" ")
    if (commands[command[0]]) {
        return commands[command[0]](command)
    } else {
        return "Invalid Command"
    }
}

function render() {
    $("#terminal").html(text.join(""));
}


function drawName() {
    cursor = !withCursor ? "<font color='black'>#</font>" : "#"
    $("#terminal").append(user + ":" + directory + cursor + " " + currentCommand.join(""))
}

setInterval(function() { render(); drawName() }, 0);
setInterval(function() {
    if (withCursor) 
        withCursor = false
    else
        withCursor = true
}, 500);

$(window).keydown(function(e) {
    if (specialKeys[e.key] == undefined) {
        currentCommand.push(e.key)
    } else {
        specialKeys[e.key]()
    }
});

