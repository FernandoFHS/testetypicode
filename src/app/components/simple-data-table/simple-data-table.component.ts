import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SimpleDataTableService } from './simple-data-table.service';

@Component({
  selector: 'app-simple-data-table',
  templateUrl: './simple-data-table.component.html',
  styleUrls: ['./simple-data-table.component.scss']
})
export class SimpleDataTableComponent implements OnInit {

  public displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;

  @Input()
  data: any;

  @Input()
  headers: any[] = [];

  @Input()
  actions;

  @Input()
  matSortActive;

  @Input()
  dinamicAddRouter;

  @Input()
  sortColumns: string[] = [];

  @Output()
  deleteEvent: EventEmitter<Object> = new EventEmitter();

  @Output()
  editEvent: EventEmitter<Object> = new EventEmitter();

  @Output()
  addEvent: EventEmitter<Object> = new EventEmitter();

  @Output()
  loadEvent: EventEmitter<Object> = new EventEmitter();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('filter',  {static: true}) filter: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public dataService: DataService,
    public tableService: SimpleDataTableService
  ) {}

  ngOnInit():void {
    // if (!this.data) {
    //   this.dataSource = [];
    // }

    // if (!this.data.content) {
    //   this.dataSource = this.data;
    // }

    this.displayedColumns = this.headers.map((e) => e.value)
    this.displayedColumns.push('actions');

    this.dataSource = new MatTableDataSource(this.data)
    console.log(this.data);

    this.tableService.onRefreshDataTable().subscribe(() => {
      console.log('Foi')
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator
    })  
  } 

  ngAfterViewInit() {
     this.dataSource.paginator = this.paginator
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



