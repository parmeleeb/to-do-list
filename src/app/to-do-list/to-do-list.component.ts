import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { ListsService } from '../Services/lists.service';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent{


 /**
  *
  * VARIABLE DECLARATIONS
  *
  */

  toDoVisible: boolean = true;

  todoList: Task[] = []

  taskToAdd: string = '';
  favorite: boolean = false;

  taskToEdit: string =''

  constructor(private listsService: ListsService) {
    listsService.todoListObserve.subscribe(data => {this.todoList=data});
  }

 /**
  *
  * PAGE-WIDE FUNCTION(S)
  *
  */


 /**
  *
  * NEW TASK FUNCTIONS
  *
  */

  addTask() {
    this.listsService.addTodoTask(this.taskToAdd, this.favorite);
    this.taskToAdd = '';
    this.favorite = false;
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }


 /**
  *
  * ACTION PANE FUNCTIONS
  *
  */

  editTask(taskMessage: string, taskId: number) {
    for(let  task of this.todoList) {
      if(task.toEdit && task.id != taskId)
        task.toEdit = false;
      else if(task.id == taskId)
        task.toEdit = true;
    }
    this.taskToEdit = taskMessage;

  }

  confirmEdit(taskId: number) {
    for(let task of this.todoList) task.toEdit = false;
    this.listsService.editTodo(taskId, this.taskToEdit);
    this.taskToEdit = '';
  }

  discardEdit() {
    for(let task of this.todoList) task.toEdit = false;
    this.taskToEdit = '';
  }

  completeTask(taskId:number) {
    this.listsService.completeTask(taskId)

  }

  deleteTask(taskId:number) {
    this.listsService.deleteTodoTask(taskId)
  }

  toggleListFavorite(taskId:number) {
    for(let  task of this.todoList) {
      if(task.id == taskId) {
        if(task.favorite) this.listsService.deleteFavoriteTask(task.message);
        else this.listsService.addFavoriteTask(task.message);
        task.favorite = !task.favorite;
      }
    }
  }

  moveUp(taskId:number) {
    this.listsService.moveUp(taskId)
  }

  moveDown(taskId:number) {
    this.listsService.moveDown(taskId)
  }

}
