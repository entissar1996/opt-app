import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/admin/confirmation-dialog/confirmation-dialog.component';
import { IApiResponse } from 'src/app/_models/api-response.model';
import { IProduct } from 'src/app/_models/products.model';
import { ProductService } from 'src/app/_services/product/product.service';
import { environment } from 'src/environments/environment';
import { UploadService } from '../upload.service';
import { UploaderComponent } from '../uploader/uploader.component';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.scss']
})
export class ListproductsComponent implements OnInit {

  ProductData: any = [];
  dataSource: MatTableDataSource<IProduct>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sidenav') public sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  displayedColumns: string[] = [
    'label', 'brand',
    'price', 'quantity',"price_promo",
    'photo','actions'];

  constructor(
    private router: Router,
    private productApi: ProductService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public uploadService:UploadService) {
    this.productApi.getAllProducts().subscribe(data => {
      this.ProductData = data.payload;
      this.dataSource = new MatTableDataSource<IProduct>(this.ProductData);
      console.log(this.dataSource);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  ngOnInit() { }


  deleteProduct(id){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: "Confirmez-vous la suppression de cet produit ?  "
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.productApi.deleteProduct(id).subscribe({
         next:(response:IApiResponse)=>{
          this.router.navigateByUrl('/listproduct');

         },
         error:(error)=>{
          this.router.navigateByUrl('/listproduct');

         },
         complete:()=>null
       });
      }
    });

}


  getUrl(url){
          return `${environment.baseUri}/uploads/${url}`;
  }

  uploadPhoto(id:string){
    console.log("from list ",id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
    dialogConfig.height="50%";
    dialogConfig.data=id;

    let dialogRef = this.dialog.open(UploaderComponent, {data:{id:id}});
    dialogRef.afterClosed().subscribe(console.log)
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
