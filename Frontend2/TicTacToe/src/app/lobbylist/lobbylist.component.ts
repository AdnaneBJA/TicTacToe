import { Component } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { WebsocketserviceService } from '../Services/AccountServices/websocketservice.service';
import * as StompJS from '@stomp/stompjs';

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
  lobbi1: Lobby = { lobbyID: 6, playerCount: 5 };
  stompClient: StompJS.Client | null = null;
  lobbyList: Lobby[] = [];

  constructor(private stompClientService: WebsocketserviceService) {
    this.stompClient = stompClientService.stompClient;
    this.lobbyList.push(this.lobbi1);
  }
}
