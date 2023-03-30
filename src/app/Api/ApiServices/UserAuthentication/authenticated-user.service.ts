import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserService {

  constructor(private router:Router) { }

  isAuthenticated():boolean{
    const authToken = localStorage.getItem('token');
    return !!authToken
  }

  checkAuthentication():void{
    if(!this.isAuthenticated()){
      this.router.navigate([''])
    }
  }
}
