import Board from "./board";
import Cell from "./cell";

class Game{
    constructor(widthCellsCount, heightCellsCount){
        this.widthCellsCount = widthCellsCount;
        this.heightCellsCount = heightCellsCount;

        this.running = false;
        this.gameDrawingTimerId = -1;

        this.board = new Board(widthCellsCount, heightCellsCount);
    }

    stop(){
        this.running = false;
        clearInterval(this.gameDrawingTimerId);
    }
    
    run(callbackOnEachGameStep){
        this.running = true;
        const stepIntervalInMilliSeconds = 300;
        this.gameDrawingTimerId = setInterval(() => {
            this.step();
            callbackOnEachGameStep();
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
