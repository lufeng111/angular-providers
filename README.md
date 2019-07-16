# AngualrProviders

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## 依赖注入
<!-- 
1： 什么是依赖注入模式以及使用依赖注入模式的好处？
依赖注入： Dependency Injection 简称 DI
假设写了一个方法，这个方法的参数是一个对象，当调用这个方法时，需要实例化这个对象，并把它传递给方法，
例如：new 一个商品Product，商品的信息在这里面Product()，然后调用createShipment方法，把这个商品Product传到这个方法里，
createShipment方法需要一个已经存在的product 类的实例，换句话说createShipment依赖Product类，但是createShipment方法本身并不知道如何创建一个product类，调用createShipment方法代码需要以某种方式创建 product，并将其作为方法的参数传递给createShipment方法，把这个对象那个作为参数传递给这个方法也叫注入这个方法，比如现在需要将product类换成一个product子类MockProduct，在我们的例子中，只需要改一行代码，
var product = new Product();
createShipment(product);
改成
var product = new MockProduct();
createShipment(product);
但是如果createShipment三个参数product,shipCompany,order，每个参数又有自己的依赖，代码可能会变成这样
var product = new Product();
var shipCompany = new ShipCompany();
var address = new Address();
var order = new Order();
order.setAddress(address);
createShipment(product,shipCompany,order);
把address信息set到order信息里面，然后调createShipment方法
上面代码有大量的手工实例化对象代码，能不能有什么能够代替创建createShipment方法所依赖的这些对象，以及这些对象自己所依赖的对象呢？
这个就是依赖注入模式要解决的问题
如果一个对象A要依赖一个类型为B的对象，那么对象A不需要去实例化对象B,B会外部机制注入进来，A只需要声明我需要一个B类型的对象，有人能给我一个吗？这就依赖注入要解决的问题
与依赖注入经常同时出现的一个概念叫控制反转，控制反转：Inversion of Control 简称 IOC、
控制反转是指将依赖的控制权从代码的内部转成代码外部，代码对外部的依赖是什么，是由代码的内部来决定的，
比如：var product = new Product() 决定了代码依赖Product()，如果我们把依赖改成MockProduct(),需要修改方法内部的代码，把Product()改成MockProduct()，如果实现控制反转，内部代码只需要声明我需要 Product()，至于传进来的是Product() 还是MockProduct()，是由代码外部来决定的，这样把依赖的控制权由代码的内部转成代码的外部，就叫控制反转，控制反转和依赖注入是一体两面，表达的是一个思想，控制反转侧重于描述目的：目的是将代码的控制权由代码内部转成代码外部。依赖注入侧重于描述手段：如何来实现控制反转，使用的手段叫依赖注入，实现控制反转模式的框架叫IOC容器，而angular框架就是一个IOC容器，

控制反转：Inversion of Control 简称 IOC
2： 介绍angular的依赖注入实现：注入器和提供器
3： 注入器的层级关系
 -->
## 使用依赖注入模式的好处
<!-- 
1： 依赖注入会以一种松耦合的方式编写代码，使代码的可重用性和可测性更高，

什么是松耦合和可重用性？

假设有一个商品组件productComponent,使用一个商品服务ProductService来获取商品信息，如果没有依赖注入，你需要知道在productComponent中如何实例化ProductService，有很多方式实例化ProductService比如new一个操作符，不管用哪种方法，商品组件productComponent和商品服务ProductService 都将紧密的结合在一起，如果想在另一个项目中，重用productComponent组件，但是要使用另一个不同的服务对象来获取商品的信息，这代表商品组件productComponent 和 商品服务ProductService 是紧密耦合在一起的，如果想在别的项目中使用商品组件productComponent，需要改代码商品组件里面的代码才可以用，而依赖注入可以解决这种商品组件和商品服务紧耦合关系，从而可以使商品组件在别的项目中也可以使用，不用修改商品组件中的代码，
var productService = new ProductService();
var productService = new AnotherProductService();
看下面一段代码：
@NgModule({
  providers: [ProductService]
  ... 省略其他配置
})
export class AppModule { }

@Componnet({
  ...省略组件配置
})
export class ProductComponnet {
  product: Product;
  constructor(productService: ProductService) {
    this.product = productService.getProduct();
  }
}

在angular项目中，通过指定providers 来告诉angular哪些对象需要依赖注入，
providers 属性是一个数组，数组里面的每一个元素是一个provider, 一个provide 定义了一个对象在被注入到指令和组件之前如何实例化，
providers: [ProductService]  这一段代码等价于 
providers: [{provide: ProductService, useClass: ProductService}]   
这里涉及angular的一个概念token, 一个token用来代表一个可被注入的对象的类型，token类型由providers的配置对象的provide属性来决定，所以providers: [{provide: ProductService, useClass: ProductService}] 这段代码的意思是，注册一个类型是 ProductService的token，当由组件或者指令声明自己需要一个ProductService的token时，实例化一个useClass: ProductService，并将其注入到目标对象，

那么组件或指令如何声明自己需要一个类型为 ProductService的token，？
答案是用组件或指令的构造函数，如果在构造函数中这样去写（productService: ProductService ）就是我需要一个类型为 ProductService的token, angular框架看到这个声明以后，就会去providers中去找provide: ProductService 这个类型的token对应的类useClass: ProductService 是哪一个，
constructor(productService: ProductService) {
    this.product = productService.getProduct();
  }
