import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/Api/ApiServices/Todos/todo.service';
import { AuthenticatedUserService } from 'src/app/Api/ApiServices/UserAuthentication/authenticated-user.service';
import { Todo, TodoData } from 'src/app/Api/DataClasses/todo';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private todoService:TodoService, private router:Router, private route:ActivatedRoute, private authenticatedUser:AuthenticatedUserService){}
  
  todos :any;
  contacts: TodoData[] = []
  // form!:FormGroup;

  editTodo = new FormGroup({
    todo:new FormControl(''),
  })

  getSpecificTodo(){
    this.todoService.getSpecificNote(this.route.snapshot.params['id']).subscribe((response=>{
      this.todos = response.todos
      console.log(response.todos)
    }))
  }


  ngOnInit(): void {
 
    if(!this.authenticatedUser.isAuthenticated()){
      this.router.navigate([''], {replaceUrl:true});
      console.log("not authenticated")
    }
    

  }


 
  todo = '';
 


  

  updateTodo(){
    this.todoService.updateNotes(this.todo, this.route.snapshot.params['id']).subscribe((response:Todo)=>{
      if(response.success == true){
        this.router.navigate(['home'], {replaceUrl:true})
      }else{
        //show error message
        console.log(response)
      }
    })
  }

  navigateToHome(){
    this.router.navigate(['home'], {replaceUrl:true})
  }
}


