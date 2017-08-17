import Board from "./board";
import Cell from "./cell";

class Game{
    constructor(widthCellsCount, heightCellsCount){
        this.widthCellsCount = widthCellsCount;
        this.heightCellsCount = heightCellsCount;

        this.running = false;
        this.gameDrawingTimerId = -1;

        this.board = new Board(widthCellsCount, heightCellsCount);
        this.createGameTable();
    }

    createGameTable(){
        const gameContext = this;
        let fragment = document.createDocumentFragment();
        for (let row = 0; row < this.heightCellsCount; row++) {

            let tr = document.createElement("tr");
            
            for (let column = 0; column < this.widthCellsCount; column++) {
                let td = document.createElement("td");
                td.setAttribute("id", row + "," + column);
                td.onclick = function cellClickHandler() {
                    if(gameContext.running)
                        return;
                    
                    const cellCoordinates = this.id.split(",");
                    const row = cellCoordinates[0];
                    const column = cellCoordinates[1];
                    let currentCellData = gameContext.board.getCell(row, column);
                    currentCellData.isAlive = !currentCellData.isAlive;
                    gameContext.updateCellView(td, currentCellData.isAlive);
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

    stop(){
        this.running = false;
        clearInterval(this.gameDrawingTimerId);
    }
    
    run(){
        this.running = true;
        const stepIntervalInMilliSeconds = 300;
        this.gameDrawingTimerId = setInterval(() => {
            this.step();
            this.draw();
        }, stepIntervalInMilliSeconds);
    }

    step(){
        const lastStepBoard = this.board.clone(); 
        for (let row = 0; row < this.heightCellsCount; row++) {
            for (let column = 0; column < this.widthCellsCount; column++) {

                let currentCell = this.board.getCell(row,column);

                let cellAliveNeighborsCount = lastStepBoard.getCellAliveNeighborsCount(currentCell);

                if (currentCell.isAlive) {
                    if (cellAliveNeighborsCount < 2 || cellAliveNeighborsCount > 3) {
                        currentCell.isAlive = false;
                    }
                } else if (cellAliveNeighborsCount === 3) {
                        currentCell.isAlive = true;
                }
            };
        };
    }

    draw(){

        for (let row = 0; row < this.heightCellsCount; row++) {
            for (let column = 0; column < this.widthCellsCount; column++) {
                let td = document.getElementById(row + "," + column);
                this.updateCellView(td, this.board.getCell(row,column).isAlive);
                
            }
        }
    }

    updateCellView(td, isAlive){
        if(isAlive)
            td.classList.add("alive");
        else    
            td.classList.remove("alive"); 
    }

    clearBoard(){
        this.board.clear();
    }
    
    setupRandomizedGameBoard(){
        for (let row = 0; row < this.heightCellsCount; row++) {
            for (let column = 0; column < this.widthCellsCount; column++) {
                let currentCell = this.board.getCell(row,column);
                const randomBoolean = Math.random() >= 0.5;
                currentCell.isAlive = randomBoolean;                
            }
        }
    }
}

export default Game;