现在写的类useClass对应 ProductService 那么就会实例化一个ProductService注入到constructor(productService: ProductService)，ProductComponnet组件本身并不知道传递进来的是ProductService哪一个实现，更不需要明确实例化 ProductService，他只需要使用angular创建好的这个
对象constructor(productService: ProductService)，然后调用他的 getProduct 方法就可以了，如果想在其他项目中重用ProductComponnet这个组件，而那个项目中有另一个实现ProductService的类，那么可以修改另一个项目的AppModule 中的 providers声明，修改成这样
providers: [{provide: ProductService, useClass: AnotherProductService}]
这个意思是说我要注册一个ProductService的token，当有组件或者类声明我需要ProductService时，就在useClass: AnotherProductService 这里new 一个 AnotherProductService，现在angular 将实例化这个类型AnotherProductService， 并注入到ProductComponnet组件里面，而 ProductComponnet组件本身并不需要任何的修改，在这里消除了 ProductService 和 ProductComponnet 的紧耦合，从而提高了ProductComponnet 组件的重用性，


依赖注入的第二个好处： 可测性
当真实的对象还不可用时，可以方便的注入一个虚拟的对象来测试程序，
假设为应用添加一个登陆功能，创建一个LoginComponnet 组件，让用户填写用户名和密码，LoginComponnet 组件也需要依赖一个login服务，login服务需要连接一个身份认证服务器，并且检查用户提供的用户名，密码是否正确，但是身份认证服务器是另一个部门开发的，还没开发好，但是LoginComponnet 组件已经开发好了，没法测试，这时依赖注入可以很好地解决这个问题： 可以创建一个 MockLoginService 这个服务并不真正的连接认证服务器，而是另外编码一段逻辑判断是否可以认证登录，例如只有用户名是admin 密码是1234时，才可以认证登录，其他情况都返回用户名和密码错误，然后使用依赖注入将这个 MockLoginService 注入到LoginComponnet 组件，等认证服务器开发好了，只需要改一行代码 providers的属性，就可以让 angular 注入真正的loginservice ,提高可测试行
 -->

 ## angular 如何实现依赖注入
 <!-- 
 这主要涉及到两个概念 注入器 和 提供器
 注入器：constructor(private productService: ProductService){...}
 提供器： providers:[ProductService] => providers:[{provide:ProductService, useClass: ProductService}]
 当provide 和useClass的类型都是ProductService 可以简写成这个样providers:[ProductService]

 注入器：
  每一个组件都有一个注入器，负责注入组件需要的对象，注入器是angular 提供的一个服务类，一般情况下不需要直接调用注入器的方法，注入器会自动通过组件的构造函数将组件所需的对象注入进组件，例如：
  constructor(private productService: ProductService){...}
  constructor这个就是组件的构造函数，在这个构造函数中声名private我们需要的 productService 这样一个属性，在这个属性上我们指明他的
  类型是 ProductService ,angular 在看到这样一个构造声明的时候，就会在整个应用中去寻找 ProductService 的实例，如果能找到这个实例，就会把
  ProductService 这个实例注入到productService这个对象里面去，直接使用就可以了，为了让注入器知道需要被注入的对象如何实例化：这个ProductService怎样产生这个ProductService ，你需要指定提供器，

提供器：providers:[ProductService] => providers:[{provide:ProductService, useClass: ProductService}]
  一般我们会通过组件或者模块的providers属性来声明provide(像这样[ProductService]),在这个声明里provide 指定了提供器的token，useClass 说明实例化的方式是new ,new一个 ProductService ，而这个token 就是 在构造函数中constructor(private productService: ProductService){...} 声明的属性productService的一个类型 ProductService，当我在构造函数中声明我需要一个ProductService类型的对象的时候，他会去找token对应的productService，也就是找provide:ProductService这样一个provide的声明，他看到这个声明写的是useClass: ProductService, 他就会new一个ProductService放到 这里来constructor(private productService: ProductService){...}，如果这样写
  providers:[{provide:ProductService, useClass: AnotherProductService}] 那么在构造函数中constructor(private productService: ProductService){...}声明我需要的ProductService这样一个token的时候，new出来的东西就是AnotherProductService，所以构造函数声明的类型productService: ProductService和提供器里面provide的token（provide:ProductService）这两个是一致的，根据token的类型来匹配要注入的对象和提供器的，然后根据提供器的useClass属性来实例化具体的一个类，这里useClass: ProductService指定的是什么类 ，真正实例化的就是什么类

  最后我们还可以通过一个工厂方法useFactory来返回一个实例化对象，把工厂方法返回的实例{...}注入到ProductService属性中，
  providers:[{provide:ProductService, useFactory: () => {...}}]
  在工厂函数中还可以对实例化对象ProductService 做一些初始化的操作，
 
  -->
  ## 依赖注入实践
  <!-- 
  ng g componnet product1
  ng g service shared/product
  生成一个 product 组件和 service ，
  因为服务可以再多个组件之间共享，所以放到shared文件夹下，
   -->

## 提供器的作用域
<!-- 
在这个例子中，我们将提供器声明在了app.module 中 providers: [ProductService], 除了声明在模块中提供器 providers 也可以声明在组件中

作用域的规则：
  1：当一个提供器声明在模块（app.module 中 providers: [ProductService]）中时，它是对所有组件可见的，所以组件都可以注入它（constructor(private productService: ProductService) { }），虽然product1没有声明ProductService的注入器，但是他是可以注入模块中声明的注入器中的token，

  2: 当一个提供器声明在组件中时，它只对声明它的组件及其子组件可见，其他组件不可以注入它，
  3： 当声明在模块中的提供器和声明在组件中的提供器具有相同的token时，声明在组件中提供器会覆盖声明在模块中的提供器，所以product2这个组件会使用anotherProductService 这个服务来获取商品的数据，
  4： 一般我们会把 提供器优先声明在模块中，只有在服务必须对模块之外的其他组件不可见时才声明在组件中，是非常不常见的，
 -->
## 服务之间如何注入
<!-- 


 -->
