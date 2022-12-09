import { Component, Input } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.css']
})
export class CompletedListComponent {

  @Input() completedVisible: boolean = true;

  currentId: number = -3;

  completedList: any = [
    {
      id: 0,
      message: 'This is the first task in my To-Do list!',
      toEdit: false
    },
    {
      id: -1,
      message: 'This is the second, I guess...',
      toEdit: false
    },
    {
      id: -2,
      message: "Hello Edwin I hope you're having a great day!",
      toEdit: false
    }
  ]

  taskToAdd: string = '';
  priority: boolean = false;

  addTask() {
    const newTask = new Task(this.currentId, this.taskToAdd);
    if(this.priority)
      this.completedList.unshift(newTask);
    else
      this.completedList.push(newTask);
    this.taskToAdd = '';
    this.priority = false;
    this.currentId--;
  }

  toggleEdit(taskId: number) {
    for (let task of this.completedList) {
      if(taskId === task.id) task.toEdit = !task.toEdit;
    }
  }

  deleteTask(taskId:number) {
    for (let index in this.completedList) {
      if (taskId === this.completedList[index].id) this.completedList.splice(index, 1);
    }
  }

  completeTask(taskId:number) {
    //write code to call other list add function
    this.deleteTask(taskId);
  }
}

