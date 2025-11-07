import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: 
  [
    CommonModule,
    BoardComponent,
    RouterOutlet
  ]
})
export class AppComponent {
  title = 'Connect_four';
}
