import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Task } from '../models/task';
import { ListsService } from '../Services/lists.service';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.css']
})

export class CompletedListComponent implements OnChanges{

  constructor(private listsService: ListsService) {}

  @Input() completedVisible: boolean = true;
  

  completedList: any = [
    {
      id: 0,
      message: "Go to gym",
      toEdit: false
    },
    {
      id: -1,
      message: "Conduct personal Hygiene",
      toEdit: false
    },
    {
      id: -2,
      message: "Take breakfast ",
      toEdit: false
    },
    {
      id: -3,
      message: "Drop the kids to school ",
      toEdit: false
    }
  ]

  taskToAdd: string = '';
  priority: boolean = false;

  addTask() {
    this.listsService.addcompleteTask(this.taskToAdd);
    this.completedList = [...this.listsService.completedList]
    this.taskToAdd = '';
    


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
    this.listsService.deleteCompletedTask(taskId)
    this.completedList = [...this.listsService.completedList]

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

