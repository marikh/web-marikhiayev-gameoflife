import Cell from './cell';


class Board {
    
    constructor(widthCellsCount, heightCellsCount){
        this.widthCellsCount = widthCellsCount;
        this.heightCellsCount = heightCellsCount;
        this.grid=[];
        
        this.initializeBoard();
    }

    initializeBoard(){

        this.clear();

        this.grid = [];

        for (let row = 0; row < this.heightCellsCount; row++) {
            let currentRowCells = [];

            for (let column = 0; column < this.widthCellsCount; column++) {
                currentRowCells.push(new Cell(row,column));
            };
            
            this.grid.push(currentRowCells);
        };
    }

    clone(){
        let clonedBoard = Object.assign(new Board(), this);
        clonedBoard.grid = this.getGridCopy();
        return clonedBoard;
    }

    getGridCopy(){
        let clonedGrid = [];

        for (let row = 0; row < this.heightCellsCount; row++) {
            let currentRowCells = [];

            for (let column = 0; column < this.widthCellsCount; column++) {
                currentRowCells.push(Object.assign(new Cell(), this.grid[row][column]));
                // same: currentRowCells.push({...this.grid[row][column]});
            };
            
            clonedGrid.push(currentRowCells);
        };

        return clonedGrid;
    }

    getCell(row, column){

        if(row < 0 || row > this.heightCellsCount)
            return null;
        if(column < 0 || column > this.widthCellsCount)
            return null;

        return this.grid[row][column];
    }

    getCellAliveNeighborsCount(cell){
        if(cell == null || this.validateCellCoordinates(cell.row, cell.column) == false){
            return 0;
        }
        
        const rowMinus1Valid = this.validateRowNumber(cell.row - 1);
        const rowPlus1Valid = this.validateRowNumber(cell.row + 1);
        const columnMinus1Valid = this.validateColumnNumber(cell.column - 1);
        const columnPlus1Valid = this.validateColumnNumber(cell.column + 1);
        
        let cellNeighborsCount = 0;

        if(rowMinus1Valid){
            if(columnMinus1Valid && this.grid[cell.row - 1][cell.column - 1].isAlive)
                ++cellNeighborsCount;
            
            if(this.grid[cell.row - 1][cell.column].isAlive)
                ++cellNeighborsCount;
            
            if(columnPlus1Valid && this.grid[cell.row - 1][cell.column + 1].isAlive)
                ++cellNeighborsCount;
        }
        
        if(columnMinus1Valid && this.grid[cell.row][cell.column - 1].isAlive)
            ++cellNeighborsCount;
        
        if(columnPlus1Valid && this.grid[cell.row][cell.column + 1].isAlive)
            ++cellNeighborsCount;
        
        if(rowPlus1Valid){
            if(columnMinus1Valid && this.grid[cell.row + 1][cell.column - 1].isAlive)
                ++cellNeighborsCount;
            
            if(this.grid[cell.row + 1][cell.column].isAlive)
                ++cellNeighborsCount;
            
            if(columnPlus1Valid && this.grid[cell.row + 1][cell.column + 1].isAlive)
                ++cellNeighborsCount;
        }

        return cellNeighborsCount;
    }

    validateCellCoordinates(row, column){

        return this.validateRowNumber(row) && this.validateColumnNumber(column)
    }

    validateRowNumber(row){
        return row >= 0 && row < this.heightCellsCount;
    }

    validateColumnNumber(column){
        return column >= 0 && column < this.widthCellsCount;
    }

    clear(){
        if(this.grid == null || this.grid.length === 0)
            return;

        for (let row = 0; row < this.heightCellsCount; row++)
            for (let column = 0; column < this.widthCellsCount; column++)
                this.grid[row][column].isAlive = false;
    }
}

export default Board; 