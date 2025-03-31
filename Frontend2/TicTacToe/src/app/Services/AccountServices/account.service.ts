import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAllAccounts() {
    return this.http.get('http://localhost:8080/api/account/');
  }
  addAccount(account: any) {
    return this.http.post('http://localhost:8080/api/account/', account);
  }

  findHowManyAccountsMatch(
    username: string,
    password: string
  ): Observable<number> {
    const requestBody = {
      username: username,
      password: password,
    };
    return this.http.post<number>(
      'http://localhost:8080/api/login/',
      requestBody
    );
  }
}
