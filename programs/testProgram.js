function testProgram() {
    programRunning = true
    $("#terminal").html("ASD");
    setTimeout(function() { programRunning = false }, 1000);
    function d() { console.log(lastKey);console.log(programRunning); if (!programRunning) { console.log("CLEAR");clearInterval(d); return}}
    setInterval(d, 0);
}
