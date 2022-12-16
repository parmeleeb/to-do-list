import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor() { }

  currentId:number = 1;

  toDoList: Task[] = [];
  completedList: Task[] = [];
  favoriteList: Task[] = [];

  addTodoTask(taskToAdd:string, priority:boolean): void {
    if(priority)
      this.toDoList.unshift(new Task(this.currentId++, taskToAdd));
    else
      this.toDoList.push(new Task(this.currentId++, taskToAdd));

  }

  addCompletedTask(taskToAdd:string, priority:boolean): void {
    if(priority)
      this.completedList.unshift(new Task(this.currentId++, taskToAdd));
    else
      this.completedList.push(new Task(this.currentId++, taskToAdd));
  }

  completeTodoTask(taskId:number): void {
    let taskIndex = -1;
    for(let index in this.toDoList) {
      if(this.toDoList[index].id == taskId) {
        taskIndex = Number(index);
        break;
      }
    }
    this.completedList.push(...this.toDoList.splice(taskIndex, 1));
  }

  incompleteTask(taskId:number): void {
    let taskIndex = -1;
    for(let index in this.completedList) {
      if(this.completedList[index].id == taskId) {
        taskIndex = Number(index);
        break;
      }
    }
    this.toDoList.push(...this.completedList.splice(taskIndex, 1));
  }

  deleteToDoTask(taskId:number): void {
    let taskIndex = -1;
    for(let index in this.toDoList) {
      if(this.toDoList[index].id == taskId) {
        taskIndex = Number(index);
        break;
      }
    }
    this.toDoList.splice(taskIndex, 1);
  }

  deleteCompletedTask(taskId:number): void {
    let taskIndex = -1;
    for(let index in this.completedList) {
      if(this.completedList[index].id == taskId) {
        taskIndex = Number(index);
        break;
      }
    }
    this.completedList.splice(taskIndex, 1);
  }

  moveUp(taskId:number):void {
    for (let index in this.toDoList) {
      if (taskId === this.toDoList[index].id) {
        if(index !== '0')
          this.toDoList.splice(Number(index)-1, 0, ...this.toDoList.splice(Number(index), 1));
        break;
      }
    }
  }

  moveDown(taskId:number):void {
    for (let index in this.toDoList) {
      if (taskId === this.toDoList[index].id) {
        if(Number(index) !== this.toDoList.length-1)
          this.toDoList.splice(Number(index)+1, 0, ...this.toDoList.splice(Number(index), 1));
        break;
      }
    }
  }
}
