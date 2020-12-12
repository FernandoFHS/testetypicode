import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { ConfirmedValidator } from 'src/app/@core/validators/confirmed.validator';
import { NotificationService } from 'src/app/services/notification.service';
import { PasswordService } from '../../../services/password/password.service';

@Component({
  selector: 'app-initial-password-transaction',
  templateUrl: './initial-password-transaction.component.html',
  styleUrls: ['./initial-password-transaction.component.scss']
})
export class InitialPasswordTransactionComponent implements OnInit {

  passwordForm: FormGroup;
  hide1 = true;
  hide2 = true;
  hasPassword: boolean = false;
  createPasswordForm: any;
  idCompany: any;

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
    private route: ActivatedRoute,
    private _passwordService:PasswordService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // const id = 1;

    this.idCompany = this.route.snapshot.queryParamMap.get('idCompany');
    console.log(this.idCompany);
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.dataService.readById(id).subscribe((profile) => {
    //   this.profile = profile;
    // });


    this.passwordForm = this._formBuilder.group({
      documentNumberCompany: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordconfirm: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'passwordconfirm')
    })
    this.checkPassword();
  }


  // submit(): void {
  //   this.passwordForm.markAllAsTouched();

  //   if (this.passwordForm.valid) {
  //     const password = this.passwordForm.get('password').value;
  //     const passwordconfirm = this.passwordForm.get('passwordconfirm').value;

  //     console.log(this.passwordForm);
  //   }
  // }

  navigateToChangePassword(): void {
    this.router.navigate(['/password-transaction/change'])
  }

  navigateToRecoverPassword(): void {
    this.router.navigate(['/password-transaction/recover'])
  }

  checkPassword() {
    this._passwordService.checkLoginPassword(this.idCompany).subscribe((response: any) => {
      if (response == null) {
        this.hasPassword = true;
      }   
    });
  }

  hasNotPasswordSubmit(){
    this.createPasswordForm = {
      documentNumberCompany: this.passwordForm.get('documentNumberCompany').value,
      idCompany: this.idCompany,
      localTransaction: "P",
      passSale: this.passwordForm.get('passwordconfirm').value
    }
    
    console.log(this.passwordForm);
    if(this.passwordForm.valid == true){
    this._passwordService.createPassword(this.createPasswordForm).subscribe((response:any) =>{
      console.log(response);
      this.notificationService.success('Senha criada com sucesso!');
      this.checkPassword();
      this.router.navigate(['/password-transaction/initial'], { queryParams: { idCompany: this.idCompany }});
    })}else{
      this.notificationService.error('Digite todos os dados no campos!');
    }
    console.log(this.createPasswordForm);
  }

}
