import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do-list';

  todoVisible = true;
  completedVisible = true;


  toggleTodoVisible() {
    this.todoVisible = !this.todoVisible;
  }

  toggleCompletedVisible(){
    this.completedVisible = !this.completedVisible;
  }


}
