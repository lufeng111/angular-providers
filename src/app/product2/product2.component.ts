import { Component, OnInit, Injector } from '@angular/core';
import { Product, ProductService } from '../shared/product.service';
import { AnotherProductService } from '../shared/another-product.service';
/*
1： product2和product1的唯一不同是，也有一个提供器providers，使用和模块app.module相同的token(ProductService)，但是使用的是
不同的类 useClass: AnotherProductService ，

在这个例子中，我们加了一个新的模板，加了一个新的服务，我们在这个组件的声明上声明了一个提供器providers，这个新的提供器和模块拥有相同的token(ProductService), 但是使用的是另一个类，


*/
@Component({
  selector: 'app-product2',
  templateUrl: './product2.component.html',
  styleUrls: ['./product2.component.scss'],
  // providers: [{
  //   provide: ProductService, useClass: AnotherProductService
  // }]
})
export class Product2Component implements OnInit {
  product: Product;
  private productService: ProductService;
  constructor(private injector: Injector) {
    // tslint:disable-next-line: deprecation
    this.productService = injector.get(this.productService)
  }

  ngOnInit() {
    this.product = this.productService.getProduct();
  }

}
