package com.TicTacToe.TicTacToe.WebSocket.controller;

import com.TicTacToe.TicTacToe.WebSocket.model.Game;
import com.TicTacToe.TicTacToe.WebSocket.model.Lobby;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
public class GameController {


    List<Lobby> lobbyList = new ArrayList<>();

    @MessageMapping("/game/{lobbyID}")
    @SendTo("/topic/game/{lobbyID}")
    public Game game(@DestinationVariable int lobbyID ,Game game) {
        System.out.println("RECEIVED SOMETHING:  " + game);
        return new Game(game.getCurrentPlayer(), game.getBoard(), lobbyID, game.getPlayer1ID(), game.getPlayer2ID(), game.getIsGameIsOver(), game.getWinner(), game.getPlayerTurnNumber());
    }

    @MessageMapping("/lobby/{lobbyID}")
    @SendTo("/topic/{lobbyID}")
    public Lobby lobby(@DestinationVariable int lobbyID, Lobby lobby) {


        for (Lobby l: lobbyList) {
            if (l.getLobbyID() == lobbyID) {
                System.out.println("Lobby ID already exists: " + lobbyID + ", with player count: " + lobby.getPlayerCount());
                l.setLobbyID(lobbyID);
                l.setPlayerCount(2);
                return lobby;
            }
        }
        lobbyList.add(lobby);

        System.out.println("Lobby from backend info: " + lobby + ", Lobby Array: " + lobbyList);
        return new Lobby(lobbyID, lobby.getPlayerCount());
    }

    @MessageMapping("/lobbies")
    @SendTo("/topic/lobbies")
    public List<Lobby> getLobbyList() {

        return lobbyList;
    }
}
