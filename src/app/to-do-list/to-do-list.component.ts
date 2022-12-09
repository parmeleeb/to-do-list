import { Component, Input } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {

  @Input() toDoVisible: boolean = true;

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
    //write code to call other list add function
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
        this.toDoList.splice(Number(index)-1, 0, ...this.toDoList.splice(index, 1));
        break;
      }
    }
  }

  moveDown(taskId:number) {
    for (let index in this.toDoList) {
      if (taskId === this.toDoList[index].id) {
        this.toDoList.splice(Number(index)+1, 0, ...this.toDoList.splice(index, 1));
        break;
      }
    }
  }
}
