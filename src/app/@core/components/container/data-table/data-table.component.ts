import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'core-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  public displayedColumns: string[] = [];

  resultsLength = 10;

  @Input()
  data: any;

  @Input()
  headers: any[] = [];

  @Input()
  actions;

  @Input()
  dinamicAddRouter;

  @Output()
  pageEvent: PageEvent;

  @Output()
  deleteEvent: EventEmitter<Object> = new EventEmitter();

  @Output()
  editEvent: EventEmitter<Object> = new EventEmitter();

  @Output()
  addEvent: EventEmitter<Object> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('filter',  {static: true}) filter: ElementRef;

  constructor(public dialog: MatDialog, private router: Router, public dataService: DataService) {}

  dataSource: any[] = [];

  ngOnInit(): void {
    if (!this.data) {
      this.data = [];
    }

    if (!this.data.content) {
      this.data.content = this.data;
    }

    this.displayedColumns = this.headers.map((e) => e.value);

    this.displayedColumns.push('actions');

    //this.dataSource.paginator = this.paginator
  }

//   setPage(event) {
//     this.page = event.pageIndex;
//     this.loadData();
// }

  addItem(row: object) {
    this.addEvent.emit(row);
  }

  deleteItem(row: object) {
    this.deleteEvent.emit(row);
  }

  editItem(row: object) {
    this.editEvent.emit(row);
  }

  // public loadData() {
  //   //this.exampleDatabase = new DataService(this.httpClient);

  //   this.dataService.getAllProfiles(this.length, this.paginator.pageIndex).then(
  //     (data) => {
  //       this.dataSource = data['content'];
  //       this.length = data['totalElements']
  //     },
  //     (error) => {
  //       console.log('Data not found');
  //     }
  //   );
  // }

}
