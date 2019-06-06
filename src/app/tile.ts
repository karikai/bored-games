export class Tile {
    maxWidth: number;
    position: number;
    row: number;
    column: number;
    tileInfo;
    domElement: HTMLElement;

    getPosition() {
        let pos = this.row * this.maxWidth;
        pos += (this.column - 1);
        return pos;
    }

    getRow() {
        return Math.trunc(this.position / this.maxWidth);
    }

    getColumn() {
        return this.position % this.maxWidth;
    }

    constructor(position, maxWidth) {
        this.position = position;
        this.maxWidth = maxWidth;
        this.row = this.getRow();
        this.column = this.getColumn();
    }
}
