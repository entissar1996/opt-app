import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { MaterialModule } from './../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CardproductComponent } from './cardproduct/cardproduct.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ConsulteProfilComponent } from './consulte-profil/consulte-profil.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { AddMarqueComponent } from '../admin/add-marque/add-marque.component';


@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    CardproductComponent,
    ProductDetailComponent,
    ConsulteProfilComponent,
    EditProfileComponent,
    AddCartComponent,
    AddMarqueComponent

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
