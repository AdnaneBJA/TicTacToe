import { Component } from '@angular/core';
import { AccountService } from '../Services/AccountServices/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = 'Could not find account in database !';
  numberOfAccounts = -1;

  constructor(private accountService: AccountService, private router: Router) {}

  onSubmit() {
    console.log(
      'You want to find username: ',
      this.username + ', with password: ',
      this.password
    );

    this.accountService
      .findHowManyAccountsMatch(this.username, this.password)
      .subscribe(
        (res) => {
          this.numberOfAccounts = res;
          console.log('Received value: ', res);

          if (this.numberOfAccounts >= 1) {
            console.log('There is an account which matches');
            localStorage.setItem('username', this.username);
            this.router.navigate(['/']);
          }
        },
        (err) => {
          console.log(
            'There was an error when trying to get how many accounts match: ',
            err
          );
        }
      );
  }
}
