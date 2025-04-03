import { Component } from '@angular/core';
import * as StompJS from '@stomp/stompjs';
import { WebsocketserviceService } from '../Services/AccountServices/websocketservice.service';
import { Observable, Observer, Subscribable, Subscription } from 'rxjs';
import { GameserviceService } from '../Services/AccountServices/gameservice.service';

/* 
TYPES
1 = SENT
2 = RECEIVED
*/

interface Message {
  message: string;
  type: number;
  clientID: number;
}

@Component({
  selector: 'app-chatbox',
  standalone: false,
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css',
})
export class ChatboxComponent {
  greetings: string[] = []; // Our messages
  disabled = true;
  public stompClient: StompJS.Client | null = null;

  public clientID: number = -1;

  private isConnectedSubscribed: Subscription | null = null;
  private isConnected: boolean = false;
  private lobbyID: number = -1;

  newmessage: string = '';
  // Set up messages array
  messages: Message[] = [];

  constructor(
    public stompService: WebsocketserviceService,
    private gameService: GameserviceService
  ) {
    this.clientID = this.generateRandomnNum();
    //  console.log('Random Client ID is : ' + this.clientID);

    this.stompClient = stompService.stompClient;
    this.lobbyID = gameService.lobbyID;

    console.log('FROM CLIENT, THE LOBBY ID IS: ' + this.lobbyID);
    this.isConnectedSubscribed = stompService.isConnected.subscribe(
      (connected) => {
        this.isConnected = connected;

        if (connected) {
          this.connect();
        }
      }
    );
  }

  connect() {
    if (this.isConnected) {
      this.stompService.stompClient?.subscribe(
        `/topic/message/${this.lobbyID}`,
        (message) => {
          const receivedClientID = JSON.parse(message.body).clientID;

          if (receivedClientID != this.clientID) {
            const receivedMessage = {
              message: JSON.parse(message.body).message,
              type: 2,
              clientID: this.clientID,
            };
            this.messages.push(receivedMessage);
          }
        }
      );
    }
  }

  sendMessage() {
    const sentMessageToBackend = {
      message: this.newmessage,
      clientID: this.clientID,
    };
    this.stompClient?.publish({
      destination: `/app/hello/${this.lobbyID}`,
      body: JSON.stringify(sentMessageToBackend),
    });

    const sentMessage = {
      message: this.newmessage,
      type: 1,
      clientID: this.clientID,
    };

    this.messages.push(sentMessage);

    this.newmessage = '';
  }

  generateRandomnNum(): number {
    let rand = Math.floor(1000 + Math.random() * 9000);

    return rand;
  }
}
