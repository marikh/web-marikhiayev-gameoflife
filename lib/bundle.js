/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function Cell(row, column) {
    _classCallCheck(this, Cell);

    this.row = row;
    this.column = column;

    this.isAlive = false;
};

exports.default = Cell;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runButton = document.getElementById("run-stop-button");
var stepButton = document.getElementById("step-button");
var clearButton = document.getElementById("clear-button");
var randomButton = document.getElementById("random-button");

var game = new _game2.default(50, 50);
game.draw();

function registerEvents() {

    runButton.onclick = toggleRun;
    stepButton.onclick = makeStep;
    clearButton.onclick = clearGame;
    randomButton.onclick = randomizeSelectedCellsInGame;
}

registerEvents();

function toggleRun() {

    if (game.running) {
        runButton.innerText = "Run";
        game.stop();
        setEnabledStateOfButtonsStepClearAndRandom(true);
        return;
    }

    setEnabledStateOfButtonsStepClearAndRandom(false);
    runButton.innerText = "Stop";
    game.run();
}

function setEnabledStateOfButtonsStepClearAndRandom(areButtonsEnabled) {
    stepButton.disabled = !areButtonsEnabled;
    clearButton.disabled = !areButtonsEnabled;
    randomButton.disabled = !areButtonsEnabled;
}

function makeStep() {
    if (game.running) {
        return;
    }

    game.step();
    game.draw();
}

function clearGame() {
    if (game.running) {
        return;
    }

    game.clearBoard();
    game.draw();
}

