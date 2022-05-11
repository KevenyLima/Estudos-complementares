// ---------------------tsc -p . ------------------------------------
// para copilar como projeto salvando tudo em uma pasta dist
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//comando para colocar nos script do package.json
//"build": "tsc --build --clean && tsc"
// decorators sao como observer (gatilhos/triggers)
//o decorator e como uma função executada na instanciação de um objeto
// argumentos especiais
// target , property e descriptor
// o trunfo do decorator e que ele da informações do local que foi executado
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
class myClass {
    //atrelando um decorator a uma função
    testing() {
        console.log("terminando execução do método");
    }
}
__decorate([
    MyDecorator(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], myClass.prototype, "testing", null);
const myObject = new myClass();
//o decorator sera executado na instancia da função
myObject.testing();
//------------------------------------------------------------------------------
//multiplos decorators
//a decorator mais abaixo executa primeiro
//as decorators sao executadas de baixo para cima
let num = 0;
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
class test {
    testFunction() {
        console.log("executando a função de teste");
    }
}
__decorate([
    decoratorA(),
    decoratorB(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], test.prototype, "testFunction", null);
const objTest = new test();
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
        console.log("criando usuário");
    }
}
let User = class User {
    constructor(name) {
        this.name = name;
    }
};
User = __decorate([
    classDec,
    __metadata("design:paramtypes", [String])
], User);
const Matheus = new User("Matheus");
console.log("new user", Matheus);
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
class machine {
    constructor(name) {
        this.name = name;
    }
    showName() {
        // da console.log nesta própria class
        console.log(this);
        //verifique nos prototypes que agora o método nao esta mais listado (esta com a cor mais apagada acinzentado)
        return `nome da maquina e: ${this.name}`;
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], machine.prototype, "showName", null);
const objMachine = new machine("trator");
console.log(objMachine.showName());
//------------------------------------------------------------------------------
// aplicando acesso aos decorators um recurso para list os métodos de um class
class Monster {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    get showName() {
        return `nome do monstro: ${this.name}`;
    }
    get showAge() {
        return `idade do monstro: ${this.age}`;
    }
}
__decorate([
    enumerable(true),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Monster.prototype, "showName", null);
const charmander = new Monster("charmander", 5);
console.log(charmander);
//-----------------------------------------------------------------------------
//constructor para variáveis
function formatNumber() {
    return function (target, propertyKey) {
        let value;
        const getter = function () {
            return value;
        };
        const setter = function (newVal) {
            // função para adicionar caracteres na frente de uma string ate ela ter 5 caracteres
            value = newVal.padStart(5, "0");
        };
        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter,
        });
    };
}
class ID {
    constructor(id) {
        this.id = id;
    }
}
__decorate([
    formatNumber(),
    __metadata("design:type", Object)
], ID.prototype, "id", void 0);
const newItem = new ID("1");
console.log(newItem);
console.log(newItem.id);
//------------------------------------------------------------------------------
//exemplo real de decorator
// criando um createdAt que sera executada quando o dado data for pedido
function createdDate(created) {
    //adicionando um novo prototype as classes que herdarem esse decorator
    created.prototype.createdAt = new Date();
}
let Book = class Book {
    constructor(id) {
        this.id = id;
    }
};
Book = __decorate([
    createdDate,
    __metadata("design:paramtypes", [Number])
], Book);
let Pen = class Pen {
    constructor(id) {
        this.id = id;
    }
};
Pen = __decorate([
    createdDate,
    __metadata("design:paramtypes", [Number])
], Pen);
const newBook = new Book(23);
const newPen = new Pen(55);
console.log(newBook);
console.log(newBook.createdAt);
//8 exemplo real 2 ---------------------------------------------------------------------------------------
function checkIfUserPosted() {
    //pesquisar mais sobre os parâmetros de um decorator
    return function (target, key, descriptor) {
        const childFunction = descriptor.value;
        //console.log(childFunction);
        // o descriptor tem todo o código que sera executado pela função
        // --------------------------aqui esta pegando todo os parâmetros da função
        descriptor.value = function (...argumentos) {
            //o código da função sera substituído ou por null ou devolve o código da função e a executa
            if (argumentos[1] === true) {
                console.log("Usuário ja postou");
                return null;
            }
            else {
                // pesquisar sobre a função apply
                return childFunction.apply(this, argumentos);
            }
        };
        return descriptor;
    };
}
class Post {
    constructor() {
        this.alreadyPosted = false;
    }
    post(content, alreadyPosted) {
        this.alreadyPosted = true;
        console.log(`post do usuário ${content}`);
    }
}
__decorate([
    checkIfUserPosted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], Post.prototype, "post", null);
const userPost = new Post();
userPost.post("um poste do usuário", userPost.alreadyPosted);
const newLocal = "segundo post do usuário";
userPost.post(newLocal, userPost.alreadyPosted);
console.log(userPost);
// 9 exemplo real property decorators----------------------------------------------------------------------
function Max(limit) {
    return function (target, propertyKey) {
        let value;
        const getter = function () {
            return value;
        };
        const setter = function (newVal) {
            if (newVal.length > limit) {
                console.log(`o valor deve ter no máximo ${limit} dígitos`);
                return;
            }
            else {
                value = newVal;
            }
        };
        //devolvendo o objeto  que era variável
        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter,
        });
    };
}
class Admin {
    constructor(username) {
        this.username = username;
    }
}
__decorate([
    Max(10),
    __metadata("design:type", Object)
], Admin.prototype, "username", void 0);
let pedro = new Admin("pedroadmin12345");
let lee = new Admin("lee");
console.log("pedro", pedro);
console.log("lee", lee);
//# sourceMappingURL=decorators.js.map