package com.TicTacToe.TicTacToe.WebSocket.model;

import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.logging.Logger;

public class Game {
    private String currentPlayer;
    private String[] board;
    private int lobbyID;
    private int player1ID;
    private int player2ID;
    private boolean gameIsOver;
    private String winner;



    public Game() {}

    public Game(String currentPlayer, String[] board, int lobbyID, int player1ID, int player2ID, boolean gameIsOver, String winner) {
        this.currentPlayer = currentPlayer;
        this.board = board;
        this.lobbyID = lobbyID;
        this.player1ID = player1ID;
        this.player2ID = player2ID;
        this.gameIsOver = gameIsOver;
        this.winner = winner;
    }

    public String getCurrentPlayer() {
        return currentPlayer;
    }

    public void setCurrentPlayer(String currentPlayer) {
        this.currentPlayer = currentPlayer;
    }

    public String[] getBoard() {
        return board;
    }

    public void setBoard(String[] board) {
        this.board = board;
    }

    public int getLobbyID() {
        return lobbyID;
    }

    public void setLobbyID(int lobbyID) {
        this.lobbyID = lobbyID;
    }

    public int getPlayer1ID() {
        return player1ID;
    }

    public void setPlayer1ID(int player1ID) {
        this.player1ID = player1ID;
    }

    public int getPlayer2ID() {
        return player2ID;
    }

    public void setPlayer2ID(int player2ID) {
        this.player2ID = player2ID;
    }


    public boolean getIsGameIsOver() {
        return gameIsOver;
    }

    public void setGameIsOver(boolean gameIsOver) {
        this.gameIsOver = gameIsOver;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    @Override
    public String toString() {
        return "Game{" +
                "winner='" + winner + '\'' +
                ", gameIsOver=" + gameIsOver +
                ", player2ID=" + player2ID +
                ", player1ID=" + player1ID +
                ", lobbyID=" + lobbyID +
                ", board=" + Arrays.toString(board) +
                ", currentPlayer='" + currentPlayer + '\'' +
                '}';
    }
}