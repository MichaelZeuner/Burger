import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlertDialogComponent } from '../dialogs/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  public openAlertDialog(message: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        message: message,
        buttonText: {
          cancel: 'Done'
        }
      },
    });
  }

  public openSnackbar(message: string, action: string = 'OK', length: number = 2000) {
    this.snackBar.open(message, action, { duration: length });
  }
}
