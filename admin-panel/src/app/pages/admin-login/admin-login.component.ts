import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  name = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:8080/api/auth/login', { name: this.name, password: this.password }).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => this.error = 'Неверные данные'
    });
  }
}

