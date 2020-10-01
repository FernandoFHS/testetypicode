import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../models/profile';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';
  // private readonly API_URL = 'http://138.197.225.217:8080/profiles';


  dataChange: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private httpClient: HttpClient) { }

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

  // DEMO ONLY, you can find working methods below
  addProfile(Profile: Profile): void {
    this.dialogData = Profile;
  }

  updateProfile(Profile: Profile): void {
    this.dialogData = Profile;
  }

  deleteProfile(id: number): void {
    console.log(id);
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

