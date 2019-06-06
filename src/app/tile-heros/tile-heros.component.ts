import { Component, OnInit } from '@angular/core';
import { IBoard } from '../board';
import { Tile } from '../tile';
import { Hero } from '../hero-tile';

@Component({
  selector: 'app-tile-heros',
  templateUrl: './tile-heros.component.html',
  styleUrls: ['./tile-heros.component.css']
})
export class TileHerosComponent implements OnInit {
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
    let tile = new Tile(4, 7);
    tile.tileInfo = new Hero(Hero.WIZARDHP, '', Hero.WIZARD);
    this.place(tile);
    tile = new Tile(3, 7);
    tile.tileInfo = new Hero(Hero.GRUNTHP, '', Hero.GRUNT);
    this.place(tile);
    tile = new Tile(32, 7);
    tile.tileInfo = new Hero(Hero.WICKHP, '', Hero.WICK);
    this.place(tile);
    tile = new Tile(31, 7);
    tile.tileInfo = new Hero(Hero.ROCKYHP, '', Hero.ROCKY);
    this.place(tile);
    this.board.refresh();
  }

}
