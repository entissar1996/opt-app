import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IProduct } from 'src/app/_models/products.model';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductService } from 'src/app/_services/product/product.service';
import { AdminModule } from "../admin.module";
import { AngularMaterialModule } from "../../material.module";
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Marque } from 'src/app/_models/marque';
import { Category } from 'src/app/_models/category';

import { MarqueService } from 'src/app/_services/marques/marque.service';
import { CategoryService } from 'src/app/_services/category/category.service';

export interface Subject {
  name: string;
}
@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.scss']
})
export class AddproductsComponent implements OnInit {
  CatedataSource :MatTableDataSource<Category>;
  CatetData: any = [];
  ProductData: any = [];
  dataSource: MatTableDataSource<Marque>;
  @ViewChild('sidenav') public sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  ProductForm: FormGroup;
  private subscription: Subscription;
  errorMessage;
  successMessage;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private marqueService :MarqueService,
    private cat:CategoryService
  ) {
    this.ProductForm = this.formBuilder.group({
    label:['', Validators.required],
    couleur:['#ffffff', Validators.required],
    brand:[this.dataSource, Validators.required],
    categorie:[this.CatedataSource, Validators.required],
    pricepromo:['', Validators.required],
    description: ['', Validators.required],
    price: [null, Validators.required],
    quantity:[null, Validators.required],
    })
    this.marqueService.getAllMarques().subscribe(data => {
      this.ProductData = data.payload;
      this.dataSource = new MatTableDataSource<Marque>(this.ProductData);
      console.log(this.dataSource);


    })
    this.cat.getAllCategorys().subscribe(data => {
      this.CatetData = data.payload;
      this.CatedataSource = new MatTableDataSource<Category>(this.CatetData);
      console.log(this.dataSource);


    })
  }

  ngOnInit() { }


  onSubmit(): void{
    this.subscription=this.productService.postProduct(this.ProductForm.value).subscribe({
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
