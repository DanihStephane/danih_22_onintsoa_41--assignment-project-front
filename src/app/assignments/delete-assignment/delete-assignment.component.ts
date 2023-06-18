import { Component } from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  providers: [
    SnackbarService
  ],
  selector: 'app-delete-assignment',
  templateUrl: './delete-assignment.component.html',
  styleUrls: ['./delete-assignment.component.css']
})
export class DeleteAssignmentComponent {
  constructor(public dialogRef: DialogRef,private snackbarService: SnackbarService) {}

  openSuccessSnackBar() {
    this.dialogRef.close()
    this.snackbarService.openSnackBar('Le devoir a été supprimer avec succer', 'Fermer', 3000);
  }
}
