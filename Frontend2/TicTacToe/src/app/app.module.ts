import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { SocketslearnComponent } from './socketslearn/socketslearn.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { LobbylistComponent } from './lobbylist/lobbylist.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SignupComponent,
    ChatboxComponent,
    SocketslearnComponent,
    LoginComponent,
    HomeComponent,
    LobbylistComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, CommonModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
