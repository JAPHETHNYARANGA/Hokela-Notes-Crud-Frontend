import { Component } from '@angular/core';
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

  constructor(private router:Router, private authenticationService:AuthenticationService){}
  register(){
    this.authenticationService.registerUser(this.name, this.email, this.password)
    .subscribe((response:Register)=>{
      if(response.success == true){
        this.router.navigate([''])
        console.log(response)
      }else{
        console.log(response)
      }
    })
  }


  navigateToLogin(){
    this.router.navigate([''],{replaceUrl:true});
  }

}
