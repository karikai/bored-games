import { Tile } from './tile';
import { Hero } from './hero-tile';

export class IBoard {
    board = [];
    rows: number;
    columns: number;
    rowsStyles = '';
    columnsStyles = '';

    // Tile Operations

    moveTileUp(event) {
        console.log(event);
        const initiater = event.srcElement.parentElement;
        const replacer = this.tileFinder(initiater.id.substring(2));
        const newInfo = replacer.tileInfo;
        this.board[replacer.row][replacer.column].tileInfo = this.board[replacer.row - 1][replacer.column].tileInfo;
        this.board[replacer.row - 1][replacer.column].tileInfo = newInfo;
        this.refresh();
    }

    moveTileDown(event) {
        console.log(event);
        const initiater = event.srcElement.parentElement;
        const replacer = this.tileFinder(initiater.id.substring(2));
        const newInfo = replacer.tileInfo;
        this.board[replacer.row][replacer.column].tileInfo = this.board[replacer.row + 1][replacer.column].tileInfo;
        this.board[replacer.row + 1][replacer.column].tileInfo = newInfo;
        this.refresh();
    }

    moveTileLeft(event) {
        console.log(event);
        const initiater = event.srcElement.parentElement;
        const replacer = this.tileFinder(initiater.id.substring(2));
        const newInfo = replacer.tileInfo;
        this.board[replacer.row][replacer.column].tileInfo = this.board[replacer.row][replacer.column - 1].tileInfo;
        this.board[replacer.row][replacer.column - 1].tileInfo = newInfo;
        this.refresh();
    }

    moveTileRight(event) {
        console.log(event);
        const initiater = event.srcElement.parentElement;
        const replacer = this.tileFinder(initiater.id.substring(2));
        const newInfo = replacer.tileInfo;
        this.board[replacer.row][replacer.column].tileInfo = this.board[replacer.row][replacer.column + 1].tileInfo;
        this.board[replacer.row][replacer.column + 1].tileInfo = newInfo;
        this.refresh();
    }

    attackUp(event) {
        const initiater = event.srcElement.parentElement;
        const currentTile = this.tileFinder(initiater.id.substring(2));
        const targetTile = this.board[currentTile.row - 1][currentTile.column];
        if (targetTile.tileInfo) {
            targetTile.tileInfo.currentHP -= 10;
        }
        this.refresh();
    }

    attackDown(event) {
        const initiater = event.srcElement.parentElement;
        const currentTile = this.tileFinder(initiater.id.substring(2));
        const targetTile = this.board[currentTile.row + 1][currentTile.column];
        if (targetTile.tileInfo) {
            targetTile.tileInfo.currentHP -= 10;
        }
        this.refresh();
    }

    attackLeft(event) {
        const initiater = event.srcElement.parentElement;
        const currentTile = this.tileFinder(initiater.id.substring(2));
        const targetTile = this.board[currentTile.row][currentTile.column - 1];
        if (targetTile.tileInfo) {
            targetTile.tileInfo.currentHP -= 10;
        }
        this.refresh();
    }

    attackRight(event) {
        const initiater = event.srcElement.parentElement;
        const currentTile = this.tileFinder(initiater.id.substring(2));
        const targetTile = this.board[currentTile.row][currentTile.column + 1];
        if (targetTile.tileInfo) {
            targetTile.tileInfo.currentHP -= 10;
        }
        this.refresh();
    }

    attack1Up(event) {
        const initiater = event.srcElement.parentElement;
        const currentTile = this.tileFinder(initiater.id.substring(2));
        for (let i = -1; i < 2; i++) {
            for (let k = 1; k < 3; k++) {
                const targetTile = this.board[currentTile.row - k ][currentTile.column + i];
                if (targetTile.tileInfo) {
                    targetTile.tileInfo.currentHP -= 50;
                }
            }
        }
        this.refresh();
    }

    replaceTile(event) {
        const initiater = event.srcElement;
        const replacer = this.tileFinder(initiater.id.substring(2));
        const t17 = this.tileFinder(17);
        this.board[replacer.row][replacer.column].tileInfo = t17.tileInfo;
        this.refresh();
    }

    // Generates Grid Styles
    createRowStyles() {
        this.rowsStyles = '';
        for (let i = 0; i < this.rows; i++) {
            this.rowsStyles = this.rowsStyles + '1fr ';
        }
        return this.rowsStyles;
    }

    createColumnsStyles() {
        this.columnsStyles = '';
        for (let i = 0; i < this.columns; i++) {
            this.columnsStyles += '1fr ';
        }
        return this.columnsStyles;
    }

    // Initializes Game Board

    initBoard(length, width) {
        let tempArray = [];
        for (let c = 0; c < length; c++) {
            for (let r = 0; r < width; r++) {
                tempArray[r] = 0;
            }
            this.board.push(tempArray);
            tempArray = [];
        }
    }

    setBoard() {
        const boardElement = document.getElementById('board');
        boardElement.style.gridTemplateRows = this.createRowStyles();
        boardElement.style.gridTemplateColumns = this.createColumnsStyles();
    }

    generateTiles() {
        for (let i = 0; i < (this.rows * this.columns); i++) {
            const tileObj = new Tile(i, this.columns);
            this.board[tileObj.row][tileObj.column] = tileObj;
        }
    }

