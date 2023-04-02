import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Api/ApiServices/Authentication/authentication.service';
import { Register } from 'src/app/Api/DataClasses/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name:string = '';
  email:string = '';
  password:string='';
  failureMessage: string = '';
  

  constructor(private router:Router, private authenticationService:AuthenticationService){}
  register(){
    if(this.validateFields()){
      this.authenticationService.registerUser(this.name, this.email, this.password)
      .subscribe((response:Register)=>{
        if(response.success == true){
          this.router.navigate([''])
          console.log(response)
        }else{
          console.log(response);
          this.failureMessage = response.message; 
         
        }
      })
    }
    
  }


  navigateToLogin(){
    this.router.navigate([''],{replaceUrl:true});
  }


  validateFields(): boolean {
    if (!this.name) {
      this.failureMessage = 'Please enter your name'; // set failure message
      return false;
    }
    if (!this.email) { // check if email is valid
      this.failureMessage = 'Please enter a valid email address'; // set failure message
      return false;
    }
    if (!this.password) {
      this.failureMessage = 'Please enter a password'; // set failure message
      return false;
    }
    return true;
  }

}
