import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { MaterialModule } from './../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmationDialogComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
