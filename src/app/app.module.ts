import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Product1Component } from './product1/product1.component';
import { ProductService } from './shared/product.service';
import { Product2Component } from './product2/product2.component';
import { LoggerService } from './shared/logger.service';
import { AnotherProductService } from './shared/another-product.service';

@NgModule({
  declarations: [
    AppComponent,
    Product1Component,
    Product2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  // providers: [ProductService,LoggerService],
  providers: [{
    provide: ProductService,
    useFactory: (logger: LoggerService, appConfig) => {
      // const logger = new LoggerService();
      // 这个随机数如果是大于0.5就是true ,小于0.5就是false
      const dev = Math.random() > 0.5;
      if (appConfig.isDev) {
        return new ProductService(logger);
      } else {
        return new AnotherProductService(logger);
      }
    },
    deps: [LoggerService, 'APP_CONFIG']
  }, LoggerService,
  {
    provide: 'APP_CONFIG', useValue: {isDev: false}
  }
],
  bootstrap: [AppComponent]
})
/*
1: 上面代码中，LoggerService(const logger = new LoggerService() ) ,和 ProductService 是紧密耦合在一起的，但是实际上，是已经声明了LoggerService 的提供器的，
那么如何使用已经声明的LoggerService？
需要声明另一个属性deps，用来声明useFactory工厂函数所依赖的参数，现在把logger 传进进来useFactory: (logger: LoggerService)并且类型是LoggerService（），然后在deps里声明
我需要LoggerService（deps: [LoggerService]），然后会使用提供器提供的LoggerService的声明来实例化LoggerService并将其注入到ProductService的useFactory方法参数中，

第二个问题：我们实例化那个对象是由随机数决定的，但是在真实的世界里，是不能这个样做的，所以我们依赖一个变量来决定实例那个实现类，这个变量可能在不同的环境或项目中是不一样的，那么变量是否会像服务一样依赖注入呢？
答案是肯定的，但是这就需要第三个提供器了{provide: 'IS_DEV_ENV', useValue: false}，这个提供器的token不再是一个类型而是一个字符串APP_CONFIG，需要注入的东西直接
就是一个明确的值useValue: false, 现在在useFactory加上第二个参数isDev,这就是说我还需要第二个参数，和第一个参数一样在deps声明第二个参数deps: [LoggerService, 'IS_DEV_ENVG']，第二参数是第三个提供器的token

*/
export class AppModule { }
