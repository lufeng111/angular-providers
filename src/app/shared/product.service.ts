import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  // getProduct()方法，返回一个Product 对象,对象里面的属性值和constructor 中的对应
  getProduct(): Product {
    // tslint:disable-next-line: no-use-before-declare
    return new Product(0, 'iPhone', 5899, '最新款iPhone手机');
  }


}
/*
1: 通过这个服务获取的是商品信息，所以先来定义一个封装商品信息的类export class Product
2: 在ProductService里面，声明一个getProduct()方法,
3： 修改模块的声明 app.module,在providers: [ProductService],导入
4: 改写组件 product1.component

*/

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public desc: string
  ){

  }
}
