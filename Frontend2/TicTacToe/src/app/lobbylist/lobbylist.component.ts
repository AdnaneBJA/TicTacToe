import { Component } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { WebsocketserviceService } from '../Services/AccountServices/websocketservice.service';
import * as StompJS from '@stomp/stompjs';
import { Subscribable, Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';
import { GameserviceService } from '../Services/AccountServices/gameservice.service';

interface Lobby {
  lobbyID: number;
  playerCount: number;
}

@Component({
  selector: 'app-lobbylist',
  standalone: false,
  templateUrl: './lobbylist.component.html',
  styleUrl: './lobbylist.component.css',
})
export class LobbylistComponent {
  lobbyListArray: Lobby[] = [];

  isConnectedSubsribable: Subscription | null = null;

  public joinedLobbyId: number = -1;

  constructor(
    public stompService: WebsocketserviceService,
    public router: Router,
    public gameService: GameserviceService
  ) {
    console.log(this.gameService.lobbyID);

    this.isConnectedSubsribable = this.stompService.isConnected.subscribe(
      (connected) => {
        console.log('Is stomp connected: ', connected);

        if (connected) {
          this.getLobbyList();
        }
      }
    );
  }

  getLobbyList() {
    this.stompService.stompClient?.subscribe('/topic/lobbies', (lobbylist) => {
      const lobbyArray = JSON.parse(lobbylist.body);

      for (let i = 0; i < lobbyArray.length; i++) {
        this.lobbyListArray.push(lobbyArray[i]);
      }
      console.log('LIST OF LOBBIES: ', JSON.parse(lobbylist.body));
    });

    this.stompService.stompClient?.publish({
      destination: '/app/lobbies',
      body: 'FAKE DATA',
    });
  }

  joinLobby(lobbyID: number) {
    console.log('You want to join lobby: ', lobbyID);
    this.gameService.lobbyID = lobbyID;
    this.gameService.playerNumber = 2;
    console.log('Game Service lobby ID: ' + this.gameService.lobbyID);

    this.updateLobbyInformation(lobbyID);
    this.router.navigate(['/board']);
  }

  updateLobbyInformation(lobbyID: number) {
    const sentInfo = {
      lobbyID: lobbyID,
      playerCount: 2,
    };

    this.stompService.stompClient?.publish({
      destination: `/app/lobby/${lobbyID}`,
      body: JSON.stringify(sentInfo),
    });
  }
}
