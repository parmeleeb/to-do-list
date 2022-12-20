import { Component, Input } from '@angular/core';
import { ListsService } from '../Services/lists.service';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.css']
})

export class CompletedListComponent{


 /**
  *
  * VARIABLE DECLARATIONS
  *
  */

  completeListVisible: boolean = true;

  completedList: any = [];

  taskToAdd: string = '';

  taskToEdit: string = '';

  constructor(private listsService:ListsService) {
    listsService.completedListObserve.subscribe(data => {
      this.completedList = data;
    })
  }


 /**
  *
  * PAGE-WIDE FUNCTION(S)
  *
  */

 /**
  *
  * NEW TASK FUNCTION(S)
  *
  */

  addTask() {
    this.listsService.addCompletedTask(this.taskToAdd);
    this.taskToAdd = '';
  }


 /**
  *
  * ACTION PANE FUNCTIONS
  *
  */

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

  discardEdit() {
    for(let task of this.completedList) task.toEdit = false;
    this.taskToEdit = '';
  }

  incompleteTask(taskId:number) {
    this.listsService.incompleteTask(taskId);
  }

  deleteTask(taskId:number) {
    this.listsService.deleteCompletedTask(taskId);
  }

  toggleListFavorite(taskId:number) {
    this.listsService.toggleCompletedFavorite(taskId);
  }
}

