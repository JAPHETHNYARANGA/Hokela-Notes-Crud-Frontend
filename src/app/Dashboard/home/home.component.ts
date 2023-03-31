import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { chart } from 'highcharts';
import { AuthenticationService } from 'src/app/Api/ApiServices/Authentication/authentication.service';
import { TodoService } from 'src/app/Api/ApiServices/Todos/todo.service';
import { AuthenticatedUserService } from 'src/app/Api/ApiServices/UserAuthentication/authenticated-user.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  username:any;
  todos :any;
  updatedTodos:any;

  constructor(private router:Router, private authenticatedUser:AuthenticatedUserService, private authenticationService:AuthenticationService, private todoService:TodoService){}


  loadUserName(){
    this.todoService.getNotes().subscribe(response =>{
      this.username = response.user
    })
  }

  loadTodo(){
    this.todoService.getNotes().subscribe(response=>{
      this.todos = response.todos.filter(todo => todo.status === 0)
      // this.todos = response.todos
    })
  }

  loadUpdatedTodo(){
    this.todoService.getNotes().subscribe(response=>{
      this.updatedTodos = response.todos.filter(todo => todo.status === 1)
      // this.todos = response.todos
    })
  }

  ngOnInit(): void {
    if(!this.authenticatedUser.isAuthenticated()){
      this.router.navigate([''],{replaceUrl:true});
    }
    this.loadUserName()
    this.loadTodo()
    this.loadUpdatedTodo()
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
