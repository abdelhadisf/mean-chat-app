import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  name: string='';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.http
    .get<any[]>(`http://localhost:5000/api/users?name=${this.name}`)
    .subscribe((users) => {
      if (users.length > 0) {
        localStorage.setItem('userName', this.name);
        this.router.navigate(['/chat']);
      } else {
        console.error('User not found');
      }
    });
  }
}
