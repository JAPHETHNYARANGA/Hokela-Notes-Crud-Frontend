import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Api/ApiServices/Authentication/authentication.service';
import { Login } from 'src/app/Api/DataClasses/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string = '';
  password:string = '';

  constructor(private router:Router, private authenticationService:AuthenticationService){}

  login(){
    this.authenticationService.loginUser(this.email, this.password)
    .subscribe((response:Login)=>{
      localStorage.setItem('token', response.token);
      if(response.success == true){
        this.router.navigate(['home']);
        console.log(response)
      }else{
        console.log(response)
      }
    })
  }

  navigateToRegister(){
    this.router.navigate(['/register'], {replaceUrl:true});
    
  }

}
