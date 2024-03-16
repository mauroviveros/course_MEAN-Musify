import { Injectable, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly snackBar = inject(MatSnackBar);

  private readonly MAT_SNACK_BAR_DEFAULT_OPTIONS: MatSnackBarConfig = {
    duration: 2500,
  };

  private open(
    icon: string,
    message: string,
    action?: string,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(
      `${icon} ${message}`,
      action,
      Object.assign({}, this.MAT_SNACK_BAR_DEFAULT_OPTIONS, config)
    );
  }

  error(error: Error): MatSnackBarRef<TextOnlySnackBar> {
    return this.open('❌', error.message);
  }

  success(message: string, action?: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.open('✅', message, action, { horizontalPosition: 'end' });
  }
}
