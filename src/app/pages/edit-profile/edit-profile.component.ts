import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Content, Profile } from 'src/app/models/profile';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  profile: Content;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.readById(id).subscribe((profile) => {
      this.profile = profile;
    });
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Campo Obrigatório'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  updateProfile(): void {
    this.dataService.update(this.profile).subscribe(() => {
      //this.dataService.openSnackBar('Produto atualizado com sucesso', 'X');
      this.router.navigate(['/profile-list']);
    });
  }

  onNoClick(): void {
    this.router.navigate(['/user-group']);
  }
}
