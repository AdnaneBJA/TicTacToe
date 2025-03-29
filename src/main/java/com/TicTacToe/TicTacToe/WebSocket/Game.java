package com.TicTacToe.TicTacToe.WebSocket;

public class Game {
    // 1. What does the game have?
    String currentPlayer;
    String[] board;


    public Game() {

    }

    public Game(String currentPlayer, String[] board) {
        this.currentPlayer = currentPlayer;
        this.board = board;
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
}
