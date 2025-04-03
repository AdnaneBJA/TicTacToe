import { Injectable } from '@angular/core';
import { ChatboxComponent } from '../../chatbox/chatbox.component';
import * as StompJS from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class GameserviceService {
  // Add this property to your GameserviceService class
  public lobbyID: number = -1;
  public playerNumber: number = 1;
  constructor() {}
}
