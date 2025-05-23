import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if(typeof window !== 'undefined'){
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/http://localhost:4200/';
      return false;
    }
    return true;
  }

  return false;
};