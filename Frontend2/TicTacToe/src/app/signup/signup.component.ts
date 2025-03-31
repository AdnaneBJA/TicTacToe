import { Component } from '@angular/core';
import { AccountService } from '../Services/AccountServices/account.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  username: String = '';
  email: String = '';
  password: String = '';

  constructor(private accountService: AccountService, private router: Router) {}

  async onSubmit(): Promise<void> {
    console.log(`Sent data: ${this.username}, ${this.email}, ${this.password}`);
    const account = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    await firstValueFrom(this.accountService.addAccount(account));

    const allAccounts = await firstValueFrom(
      this.accountService.getAllAccounts()
    );
    this.router.navigate(['/home']);
    console.log('The date in database is now: ', allAccounts);
  }
}
