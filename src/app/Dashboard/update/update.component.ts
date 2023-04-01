import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/Api/ApiServices/Todos/todo.service';
import { Todo, TodoData } from 'src/app/Api/DataClasses/todo';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private todoService:TodoService, private router:Router, private route:ActivatedRoute){}
  
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
    // const id = this.route.snapshot.params['id'];
    // this.todoService.getSpecificNote(id).subscribe((response: any) => {
    //   const todo = response.todos;
    //   this.editTodo.setValue({ todo: todo.todo }); // set the value of the form control
    // });
    
    

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
}


