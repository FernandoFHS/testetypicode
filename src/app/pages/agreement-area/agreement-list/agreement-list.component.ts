import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActionModel } from 'src/app/@core/models/action.model';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { HeaderModel} from 'src/app/@core/models/header.model';
import { DeleteProfileComponent } from '../../delete-profile/delete-profile.component';
import { AgreementService } from 'src/app/services/agreement.service';


@Component({
  selector: 'app-agreement-list',
  templateUrl: './agreement-list.component.html',
  styleUrls: ['./agreement-list.component.scss']
})
export class AgreementListComponent implements OnInit {

  breadcrumb_model: BreadcrumbModel = {
    active: {
      title: 'Contratos',
      route: 'rule'
    },
    items: [
      { title: 'Home', route: '' },
    ]
  };


  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private agreementService: AgreementService,
    private router: Router) { }

  ngOnInit(): void {
  }

  loadData = (sort: string, order: string, page: number, size: number) => {    
    // this.agreementService.getAll().subscribe(data => {
    //   console.log(data);
    // })
    //return this.planService.getAll();
    return this.agreementService.getAll();
    
  };
  

headers: HeaderModel[] = [
  { text: 'Código', value: 'id' },
  { text: 'Descrição', value: 'description'  },
];

actions: ActionModel = {
  add: true,
  edit: true,
  delete: false,
  view: false
};

dinamicAddRouter = "/company-list/add-company";


onDelete(row: any) {
  const {idProfile} = row;
  const dialogRef = this.dialog.open(DeleteProfileComponent, {
    data: { id: idProfile },
  });
}


onEdit(agreement) {
  //console.log('esse é o meu index para editar ' + index);
  console.log(agreement.id);
  
  this.router.navigate(['/agreements/edit/'+agreement.id]);
}

onAdd(index: number) {
  this.router.navigate(['/agreements/add']);
}

}
