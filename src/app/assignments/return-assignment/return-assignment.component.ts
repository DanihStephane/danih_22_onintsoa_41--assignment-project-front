import { Component } from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  providers: [
    SnackbarService
  ],
  selector: 'app-return-assignment',
  templateUrl: './return-assignment.component.html',
  styleUrls: ['./return-assignment.component.css']
})
export class ReturnAssignmentComponent {
  constructor(public dialogRef: DialogRef,private snackbarService: SnackbarService) {}
  openSuccessSnackBar() {
    this.dialogRef.close()
    this.snackbarService.openSnackBar('Le devoir a été retourner en non rendu avec succer', 'Fermer', 3000);
  }
}
