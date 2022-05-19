import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../models/user';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User | undefined;
  form!: FormGroup;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  // user id should not be empty at this stage, so the '' is a bit hacky
  userId: string = localStorage.getItem('userId') || '';

  ngOnInit(): void {
    this.getUser();

    this.form = new FormGroup({
      initials: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
  }

  getUser(): void {
    this.userService
      .getUser(this.userId)
      .subscribe((user: User | undefined) => (this.user = user));
  }

  get f() {
    return this.form.controls;
  }

  updateUser(): void {
    let formData = this.form.value;
    this.userService.updateUser(this.userId, this.form.value).subscribe({
      error: (error) => {
        console.error(error);
        this.messageService.add('Er is een fout opgetreden.');
      },
      complete: () => {
        this.messageService.add('De gegevens zijn succesvol aangepast.');
      },
    });
  }
}
