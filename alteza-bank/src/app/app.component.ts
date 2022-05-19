import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'alteza-bank';

  userId: string | undefined = localStorage.getItem('userId') || undefined;

  setUserId(userId: string) {
    this.userId = userId;
  }
}
