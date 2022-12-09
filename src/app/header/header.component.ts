import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() updateVisibilityEvent = new EventEmitter<any>();

  showBoth() {
    this.updateVisibilityEvent.emit({toDoVisible:true, completedVisible:true});
  }

  showToDo() {
    console.log(true, false);
    this.updateVisibilityEvent.emit({toDoVisible:true, completedVisible:false});
  }

  showCompleted() {
    this.updateVisibilityEvent.emit({toDoVisible:false, completedVisible:true});
  }
}
