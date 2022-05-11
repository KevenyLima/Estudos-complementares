// ---------------------tsc -p . ------------------------------------
// para copilar como projeto salvando tudo em uma pasta dist

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

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("executando decorator");
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
  };
}

class myClass {
  //atrelando um decorator a uma função
  @MyDecorator()
  testing() {
    console.log("terminando execução do método");
  }
}

const myObject = new myClass();
//o decorator sera executado na instancia da função
myObject.testing();

//------------------------------------------------------------------------------
//multiplos decorators
//a decorator mais abaixo executa primeiro
//as decorators sao executadas de baixo para cima
let num: number = 0;
function decoratorA() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    num = num + 10;
    console.log("executando decorator A");
  };
}
function decoratorB() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    num = num * 10;
    console.log("executando decorator B");
  };
}

class test {
  @decoratorA()
  @decoratorB()
  testFunction() {
    console.log("executando a função de teste");
  }
}

const objTest = new test();
objTest.testFunction();
console.log(num);

//-------------------------------------------------------------------------------
//decorator de class
function classDec(constructor: Function) {
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
@classDec
class User {
  name;
  constructor(name: string) {
    this.name = name;
  }
}
const Matheus = new User("Matheus");

console.log("new user", Matheus);

//-----------------------------------------------------------------------
//decorator de método
// esta parte esta criando um decorator que modifica uma propriedade do prototype
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    //esta mudando o valor do prototype aqui
    //para o que receber do decorator
    descriptor.enumerable = value;
  };
}
class machine {
  name;
  constructor(name: string) {
    this.name = name;
  }
  @enumerable(false)
  showName() {
    // da console.log nesta própria class
    console.log(this);
    //verifique nos prototypes que agora o método nao esta mais listado (esta com a cor mais apagada acinzentado)
    return `nome da maquina e: ${this.name}`;
  }
}

const objMachine = new machine("trator");
console.log(objMachine.showName());
//------------------------------------------------------------------------------
// aplicando acesso aos decorators um recurso para list os métodos de um class
class Monster {
  name?;
  age?;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  @enumerable(true)
  get showName() {
    return `nome do monstro: ${this.name}`;
  }

  get showAge() {
    return `idade do monstro: ${this.age}`;
  }
}
const charmander = new Monster("charmander", 5);

console.log(charmander);

//-----------------------------------------------------------------------------
//constructor para variáveis
function formatNumber() {
  return function (target: object, propertyKey: string) {
    let value: string;
    const getter = function () {
      return value;
    };
    const setter = function (newVal: string) {
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
  @formatNumber()
  id;
  constructor(id: string) {
    this.id = id;
  }
}

const newItem = new ID("1");
console.log(newItem);
console.log(newItem.id);

//------------------------------------------------------------------------------
//exemplo real de decorator
// criando um createdAt que sera executada quando o dado data for pedido
function createdDate(created: Function) {
  //adicionando um novo prototype as classes que herdarem esse decorator
  created.prototype.createdAt = new Date();
}
@createdDate
class Book {
  id;
  // para ter acesse a esse dado e necessário declarar aqui que ele existe
  createdAt?: Date;
  constructor(id: number) {
    this.id = id;
  }
}

@createdDate
class Pen {
  id;
  createdAt?: Date;

  constructor(id: number) {
    this.id = id;
  }
}
const newBook = new Book(23);
const newPen = new Pen(55);
console.log(newBook);
console.log(newBook.createdAt);

//8 exemplo real 2 ---------------------------------------------------------------------------------------

function checkIfUserPosted() {
  //pesquisar mais sobre os parâmetros de um decorator
  return function (
    target: object,
    key: string | Symbol,
    descriptor: PropertyDescriptor
  ) {
    const childFunction = descriptor.value;
    //console.log(childFunction);
    // o descriptor tem todo o código que sera executado pela função
    // --------------------------aqui esta pegando todo os parâmetros da função
    descriptor.value = function (...argumentos: any[]) {
      //o código da função sera substituído ou por null ou devolve o código da função e a executa
      if (argumentos[1] === true) {
        console.log("Usuário ja postou");
        return null;
      } else {
        // pesquisar sobre a função apply
        return childFunction.apply(this, argumentos);
      }
    };
    return descriptor;
  };
}

class Post {
  alreadyPosted = false;
  @checkIfUserPosted()
  post(content: string, alreadyPosted: boolean) {
    this.alreadyPosted = true;
    console.log(`post do usuário ${content}`);
  }
}

const userPost = new Post();
userPost.post("um poste do usuário", userPost.alreadyPosted);
const newLocal = "segundo post do usuário";
userPost.post(newLocal, userPost.alreadyPosted);
console.log(userPost);
// 9 exemplo real property decorators----------------------------------------------------------------------

function Max(limit: number) {
  return function (target: object, propertyKey: string) {
    let value: string;
    const getter = function () {
      return value;
    };
    const setter = function (newVal: string) {
      if (newVal.length > limit) {
        console.log(`o valor deve ter no máximo ${limit} dígitos`);
        return;
      } else {
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
  @Max(10)
  username;

  constructor(username: string) {
    this.username = username;
  }
}

let pedro = new Admin("pedroadmin12345");
let lee = new Admin("lee");
// console.log("pedro", pedro)
console.log("lee", lee);

