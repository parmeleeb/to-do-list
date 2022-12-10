import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ɵisListLikeIterable } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnChanges{

  @Input() toDoVisible: boolean = true;
  @Input() taskToIncomplete: string = '';
  @Output() taskCompleteEvent = new EventEmitter<string>();
  @Output() resetTaskEvent = new EventEmitter<string>();

  currentId: number = 3;

  toDoList: any = [
    {
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
    }
  ]

  taskToAdd: string = '';
  priority: boolean = false;

  addTask() {
    const newTask = new Task(this.currentId, this.taskToAdd);
    if(this.priority)
      this.toDoList.unshift(newTask);
    else
      this.toDoList.push(newTask);
    this.taskToAdd = '';
    this.priority = false;
    this.currentId++;
  }

  toggleEdit(taskId: number) {
    for (let task of this.toDoList) {
      if(taskId === task.id) task.toEdit = !task.toEdit;
    }
  }

  deleteTask(taskId:number) {
    for (let index in this.toDoList) {
      if (taskId === this.toDoList[index].id) this.toDoList.splice(index, 1);
    }
  }

  completeTask(taskId:number) {
    let taskToComplete = '';
    for (let task of this.toDoList) {
      if(taskId === task.id) taskToComplete = task.message;
    }
    this.taskCompleteEvent.emit(taskToComplete);
    this.deleteTask(taskId);
  }

  moveToTop(taskId:number) {
    for (let index in this.toDoList) {
      if (taskId === this.toDoList[index].id) {
        this.toDoList.unshift(...this.toDoList.splice(index, 1));
        break;
      }
    }
  }

  moveUp(taskId:number) {
    for (let index in this.toDoList) {
      if (taskId === this.toDoList[index].id) {
        if(index !== '0')
          this.toDoList.splice(Number(index)-1, 0, ...this.toDoList.splice(index, 1));
        break;
      }
    }
  }

  moveDown(taskId:number) {
    for (let index in this.toDoList) {
      if (taskId === this.toDoList[index].id) {
        if(Number(index) !== this.toDoList.length-1)
          this.toDoList.splice(Number(index)+1, 0, ...this.toDoList.splice(index, 1));
        break;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.taskToIncomplete !== '') {
      this.taskToAdd = this.taskToIncomplete;
      this.addTask();
      setTimeout(() => this.resetTaskEvent.emit(''), 0);
    }
    console.log(changes);
  }
}
