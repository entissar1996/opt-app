import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/_models/products.model';
import { ProductService } from 'src/app/_services/product/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  producteData: IProduct[];
  producteProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private ProductService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateproduct();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getproduct(id);
    this.editForm = this.fb.group({
      label: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    })
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('description').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getproduct(id) {
    this.ProductService.getProductById(id).subscribe(data => {
      this.editForm.setValue({
        label: data['label'],
        description: data['description'],
        price: data['price'],
        quantity: data['quantity'],
      });
    });
  }

  updateproduct() {
    this.editForm = this.fb.group({
      label: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.ProductService.updateProduct(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/listproduct');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}

