import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/Api/ApiServices/Todos/todo.service';
import { Todo } from 'src/app/Api/DataClasses/todo';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  constructor(private todoService:TodoService, private router:Router){}


 
  todo = '';
  id = 0;

  updateTodo(){
    this.todoService.updateNotes(this.todo, this.id).subscribe((response:Todo)=>{
      if(response.success == true){
        this.router.navigate(['home'], {replaceUrl:true})
      }else{
        //show error message
      }
    })
  }
}
