import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { ConfirmedValidator } from 'src/app/@core/validators/confirmed.validator';

@Component({
  selector: 'app-password-transaction',
  templateUrl: './password-transaction.component.html',
  styleUrls: ['./password-transaction.component.scss']
})
export class PasswordTransactionComponent implements OnInit {
  passwordForm: FormGroup;
  hide1 = true;
  hide2 = true;
  hasPassword: boolean = true;

  //RASCUNHOS PARA O FUTURO

  //password = sessionStorage....

  // hasPassword: boolean;
  // if (password) {
    //hasPassowrd = true;
  //}


  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Senha Transação',
      route: ''
    },
    items: [
      { title: 'Home', route: '' },
    ]
  };

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
