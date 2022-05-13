// essas letras sao apenas para escolhas mais comuns para nomear essa tipagem 
// S => State
// T => Type
// K => Key
// V => Value
// E => Element

//a generic pode ser qualquer coisa no começo mas dem]pois que e definido ela passa a aceitar somente aquele tipo
// e preciso declarar a genérica na criação função usando <nomeGeneric> 
// e preciso declarar o tipo na chamada da função 


//criando um função com uma generic
//--------------------------restringindo os tipos que essa generic aceita
//----------------------------------------= passando como default o tipo string
//a primeira parte de extends nao tem nenhuma relação com a segunda parte do = para frente 
function useState<S extends number|string = string, T extends string|number = number>(){
  //agora e possível dar tipo a tudo que esta dentro desta função usando as tipagens que vem generic
  let state : S;
  let variable: T;
  function getState(){
    return {state,variable};
  }

  function setState(newState:S,number:T){
    state = newState
    variable = number
  }

  return {getState,setState};

}
// aqui determina que ele so aceitara strings para essa instancia da função 
const newState = useState<string>()
newState.setState("foo",11)
console.log("newState",newState.getState())
// newState.setState(123)
// console.log("newState2",newState.getState())
//--------------------------------------------------------------------------------
// determinando aqui os typos que a função ira aceitar assim sobrescrevendo os defaults
const newState2 = useState<number,string>()
newState2.setState(11,"foo")
console.log("newState",newState.getState())

