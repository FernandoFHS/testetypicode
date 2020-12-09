import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  idCompany: any;
  passSale: any;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _notificationService: NotificationService,
    private _passwordService: PasswordService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.idCompany = this.route.snapshot.queryParamMap.get('idCompany');
    this.passSale = this.route.snapshot.queryParamMap.get('passSale');

    this.changePasswordForm = this._formBuilder.group(
      {
        // documentNumberCompany: ['', [Validators.required]],
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

    let alterPasswordForm = {
      password: this.changePasswordForm.get('confirmNewPassword').value,
    };

    console.log(alterPasswordForm);
    this._passwordService.alterPassword(alterPasswordForm, this.idCompany, this.passSale).subscribe((response: any) => {
        console.log(response);
        this._notificationService.success('Senha alterada com sucesso!');
        this.router.navigate(['/password-transaction']);
      });

  }
}
