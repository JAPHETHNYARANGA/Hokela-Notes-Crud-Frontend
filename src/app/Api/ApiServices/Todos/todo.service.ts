import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../Constants/constants';
import { Todo, TodoData } from '../../DataClasses/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });


  private getNotesUrl = Constants.BASE_URL+'todos';

  createNotes(todo:string):Observable<Todo>{
    const body = {todo:todo};
    const url =`${Constants.BASE_URL}todos`;
    return this.http.post<Todo>(url, body,{headers:this.headers});

  }


  // getNotes(searchTerm:string):Observable<Todo>{
  //   return this.http.get<Todo>(this.getNotesUrl, {headers:this.headers});
  // }

  getNotes(searchTerm: string): Observable<Todo> {
    const url = `${Constants.BASE_URL+'todos'}?search=${searchTerm}`;
    return this.http.get<Todo>(url, {headers:this.headers});
  }
  

  getSpecificNote(id:number):Observable<Todo>{
    const url =`${Constants.BASE_URL}todo/${id}`; 
    return this.http.get<Todo>(url)
  }

  deleteNotes(id:number):Observable<any>{
    const url = `${Constants.BASE_URL}deleteTodo/${id}`;
    return this.http.get(url, {headers:this.headers});
  }

  updateStatus(id:number):Observable<any>{
    const url = `${Constants.BASE_URL}updateStatus/${id}`;
    const body = { status: status  };
    return this.http.put(url,body,{headers:this.headers});
  }

  updateNotes(todo:string, id:number):Observable<Todo>{
    const body = {todo:todo, id:id};
    const url =`${Constants.BASE_URL}updateTodo/${id}`;
    return this.http.put<Todo>(url, body,{headers:this.headers});

  }
}
