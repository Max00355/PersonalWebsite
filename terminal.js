var text = ["Welcome to Frankie's Terminal. \n\n\
My name is Franke Primerano, I am a software engineer living in San Francisco.\
\nHere you will find information about me, such as my projects and my resume.\n\
The catch is that you'll have to know some terminal commands to get where you need to go. Have fun ;)\n\n\
Try typing 'help' for more info\n\n"]

var fileSystem = {
    "/":{
        "hello.txt":"Hello! How are you? So I guess you know how to use Linux huh? Me too :)",
        "about":{
            "aboutme.txt": "Cool it works",
            "test":{
                "OMG.txt":"I really can't believe that it works this well already."
            }
        }
    }
}
var commandStack = []
var commandPointer = 0
var directory = ["/"]
var user = "guest"
var withCursor = false
var lastKey;
var currentCommand = [];
var specialKeys = {
    "Shift":handleShift,
    "Backspace":handleBackspace,
    "Enter":handleEnter,
    "Control":handleControl,
    "Escape":handleEscape,
    "ArrowUp":handleArrowUp,
    "ArrowLeft":handleArrowLeft,
    "ArrowRight":handleArrowRight,
    "ArrowDown":handleArrowDown
}
var programRunning = false

var useless = ["F1", "F2", "F3", "F4", "F5" ,"F6", "F7", "F8", "F9", "F10", "F11", "F12", "Insert", "Pause", "Tab", "CapsLock"]

var commands = {
    "edit":editProgram,
    "ls":ls,
    "help":help,
    "cat":cat,
    "clear":clear,
    "touch":touch,
    "mkdir":mkdir,
    "cd":cd
}   

// Command Functions

function touch(command) {
    addToFS(command[1], "")
}

function mkdir(command) {
    addToFS(command[1], {})
}

function clear() {
    text = [];
}

function cat(command) {
    if(command === undefined) 
        return "Invalid file"

    let fileSystemLoc = getCurrentDir()
    let fileData = fileSystemLoc[command[1]] 
    if (typeof fileData === "object") {
        return "That is a directory"
    } else if(fileData !== undefined) {
        return fileSystemLoc[command[1]]
    } 
    return "Invalid File"
}

function cd(command) {
    // Still some bugs with this function
    let newDir = command[1]
    if (newDir === undefined) 
        directory = ['/']
    else if (newDir === "../" || newDir === "..") {
        directory.pop(-1);
    }
    else {
        newDir = newDir.split("/")
        for(var x = 0; x < newDir.length; x++) {
            let on = newDir[x];
            if (on !== "") {
                directory.push(on)
            }
        }
    }
}

function ls() {
    let files = getCurrentDir();
    if (files != undefined) {
        let text = ""
        for(var key in files) {
            text += key + " "
        }
        return text
    } else {
        return "You seem to be in a directory that does not exist..."
    }
}

function help() {
    let text = "Here are a list of commands available to you \n\n\
    ls - List all files in directory\n\
    cat - Read file in current directory\n\
    help - Bring up this help prompt\n\
    cd - Change directory\n\
    clear - Clears screen\n\
    touch - Create a file\n\
    mkdir - Create a directory\n\
    edit - Edit a file\n\
    "
    return text
}

// Key Functions

function handleArrowUp() {
    if(commandStack[commandPointer] !== undefined) {
        currentCommand = commandStack[commandPointer]
        commandPointer++
    }
}

function handleArrowDown() {
    if(commandPointer > 0) {
        commandPointer--
        currentCommand = commandStack[commandPointer]
        console.log(commandPointer)
    }
}
function handleArrowLeft() {}
function handleArrowRight() {}

function handleShift() {}

function handleBackspace() {
    currentCommand.pop(-1);
}

function handleEnter() {
    commandStackPointer = 0
    commandStack.splice(0, 0, currentCommand)
    let command = currentCommand.join("")
    currentCommand = []
    var output = executeCommand(command)
    if (output != undefined)
        text.push(output + "\n");

}

function handleControl() {}

function handleEscape() {}

// Other Functions

function getCurrentDir() {
    let fileSystemLoc = fileSystem;
    for(var x = 0; x < directory.length; x++) {
        let d = directory[x];
        fileSystemLoc = fileSystemLoc[d];
    }
    return fileSystemLoc;
}

function addToFS(name, data) {
    let fs = fileSystem;
    for(var x = 0; x < directory.length; x++) {
        var d = directory[x];
        fs = fs[d]
    }

    fs[name] = data
}

function executeCommand(command) {
    if (command === undefined) 
        return "Invalid Command"
    command = command.split(" ")
    if (commands[command[0]]) {
        return commands[command[0]](command)
    } else {
        return "Invalid Command"
    }
}

function render() {
    if(!programRunning)
        $("#terminal").html(text.join(""));
}


function drawName() {
    if(!programRunning) {
        cursor = !withCursor ? "<font color='black'>#</font>" : "#"
        $("#terminal").append(user + ":" + directory.join("/") + " " + currentCommand.join("") + cursor)
	    window.scrollTo(0, $(window).height());
    }
}

setInterval(function() { render(); drawName() }, 0);
setInterval(function() {
    if (withCursor) 
        withCursor = false
    else
        withCursor = true
}, 500);

$(window).keydown(function(e) {
    lastKey = e.key
    if(useless.indexOf(e.key) !== -1) return
    if (specialKeys[e.key] === undefined) {
        currentCommand.push(e.key)
    } else {
        specialKeys[e.key]()
    }
});

