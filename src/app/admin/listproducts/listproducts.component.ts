import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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

  deleteStudent(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.productApi.deleteProduct(e._id).subscribe()
    }
  }
  deleteProduct(id){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: "Do you confirm the deletion of this User? "
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
}
