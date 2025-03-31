import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { SignupComponent } from './signup/signup.component';
import { SocketslearnComponent } from './socketslearn/socketslearn.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LobbylistComponent } from './lobbylist/lobbylist.component';

const routes: Routes = [
  { path: 'board', component: BoardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'test', component: SocketslearnComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'lobbies', component: LobbylistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
