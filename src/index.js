import Game from "./Models/game"

let runButton = document.getElementById("run-stop-button");
let stepButton = document.getElementById("step-button");
let clearButton = document.getElementById("clear-button");
let randomButton = document.getElementById("random-button");

let game = new Game(50,50);
game.draw();

function registerEvents(){

    runButton.onclick = toggleRun;
    stepButton.onclick = makeStep;
    clearButton.onclick = clearGame;
    randomButton.onclick = randomizeSelectedCellsInGame;
}

registerEvents();

function toggleRun(){

    if(game.running){
        runButton.innerText = "Run";
        game.stop();
        setEnabledStateOfButtonsStepClearAndRandom(true);
        return;
    }

    setEnabledStateOfButtonsStepClearAndRandom(false);
    runButton.innerText = "Stop";
    game.run();
}

function setEnabledStateOfButtonsStepClearAndRandom(areButtonsEnabled){
    stepButton.disabled = !areButtonsEnabled;
    clearButton.disabled = !areButtonsEnabled;
    randomButton.disabled = !areButtonsEnabled;
}

function makeStep(){
    if(game.running){
        return;
    }
    
    game.step();
    game.draw();
}


function clearGame(){
    if(game.running){
        return;
    }

    game.clearBoard();
    game.draw();
}

function randomizeSelectedCellsInGame(){
    if(game.running){
        return;
    }

    game.setupRandomizedGameBoard();
    game.draw();
}
