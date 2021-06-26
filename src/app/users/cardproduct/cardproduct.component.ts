import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductService } from "../../_services/product/product.service";
import { IProduct } from 'src/app/_models/products.model';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cardproduct',
  templateUrl: './cardproduct.component.html',
  styleUrls: ['./cardproduct.component.scss']
})
export class CardproductComponent implements OnInit {
  Products:any = [];

  constructor(     private router: Router,
    private autheService: AuthenticationService, private ProductService: ProductService) { }


  ngOnInit():void
{
    this. ProductService.getAllProducts().subscribe(
      data =>{
        this.Products = data.payload;
        console.log(this.Products);
      });
    }
    public logout() {
      try {
       this.autheService.logout();
          this.router.navigate(['/home']);
       } catch (error) {
        console.log('Error', error);
       }
       }


  deleteMa(id:any, i:any) {
    console.log(id);
    if(window.confirm('tu veux supprimer cette annonce?')) {
      this.ProductService.deleteProduct(id).subscribe((res) => {
        this.Products.splice(i, 1);
      })
    }
  }
  click(id){
    alert(id)
  }
  getUrl(url){
    return `${environment.baseUri}/uploads/${url}`;
}


}
