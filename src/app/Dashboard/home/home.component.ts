import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { chart } from 'highcharts';
import { AuthenticationService } from 'src/app/Api/ApiServices/Authentication/authentication.service';
import { TodoService } from 'src/app/Api/ApiServices/Todos/todo.service';
import { AuthenticatedUserService } from 'src/app/Api/ApiServices/UserAuthentication/authenticated-user.service';
import { Todo } from 'src/app/Api/DataClasses/todo';





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
  startedTodos:any;
  completedData = '';
  ongoingData ='';
  startedData = '';
  totalTodos = '';
  //text input
  todo = '';
  searchTerm: string = '';
  
  chart!: Chart;

  constructor( private location: Location,private router:Router, private authenticatedUser:AuthenticatedUserService, private authenticationService:AuthenticationService, private todoService:TodoService){}

  createTodo(){
    this.todoService.createNotes(this.todo).subscribe((response:Todo)=>{
        if(response.success == true){
          
          this.reloadPage()
          
        }else{
          console.log(response)
        }
    })
  }

 

  loadUserName(){
    this.todoService.getNotes(this.searchTerm).subscribe(response =>{
      this.username = response.user
    })
    
  }

  loadTotalTodos(){
    this.todoService.getNotes(this.searchTerm).subscribe(response=>{
      this.todos = response.todos;
      this.totalTodos = this.todos.length;
    })
  }

  loadTodo(){
    this.todoService.getNotes(this.searchTerm).subscribe(response=>{
      this.startedTodos= response.todos.filter(todo => todo.status === 0)
      this.startedData = this.startedTodos.length;
      
    })
    
  }

  loadUpdatedTodo(){
    this.todoService.getNotes(this.searchTerm).subscribe(response=>{
      this.updatedTodos = response.todos.filter(todo => todo.status === 1)
      this.ongoingData = this.updatedTodos.length;
    })
  }

  loadCompletedTodo(){
    this.todoService.getNotes(this.searchTerm).subscribe(response=>{
      this.completedTodos = response.todos.filter(todo => todo.status === 2)
      // console.log(this.completedTodos.length); 
      this.completedData = this.completedTodos.length;

    })
  }


  updateChartData() {
    let completedPie = 0; 
    let ongoingPie = 0;
    let startingPie = 0;
    
    this.todoService.getNotes(this.searchTerm).subscribe(response=>{
      if(response.todos.filter(todo => todo.status === 2)){
        completedPie = response.todos.filter(todo => todo.status === 2).length;
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
  
  loadStartData(){
    this.loadUserName()
    this.loadTodo()
    this.loadUpdatedTodo()
    this.loadCompletedTodo()
    this.loadTotalTodos()
    this.updateChartData() 
   
    
  }

  ngOnInit(): void {
    if(!this.authenticatedUser.isAuthenticated()){
      this.router.navigate([''], {replaceUrl:true});
      console.log("not authenticated")
    }
    // window.location.reload()
    this.loadStartData()
    
    // this.reloadPage()
  }

  // ngAfterViewInit() {
  //   location.reload();
  // }
  
  deleteTodo(id:number){
    this.todoService.deleteNotes(id).subscribe(()=>{
      this.loadStartData()
    })
  }

  updateStatus(id:number){
    this.todoService.updateStatus(id).subscribe(()=>{
      this.loadStartData()
    })
  }

  

  reloadPage() {
    const currentUrl = this.location.path();
    window.location.href = currentUrl;
    // or you can use the following line to reload without changing the URL
    // window.location.reload();
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
