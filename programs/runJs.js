function runJs(command) {
    if (command[1] === undefined)
        return "Invalid file name"
    let fs = getCurrentDir()    
    if(fs[command[1]] === undefined || typeof fs[command[1]] === "object")
        return "Invalid file name"
    eval(fs[command[1]])
}
