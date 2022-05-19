import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() userId?: string;
  @Output() updateUserId = new EventEmitter();

  allUsers: User[] | undefined = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((users: User[] | undefined) => {
      this.allUsers = users;
    });
  }

  setCurrentUser(userId: string) {
    localStorage.setItem('userId', userId);
    this.updateUserId.emit(userId);
  }
}
