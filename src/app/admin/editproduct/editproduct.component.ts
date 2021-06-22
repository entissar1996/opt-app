import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/_models/products.model';
import { ProductService } from 'src/app/_services/product/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetProductForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ProductForm: FormGroup;


  ngOnInit() {
    this.updateproductForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private ProductApi: ProductService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.ProductApi.getProductById(id).subscribe(data => {
      console.log(data)
      this.ProductForm = this.fb.group({
        label: [data.label, [Validators.required]],
        description: [data.description, [Validators.required]],
        couleur:[data.couleur, [Validators.required]],
        brand: ['choix un', [Validators.required]],
        categories:['choix un', [Validators.required]],
        price: [data.price, [Validators.required]],
        pricepromo: [data.pricepromo, [Validators.required]],
        quantity: [data.quantity, [Validators.required]],
      })
    })
  }

  /* Reactive book form */
  updateproductForm() {
    this.ProductForm = this.fb.group({
      label: ['', [Validators.required]],
      description: ['', [Validators.required]],
     // brand: ['', [Validators.required]],
      price: ['', [Validators.required]],
      pricepromo: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    })
  }

  /* Add dynamic languages
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    if (input) {
      input.value = '';
    }
  }
*/
  /* Remove dynamic languages
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }
 */
  /* Date
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }
*/
  /* Get errors
  public handleError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  }
*/
  /* Update book */
  updateProductForm() {
    console.log(this.ProductForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Êtes-vous sûr de vouloir mettre à jour ?')) {
      this.ProductApi.updateProduct(id, this.ProductForm.value).subscribe( res => {
        console.log("sucess")
        this.ngZone.run(() => this.router.navigateByUrl('/listproduct'))
      });
    }
  }
}

