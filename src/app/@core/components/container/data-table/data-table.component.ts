import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
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
  dinamicAddRouter

  @Output()
  deleteEvent: EventEmitter<Object> = new EventEmitter();

  @Output()
  editEvent: EventEmitter<Object> = new EventEmitter();

  @Output()
  addEvent: EventEmitter<Object> = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    if(!this.data){
      this.data = [];
    }

    if(!this.data.content){
      this.data.content = this.data;
    }

    this.displayedColumns = this.headers.map((e) => e.value);
    
        this.displayedColumns.push('actions');
  }

  addItem(row: object) {
    this.addEvent.emit(row);
  }

  deleteItem(row: object) {
    this.deleteEvent.emit(row);
  }

  editItem(row: object) {
    this.editEvent.emit(row);
  }
   
}
