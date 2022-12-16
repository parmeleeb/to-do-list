import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor() { }

  toDoList: any[] = [];
  completedList: any[] = [];
  favoriteList: any[] = [];

  addTodoTask(taskToAdd:string, priority:boolean): void {
    if(priority)
      this.toDoList.unshift(taskToAdd);
    else
      this.toDoList.push(taskToAdd);
  }

  completeTodoTask(taskId:number): void {
    let taskIndex = -1;
    for(let index in this.toDoList) {
      if(this.toDoList[index].id == taskId) taskIndex = Number(index);
    }
    this.completedList.push(...this.toDoList.splice(taskIndex, 1));
  }

}
