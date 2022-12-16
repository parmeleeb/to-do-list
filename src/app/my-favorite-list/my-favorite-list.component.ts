import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-my-favorite-list',
  templateUrl: './my-favorite-list.component.html',
  styleUrls: ['./my-favorite-list.component.css']
})


export class MyFavoriteListComponent implements OnChanges{

  @Input() toDoVisible: boolean = true;
  @Input() taskToIncomplete: string = '';
  @Output() taskCompleteEvent = new EventEmitter<string>();

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



  favTask() {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.taskToIncomplete !== '') {
      this.taskToAdd = this.taskToIncomplete;
      this.favTask();
    }
    console.log(changes);
  }

}
