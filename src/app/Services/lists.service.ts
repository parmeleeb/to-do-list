import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor() { }

  currentId:number = 1;

  private todoList: Task[] = [];
  private todoListBehave = new BehaviorSubject<Task[]>([    {
    id: 0,
    message: 'This is the first task in my To-Do list!',
    toEdit: false
  },
  {
    id: 1,
    message: 'This is the second, I guess...',
    toEdit: false
  },
  {
    id: 2,
    message: "Hello Edwin I hope you're having a great day!",
    toEdit: false
  }]);
  todoListObserve = this.todoListBehave.asObservable();

  private completedList: Task[] = [new Task(0,'helo')];
  private completedListBehave = new BehaviorSubject<Task[]>([new Task(0,'helo')]);
  completedListObserve = this.completedListBehave.asObservable();

  private favoriteList: Task[] = [];
  private favoriteListBehave = new BehaviorSubject<Task[]>([]);
  favoriteListObserve = this.favoriteListBehave.asObservable();


  addTodoTask(taskToAdd:string, priority:boolean): void {
    if(priority)
      this.todoList.unshift(new Task(this.currentId++, taskToAdd));
    else
      this.todoList.push(new Task(this.currentId++, taskToAdd));
    this.todoListBehave.next(this.todoList);
  }

  addCompletedTask(taskToAdd:string): void {
    this.completedList.push(new Task(this.currentId++, taskToAdd));
    this.completedListBehave.next(this.completedList);
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
    this.todoListBehave.next(this.todoList);
    this.completedListBehave.next(this.completedList);
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
    this.todoListBehave.next(this.todoList);
    this.completedListBehave.next(this.completedList);
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
    this.todoListBehave.next(this.todoList);
  }

  deleteCompletedTask(taskId:number): void {
    let taskIndex = -1;
    for(let index in this.completedList) {
      if(this.completedList[index].id == taskId) {
        taskIndex = Number(index);
        console.log('task to delete: ' + this.completedList[index]);
        break;
      }
    }
    console.log('service list: '+this.completedList);
    this.completedList.splice(taskIndex, 1);
    this.completedListBehave.next(this.completedList);
  }

  editCompleted(taskId:number, taskMessage:string):void {
    for(let task of this.completedList) {
      if(task.id == taskId)
        task.message = taskMessage;
    }
    this.completedListBehave.next(this.completedList);
  }

  moveUp(taskId:number):void {
    for (let index in this.todoList) {
      if (taskId === this.todoList[index].id) {
        if(index !== '0')
          this.todoList.splice(Number(index)-1, 0, ...this.todoList.splice(Number(index), 1));
        break;
      }
    }
    this.todoListBehave.next(this.todoList);
  }

  moveDown(taskId:number):void {
    for (let index in this.todoList) {
      if (taskId === this.todoList[index].id) {
        if(Number(index) !== this.todoList.length-1)
          this.todoList.splice(Number(index)+1, 0, ...this.todoList.splice(Number(index), 1));
        break;
      }
    }
    this.todoListBehave.next(this.todoList);
  }
}
