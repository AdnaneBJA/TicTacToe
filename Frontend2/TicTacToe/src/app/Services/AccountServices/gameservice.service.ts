import { Injectable } from '@angular/core';
import { ChatboxComponent } from '../../chatbox/chatbox.component';
import * as StompJS from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class GameserviceService {
  public stompClient: StompJS.Client | null = null;
  public clientID: number = -999;
  constructor(private chatBoxStompClient: ChatboxComponent) {
    this.clientID = chatBoxStompClient.clientID;
    console.log('Injectec clientID from service is: ' + this.clientID);
    this.stompClient = chatBoxStompClient.stompClient;
  }
}
