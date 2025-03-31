package com.TicTacToe.TicTacToe.WebSocket.controller;

import com.TicTacToe.TicTacToe.WebSocket.model.Game;
import com.TicTacToe.TicTacToe.WebSocket.model.Lobby;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
public class GameController {


    List<Lobby> lobbyList = new ArrayList<>();

    @MessageMapping("/game")
    @SendTo("/topic/game")
    public Game game(Game game) {
        // Rewrite the lobby system to be broadcasted to another subscribed controller, currently for all actions in game the lobby list increases by 1
        lobbyList.add(new Lobby(game.getLobbyID(), 0));
        System.out.println("Number Of lobbies: " + lobbyList.size() + ", which are: " + lobbyList);

        System.out.println("RECEIVED SOMETHING:  " + game.toString());
        return new Game(game.getCurrentPlayer(), game.getBoard(), game.getLobbyID(), game.getPlayer1ID(), game.getPlayer2ID(), game.getIsGameIsOver(), game.getWinner());
    }
}
