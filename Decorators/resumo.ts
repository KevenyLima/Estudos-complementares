// resumo
// criar decorator para variáveis


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
// criar decorator para métodos

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

// criar decorator para classes

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

// exemplo 2 criando decorator para classes

//exemplo real de decorator
// criando um createdAt que sera executada quando o dado data for pedido
function createdDate(created: Function) {
  //adicionando um novo prototype as classes que herdarem esse decorator
  created.prototype.createdAt = new Date();
}

//symbol serve para declarar que aquela variável e única e nunca sera igual a outra mesmo que tenha mesmo valor 
//exemplo
const symbolA:symbol = Symbol('a')
const symbolB = Symbol('a')
console.log(symbolA===symbolB)