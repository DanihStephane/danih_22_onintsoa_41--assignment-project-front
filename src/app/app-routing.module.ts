import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import {NewAssignmentComponent} from "./assignments/new-assignment/new-assignment.component";
import {AssignmentDetailComponent} from "./assignments/assignment-detail/assignment-detail.component";
import {EditAssignmentComponent} from "./assignments/edit-assignment/edit-assignment.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'add', component: NewAssignmentComponent },
  { path: 'assignments/:id', component: AssignmentDetailComponent },
  { path: 'assignments/:id/edit', component: EditAssignmentComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Redirection par défaut vers la page de connexion
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
