import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../Constants/constants';
import { Login } from '../../DataClasses/login';
import { Register } from '../../DataClasses/register';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  private loginUrl = Constants.BASE_URL+'login'
  private registerUrl = Constants.BASE_URL+'register'

  loginUser(email:string, password:string):Observable<Login>{
      const body = {email:email, password:password};
      return this.http.post<Login>(this.loginUrl, body)
  }

  registerUser(name:string,email:string, password:string):Observable<Register>{
    const body = {name:name, email:email, password:password};
    return this.http.post<Register>(this.registerUrl, body)
  }

}
