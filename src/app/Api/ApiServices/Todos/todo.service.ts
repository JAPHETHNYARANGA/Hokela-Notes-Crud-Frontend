import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../Constants/constants';
import { Todo } from '../../DataClasses/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });


  private getNotesUrl = Constants.BASE_URL+'todos'

  getNotes():Observable<Todo>{
    return this.http.get<Todo>(this.getNotesUrl, {headers:this.headers});
  }
}
