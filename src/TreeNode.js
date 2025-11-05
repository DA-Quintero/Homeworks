export class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.hijos = [];
  }

  agregarHijo(nodo) {
    this.hijos.push(nodo);
  }
}

export function dfs(nodo, callback = null) {
  if (callback) {
    callback(nodo.valor);
  } else {
    console.log(nodo.valor);
  }
  
  for (let hijo of nodo.hijos) {
    dfs(hijo, callback);
  }
}

export function bfs(raiz, callback = null) {
  const cola = [raiz];
  while (cola.length > 0) {
    const actual = cola.shift();
    if (callback) {
      callback(actual.valor);
    } else {
      console.log(actual.valor);
    }
    cola.push(...actual.hijos);
  }
}
