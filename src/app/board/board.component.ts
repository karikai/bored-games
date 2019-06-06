import { Component, OnInit } from '@angular/core';
import { IBoard } from '../board';
import { Tile } from '../tile';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: IBoard;

  place(tile: Tile) {
    console.log(tile);
    this.board.placeTile(tile.getRow(), tile.getColumn(), tile);
    this.board.refresh();
  }

  constructor() {
  }

  ngOnInit() {
    this.board = new IBoard(5, 7);
    const tile = new Tile(24, 7);
    this.place(tile);
  }

}
