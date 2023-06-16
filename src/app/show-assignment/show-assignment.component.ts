import { Component } from '@angular/core';
import {DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-show-assignment',
  templateUrl: './show-assignment.component.html',
  styleUrls: ['./show-assignment.component.css']
})
export class ShowAssignmentComponent {
  constructor(public dialogRef: DialogRef) {}
}
