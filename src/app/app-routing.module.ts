import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './shared/material/home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { ListproductsComponent } from "./admin/listproducts/listproducts.component";
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { AddproductsComponent } from "./admin/addproducts/addproducts.component";
import { SidebarComponent } from "./admin/sidebar/sidebar.component";
import { UpdatephotoComponent } from './admin/updatephoto/updatephoto.component';
import { UploaderComponent } from './admin/uploader/uploader.component';
import { WidgetsComponent } from './admin/widgets/widgets.component';
import { EditproductComponent } from './admin/editproduct/editproduct.component';
import { ListuserComponent } from './admin/listuser/listuser.component';
import { AuthGuard } from "./_helpers/auth.guard";
import { AdminGuard } from "./_helpers/admin.guard";
import { AddcategoryComponent } from "./admin/addcategory/addcategory.component";
import { CardproductComponent } from './users/cardproduct/cardproduct.component';
import { ProductDetailComponent } from './users/product-detail/product-detail.component';
import { MenuComponent } from './menu/menu.component';
const routes: Routes = [


  /*{path: 'admin',
  children: [
    {
      path: 'add',
      component: AddproductsComponent,
      data: { title: 'Add Product' },
      canActivate: [AuthGuard],
    },
    {
      path: 'listuser',
      component: ListuserComponent,
      data: { title: 'List User' },
      canActivate: [AuthGuard,AdminGuard],

    },


  ],}

 */
  { path: 'card', component: CardproductComponent },

{ path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: SidebarComponent },
  { path: 'addproduct', component: AddproductsComponent },
  { path: 'listproduct', component:ListproductsComponent  },
  { path: 'upload', component:UploaderComponent  },
  { path: 'dashbord', component:WidgetsComponent  },
  { path: 'listeuser', component:ListuserComponent  },
  { path: 'listcategories', component:AddcategoryComponent  },
  { path: 'product-detail', component:ProductDetailComponent  },
  { path: 'addcategory', component:AddcategoryComponent  },

  { path: 'editproduct/:id', component:EditproductComponent  },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule],
  exports: [RouterModule,MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule]
})
export class AppRoutingModule { }
