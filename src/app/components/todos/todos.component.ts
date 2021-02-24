import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import { Todo } from "../../models/Todo";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  // Todo[] is from the Todo model
  todos:Todo[];

  // used to import services:
  constructor(private todoService:TodoService) { }


  // lifecycle method, like componentDidMount:
  ngOnInit(): void {
    // .subscribe like .then
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo){
    // Remove from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Remove from server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo){
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

}
