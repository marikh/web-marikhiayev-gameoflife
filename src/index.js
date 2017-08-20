import Game from "./models/game"

let runButton = document.getElementById("run-stop-button");
let stepButton = document.getElementById("step-button");
let clearButton = document.getElementById("clear-button");
let randomButton = document.getElementById("random-button");

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
    game.run(callbackOnEachGameStep);
}

function callbackOnEachGameStep(){
    draw();
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
    draw();
}

function clearGame(){
    if(game.running){
        return;
    }

    game.clearBoard();
    draw();
}

function randomizeSelectedCellsInGame(){
    if(game.running){
        return;
    }

    game.setupRandomizedGameBoard();
    draw();
}

let game = new Game(50,50);
createGameView();

function createGameView(){
    let fragment = document.createDocumentFragment();
    for (let row = 0; row < game.heightCellsCount; row++) {

        let tr = document.createElement("tr");
        
        for (let column = 0; column < game.widthCellsCount; column++) {
            let td = document.createElement("td");
            td.setAttribute("id", row + "," + column);
            td.onclick = function cellClickHandler() {
                if(game.running)
                    return;
                
                const cellCoordinates = this.id.split(",");
                const row = cellCoordinates[0];
                const column = cellCoordinates[1];
                let currentCellData = game.board.getCell(row, column);
                currentCellData.isAlive = !currentCellData.isAlive;
                updateCellView(td, currentCellData.isAlive);
            };

            tr.appendChild(td);
        }
        
        //does not trigger reflow
        fragment.appendChild(tr);
    }

    let table = document.createElement("table");

    table.appendChild(fragment);

    document.getElementById("container").appendChild(table);
}

function draw(){

    for (let row = 0; row < game.heightCellsCount; row++) {
        for (let column = 0; column < game.widthCellsCount; column++) {
            let td = document.getElementById(row + "," + column);
            updateCellView(td, game.board.getCell(row,column).isAlive);
        }
    }
}

function updateCellView(td, isAlive){
    if(isAlive)
        td.classList.add("alive");
    else    
        td.classList.remove("alive"); 
}
