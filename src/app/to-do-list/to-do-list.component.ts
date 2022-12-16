import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Validator } from '@angular/forms';
import { Task } from '../models/task';
import { ListsService } from '../Services/lists.service';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {

  constructor(private listsService: ListsService) {
    listsService.todoListObserve.subscribe(data => {this.todoList=data})

  }

  toDoVisible: boolean = true;

  toggleVisible() {
    this.toDoVisible = !this.toDoVisible;
  }


  todoList: any = []

  taskToAdd: string = '';
  priority: boolean = false;
  taskToEdit: string =''


  addTask() {
    this.listsService.addTodoTask(this.taskToAdd, this.priority);
    this.taskToAdd = '';
    this.priority = false;
  }



  deleteTask(taskId:number) {
    this.listsService.deleteTodoTask(taskId)
  }

  completeTask(taskId:number) {
    this.listsService.completeTask(taskId)

  }

  discardEdit() {
    for(let task of this.todoList) task.toEdit = false;
    this.taskToEdit = '';
  }

  moveUp(taskId:number) {
    this.listsService.moveUp(taskId)
  }

  moveDown(taskId:number) {
    this.listsService.moveDown(taskId)
  }

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

}
