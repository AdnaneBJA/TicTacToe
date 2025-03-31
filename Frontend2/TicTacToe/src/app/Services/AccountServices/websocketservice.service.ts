import { Injectable } from "@angular/core";
import * as StompJS from "@stomp/stompjs";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WebsocketserviceService {
  public stompClient: StompJS.Client | null = null;
  public clientID: number = -1;

  public isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {
    this.clientID = this.generateRandomnNum();
    this.setupStompJS();
  }

  setupStompJS() {
    try {
      this.stompClient = new StompJS.Client({
        brokerURL: "ws://localhost:8080/gs-guide-websocket",
      });

      this.stompClient?.activate();

      if (this.stompClient) {
        this.stompClient.onConnect = (frame) => {
          console.log("Connected to Frame properly from service: ", frame);
          this.isConnected.next(true);
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  generateRandomnNum(): number {
    let rand = Math.floor(1000 + Math.random() * 9000);

    return rand;
  }
}
