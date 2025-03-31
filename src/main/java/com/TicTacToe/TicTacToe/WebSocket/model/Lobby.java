package com.TicTacToe.TicTacToe.WebSocket.model;

public class Lobby {
    private int lobbyID;
    private int playerCount;

    public Lobby() {

    }

    public Lobby(int lobbyID, int playerCount) {
        this.lobbyID = lobbyID;
    }

    public int getLobbyID() {
        return lobbyID;
    }

    public void setLobbyID(int lobbyID) {
        this.lobbyID = lobbyID;
    }

    public int getPlayerCount() {
        return playerCount;
    }

    public void setPlayerCount(int playerCount) {
        this.playerCount = playerCount;
    }

    @Override
    public String toString() {
        return "Lobby{" +
                "lobbyID=" + lobbyID +
                ", playerCount=" + playerCount +
                '}';
    }
}
