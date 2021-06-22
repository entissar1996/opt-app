import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../material.module';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { ListproductsComponent } from './listproducts/listproducts.component';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { MaterialModule } from "../shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import {MatSelectModule} from '@angular/material/select';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UpdatephotoComponent } from './updatephoto/updatephoto.component';
import { UploaderComponent } from './uploader/uploader.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { EditproductComponent } from "./editproduct/editproduct.component";
import { UserBadgeComponent } from './user-badge/user-badge.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ListuserComponent } from './listuser/listuser.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AddproductsComponent,
    AddcategoryComponent,
    ListproductsComponent,
    SearchproductComponent,
    SidebarComponent,
    UpdatephotoComponent,
    UploaderComponent,
    WidgetsComponent,
    EditproductComponent,
    UserBadgeComponent,
    ConfirmationDialogComponent,
    ListuserComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    NgSelectModule,


  ]
})
export class AdminModule { }
