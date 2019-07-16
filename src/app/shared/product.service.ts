import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
/*
@Injectable装饰器，这个装饰器的意思是说这个 ProductService 也可以通过constructor注入其他服务，就是其他服务能够注入进来，但是这个服务ProductService能不能注入到其他组件取决于这个服务是否注入到模块中

注意：只有@Injectable装饰器要注意两点：
第一点：只有声明了@Injectable装饰器的服务才可以注入其他服务，所以建议对每一个服务都添加这样的装饰器，
第二点：为什么组件没有@Injectable 装饰器，也能够注入服务呢？
这是因为组件有@component() 装饰器，以及后面会学到的管道装饰器都是@Injectable 的子类，在声明@Component时，实际上已经声明了@Injectable装饰器了
*/
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /*
  LoggerService 注入到 ProductService中（private logger: LoggerService），直接在getProduct()方法中打印this.logger.log('getProduct方法被调用'); 是没办法
  打印的，因为LoggerService 也是一个服务，如果想被注入到ProductService 中，也需要声明一个LoggerService 的提供器，在模块中声明LoggerService 的提供器
  */
  constructor(private logger: LoggerService) { }
  // getProduct()方法，返回一个Product 对象,对象里面的属性值和constructor 中的对应
  getProduct(): Product {
    this.logger.log('getProduct方法被调用');
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
