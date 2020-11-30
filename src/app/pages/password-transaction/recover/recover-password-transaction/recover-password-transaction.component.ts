import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password-transaction',
  templateUrl: './recover-password-transaction.component.html',
  styleUrls: ['./recover-password-transaction.component.scss']
})
export class RecoverPasswordTransactionComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToRecoverPasswordAfterValidation(): void {
    this.router.navigate(['/password-recover-validation'])
  }

}
