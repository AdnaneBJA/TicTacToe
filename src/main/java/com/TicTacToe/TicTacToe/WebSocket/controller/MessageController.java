package com.TicTacToe.TicTacToe.WebSocket.controller;

import com.TicTacToe.TicTacToe.WebSocket.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class MessageController {


    @MessageMapping("/hello/{lobbyID}")
    @SendTo("/topic/message/{lobbyID}")
    public Message message(Message message) {
        return new Message(HtmlUtils.htmlEscape(message.getMessage()), message.getClientID());
    }
}
