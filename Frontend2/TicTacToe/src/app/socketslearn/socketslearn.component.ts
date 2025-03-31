import { Component } from '@angular/core';
import * as StompJs from '@stomp/stompjs';

@Component({
  selector: 'app-socketslearn',
  standalone: false,
  templateUrl: './socketslearn.component.html',
  styleUrl: './socketslearn.component.css',
})
export class SocketslearnComponent {
  private stompClient: StompJs.Client | null = null;
  sentName: string = '';
  response: string[] = [];
  constructor() {
    this.stompClient = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/gs-guide-websocket',
    });
  }

  connectSocket() {
    this.stompClient?.activate();

    if (this.stompClient) {
      this.stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);

        this.stompClient?.subscribe('/topic/greetings', (greeting) => {
          console.log(greeting);
          console.log(
            'received response: ' + JSON.parse(greeting.body).content
          );
          this.response.push(JSON.parse(greeting.body).content);
          console.log('Array: ' + this.response);
        });
      };
    }
  }

  sendName() {
    if (this.stompClient) {
      this.stompClient.publish({
        destination: '/app/hello',
        body: JSON.stringify(this.sentName),
      });

      console.log(this.sentName);
    }
  }
}
