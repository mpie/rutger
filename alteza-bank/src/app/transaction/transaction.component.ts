import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  user: User | undefined;
  transaction?: Transaction | undefined;

  form!: FormGroup;

  // user id should not be empty at this stage, so the '' is a bit hacky
  userId: string = localStorage.getItem('userId') || '';

  allAccounts: User[] | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUser();
    this.getAllUsers();

    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
      toAccount: new FormControl('', Validators.required),
    });
  }

  getUser(): void {
    this.userService
      .getUser(this.userId)
      .subscribe((user: User | undefined) => (this.user = user));
  }

  getAllUsers(): void {
    this.userService
      .getAllUsers()
      .subscribe(
        (users: User[] | undefined) =>
          (this.allAccounts = users?.filter((user) => user._id !== this.userId))
      );
  }

  addTransaction(): void {}
}
