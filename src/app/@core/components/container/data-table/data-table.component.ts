import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteProfileComponent } from 'src/app/pages/delete-profile/delete-profile.component';

@Component({
  selector: 'core-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  public displayedColumns: string[] = [];

  @Input()
  data: any;

  @Input()
  headers: any[] = [];

  @Input() 
  actions

  @Input()
  router

  @Output()
  deleteEvent: EventEmitter<number> = new EventEmitter();

  @Output()
  editEvent: EventEmitter<number> = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.displayedColumns = this.headers.map((e) => e.value);
    
        this.displayedColumns.push('actions');
  }

  deleteItem(index: number) {
    this.deleteEvent.emit(index);
  }

  editItem(index: number) {
    this.editEvent.emit(index);
  }

  openDeleteDialog(idProfile: number) {
    const dialogRef = this.dialog.open(DeleteProfileComponent, {
      data: {id: idProfile}
    });
  }
  
}
