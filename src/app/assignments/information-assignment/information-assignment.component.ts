import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-information-assignment',
  templateUrl: './information-assignment.component.html',
  styleUrls: ['./information-assignment.component.css']
})
export class InformationAssignmentComponent implements OnInit {

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  assignmentTransmis?: Assignment;

  ngOnInit(): void {
    const id = this.data.itemId;
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment.data;
      });
  }

  onDeleteAssignment() {
    if (!this.assignmentTransmis) return;
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        this.assignmentTransmis = undefined;
        this.router.navigate(["/homepage"]);
        location.reload();
      });
  }
}
