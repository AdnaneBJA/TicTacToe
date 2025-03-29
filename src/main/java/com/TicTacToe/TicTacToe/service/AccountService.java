package com.TicTacToe.TicTacToe.service;

import com.TicTacToe.TicTacToe.model.Account;
import com.TicTacToe.TicTacToe.repo.AccountRepositery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountRepositery accountRepositery;


    public Account add(Account receivedAccount) {
        Account acc = new Account();
        acc.setEmail(receivedAccount.getEmail());
        acc.setUsername(receivedAccount.getUsername());
        acc.setPassword(receivedAccount.getPassword());
        return accountRepositery.save(acc);
    }

    public List<Account> getAllAccounts() {
        return accountRepositery.findAll();
    }

    public int howManyAccountsMatch(String username, String password) {
        int answer = accountRepositery.countHowManyAccountsMatch(username, password);
        System.out.print("Number of accounts that match is: " + answer);
        return accountRepositery.countHowManyAccountsMatch(username, password);
    }
}
