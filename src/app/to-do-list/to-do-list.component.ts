import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Validator } from '@angular/forms';
import { Task } from '../models/task';
import { ListsService } from '../Services/lists.service';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {

  constructor(private listsService: ListsService) {}

  @Input() toDoVisible: boolean = true;



  toDoList: any = [
    {
      
      id: 0,
      message: 'Declutter or Deep Clean One Room',
      toEdit: false
    },
    {
      id: 1,
      message: 'Go through my emails',
      toEdit: false
    },
    {
      id: 2,
      message: "Review previous month’s income and expenses",
      toEdit: false
    },
    {
      id: 3,
      message: "Pay bills",
      toEdit: false
    },
    {
      id: 4,
      message: "Backup important computer files to a USB drive",
      toEdit: false
    },
    {
      id: 5,
      message: "Get prescriptions refilled",
      toEdit: false
    },
    {
      id: 6,
      message: "Clean out the fridge and pantry",
      toEdit: false
    },
    {
      id: 7,
      message: "Switch out contact lenses",
      toEdit: false
    },
    {
      id: 8,
      message: "Organize my iphone photo library",
      toEdit: false
    },
    {
      id: 9,
      message: "Chech mail box",
      toEdit: false
    }
  ]

  taskToAdd: string = '';
  priority: boolean = false;



  addTask() {
    this.listsService.addTodoTask(this.taskToAdd, this.priority);
    this.toDoList = [...this.listsService.toDoList]

    this.taskToAdd = '';
    this.priority = false;
  }

  toggleEdit(taskId: number) {
    // this.listsService.toggleEdit(taskId)
    this.toDoList = [...this.listsService.toDoList]

    for (let task of this.toDoList) {
      if(taskId === task.id) task.toEdit = !task.toEdit;
    }
  }

  deleteTask(taskId:number) {
    this.listsService.deleteTodoTask(taskId)
    this.toDoList = [...this.listsService.toDoList]

    for (let index in this.toDoList) {
      if (taskId === this.toDoList[index].id) this.toDoList.splice(index, 1);
    }
  }

  completeTask(taskId:number) {
    this.listsService.incompleteTask(taskId)
    this.toDoList = [...this.listsService.toDoList]

  }


  moveUp(taskId:number) {
    this.listsService.moveUp(taskId)
    this.toDoList = [...this.listsService.toDoList]

    for (let index in this.toDoList) {
      if (taskId === this.toDoList[index].id) {
        if(index !== '0')
          this.toDoList.splice(Number(index)-1, 0, ...this.toDoList.splice(index, 1));
        break;
      }
    }
  }

  moveDown(taskId:number) {
    this.listsService.moveDown(taskId)
    this.toDoList = [...this.listsService.toDoList]

    for (let index in this.toDoList) {
      if (taskId === this.toDoList[index].id) {
        if(Number(index) !== this.toDoList.length-1)
          this.toDoList.splice(Number(index)+1, 0, ...this.toDoList.splice(index, 1));
        break;
      }
    }
  }

}
