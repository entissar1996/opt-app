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
export interface Subject {
  name: string;
}
@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.scss']
})
export class AddproductsComponent implements OnInit {
  product: IProduct = {
    label: '',
    description: '',
    price: null,
    categorie:'',
    brand:'',
    photo:'',
    quantity:null,
  };

  ProductForm: FormGroup;
  private subscription: Subscription;
  errorMessage;
  successMessage;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.ProductForm = this.formBuilder.group({
    label:['', Validators.required],
    description: ['', Validators.required],
    price: [null, Validators.required],
    quantity:[null, Validators.required],
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

}
