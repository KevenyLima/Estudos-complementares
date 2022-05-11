// decorators sao como observer (gatilhos/triggers)
//o decorator e como uma função executada na instanciação de um objeto
// argumentos especiais
// target , property e descriptor
// o trunfo do decorator e que ele da informações do local que foi executado
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//criando um decorator
function MyDecorator() {
    console.log("iniciando decorator");
    return function (target, propertyKey, descriptor) {
        console.log("executando decorator");
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
    };
}
var myClass = /** @class */ (function () {
    function myClass() {
    }
    //atrelando um decorator a uma função
    myClass.prototype.testing = function () {
        console.log("terminando execução do método");
    };
    __decorate([
        MyDecorator()
    ], myClass.prototype, "testing");
    return myClass;
}());
var myObject = new myClass();
//o decorator sera executado na instancia da função
myObject.testing();
//------------------------------------------------------------------------------
//multiplos decorators
//a decorator mais abaixo executa primeiro 
//as decorators sao executadas de baixo para cima
var num = 0;
function decoratorA() {
    return function (target, propertyKey, descriptor) {
        num = num + 10;
        console.log("executando decorator A");
    };
}
function decoratorB() {
    return function (target, propertyKey, descriptor) {
        num = num * 10;
        console.log("executando decorator B");
    };
}
var test = /** @class */ (function () {
    function test() {
    }
    test.prototype.testFunction = function () {
        console.log("executando a função de teste");
    };
    __decorate([
        decoratorA(),
        decoratorB()
    ], test.prototype, "testFunction");
    return test;
}());
var objTest = new test();
objTest.testFunction();
console.log(num);
//-------------------------------------------------------------------------------
//decorator de class 
function classDec(constructor) {
    //name vem do próprio nome da class
    // construtor tem suas próprias propriedades agora 
    //pode ocorrer bugs por conta do tsconfig 
    // "target": "ES5",
    // "experimentalDecorators": true,
    console.log("decorator do construtor ", constructor.name);
    if (constructor.name === "User") {
        console.log('criando usuário');
    }
}
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User = __decorate([
        classDec
    ], User);
    return User;
}());
var Matheus = new User('Matheus');
console.log('new user', Matheus);
//-----------------------------------------------------------------------
//decorator de método 
// esta parte esta criando um decorator que modifica uma propriedade do prototype
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        //esta mudando o valor do prototype aqui 
        //para o que receber do decorator
        descriptor.enumerable = value;
    };
}
var machine = /** @class */ (function () {
    function machine(name) {
        this.name = name;
    }
    machine.prototype.showName = function () {
        // da console.log nesta própria class
        console.log(this);
        //verifique nos prototypes que agora o método nao esta mais listado (esta com a cor mais apagada acinzentado)
        return "nome da maquina e: ".concat(this.name);
    };
    __decorate([
        enumerable(false)
    ], machine.prototype, "showName");
    return machine;
}());
var objMachine = new machine('trator');
console.log(objMachine.showName());
//------------------------------------------------------------------------------
// aplicando acesso aos decorators um recurso para list os métodos de um class
var Monster = /** @class */ (function () {
    function Monster(name, age) {
        this.name = name;
        this.age = age;
    }
    Object.defineProperty(Monster.prototype, "showName", {
        get: function () {
            return "nome do monstro: ".concat(this.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Monster.prototype, "showAge", {
        get: function () {
            return "idade do monstro: ".concat(this.age);
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        enumerable(true)
    ], Monster.prototype, "showName");
    return Monster;
}());
var charmander = new Monster("charmander", 5);
console.log(charmander);
