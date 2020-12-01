import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreadcrumbModel } from 'src/app/@core/models/breadcrumb';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('downloadTemplateLink') downloadTemplateLink: ElementRef;

  breadcrumbModel: BreadcrumbModel = {
    active: {
      title: 'Transações',
      route: ''
    },
    items: [
      { title: 'Home', route: '' },
    ]
  };

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      start: ['', []],
      end: ['', []],
      origin: ['ALL', []],
      status: ['ALL', []]
    });
  }

  upload(): void {
    this.fileInput.nativeElement.click();
  }

  download(): void {
    this.downloadTemplateLink.nativeElement.click();
  }

  clearFilter(): void {

  }

  loadModel(): void {

  }

  uploadFileEvt(fileEl: { target: { files: [] } }) {

    if (fileEl.target.files && fileEl.target.files.length > 0) {

      Array.from(fileEl.target.files).forEach((file: File, index: number) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
        }

        reader.readAsDataURL(file);

        if (index == fileEl.target.files.length) {
          this.fileInput.nativeElement.value = '';
        }
      });
    }
  }

}
