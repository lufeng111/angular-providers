import { Component, OnInit } from '@angular/core';
import { Product, ProductService, } from '../shared/product.service';

@Component({
  selector: 'app-product1',
  templateUrl: './product1.component.html',
  styleUrls: ['./product1.component.scss']
})
export class Product1Component implements OnInit {
/*
1: 首先声明一个product 的属性，用来接收从服务中获取到的数据Product
2： 在构造函数里面通过依赖注入声明我需要一个token是productService的这样一个服务
3： 在ngOnInit() 方法里

*/

/*
商品服务ProductService，通过商品组件Product1Component的构造函数，注入到商品组件里面，
然后通过getProduct方法获取数据，给到本地的变量this.product，然后展示到页面上

*/
  product: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.product = this.productService.getProduct();
  }

}
