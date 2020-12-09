import { LocalStorageService } from './../../../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { ActionModel } from 'src/app/@core/models/action.model';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';
import { HeaderModel } from 'src/app/@core/models/header.model';
import { DeleteProfileComponent } from '../../delete-profile/delete-profile.component';
import { AgreementService } from 'src/app/services/agreement.service';

@Component({
  selector: 'app-agreement-list',
  templateUrl: './agreement-list.component.html',
  styleUrls: ['./agreement-list.component.scss']
})
export class AgreementListComponent implements OnInit {

  idCompanyGroup: string;

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
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.idCompanyGroup = this.route.snapshot.queryParamMap.get('idCompanyGroup');
    if (this.idCompanyGroup) {
      this.localStorageService.set('idCompanyGroup', this.idCompanyGroup);
    } else {
      this.idCompanyGroup = this.localStorageService.get('idCompanyGroup');
    }
  }

  loadData = (sort: string, order: string, page: number, size: number) => {
    return this.agreementService.getAllPaged(sort, order, page, size, +this.idCompanyGroup);
  };

  headers: HeaderModel[] = [
    { text: 'Código', value: 'id' },
    { text: 'Descrição', value: 'description' },
  ];

  actions: ActionModel = {
    add: true,
    edit: true,
    delete: false,
    view: true
  };

  dinamicAddRouter = "/company-list/add-company";


  onDelete(row: any) {
    const { idProfile } = row;
    const dialogRef = this.dialog.open(DeleteProfileComponent, {
      data: { id: idProfile },
    });
  }


  onEdit(agreement) {
    this.router.navigate(['/agreements/edit/' + agreement.id]);
  }

  onAdd(index: number) {
    this.router.navigate(['/agreements/add']);
  }

  onView(agreement) {
    this.router.navigate(['/agreements/view/' + agreement.id]);
  }

}
