import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const AdminGuard: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/admin-login']);
    return of(false);
  }

  return http.get('http://localhost:8080/api/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  }).pipe(
    map((user: any) => {
      if (user.role === 'admin') return true;
      router.navigate(['/admin-login']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/admin-login']);
      return of(false);
    })
  );
};

