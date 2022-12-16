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

  updateListVisibility(listVisibility: any) {
    this.toDoVisible = listVisibility.toDoVisible;
    this.completedVisible = listVisibility.completedVisible;
  }
}
