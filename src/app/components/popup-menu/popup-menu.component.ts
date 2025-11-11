import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IData } from '../../interfaces/IData.interface';

@Component({
  selector: 'popup-menu',
  standalone: true,
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss'],
  imports: [
    FormsModule
  ]
})
export class PopupMenuComponent {
  @Input() message: string = "menu";
  @Output() closePopup = new EventEmitter<void>();
  @Output() restartGame = new EventEmitter<IData>();
  
  data: IData = {
    p1n: 'player 1',
    p2n: 'player 2',
    p1c: 'red',
    p2c: 'yellow'
  };

  closeMenu() {
    this.closePopup.emit();
  }

  restartG() {
    this.restartGame.emit(this.data);
  }
}
