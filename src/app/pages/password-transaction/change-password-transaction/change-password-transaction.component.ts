import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/@core/validators/confirmed.validator';
import { NotificationService } from 'src/app/services/notification.service';
import { PasswordService } from 'src/app/services/password/password.service';

@Component({
  selector: 'app-change-password-transaction',
  templateUrl: './change-password-transaction.component.html',
  styleUrls: ['./change-password-transaction.component.scss'],
})
export class ChangePasswordTransactionComponent implements OnInit {
  changePasswordForm: FormGroup;
  hide1 = true;
  hide2 = true;
  alterPasswordForm: any;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _notificationService: NotificationService,
    private _passwordService: PasswordService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this._formBuilder.group(
      {
        actualPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmNewPassword: ['', [Validators.required]],
      },
      {
        validator: ConfirmedValidator('newPassword', 'confirmNewPassword'),
      }
    );
  }

  navigateToInitialPassword(): void {
    this.router.navigate(['/password-transaction/initial/12']);
  }

  changePassword(): void {
    console.log('Alterou, uhul');

    this.changePasswordForm.markAllAsTouched();

    this.alterPasswordForm = {
      documentNumberCompany: 'string',
      idCompany: 2,
      localTransaction: 'P',
      passSale: this.changePasswordForm.get('password').value,
    };

    if (this.changePasswordForm.valid) {
      const password = this.changePasswordForm.get('newPassword').value;
      const passwordconfirm = this.changePasswordForm.get('confirmNewPassword')
        .value;

      console.log(this.changePasswordForm);
      this._passwordService.alterPassword(this.changePassword).subscribe((response: any) => {
          console.log(response);
          this._notificationService.success('Senha alterada com sucesso!');
        });
    }
  }
}
