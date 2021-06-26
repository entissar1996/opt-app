import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/users/confirmation-dialog/confirmation-dialog.component';
import { IApiResponse } from 'src/app/_models/api-response.model';
import { MarqueService } from 'src/app/_services/marques/marque.service';
import { environment } from 'src/environments/environment';
import { UploaderService } from '../uploader.service';
import { UploaderComponent } from '../uploader/uploader.component';
import { UploadmarqueComponent } from '../uploadmarque/uploadmarque.component';

@Component({
  selector: 'app-add-marque',
  templateUrl: './add-marque.component.html',
  styleUrls: ['./add-marque.component.scss']
})
export class AddMarqueComponent implements OnInit {

  marqueData: any = [];
  dataSource: MatTableDataSource<MarqueService>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sidenav') public sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  marqueForm: FormGroup;
  private subscription: Subscription;
  errorMessage;
  successMessage;
  displayedColumns: string[] = [
    'label','logo','actions'
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private marqueService: MarqueService,
    public uploadService:UploaderService,
    public dialog: MatDialog,


  ) {
    this.marqueForm = this.formBuilder.group({
    label:['', Validators.required],

    }),
    this.marqueService.getAllMarques().subscribe(data => {
      this.marqueData = data.payload;
      this.dataSource = new MatTableDataSource<MarqueService>(this.marqueData);
      console.log(this.dataSource);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  ngOnInit() { }


  onSubmit(): void{
    this.subscription=this.marqueService.postMarque(this.marqueForm.value).subscribe({
      next: (response) => {
        this.errorMessage = null;
      this.successMessage = '';
      setTimeout(()=>{
        this.successMessage = 'successs';
      },2000);


      },
      error:(error)=>{
        this.errorMessage = error;
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
      console.log(error);
      },
      complete:console.log

    });



  }

  deletemarque(id){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: "Confirmez-vous la suppression de cet produit ?  "
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.marqueService.deleteMarque(id).subscribe({
         next:(response:IApiResponse)=>{
          this.router.navigateByUrl('/addmarque');

         },
         error:(error)=>{
          this.router.navigateByUrl('/addmarque');

         },
         complete:()=>null
       });
      }
    });

}

getUrl(url){
  return `${environment.baseUri}/uploadsmarque/${url}`;
}

uploadPhoto(id:string){
console.log("from list ",id)
const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;
dialogConfig.width="70%";
dialogConfig.height="50%";
dialogConfig.data=id;

let dialogRef = this.dialog.open(UploadmarqueComponent, {data:{id:id}});
dialogRef.afterClosed().subscribe(console.log);


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
