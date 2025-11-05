export const arbol = {
    valor: 10,
    izquierda: {
        valor: 5,
        izquierda: {
            valor: 2,
            izquierda: null,
            derecha: null,
        },
        derecha: {
            valor: 7,
            izquierda: null,
            derecha: null,
        },
    },
    derecha: {
        valor: 15,
        izquierda: null,
        derecha: {
            valor: 20,
            izquierda: null,
            derecha: null,
        },
    },
};

export const insert = (root, valor) => {
    if (!root) {
        return {
            valor,
            izquierda: null,
            derecha: null,
        };
    }

    if (valor < root.valor) {
        root.izquierda = insert(root.izquierda, valor);
    } else if (valor > root.valor) {
        root.derecha = insert(root.derecha, valor);
    }

    return root;
};

export const inorder = (root, result = []) => {
    if (root) {
        inorder(root.izquierda, result);
        result.push(root.valor);
        inorder(root.derecha, result);
    }
    return result;
};

export const preorder = (root, result = []) => {
    if (root) {
        result.push(root.valor);
        preorder(root.izquierda, result);
        preorder(root.derecha, result);
    }
    return result;
};

export const postorder = (root, result = []) => {
    if (root) {
        postorder(root.izquierda, result);
        postorder(root.derecha, result);
        result.push(root.valor);
    }
    return result;
};

export const search = (root, valor) => {
    if (!root) {
        return false;
    }

    if (root.valor === valor) {
        return true;
    }

    if (valor < root.valor) {
        return search(root.izquierda, valor);
    } else {
        return search(root.derecha, valor);
    }
};

export const convertToD3Format = (node) => {
    if (!node) return null;

    const d3Node = {
        name: node.valor.toString(),
        attributes: {
            value: node.valor
        }
    };

    const children = [];
    if (node.izquierda) {
        children.push(convertToD3Format(node.izquierda));
    }
    if (node.derecha) {
        children.push(convertToD3Format(node.derecha));
    }

    if (children.length > 0) {
        d3Node.children = children;
    }

    return d3Node;
};
