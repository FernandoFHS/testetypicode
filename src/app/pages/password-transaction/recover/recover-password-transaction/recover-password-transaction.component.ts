import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { ConfirmedValidator } from 'src/app/@core/validators/confirmed.validator';
import { GeneralService } from 'src/app/services/general.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PasswordService } from 'src/app/services/password/password.service';

@Component({
  selector: 'app-recover-password-transaction',
  templateUrl: './recover-password-transaction.component.html',
  styleUrls: ['./recover-password-transaction.component.scss']
})
export class RecoverPasswordTransactionComponent implements OnInit {
  recoverPasswordForm: FormGroup;
  hide1 = true;

  hasPassword: boolean = false;

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
    private router: Router,
    private _notificationService: NotificationService,
    private _generalService: GeneralService,
    private passwordService: PasswordService
  ) { }

  ngOnInit(): void {
    this.recoverPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  navigateToInitialPassword(): void {
    this.router.navigate(['/password-transaction/initial/12'])
  }

  sendEmailToRecover(): void {
    if (this.recoverPasswordForm.valid) {
      
      let objectSendEmail = {
        email: this.recoverPasswordForm.get('email').value,
        idCompany: 100800001,
        password: this.recoverPasswordForm.get('password').value
      }
      const message = 'Foi enviado para o seu e-mail cadastrado um link para redefinição de senha!';

      this._generalService.openOkDialog(message, () => {}, 'Link enviado');

      this.passwordService.alterPassword(objectSendEmail).subscribe((response) => {
        console.log(response)
      })
    }
  }

  // navigateToRecoverPasswordAfterValidation(): void {
  //   this.router.navigate(['/password-recover-validation'])
  // }

}
