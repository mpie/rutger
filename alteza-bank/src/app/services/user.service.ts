import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.httpClient
      .get<User>(this.apiURL + '/accounts/' + id)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient
      .patch<User>(this.apiURL + '/accounts/' + id, user, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getTransactions(userId: string): Observable<Transaction[]> {
    return this.httpClient
      .get<Transaction[]>(`${this.apiURL}/accounts/${userId}/transactions`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.apiURL + '/accounts/')
      .pipe(retry(3), catchError(this.errorHandler));
  }

  errorHandler(error: {
    error: { message: string };
    status: HttpErrorResponse;
    message: HttpErrorResponse;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
