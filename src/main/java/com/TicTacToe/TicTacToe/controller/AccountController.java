package com.TicTacToe.TicTacToe.controller;

import com.TicTacToe.TicTacToe.model.Account;
import com.TicTacToe.TicTacToe.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/account/")
    public ResponseEntity<List<Account>> getAllAccounts() {
        return new ResponseEntity<>(accountService.getAllAccounts(), HttpStatus.OK);
    }

    @PostMapping("/account/")
    public ResponseEntity<Account> addAccount(@RequestBody Account receivedAccount) {
        return new ResponseEntity<>(accountService.add(receivedAccount), HttpStatus.OK);
    }
}
