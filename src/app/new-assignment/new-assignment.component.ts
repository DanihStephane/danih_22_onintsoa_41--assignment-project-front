import { Component } from '@angular/core';
import {DialogRef} from '@angular/cdk/dialog';


@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.css']
})
export class NewAssignmentComponent {
  constructor(public dialogRef: DialogRef) {}
}
