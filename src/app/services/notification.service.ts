import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	globalTimeout = 5000;

	constructor(
		private matSnackBar: MatSnackBar
	) { }

	success(message: string, timeout?: number): void {
		const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
		const verticalPosition: MatSnackBarVerticalPosition = 'top';

		this.matSnackBar.open(message, '', {
			horizontalPosition: horizontalPosition,
			verticalPosition: verticalPosition,
			duration: timeout ? timeout : this.globalTimeout,
			panelClass: 'mat-snack-success'
		});
	}

	error(message: string, timeout?: number): void {
		const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
		const verticalPosition: MatSnackBarVerticalPosition = 'top';

		this.matSnackBar.open(message, '', {
			horizontalPosition: horizontalPosition,
			verticalPosition: verticalPosition,
			duration: timeout ? timeout : this.globalTimeout,
			panelClass: 'mat-snack-error'
		});
	}
}
