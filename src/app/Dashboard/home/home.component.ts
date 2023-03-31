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
  completedTodos:any;
  completedData = '';
  ongoingData ='';
  startedData = '';
  totalTodos = '';
  // s = 0; //
  chart!: Chart;

  constructor(private router:Router, private authenticatedUser:AuthenticatedUserService, private authenticationService:AuthenticationService, private todoService:TodoService){}


  loadUserName(){
    this.todoService.getNotes().subscribe(response =>{
      this.username = response.user
    })
  }

  loadTotalTodos(){
    this.todoService.getNotes().subscribe(response=>{
      this.todos = response.todos;
      this.totalTodos = this.todos.length;
    })
  }

  loadTodo(){
    this.todoService.getNotes().subscribe(response=>{
      this.todos = response.todos.filter(todo => todo.status === 0)
      this.startedData = this.todos.length;
      
    })
    
  }

  loadUpdatedTodo(){
    this.todoService.getNotes().subscribe(response=>{
      this.updatedTodos = response.todos.filter(todo => todo.status === 1)
      this.ongoingData = this.updatedTodos.length;
    })
  }

  loadCompletedTodo(){
    this.todoService.getNotes().subscribe(response=>{
      this.completedTodos = response.todos.filter(todo => todo.status === 2)
      // console.log(this.completedTodos.length); 
      this.completedData = this.completedTodos.length;

    })
  }


  updateChartData() {
    let completedPie = 0; 
    let ongoingPie = 0;
    let startingPie = 0;
    
    this.todoService.getNotes().subscribe(response=>{
      if(response.todos.filter(todo => todo.status === 2)){
        completedPie = response.todos.filter(todo => todo.status === 2).length; // Assign value to 's'
      }
      if(response.todos.filter(todo => todo.status === 1)){
        ongoingPie = response.todos.filter(todo => todo.status === 1).length;
      }
      if(response.todos.filter(todo => todo.status === 0)){
        startingPie = response.todos.filter(todo => todo.status === 0).length;
      }
  
      this.chart = new Chart({
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
              { name: 'Completed', y: completedPie},
              { name: 'ON going', y: ongoingPie},
              { name: 'Started', y: startingPie }
            ]
          } as any
        ]
      });
    });
  }
  

  ngOnInit(): void {
    if(!this.authenticatedUser.isAuthenticated()){
      this.router.navigate([''],{replaceUrl:true});
    }
    this.loadUserName()
    this.loadTodo()
    this.loadUpdatedTodo()
    this.loadCompletedTodo()
    this.loadTotalTodos()
    this.updateChartData() 
    
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
