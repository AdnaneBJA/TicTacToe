import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../GameLogic/player';
import { Router } from '@angular/router';
import * as StompJS from '@stomp/stompjs';
import { ChatboxComponent } from '../chatbox/chatbox.component';

import { WebsocketserviceService } from '../Services/AccountServices/websocketservice.service';
import { LobbylistComponent } from '../lobbylist/lobbylist.component';
import { GameserviceService } from '../Services/AccountServices/gameservice.service';

@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  gameIsOver: boolean = false;
  winner: string = 'DRAW';
  numberOfFilledCell: number = 0;
  loggedInUser: any = localStorage.getItem('username');

  // Information to sent into backend

  board: string[] = Array(9).fill('');
  lobbyID: number = -999;
  player1: string = 'X';
  player2: string = 'O';
  currentPlayer: string = 'X';
  playerNumber: number = -999;
  playerTurnNumber: number = 1;

  private isConnectedSubscription: Subscription | null = null;
  private isConnected: boolean = false;

  winningCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  constructor(
    public playerService: Player,
    private router: Router,
    public stompService: WebsocketserviceService,
    private gameService: GameserviceService
  ) {
    this.setupLobbyID(gameService);

    this.playerNumber = this.gameService.playerNumber;
    console.log(
      `Joined game... Your player ID is ${stompService.clientID}, Lobby ID is: ${this.lobbyID}`
    );

    this.isConnectedSubscription = stompService.isConnected.subscribe(
      (connected) => {
        if (connected) {
          this.connect();

          this.setupLobbyConnection();
          this.sendLobbyInfoToBackend();
        }
      }
    );
  }

  setupLobbyID(gameService: GameserviceService) {
    console.log('Game Service lobby ID: ' + this.gameService.lobbyID);

    if (this.gameService.lobbyID === -1) {
      this.lobbyID = this.generateLobbyId();
      this.gameService.lobbyID = this.lobbyID;
    } else {
      this.lobbyID = this.gameService.lobbyID;
    }
    console.log('Lobby Id is: ' + this.lobbyID);
  }

  setupLobbyConnection() {
    this.stompService.stompClient?.subscribe(
      `/topic/${this.lobbyID}`,
      (lobby) => {
        //console.log('Received Lobby: ', lobby);
      }
    );
  }

  sendLobbyInfoToBackend() {
    const sentInfo = {
      lobbyID: this.lobbyID,
      playerCount: 1,
    };

    // console.log('Sending this info to backend for lobbies: ', sentInfo);

    this.stompService.stompClient?.publish({
      destination: `/app/lobby/${this.lobbyID}`,
      body: JSON.stringify(sentInfo),
    });
  }

  connect() {
    console.log(`SUBSCRIBED TO: /topic/game/${this.lobbyID} `);
    this.stompService.stompClient?.subscribe(
      `/topic/game/${this.lobbyID}`,
      (game) => {
        // console.log(this.currentPlayer);
        this.gameIsOver = JSON.parse(game.body).isGameIsOver;
        this.playerService.currentPlayer = JSON.parse(game.body).currentPlayer;
        this.board = JSON.parse(game.body).board;
        this.winner = JSON.parse(game.body).winner;
        this.playerTurnNumber = JSON.parse(game.body).playerTurnNumber;
        //  console.log('Received Game from backend: ', JSON.parse(game.body));
      }
    );
  }

  reset() {
    this.board = Array(9).fill('');
    this.playerService.currentPlayer = 'X';
    this.gameIsOver = false;
    this.winner = 'DRAW !';
    this.numberOfFilledCell = 0;
  }

  makeMove(index: number) {
    if (this.gameIsOver || this.board[index] !== '') return;
    if (this.playerTurnNumber !== this.playerNumber) return;

    if (!this.gameIsOver) {
      this.playerService.makeAMove(this.board, index);
      this.playerTurnNumber = this.playerTurnNumber === 1 ? 2 : 1;
      this.numberOfFilledCell++;
      this.gameIsOver = this.checkTicTacToe();
    }

    const sentInfo = {
      currentPlayer: this.playerService.currentPlayer,
      board: this.board,
      lobbyID: this.lobbyID,
      player1ID: 1,
      player2ID: 2,
      gameIsOver: this.gameIsOver,
      winner: this.winner,
      playerTurnNumber: this.playerTurnNumber,
    };

    this.stompService.stompClient?.publish({
      destination: `/app/game/${this.lobbyID}`,
      body: JSON.stringify(sentInfo),
    });
  }

  checkTicTacToe(): boolean {
    const possibleWinner = this.playerService.currentPlayer === 'X' ? 'O' : 'X';

    for (let combo of this.winningCombinations) {
      const [a, b, c] = combo;
      //console.log('A: ' + a + ', B: ' + b + ', C: ' + c);

      if (
        this.board[a] == this.board[b] &&
        this.board[a] == this.board[c] &&
        this.board[b] == this.board[c] &&
        this.board[a] != ''
      ) {
        this.winner =
          possibleWinner === 'X' ? 'Player 1 Wins !' : 'Player 2 Wins !';

        return true;
      }
    }

    if (this.numberOfFilledCell >= 9 && !this.gameIsOver) {
      //console.log('THE CELLS HAVE BEEN FILLED WITH NO GAQME OVER');
      return true;
    }
    return false;
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  generateLobbyId(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
}
