package com.TicTacToe.TicTacToe.repo;

import com.TicTacToe.TicTacToe.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepositery extends JpaRepository<Account, Integer> {
}
