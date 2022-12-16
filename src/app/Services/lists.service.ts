import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor() { }

  currentId:number = 100;

  private todoList: Task[] = [{

    id: 0,
    message: 'Declutter or Deep Clean One Room',
    toEdit: false
  },
  {
    id: 1,
    message: 'Go through my emails',
    toEdit: false
  },
  {
    id: 2,
    message: "Review previous month’s income and expenses",
    toEdit: false
  },
  {
    id: 3,
    message: "Pay bills",
    toEdit: false
  },
  {
    id: 4,
    message: "Backup important computer files to a USB drive",
    toEdit: false
  },
  {
    id: 5,
    message: "Get prescriptions refilled",
    toEdit: false
  },
  {
    id: 6,
    message: "Clean out the fridge and pantry",
    toEdit: false
  },
  {
    id: 7,
    message: "Switch out contact lenses",
    toEdit: false
  },
  {
    id: 8,
    message: "Organize my iphone photo library",
    toEdit: false
  },
  {
    id: 9,
    message: "Chech mail box",
    toEdit: false
  }];
  private todoListBehave = new BehaviorSubject<Task[]>([
    {

      id: 0,
      message: 'Declutter or Deep Clean One Room',
      toEdit: false
    },
    {
      id: 1,
      message: 'Go through my emails',
      toEdit: false
    },
    {
      id: 2,
      message: "Review previous month’s income and expenses",
      toEdit: false
    },
    {
      id: 3,
      message: "Pay bills",
      toEdit: false
    },
    {
      id: 4,
      message: "Backup important computer files to a USB drive",
      toEdit: false
    },
    {
      id: 5,
      message: "Get prescriptions refilled",
      toEdit: false
    },
    {
      id: 6,
      message: "Clean out the fridge and pantry",
      toEdit: false
    },
    {
      id: 7,
      message: "Switch out contact lenses",
      toEdit: false
    },
    {
      id: 8,
      message: "Organize my iphone photo library",
      toEdit: false
    },
    {
      id: 9,
      message: "Chech mail box",
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
        break;
      }
    }
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

  editTodo(taskId:number, taskMessage:string):void {
    for(let task of this.todoList) {
      if(task.id == taskId)
        task.message = taskMessage;
    }
    this.todoListBehave.next(this.todoList);
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
