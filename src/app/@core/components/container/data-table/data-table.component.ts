import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'core-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements AfterViewInit {
  public displayedColumns: string[] = [];

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

  @Input()
  loadFunc: any;

  @Input()
  idItems: any;

  @Output()
  deleteEvent: EventEmitter<Object> = new EventEmitter();

  @Output()
  editEvent: EventEmitter<Object> = new EventEmitter();

  @Output()
  addEvent: EventEmitter<Object> = new EventEmitter();

  @Output()
  loadEvent: EventEmitter<Object> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('filter',  {static: true}) filter: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public dataService: DataService
  ) {}

  dataSource: any[] = [];

  ngAfterViewInit(): void {
    // if (!this.data) {
    //   this.data = [];
    // }

    // if (!this.data.content) {
    //   this.data.content = this.data;
    // }

    this.displayedColumns = this.headers.map((e) => e.value);

    this.displayedColumns.push('actions');

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.loadFunc(
      this.idItems,
      this.sort.direction,
      this.paginator.pageIndex,
      15
    ).subscribe((data) => {
      this.isLoadingResults = false;
      this.resultsLength = data['totalElements'];

      console.log(data);
      this.dataSource = data['content'];
    });

    merge(
      this.sort.sortChange,
      this.paginator.page
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataService.getAllItems(
            this.idItems,
            this.sort.direction,
            this.paginator.pageIndex,
            15,
            this.loadFunc
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data['totalElements'];

          console.log(data);
          return data['content'];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.dataSource = data));
    console.log('Uhul' + this.dataSource);
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
