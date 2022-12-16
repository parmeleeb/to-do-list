import { Component, Input } from '@angular/core';
import { ListsService } from '../Services/lists.service';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.css']
})

export class CompletedListComponent{

  completedList: any = [];

  constructor(private listsService:ListsService) {
    listsService.completedListObserve.subscribe(data => {
      this.completedList = data;
    })
  }

  taskToAdd: string = '';
  taskToEdit: string = '';

  addTask() {
    this.listsService.addCompletedTask(this.taskToAdd);
    this.taskToAdd = '';
  }

  editTask(taskMessage: string, taskId: number) {
    for(let  task of this.completedList) {
      if(task.toEdit && task.id != taskId)
        task.toEdit = false;
      else if(task.id == taskId)
        task.toEdit = true;
    }
    this.taskToEdit = taskMessage;
  }

  confirmEdit(taskId: number) {
    for(let task of this.completedList) task.toEdit = false;
    this.listsService.editCompleted(taskId, this.taskToEdit);
    this.taskToEdit = '';
  }

  deleteTask(taskId:number) {
    this.listsService.deleteCompletedTask(taskId);
  }

  incompleteTask(taskId:number) {
    this.listsService.incompleteTask(taskId);
  }
}

