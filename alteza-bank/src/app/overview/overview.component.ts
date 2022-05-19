import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  user: User | undefined;
  transactions: Transaction[] = [];

  constructor(private userService: UserService) {}

  // user id should not be empty at this stage, so the '' is a bit hacky
  userId: string = localStorage.getItem('userId') || '';

  displayedColumns: string[] = ['date', 'amount'];

  ngOnInit(): void {
    this.getUser();
    this.getTransactions();
  }

  getUser(): void {
    this.userService
      .getUser(this.userId)
      .subscribe((user: User | undefined) => (this.user = user));
  }

  getTransactions(): void {
    this.userService
      .getTransactions(this.userId)
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
      });
  }
}
