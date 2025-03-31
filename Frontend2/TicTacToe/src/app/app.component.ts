import { Component } from '@angular/core';
import { WebsocketserviceService } from './Services/AccountServices/websocketservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public stompService: WebsocketserviceService) {}
  title = 'TicTacToe';
}
