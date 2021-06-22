import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { MaterialModule } from './../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CardproductComponent } from './cardproduct/cardproduct.component';


@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    CardproductComponent,

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
