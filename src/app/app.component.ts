import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupMenuComponent } from './components/popup-menu/popup-menu.component';
import { BoardComponent } from './components/board/board.component';

import { IData } from './interfaces/IData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: 
  [
    RouterOutlet,
    CommonModule,
    PopupMenuComponent,
    BoardComponent,
  ]
})
export class AppComponent {
  title = 'Connect_four';
  popup: boolean = false;
  data: IData = {
    p1n: 'player 1',
    p2n: 'player 2',
    p1c: 'red',
    p2c: 'yellow'
  };

  ngOnInit(): void {
    this.popup = true;
  }

  popupSwitch(): void {
    this.popup = !this.popup;
  }
  restartGame(data: IData) {
    this.data = data;
    console.log(data);
    this.popupSwitch();
  }
}
