import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthRequestModel } from 'src/app/models/requests/auth.request.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _router: Router,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this._spinnerService.show();

      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      const request: AuthRequestModel = {
        email: email,
        password: password
      };

      this._authService.login(request).then(() => {
        this._router.navigate(['home']);
      }, (errorMessage) => {
        if (errorMessage) {
          this._notificationService.error(errorMessage);
        }
      }).finally(() => {
        this._spinnerService.hide();
      });

      console.log(this.loginForm);
    }
  }

}
