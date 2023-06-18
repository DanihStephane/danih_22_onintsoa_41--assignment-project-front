import { Component } from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

@Component({
  providers: [
    SnackbarService
  ],
  selector: 'app-confirm-assignment',
  templateUrl: './confirm-assignment.component.html',
  styleUrls: ['./confirm-assignment.component.css']
})
export class ConfirmAssignmentComponent {
  constructor(public dialogRef: DialogRef,private snackbarService: SnackbarService) {}

  openSuccessSnackBar() {
    this.dialogRef.close()
    this.snackbarService.openSnackBar('Le devoir a été rendu avec succer', 'Fermer', 3000);
  }
}
