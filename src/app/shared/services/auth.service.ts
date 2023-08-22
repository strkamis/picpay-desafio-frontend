import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.inteface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  login(user: User) {
    if (user.email === 'usuario@gmail.com' && user.password === 'usuario') {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard']);
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    this.isLoggedIn = false;
  }

}
