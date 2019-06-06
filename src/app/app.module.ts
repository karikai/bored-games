import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { TileHerosComponent } from './tile-heros/tile-heros.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TileHerosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
