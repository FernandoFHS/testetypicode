import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/@core/validators/confirmed.validator';

@Component({
  selector: 'app-recover-password-after-validation',
  templateUrl: './recover-password-after-validation.component.html',
  styleUrls: ['./recover-password-after-validation.component.scss'],
})
export class RecoverPasswordAfterValidationComponent implements OnInit {
  validationRecoverPasswordForm: FormGroup;
  hide1 = true;
  hide2 = true;

  constructor(private _formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
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
    console.log('Uhul');
  }

  navigateToRecoverPassword(): void {
    this.router.navigate(['/password-transaction/recover']);
  }
}
