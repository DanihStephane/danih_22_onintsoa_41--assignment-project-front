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
import { NewAssignmentComponent } from "../assignments/new-assignment/new-assignment.component";
import { Dialog,  DialogModule } from '@angular/cdk/dialog';
import {ShowAssignmentComponent} from "../assignments/show-assignment/show-assignment.component";
import {SnackbarService} from "../services/snackbar.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ConfirmAssignmentComponent} from "../assignments/confirm-assignment/confirm-assignment.component";
import {ReturnAssignmentComponent} from "../assignments/return-assignment/return-assignment.component";
import {DeleteAssignmentComponent} from "../assignments/delete-assignment/delete-assignment.component";

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
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    SnackbarService
  ]
})
export class HomepageComponent {
  username: string = '';

  constructor(private router: Router, public dialog: Dialog,private snackbarService: SnackbarService) {

  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  delete : string[] = []

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

    if (event.currentIndex === 0) {
      console.log('Élément déplacé current :', event.currentIndex);
      console.log('Élément déplacé :', event.container.data);
      console.log('Conteneur de destination :', event.container.id);
      if (event.container.id === 'cdk-drop-list-0'){
        this.openDeleteAssignmentModal();
      }
      if (event.container.id === 'cdk-drop-list-1'){
        this.openReturnAssignmentModal();
      }
      if (event.container.id === 'cdk-drop-list-2'){
        this.openConfirmAssignmentModal();
      }
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

  openConfirmAssignmentModal(): void {
    this.dialog.open<string>(ConfirmAssignmentComponent);
  }

  openReturnAssignmentModal(): void {
    this.dialog.open<string>(ReturnAssignmentComponent);
  }

  openDeleteAssignmentModal(): void {
    this.dialog.open<string>(DeleteAssignmentComponent);
  }

}
