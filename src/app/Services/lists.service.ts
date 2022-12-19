import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ListsService {


  /**
   *
   *  VARIABLE DECLARATIONS
   *
   */

  currentId:number = 100;

  private todoList: Task[] = [];
  private todoListBehave = new BehaviorSubject<Task[]>([]);
  todoListObserve = this.todoListBehave.asObservable();

  private completedList: Task[] = [];
  private completedListBehave = new BehaviorSubject<Task[]>([]);
  completedListObserve = this.completedListBehave.asObservable();

  private favoriteList: Task[] = [];
  private favoriteListBehave = new BehaviorSubject<Task[]>([]);
  favoriteListObserve = this.favoriteListBehave.asObservable();


  /**
   *
   *  TODO LIST FUNCTIONS
   *
   */

  addTodoTask(taskToAdd:string, favorite:boolean): void {
    if(favorite){
      const favoriteTask = new Task(this.currentId, taskToAdd, true)
      this.todoList.unshift(favoriteTask);
      this.addFavoriteTask(this.currentId++, taskToAdd);
    }
    else
      this.todoList.push(new Task(this.currentId++, taskToAdd, false));
    this.todoListBehave.next([...this.todoList]);
  }

  editTodo(taskId:number, taskMessage:string):void {
    for(let task of this.todoList) {
      if(task.id == taskId)
        task.message = taskMessage;
    }
    this.todoListBehave.next([...this.todoList]);
  }

  completeTask(taskId:number): void {
    let taskIndex = -1;
    for(let index in this.todoList) {
      if(this.todoList[index].id == taskId) {
        taskIndex = Number(index);
        break;
      }
    }
    this.completedList.push(...this.todoList.splice(taskIndex, 1));
    this.todoListBehave.next([...this.todoList]);
    this.completedListBehave.next([...this.completedList]);
  }

  deleteTodoTask(taskId:number): void {
    let taskIndex = -1;
    for(let index in this.todoList) {
      if(this.todoList[index].id == taskId) {
        taskIndex = Number(index);
        break;
      }
    }
    this.todoList.splice(taskIndex, 1);
    this.todoListBehave.next([...this.todoList]);
  }

  moveUp(taskId:number):void {
    for (let index in this.todoList) {
      if (taskId === this.todoList[index].id) {
        if(index !== '0')
          this.todoList.splice(Number(index)-1, 0, ...this.todoList.splice(Number(index), 1));
        break;
      }
    }
    this.todoListBehave.next([...this.todoList]);
  }

  moveDown(taskId:number):void {
    for (let index in this.todoList) {
      if (taskId === this.todoList[index].id) {
        if(Number(index) !== this.todoList.length-1)
          this.todoList.splice(Number(index)+1, 0, ...this.todoList.splice(Number(index), 1));
        break;
      }
    }
    this.todoListBehave.next([...this.todoList]);
  }


  /**
   *
   *  COMPLETED LIST FUNCTIONS
   *
   */

  addCompletedTask(taskToAdd:string): void {
    this.completedList.push(new Task(this.currentId++, taskToAdd, false));
    this.completedListBehave.next(this.completedList);
  }

  editCompleted(taskId:number, taskMessage:string):void {
    for(let task of this.completedList) {
      if(task.id == taskId)
        task.message = taskMessage;
    }
    this.completedListBehave.next([...this.completedList]);
  }

  incompleteTask(taskId:number): void {
    let taskIndex = -1;
    for(let index in this.completedList) {
      if(this.completedList[index].id == taskId) {
        taskIndex = Number(index);
        break;
      }
    }
    this.todoList.push(...this.completedList.splice(taskIndex, 1));
    this.todoListBehave.next([...this.todoList]);
    this.completedListBehave.next([...this.completedList]);
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
    this.completedListBehave.next([...this.completedList]);
  }

/**
 *
 *  FAVORITE LIST FUNCTIONS
 *
 */

  addFavoriteTask(taskId:number, taskMessage:string) {
    this.favoriteList.push(new Task(this.currentId++, taskMessage, true))
    this.favoriteListBehave.next([...this.favoriteList]);
  }

  deleteFavoriteTask(taskId:number) {
    let taskIndex = -1;
    for(let index in this.favoriteList) {
      if(this.favoriteList[index].id == taskId) {
        taskIndex = Number(index);
        break;
      }
    }
    this.favoriteList.splice(taskIndex, 1);
    this.favoriteListBehave.next([...this.favoriteList]);
  }

}
