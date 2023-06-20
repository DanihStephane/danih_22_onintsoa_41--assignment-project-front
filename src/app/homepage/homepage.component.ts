import { Component, Inject, NgZone, OnInit,ViewChild } from '@angular/core';
import {Router, RouterLink, RouterStateSnapshot} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewAssignmentComponent } from "../assignments/new-assignment/new-assignment.component";
import { CommonModule } from '@angular/common';
import {NgFor} from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  DragDropModule
} from '@angular/cdk/drag-drop';
import { Dialog,  DialogModule } from '@angular/cdk/dialog';
import {SnackbarService} from "../services/snackbar.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { Assignment } from '../assignments/assignment.model';
import { AuthService } from '../shared/auth.service';
import { AssignmentsService } from "../shared/assignments.service";
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import { HttpStatusCode } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { filter, map, pairwise, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EditionAssignmentComponent} from "../assignments/edition-assignment/edition-assignment.component";
import {InformationAssignmentComponent} from "../assignments/information-assignment/information-assignment.component";

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
        CdkDropListGroup, CdkDropList, NgFor, CdkDrag, DragDropModule,
        DialogModule,
        MatIconModule,
        MatSnackBarModule,
        CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, RouterLink,
        NewAssignmentComponent,
        CommonModule
    ],
  providers: [
    SnackbarService
  ]
})


export class HomepageComponent implements OnInit {

  openNewAssignmentModal(): void {
    const dialogRef = this.dialog.open(NewAssignmentComponent);
    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });
  }

  logout(): void{
    this.authService.logOut().subscribe(reponse => {
      sessionStorage.removeItem('token');
      this.router.navigate(["/login"]);
    });
  }

  titre="Liste des devoirs à rendre";
  errorMessage?: string ;
  isDragEnabled: boolean= false;
  assignments:Assignment[] = [];
  assignmentsRendu: Assignment[] = [];
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu'];

  page: number=1;
  limit: number=10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(
    private assignmentsService:AssignmentsService,
    private ngZone: NgZone,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  )
  {}

  ngOnInit(): void {
    this.getAssignments();
  }

  onSuccessList = (reponse: any) =>{
    if(reponse.code == HttpStatusCode.Accepted){
      this.filterData(reponse.data.docs);
      this.setPageProperties(reponse.data);
    }else{
      this.errorMessage = reponse.message;
      console.log(this.errorMessage);
    }
  }

  getAssignments() {
    this.assignmentsService.getAssignments(this.page,this.limit).subscribe(
      this.onSuccessList
    );
  }

  private filterData(data: Assignment[]){
    if(data.length != 0){
      this.assignments = this.assignments.concat(data.filter( (item :Assignment) => item.rendu != true));
      this.assignmentsRendu = this.assignmentsRendu.concat(data.filter( (item :Assignment) => item.rendu == true));
    }
  }

  ngAfterViewInit() {
    console.log("after view init");
    if(!this.scroller) return;
    this.scroller.elementScrolled()
      .pipe(
        tap(event => {
        }),
        map(event => {
          return this.scroller.measureScrollOffset('bottom');
        }),
        tap(y => {
        }),
        pairwise(),
        tap(([y1, y2]) => {
        }),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 100;
        }),
      )
      .subscribe((val) => {
        this.ngZone.run(() => {
          if(!this.hasNextPage) return;
          this.page = this.nextPage;
          this.getAddAssignmentsForScroll();
        });
      });
  }

  getAddAssignmentsForScroll() {
    this.assignmentsService.getAssignments(this.page, this.limit).subscribe(
      this.onSuccessList
    );
  }

  editAssignment(item: any) {
    console.log(item);
    let dialogRef = this.dialog.open(EditionAssignmentComponent, {
      data: { itemId: item._id }
    });
    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });
  }

  viewDetails(item: any) {
    let dialogRef = this.dialog.open(InformationAssignmentComponent, {
      data: { itemId: item._id }
    });
    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });
  }

  setPageProperties(data: any){
    this.page = data.page;
    this.limit = data.limit;
    this.totalDocs = data.totalDocs;
    this.totalPages = data.totalPages;
    this.hasPrevPage = data.hasPrevPage;
    this.prevPage = data.prevPage;
    this.hasNextPage = data.hasNextPage;
    this.nextPage = data.nextPage;
  }

  drop(event: CdkDragDrop<Assignment[], Assignment[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const previousContainer = event.previousContainer;
      const currentContainer = event.container;
      const previousIndex = event.previousIndex;
      const currentIndex = event.currentIndex;
      const draggedItem: Assignment = JSON.parse(JSON.stringify(previousContainer.data[previousIndex]));
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {real: previousContainer.data[previousIndex], copy:draggedItem};
      const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        console.log(draggedItem);
        console.log(this.assignmentsRendu);
        if (result && result !== draggedItem) {
          transferArrayItem(
            previousContainer.data,
            currentContainer.data,
            previousIndex,
            currentIndex
          );
        }
      });
    }
  }
}

//code repris sur un collegue

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./homepage.component.css']
})
export class ModalComponent {
  noteForm: FormGroup;
  errorMessage? : string;
  constructor(
    private assignmentsService: AssignmentsService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {real:Assignment,copy:Assignment},
    private formBuilder: FormBuilder
  ) {
    this.noteForm = this.formBuilder.group({
      note: ['', Validators.required],
      remarks: ['']
    });
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  onConfirm(): void {
    this.data.real.note = this.noteForm.value.note;
    this.data.real.remarques = this.noteForm.value.remarks;
    this.data.real.dateDeRendu = new Date();
    this.assignmentsService.patchAssignment(this.data.real).subscribe(
      (res) =>{
        if(res.code == 202){
          this.data.real = res.data;
          this.dialogRef.close(this.data);
        }else{
          this.errorMessage = res.message;
          this.data.real = this.data.copy;
        }
      },(error) => {
        this.errorMessage = error.message;
        this.data.real = this.data.copy;
        console.error(error);
      });
  }
}
