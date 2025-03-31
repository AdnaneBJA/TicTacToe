import { Injectable } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import * as StompJS from '@stomp/stompjs';
import { ChatboxComponent } from '../chatbox/chatbox.component';

@Injectable({
  providedIn: 'root',
})
export class Player {
  currentPlayer: string = 'X';
  stompClient: StompJS.Client | null = null;
  constructor() {}

  age: number = 15;

  makeAMove(board: string[], index: number) {
    // console.log(this.isValidMove(board, index));

    if (this.isValidMove(board, index)) {
      board[index] = this.currentPlayer;
      //   console.log(
      //     'Move made, current board: ' +
      //       board +
      //       ', Current Player: ' +
      //       this.currentPlayer
      //   );

      if (this.currentPlayer == 'X') {
        this.currentPlayer = 'O';
      } else {
        this.currentPlayer = 'X';
      }
    } else {
      return;
    }
  }

  isValidMove(board: string[], index: number): boolean {
    if (board[index] == '') {
      return true;
    }

    return false;
  }
}
