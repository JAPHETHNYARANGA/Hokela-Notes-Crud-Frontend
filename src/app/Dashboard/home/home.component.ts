import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { chart } from 'highcharts';
import { AuthenticationService } from 'src/app/Api/ApiServices/Authentication/authentication.service';
import { AuthenticatedUserService } from 'src/app/Api/ApiServices/UserAuthentication/authenticated-user.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private router:Router, private authenticatedUser:AuthenticatedUserService, private authenticationService:AuthenticationService){}

  ngOnInit(): void {
    if(!this.authenticatedUser.isAuthenticated()){
      this.router.navigate([''],{replaceUrl:true});
    }
  }


  chart = new Chart({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Stats'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: ['stats'],
        data: [
          { name: 'Completed', y: 1 },
          { name: 'ON going', y: 2 },
          { name: 'Started', y: 3 }
        ]
      } as any
    ]
  });

  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }


  logout(){
    this.authenticationService.logout().subscribe(response=>{
      if(response.success == true){
        localStorage.removeItem('token');
        this.router.navigate([''], {replaceUrl:true})
      }
    })
  }


}