    tileToDiv(tile: Tile) {
        const tileElement = document.createElement('div');
        tileElement.id = ('t-' + tile.position);
        tileElement.className = 'tile';
        tile.domElement = tileElement;
        if (tile.tileInfo) {
            this.addDirections(tile);
            this.addAttacks(tile);
            const p = document.createElement('p');
            p.innerText = tile.tileInfo.name;
            const p2 = document.createElement('p');
            p2.innerText = tile.tileInfo.currentHP + '/' + tile.tileInfo.maxHP;
            const hpBar = document.createElement('div');
            const hpPercent = document.createElement('div');
            hpBar.appendChild(hpPercent);
            hpBar.style.width = '90%';
            hpBar.style.border = 'gray 1px solid';
            hpPercent.style.background = 'green';
            hpPercent.style.height = '1vh';
            hpPercent.style.width = ((tile.tileInfo.currentHP / tile.tileInfo.maxHP) * 100) + '%';
            tileElement.appendChild(p);
            tileElement.appendChild(p2);
            tileElement.appendChild(hpBar);
            if (tile.tileInfo.currentHP <= 0) {
                tileElement.innerHTML = '';
                tileElement.style.transform = 'scaleY(-1)';
            }
            if (tile.tileInfo.heroType === 'wizard') {
                const wizardImage = document.createElement('img');
                wizardImage.src = 'assets/wizard.png';
                wizardImage.style.height = '75px';
                wizardImage.style.display = 'block';
                wizardImage.style.margin = 'auto';
                tileElement.appendChild(wizardImage);
            }
            if (tile.tileInfo.heroType === 'grunt') {
                const wizardImage = document.createElement('img');
                wizardImage.src = 'assets/grunt.png';
                wizardImage.style.height = '75px';
                wizardImage.style.display = 'block';
                wizardImage.style.margin = 'auto';
                tileElement.appendChild(wizardImage);
            }
            if (tile.tileInfo.heroType === 'wick') {
                const wizardImage = document.createElement('img');
                wizardImage.src = 'assets/wick.png';
                wizardImage.style.height = '75px';
                wizardImage.style.display = 'block';
                wizardImage.style.margin = 'auto';
                tileElement.appendChild(wizardImage);
            }
            if (tile.tileInfo.heroType === 'rocky') {
                const wizardImage = document.createElement('img');
                wizardImage.src = 'assets/rocky.png';
                wizardImage.style.height = '75px';
                wizardImage.style.display = 'block';
                wizardImage.style.margin = 'auto';
                tileElement.appendChild(wizardImage);
            }
        }
        return tileElement;
    }

    addDirections(tile: Tile) {
        const up = document.createElement('i');
        up.classList.add('fa');
        up.classList.add('fa-arrow-up');
        up.addEventListener('click', () => {
            // tslint:disable-next-line: deprecation
            this.moveTileUp(event);
        });
        const down = document.createElement('i');
        down.classList.add('fa');
        down.classList.add('fa-arrow-down');
        down.addEventListener('click', () => {
            // tslint:disable-next-line: deprecation
            this.moveTileDown(event);
        });
        const left = document.createElement('i');
        left.classList.add('fa');
        left.classList.add('fa-arrow-left');
        left.addEventListener('click', () => {
            // tslint:disable-next-line: deprecation
            this.moveTileLeft(event);
        });
        const right = document.createElement('i');
        right.classList.add('fa');
        right.classList.add('fa-arrow-right');
        right.addEventListener('click', () => {
            // tslint:disable-next-line: deprecation
            this.moveTileRight(event);
        });
        tile.domElement.appendChild(up);
        tile.domElement.appendChild(down);
        tile.domElement.appendChild(left);
        tile.domElement.appendChild(right);
        const br = document.createElement('br');
        tile.domElement.appendChild(br);
    }

    addAttacks(tile: Tile) {
        const up = document.createElement('i');
        up.classList.add('fa');
        up.classList.add('fa-arrow-up');
        up.style.color = 'red';
        up.addEventListener('click', () => {
          // tslint:disable-next-line: deprecation
          this.attackUp(event);
        });
        const up2 = document.createElement('i');
        up2.classList.add('fa');
        up2.classList.add('fa-arrow-up');
        up2.style.color = 'blue';
        up2.addEventListener('click', () => {
          // tslint:disable-next-line: deprecation
          this.attack1Up(event);
        });
        const down = document.createElement('i');
        down.classList.add('fa');
        down.classList.add('fa-arrow-down');
        down.style.color = 'red';
        down.addEventListener('click', () => {
          // tslint:disable-next-line: deprecation
          this.attackDown(event);
        });
        const left = document.createElement('i');
        left.classList.add('fa');
        left.classList.add('fa-arrow-left');
        left.style.color = 'red';
        left.addEventListener('click', () => {
          // tslint:disable-next-line: deprecation
          this.attackLeft(event);
        });
        const right = document.createElement('i');
        right.classList.add('fa');
        right.classList.add('fa-arrow-right');
        right.style.color = 'red';
        right.addEventListener('click', () => {
          // tslint:disable-next-line: deprecation
          this.attackRight(event);
        });
        tile.domElement.appendChild(up);
        tile.domElement.appendChild(down);
        tile.domElement.appendChild(left);
        tile.domElement.appendChild(right);
        tile.domElement.appendChild(up2);
      }

    tileFinder(n) {
        n = parseInt(n, 10);
        this.board.forEach((row) => {
            row.forEach(element => {
                if (n === element.position) {
                    n = element;
                }
            });
        });
        return n;
    }

    refresh() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';
        this.board.forEach((row) => {
            row.forEach(element => {
                boardElement.appendChild(this.tileToDiv(element));
            });
        });
    }

    placeTile(row, col, tile) {
        this.board[row][col] = tile;
    }

    replaceTileToDiv(func) {
        this.replaceTileToDiv = func();
    }

    constructor(length, width) {
        this.rows = length;
        this.columns = width;
        this.initBoard(length, width);
        this.setBoard();
        this.generateTiles();
        this.refresh();
    }
}
