import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { CommonModule } from '@angular/common';
import { ITileModel } from '../../interfaces/ITileModel.interface';
import { IData } from '../../interfaces/IData.interface';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [
    TileComponent,
    CommonModule
  ]
})
export class BoardComponent implements OnInit, OnChanges {
  readonly ROWS = 6;
  readonly COLS = 7;

  board: ITileModel[][] = [];
  currentPlayer: 1 | 2 = 1;
  gameOver = false;
  winnerName: string = '';

  @Input() gameData: IData = {
    p1n: 'player 1',
    p2n: 'player 2',
    p1c: 'red',
    p2c: 'yellow'
  };
  @Output() gameWon = new EventEmitter<void>();

  ngOnInit(): void {
    this.resetBoard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gameData'] && !changes['gameData'].firstChange) {
      // Data changed, reset the board
      this.resetBoard();
    }
  }

  resetBoard(): void {
    this.gameOver = false;
    this.currentPlayer = 1;
    this.board = [];

    for (let r = 0; r < this.ROWS; r++) {
      const rowArray: ITileModel[] = [];
      for (let c = 0; c < this.COLS; c++) {
        rowArray.push({ row: r, col: c, value: 0 });
      }
      this.board.push(rowArray);
    }
    console.log(this.board);
  }

  // Try to drop a disc in the given column
  dropDisc(colIndex: number): boolean {
    if (this.gameOver) {
      return false;
    }
    for (let row = this.ROWS - 1; row > 0; row--) {
      const tile = this.board[row][colIndex];
      console.log(this.board);
      if (tile.value === 0) {
        console.log("Checking tile at row " + row + ", col " + colIndex);
        tile.value = this.currentPlayer;
        if (this.checkWin(row, colIndex, this.currentPlayer)) {
          this.gameOver = true;
          alert(`Player ${this.currentPlayer} wins!`);
          this.gameWon.emit();
        } else if (this.isBoardFull()) {
          this.gameOver = true;
          alert("It's a draw!");
          this.gameWon.emit();
        } else {
          this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        }
        return true;
      }
    }
    return false; // column full
  }

  isBoardFull(): boolean {
    return this.board.every(row => row.every(tile => tile.value !== 0));
  }

  private checkWin(row: number, col: number, player: number): boolean {
    const directions = [
      { dr: 0, dc: 1 },
      { dr: 1, dc: 0 },
      { dr: 1, dc: 1 },
      { dr: 1, dc: -1 }
    ];

    for (const dir of directions) {
      let count = 1;
      count += this.countInDirection(row, col, dir.dr, dir.dc, player);
      count += this.countInDirection(row, col, -dir.dr, -dir.dc, player);
      if (count >= 4) return true;
    }
    return false;
  }

  private countInDirection(startR: number, startC: number, dr: number, dc: number, player: number): number {
    let r = startR + dr;
    let c = startC + dc;
    let cnt = 0;
    while (r >= 0 && r < this.ROWS && c >= 0 && c < this.COLS && this.board[r][c].value === player) {
      cnt++;
      r += dr;
      c += dc;
    }
    return cnt;
  }

  // Called from tiles when a user clicks a tile — uses column index
  onColumnClick(colIndex: number): void {
    this.dropDisc(colIndex);
  }
}
