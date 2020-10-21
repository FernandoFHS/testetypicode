import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Content, Profile } from 'src/app/models/profile';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent implements OnInit {

  profile: Content = {
    idProfile: null,
    nameProfile: '',
    description: '' 
  }

  constructor(
    public dataService: DataService,
    private router: Router,
    public _snackBar: MatSnackBar,
  ) {}

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  createProfile(): void {
    this.dataService.create(this.profile).subscribe(() => {
      this.dataService.openSnackBar('Perfil adicionado com sucesso!', 'X')
      this.router.navigate(['/profile-list'])
    })
  }

  ngOnInit(): void {}


  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Campo Obrigatório'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.router.navigate(['/profile-list']);
  }

  //confirmAdd(): void {
  //  this.dataService.addProfile(this.data);
  //}

}
