import { Component, OnInit } from '@angular/core';

//Servicios
import {ProductService} from '../../../services/product.service'
import { Product } from '../../../models/product';
import { element } from '../../../../../node_modules/protractor';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];

  constructor(private productService: ProductService,
  private toastr: ToastrService) { }

  ngOnInit() {
    this.productService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productList.push(x as Product);
      });
    });
  }

  onEdit(product: Product){
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string){
    this.productService.deleteProduct($key);
    this.toastr.success('Operacion exitosa', 'Producto eliminado');
  }



}
