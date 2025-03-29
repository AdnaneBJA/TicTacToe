package com.TicTacToe.TicTacToe.repo;

import com.TicTacToe.TicTacToe.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepositery extends JpaRepository<Account, Integer> {

    @Query("SELECT COUNT(*) FROM Account WHERE username = :username AND password = :password")
    int countHowManyAccountsMatch(String username, String password);
}
