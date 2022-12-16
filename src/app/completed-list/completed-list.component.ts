import { Component, Input } from '@angular/core';
import { ListsService } from '../Services/lists.service';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.css']
})

export class CompletedListComponent{

  @Input() completedVisible: boolean = true;

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

