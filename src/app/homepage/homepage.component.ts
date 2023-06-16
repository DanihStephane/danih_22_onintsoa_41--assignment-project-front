import { Component } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

//Drag and drop
import {NgFor} from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { NewAssignmentComponent } from "../new-assignment/new-assignment.component";
import { Dialog,  DialogModule } from '@angular/cdk/dialog';
import {ShowAssignmentComponent} from "../show-assignment/show-assignment.component";

//Modal assignment



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    //drag and drop
    CdkDropListGroup, CdkDropList, NgFor, CdkDrag,DragDropModule,
    //Modal
    DialogModule,
    MatIconModule
  ],
})
export class HomepageComponent {
  username: string = '';

  constructor(private router: Router, public dialog: Dialog) {

  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  openNewAssignmentModal(): void {
    this.dialog.open<string>(NewAssignmentComponent);
  }

  logout(): void{
    this.router.navigate(['/login']);
  }

  openShowAssignmentModal(): void {
    this.dialog.open<string>(ShowAssignmentComponent);
  }
}
