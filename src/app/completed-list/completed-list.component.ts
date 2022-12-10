import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.css']
})

export class CompletedListComponent implements OnChanges{

  @Input() completedVisible: boolean = true;
  @Input() taskToComplete: string = '';
  @Output() taskIncompleteEvent = new EventEmitter<string>();

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
    let taskToIncomplete = '';
    for (let task of this.completedList) {
      if(taskId === task.id) taskToIncomplete = task.message;
    }
    this.taskIncompleteEvent.emit(taskToIncomplete);
    setTimeout(() => this.taskIncompleteEvent.emit(''), 0);
    this.deleteTask(taskId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.taskToComplete !== '') {
      this.taskToAdd = this.taskToComplete;
      this.addTask();
    }
    console.log(changes);
  }
}

