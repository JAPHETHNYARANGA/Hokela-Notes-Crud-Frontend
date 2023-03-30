import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../Constants/constants';
import { General } from '../../DataClasses/general';
import { Login } from '../../DataClasses/login';
import { Register } from '../../DataClasses/register';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  private loginUrl = Constants.BASE_URL+'login'
  private registerUrl = Constants.BASE_URL+'register'
  private logoutUrl = Constants.BASE_URL+'logout'

  loginUser(email:string, password:string):Observable<Login>{
      const body = {email:email, password:password};
      return this.http.post<Login>(this.loginUrl, body)
  }

  registerUser(name:string,email:string, password:string):Observable<Register>{
    const body = {name:name, email:email, password:password};
    return this.http.post<Register>(this.registerUrl, body)
  }

  logout():Observable<General>{
    return this.http.get<General>(this.logoutUrl, {headers:this.headers})
  }

}
