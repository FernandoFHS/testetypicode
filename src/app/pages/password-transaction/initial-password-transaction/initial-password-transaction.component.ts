import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { ConfirmedValidator } from 'src/app/@core/validators/confirmed.validator';

@Component({
  selector: 'app-initial-password-transaction',
  templateUrl: './initial-password-transaction.component.html',
  styleUrls: ['./initial-password-transaction.component.scss']
})
export class InitialPasswordTransactionComponent implements OnInit {

  passwordForm: FormGroup;
  hide1 = true;
  hide2 = true;
  hasPassword: boolean = true;

  //RASCUNHOS PARA O FUTURO

  //password = sessionStorage....

  // hasPassword: boolean;
  // if (hasPassword) {
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
    private _formBuilder: FormBuilder,
    private router: Router
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
  }

  navigateToChangePassword(): void {
    this.router.navigate(['/password-transaction/change'])
  }

  navigateToRecoverPassword(): void {
    this.router.navigate(['/password-transaction/recover'])
  }

}
