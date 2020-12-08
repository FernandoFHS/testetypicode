import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { Content, Profile } from 'src/app/models/Profile';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent implements OnInit {

  addPage: boolean;

  profile: Content = {
    idProfile: null,
    nameProfile: '',
    description: '' 
  }

  addBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Incluir Usuário',
      route: 'add'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Usuários', route: 'profiles' },
    ]
  };

  editBreadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Editar Usuário',
      route: 'edit'
    },
    items: [
      { title: 'Home', route: '' },
      { title: 'Lista de Usuários', route: 'profiles' },
    ]
  };

  constructor(
    public dataService: DataService,
    private router: Router,
    public _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.readById(id).subscribe((profile) => {
      this.profile = profile;
    });

    if (id) {
      this.addPage = false
    } else {
      this.addPage = true;
    }
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  createProfile(): void {
    this.dataService.create(this.profile).subscribe(() => {
      this.dataService.openSnackBar('Perfil adicionado com sucesso!', 'X')
      this.router.navigate(['/profiles/list'])
    })
  }

  updateProfile(): void {
    this.dataService.update(this.profile).subscribe(() => {
      this.dataService.openSnackBar('Perfil atualizado com sucesso', 'X');
      this.router.navigate(['/profiles/list']);
    });
  }


  back(): void {
    this.router.navigate(['/profiles/list']);
  }

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

  //confirmAdd(): void {
  //  this.dataService.addProfile(this.data);
  //}

}
