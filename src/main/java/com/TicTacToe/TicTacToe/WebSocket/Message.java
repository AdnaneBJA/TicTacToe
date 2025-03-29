package com.TicTacToe.TicTacToe.WebSocket;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Message {
    private String message;
    private int clientID;
    public Message() {

    }


    public Message(String message, int clientID) {
        this.message = message;
        this.clientID = clientID;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getClientID() {
        return clientID;
    }

    public void setClientID(int clientID) {
        this.clientID = clientID;
    }



}
