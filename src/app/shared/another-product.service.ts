import { Injectable } from '@angular/core';
import { ProductService, Product } from './product.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
/*
1: 这是 anotherProductService 他的方法返回另一个 Product实例

*/
// implements 实现的意思，AnotherProductService要实现ProductService, 这意味着 AnotherProductService 和 ProductService 会有相同的方法
export class AnotherProductService implements ProductService{
  getProduct(): Product {
    return new Product(1, 'iPhone6', 7899, '最新款iPhone6手机');
  }

  constructor(public logger: LoggerService) { }
}
