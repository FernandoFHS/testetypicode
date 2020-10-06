import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-password-of-transaction',
  templateUrl: './password-of-transaction.component.html',
  styleUrls: ['./password-of-transaction.component.scss']
})
export class PasswordOfTransactionComponent implements OnInit {
  passwordForm: FormGroup;
  hide1 = true;
  hide2 = true;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.passwordForm = this._formBuilder.group({
      password: ['', [Validators.required]],
      passwordconfirm: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'passwordconfirm')
    })
  }


  submit(): void {
    this.passwordForm.markAllAsTouched();

    if (this.passwordForm.valid) {
      const password = this.passwordForm.get('password').value;
      const passwordconfirm = this.passwordForm.get('passwordconfirm').value;

      console.log(this.passwordForm);
    }

    // this._authService.login(user, password).then(() => {
    //     this._router.navigate(['']);
    // }).catch((message) => {
    //     const dialogRef = this._generalService.openOkDialog(message);

    //     dialogRef.subscribe(() => {

    //     });
    // });
  }


}
