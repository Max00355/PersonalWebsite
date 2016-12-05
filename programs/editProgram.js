var fileText = []
var editProgramRunning = false
var indexAt;

function editProgram(command) {    
    programRunning = true
    editProgramRunning = true
    let fs = getCurrentDir()
    fileName = command[1]
    if(fileName === undefined || fs[fileName] === undefined) {
        programRunning = false
        editProgramRunning = false
        return "That file does not exist"
    }

    else if (typeof fs[fileName] === "object")
        return "That is a folder"

    loadFile(fileName, fs);
    indexAt = fileText.length
    setInterval(function() {
        if (!editProgramRunning) return
        if(lastKey === "Escape") {
            programRunning = false
            editProgramRunning = false
            fileText.pop(indexAt)
            addToFS(fileName, fileText.join(""))            
            currentCommand = []
        }
        //fileText[indexAt] = "|"
        processKeyPress()
        renderText()
    }, 0)
}

function processKeyPress() {
    ignore = ["Shift", "Control", "Escape"]
    if (lastKey !== undefined) {
        if(ignore.indexOf(lastKey) !== -1) {
            lastKey = undefined
            return
        }
        if(lastKey === "Enter") {
            fileText.splice(indexAt + 1, 0, '\n') 
            indexAt++
        } else if(lastKey === "Backspace") {
            if(indexAt === fileText.length)
                indexAt--
            fileText.splice(indexAt, 1)
        } else if(lastKey === "ArrowLeft") {
            if(indexAt > 0)
                indexAt--
        } else if(lastKey === "ArrowRight") {
            if(indexAt < fileText.length) {
                indexAt++
            }  
        } else {
            indexAt++
            fileText.splice(indexAt, 0, lastKey)
        }
        lastKey = undefined
    }
}

function renderText() {
    $("#terminal").html(fileText.join(""))
}

function loadFile(fileName, fs) {
    for (var x = 0; x < fs[fileName].length; x++) {
        fileText.push(fs[fileName][x]);
    }   
}
