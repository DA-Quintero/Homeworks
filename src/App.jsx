import BinaryTree from './BinaryTree';
import { arbol } from './data.js'

const App = () => (
  <div>
    <h1>Árbol Binario</h1>
    <BinaryTree initialRoot={arbol} />
  </div>
);

export default App;