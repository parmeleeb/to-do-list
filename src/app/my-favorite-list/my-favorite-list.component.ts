import { Component } from '@angular/core';
import { Task } from '../models/task';
import { ListsService } from '../Services/lists.service';

@Component({
  selector: 'app-my-favorite-list',
  templateUrl: './my-favorite-list.component.html',
  styleUrls: ['./my-favorite-list.component.css']
})


export class MyFavoriteListComponent{


   /**
  *
  * VARIABLE DECLARATIONS
  *
  */

  visible: boolean = true;

  favoriteList: Task[] = [];

  taskToAdd: string = '';
  taskToEdit: string = '';

  priority: boolean = false;

  constructor(private listsService: ListsService) {
    listsService.favoriteListObserve.subscribe(data => {this.favoriteList=data})
  }

 /**
  *
  * PAGE-WIDE FUNCTION(S)
  *
  */

  toggleVisible() {
    this.visible = !this.visible;
  }


 /**
  *
  * NEW TASK FUNCTIONS
  *
  */

 addFavoriteTask() {
}


 /**
  *
  * ACTION PANE FUNCTIONS
  *
  */

  deleteTask(taskId:number) {

  }

}
