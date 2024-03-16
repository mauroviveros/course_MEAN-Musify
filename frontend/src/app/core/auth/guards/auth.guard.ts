import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) return true;
  return inject(Router).navigate(['/auth']);
};
