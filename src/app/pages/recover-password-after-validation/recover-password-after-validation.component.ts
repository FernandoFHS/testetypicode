import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/@core/validators/confirmed.validator';
import { NotificationService } from 'src/app/services/notification.service';
import { PasswordService } from 'src/app/services/password/password.service';

@Component({
  selector: 'app-recover-password-after-validation',
  templateUrl: './recover-password-after-validation.component.html',
  styleUrls: ['./recover-password-after-validation.component.scss'],
})
export class RecoverPasswordAfterValidationComponent implements OnInit {
  validationRecoverPasswordForm: FormGroup;
  hide1 = true;
  hide2 = true;
  token: any;
  idCompany: any;

  constructor(private _formBuilder: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private passwordService: PasswordService,
    private notificationService: NotificationService
    ) {}

  ngOnInit(): void {
    // this.token = +this.route.snapshot.queryParams.get('token');
    this.token = this.route.snapshot.params['token'];
    // this.idCompany = this.route.snapshot.params['idCompany'];
    this.idCompany = this.route.snapshot.queryParamMap.get('idCompany');
    console.log(this.token);
    console.log(this.idCompany);

    this.validationRecoverPasswordForm = this._formBuilder.group(
      {
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('newPassword', 'confirmNewPassword'),
      }
    );
  }

  recoverValidatePassword(): void {
    let formObject = {
       password:  this.validationRecoverPasswordForm.get('confirmNewPassword').value
     }

    this.passwordService.recoverPassword(formObject, this.token, this.idCompany).subscribe((response) => {
      console.log(response);
      this.notificationService.success('Senha redefinida com sucesso!');
      this.router.navigate(['/password-transaction']);
    })
  }

  navigateToRecoverPassword(): void {
    this.router.navigate(['/password-transaction/recover']);
  }
}