function randomizeSelectedCellsInGame() {
    if (game.running) {
        return;
    }

    game.setupRandomizedGameBoard();
    game.draw();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(4);

var _board2 = _interopRequireDefault(_board);

var _cell = __webpack_require__(0);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(widthCellsCount, heightCellsCount) {
        _classCallCheck(this, Game);

        this.widthCellsCount = widthCellsCount;
        this.heightCellsCount = heightCellsCount;

        this.running = false;
        this.gameDrawingTimerId = -1;

        this.board = new _board2.default(widthCellsCount, heightCellsCount);
        this.createGameTable();
    }

    _createClass(Game, [{
        key: "createGameTable",
        value: function createGameTable() {
            var gameContext = this;
            var fragment = document.createDocumentFragment();
            for (var row = 0; row < this.heightCellsCount; row++) {

                var tr = document.createElement("tr");

                var _loop = function _loop(column) {
                    var td = document.createElement("td");
                    td.setAttribute("id", row + "," + column);
                    td.onclick = function cellClickHandler() {
                        if (gameContext.running) return;

                        var cellCoordinates = this.id.split(",");
                        var row = cellCoordinates[0];
                        var column = cellCoordinates[1];
                        var currentCellData = gameContext.board.getCell(row, column);
                        currentCellData.isAlive = !currentCellData.isAlive;
                        gameContext.updateCellView(td, currentCellData.isAlive);
                    };

                    tr.appendChild(td);
                };

                for (var column = 0; column < this.widthCellsCount; column++) {
                    _loop(column);
                }

                //does not trigger reflow
                fragment.appendChild(tr);
            }

            var table = document.createElement("table");

            table.appendChild(fragment);

            document.getElementById("container").appendChild(table);
        }
    }, {
        key: "stop",
        value: function stop() {
            this.running = false;
            clearInterval(this.gameDrawingTimerId);
        }
    }, {
        key: "run",
        value: function run() {
            var _this = this;

            this.running = true;
            var stepIntervalInMilliSeconds = 300;
            this.gameDrawingTimerId = setInterval(function () {
                _this.step();
                _this.draw();
            }, stepIntervalInMilliSeconds);
        }
    }, {
        key: "step",
        value: function step() {
            var lastStepBoard = this.board.clone();
            for (var row = 0; row < this.heightCellsCount; row++) {
                for (var column = 0; column < this.widthCellsCount; column++) {

                    var currentCell = this.board.getCell(row, column);

                    var cellAliveNeighborsCount = lastStepBoard.getCellAliveNeighborsCount(currentCell);

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
    }, {
        key: "draw",
        value: function draw() {

            for (var row = 0; row < this.heightCellsCount; row++) {
                for (var column = 0; column < this.widthCellsCount; column++) {
                    var _td = document.getElementById(row + "," + column);
                    this.updateCellView(_td, this.board.getCell(row, column).isAlive);
                }
            }
        }
    }, {
        key: "updateCellView",
        value: function updateCellView(td, isAlive) {
            if (isAlive) td.classList.add("alive");else td.classList.remove("alive");
        }
    }, {
        key: "clearBoard",
        value: function clearBoard() {
            this.board.clear();
        }
    }, {
        key: "setupRandomizedGameBoard",
        value: function setupRandomizedGameBoard() {
            for (var row = 0; row < this.heightCellsCount; row++) {
                for (var column = 0; column < this.widthCellsCount; column++) {
                    var currentCell = this.board.getCell(row, column);
                    var randomBoolean = Math.random() >= 0.5;
                    currentCell.isAlive = randomBoolean;
                }
            }
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cell = __webpack_require__(0);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board(widthCellsCount, heightCellsCount) {
        _classCallCheck(this, Board);

        this.widthCellsCount = widthCellsCount;
        this.heightCellsCount = heightCellsCount;
        this.grid = [];

        this.initializeBoard();
    }

    _createClass(Board, [{
        key: 'initializeBoard',
        value: function initializeBoard() {

            this.clear();

            this.grid = [];

            for (var row = 0; row < this.heightCellsCount; row++) {
                var currentRowCells = [];

                for (var column = 0; column < this.widthCellsCount; column++) {
                    currentRowCells.push(new _cell2.default(row, column));
                };

                this.grid.push(currentRowCells);
            };
        }
    }, {
        key: 'clone',
        value: function clone() {
            var clonedBoard = Object.assign(new Board(), this);
            clonedBoard.grid = this.getGridCopy();
            return clonedBoard;
        }
    }, {
        key: 'getGridCopy',
        value: function getGridCopy() {
            var clonedGrid = [];

            for (var row = 0; row < this.heightCellsCount; row++) {
                var currentRowCells = [];

                for (var column = 0; column < this.widthCellsCount; column++) {
                    currentRowCells.push(Object.assign({}, this.grid[row][column]));
                };

                clonedGrid.push(currentRowCells);
            };

            return clonedGrid;
        }
    }, {
        key: 'getCell',
        value: function getCell(row, column) {

            if (row < 0 || row > this.heightCellsCount) return null;
            if (column < 0 || column > this.widthCellsCount) return null;

            return this.grid[row][column];
        }
    }, {
        key: 'getCellAliveNeighborsCount',
        value: function getCellAliveNeighborsCount(cell) {
            if (cell == null || this.validateCellCoordinates(cell.row, cell.column) == false) {
                return 0;
            }

            var rowMinus1Valid = this.validateRowNumber(cell.row - 1);
            var rowPlus1Valid = this.validateRowNumber(cell.row + 1);
            var columnMinus1Valid = this.validateColumnNumber(cell.column - 1);
            var columnPlus1Valid = this.validateColumnNumber(cell.column + 1);

            var cellNeighborsCount = 0;

            if (rowMinus1Valid) {
                if (columnMinus1Valid && this.grid[cell.row - 1][cell.column - 1].isAlive) ++cellNeighborsCount;

                if (this.grid[cell.row - 1][cell.column].isAlive) ++cellNeighborsCount;

                if (columnPlus1Valid && this.grid[cell.row - 1][cell.column + 1].isAlive) ++cellNeighborsCount;
            }

            if (columnMinus1Valid && this.grid[cell.row][cell.column - 1].isAlive) ++cellNeighborsCount;

            if (columnPlus1Valid && this.grid[cell.row][cell.column + 1].isAlive) ++cellNeighborsCount;

            if (rowPlus1Valid) {
                if (columnMinus1Valid && this.grid[cell.row + 1][cell.column - 1].isAlive) ++cellNeighborsCount;

                if (this.grid[cell.row + 1][cell.column].isAlive) ++cellNeighborsCount;

                if (columnPlus1Valid && this.grid[cell.row + 1][cell.column + 1].isAlive) ++cellNeighborsCount;
            }

            return cellNeighborsCount;
        }
    }, {
        key: 'validateCellCoordinates',
        value: function validateCellCoordinates(row, column) {

            return this.validateRowNumber(row) && this.validateColumnNumber(column);
        }
    }, {
        key: 'validateRowNumber',
        value: function validateRowNumber(row) {
            return row >= 0 && row < this.heightCellsCount;
        }
    }, {
        key: 'validateColumnNumber',
        value: function validateColumnNumber(column) {
            return column >= 0 && column < this.widthCellsCount;
        }
    }, {
        key: 'clear',
        value: function clear() {
            if (this.grid == null || this.grid.length === 0) return;

            for (var row = 0; row < this.heightCellsCount; row++) {
                for (var column = 0; column < this.widthCellsCount; column++) {
                    this.grid[row][column].isAlive = false;
                }
            }
        }
    }]);

    return Board;
}();

exports.default = Board;

/***/ })
/******/ ]);