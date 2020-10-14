import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile, Content } from '../models/Profile';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';
  // private readonly API_URL = 'http://138.197.225.217:8080/profiles';
  private readonly API_URL ='http://register-profile.qa.appmobbuy.tech:8080/profiles';

  dataChange: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, public _snackBar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  headers = new HttpHeaders({
    "Authorization": "Basic YWRtaW46MTIzNDU2",
    "Token": "e81770b51561ca52a4342c2b654336f174873aac",
    "accept": "application/json"

  });
  httpOptions = {
    headers: this.headers
  };

  get data(): Profile[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllProfiles(): Promise<Profile[]> {
    return new Promise<Profile[]>((resolve, reject) => {

      this.httpClient.get<Profile[]>(this.API_URL).subscribe(data => {
        console.log(data);
        resolve(data);
        // this.dataChange.next(data);
      },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          reject(error);
        });

    });
  }

  create(profile: Content): Observable<Content> {
    return this.httpClient.post<Content>(this.API_URL, profile);
  }

  readById(idProfile: number): Observable<Content> {
    const url = `${this.API_URL}/${idProfile}`;
    return this.httpClient.get<Content>(url);
  }

  update(profile: Content): Observable<Content> {
    const url = `${this.API_URL}/${profile.idProfile}`;
    return this.httpClient.put<Content>(url, profile);
  }

  read(): Observable<Profile[]> {
    return this.httpClient.get<Profile[]>(this.API_URL);
  }

  delete(id: number): Observable<Profile> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<Profile>(url);
    //this.getAllProfiles();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['green-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/


}

