import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do-list';

  toDoVisible: boolean = true;
  completedVisible: boolean = true;
  taskToComplete: string = '';
  taskToIncomplete: string = '';

  updateListVisibility(listVisibility: any) {
    this.toDoVisible = listVisibility.toDoVisible;
    this.completedVisible = listVisibility.completedVisible;
  }

  completeTask(taskToComplete:string) {
    this.taskToComplete = taskToComplete;
  }

  incompleteTask(taskToIncomplete:string) {
    this.taskToIncomplete = taskToIncomplete;
  }
}
