import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IData } from '../../interfaces/IData.interface';

export interface TileModel {
  row: number;
  col: number;
  value: 0 | 1 | 2;
  color?: string;
}

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TileComponent {
  @Input() tile!: TileModel;
  @Input() gameData!: IData;

  @Output() tileClick = new EventEmitter<number>();

  onClick(): void {
    console.log(`Tile clicked at row ${this.tile.row}, col ${this.tile.col}`);
    if (this.tile.value === 0){
      this.tileClick.emit(this.tile.col);
    }
    else { alert("Invalid placement."); }
  }

  get cssClass(): string {
    if (!this.tile) return 'empty';
    return this.tile.value === 1 ? 'player1' : this.tile.value === 2 ? 'player2' : 'empty';
  }

  get tileStyle(): { [key: string]: string } {
    if (this.tile.value === 1) {
      return { 'background-color': this.gameData.p1c };
    } else if (this.tile.value === 2) {
      return { 'background-color': this.gameData.p2c };
    }
    return {};
  }
}
