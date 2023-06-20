import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { ShowAssignmentComponent } from './assignments/show-assignment/show-assignment.component';
import { ConfirmAssignmentComponent } from './assignments/confirm-assignment/confirm-assignment.component';
import { DeleteAssignmentComponent } from './assignments/delete-assignment/delete-assignment.component';
import { ReturnAssignmentComponent } from './assignments/return-assignment/return-assignment.component';

import { ModalComponent } from "./homepage/homepage.component";
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AssignmentDetailComponent} from "./assignments/assignment-detail/assignment-detail.component";
import { EditAssignmentComponent } from "./assignments/edit-assignment/edit-assignment.component";

import { MatCheckboxModule } from '@angular/material/checkbox';

//requete
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';

import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ShowAssignmentComponent,
    ConfirmAssignmentComponent,
    DeleteAssignmentComponent,
    ReturnAssignmentComponent,
    ModalComponent,
    AssignmentDetailComponent,
    EditAssignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    CommonModule,
    ScrollingModule,
    MatStepperModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
