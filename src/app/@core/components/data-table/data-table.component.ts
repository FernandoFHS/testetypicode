import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionModel } from '../../models/action.model';
import { HeaderModel } from '../../models/header.model';
import { DataTableService } from './data-table.service';

@Component({
  selector: 'core-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[];
  resultsLength: number;
  isLoadingResults = true;
  dataSource = new MatTableDataSource();

  @Input() data: any;
  @Input() headers: HeaderModel[] = [];
  @Input() actions: ActionModel;
  @Input() sortColumns: string[] = [];
  @Input() loadFunc: any;
  @Input() idItems: any;
  @Input() filterFunc: any;
  @Input() clearFilterFunc: any;
  @Input() async: boolean = true;

  @Output() deleteEvent: EventEmitter<Object> = new EventEmitter();
  @Output() editEvent: EventEmitter<Object> = new EventEmitter();
  @Output() addEvent: EventEmitter<Object> = new EventEmitter();
  @Output() loadEvent: EventEmitter<Object> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(
    public dialog: MatDialog,
    public dataService: DataService,
    public dataTableService: DataTableService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = this.headers.map((e) => e.value);
    this.displayedColumns.push('actions');

    if (!this.async) {
      this._loadSyncDataTable();
    }
  }

  ngAfterViewInit(): void {
    if (this.async) {
      this._loadAsyncDataTable();
    }
  }

  addItem(row) {
    this.addEvent.emit(row);
  }

  deleteItem(row) {
    this.deleteEvent.emit(row);
  }

  editItem(row) {
    this.editEvent.emit(row);
  }

  private _loadAsyncDataTable() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.dataTableService.onRefreshDataTable().subscribe(() => {
      this.filterFunc(
        this.idItems,
        this.sort.direction,
        this.paginator.pageIndex,
        10
      ).subscribe((data) => {
        this.isLoadingResults = false;
        this.resultsLength = data['totalElements'];
        this.dataSource = new MatTableDataSource(data['content']);
      });
    });

    this.loadFunc(
      this.idItems,
      this.sort.direction,
      this.paginator.pageIndex,
      10
    ).subscribe((data) => {
      this.isLoadingResults = false;
      this.resultsLength = data['totalElements'];
      this.dataSource = new MatTableDataSource(data['content']);
    });

    merge(
      this.sort.sortChange,
      this.paginator.page
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        
        return this.dataService.getAllItems(
          this.idItems,
          this.sort.direction,
          this.paginator.pageIndex,
          10,
          this.loadFunc
        );
      }),
      map((data) => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.resultsLength = data['totalElements'];

        return data['content'];
      }),
      catchError(() => {
        this.isLoadingResults = false;
        return observableOf([]);
      })
    ).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  private _loadSyncDataTable() {
    if (this.data && this.data.content) {
      this.resultsLength = this.data.content.length;
      this.dataSource = new MatTableDataSource(this.data.content);
    }
    else if (this.data && !this.data.content) {
      this.resultsLength = this.data.length;
      this.dataSource = new MatTableDataSource(this.data);
    }
    else {
      this._notificationService.error('Erro ao carregar o Data Table, consulte os logs do navegador.');
    }

    setTimeout(() => {
      this.isLoadingResults = false;
    });
  }
}
