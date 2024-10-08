import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string, action: string = 'Close', duration: number = 5000): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  showSuccess(message: string, duration: number = 5000): void {
    this.snackBar.open(message, 'OK', {
      duration: duration,
      panelClass: ['.snackbar-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showError(message: string, duration: number = 5000): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: duration,
      panelClass: ['.snackbar-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
