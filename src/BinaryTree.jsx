import './BinaryTree.css';
import React, { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import { insert, inorder, preorder, postorder, search, convertToD3Format } from './data';

const BinaryTree = ({ initialRoot }) => {
    const [tree, setTree] = useState(initialRoot);
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [translate, setTranslate] = useState({ x: 0, y: 50 });
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const dimensions = containerRef.current.getBoundingClientRect();
            setTranslate({
                x: dimensions.width / 2,
                y: 50
            });
        }
    }, []);

    useEffect(() => {
        console.log('=== Recorridos del árbol inicial ===');
        console.log('Inorder:', inorder(tree));
        console.log('Preorder:', preorder(tree));
        console.log('Postorder:', postorder(tree));
    }, []);

    const handleInsert = () => {
        const valor = parseInt(inputValue);
        if (!isNaN(valor)) {
            const newTree = insert({ ...tree }, valor);
            setTree(newTree);
            console.log('\n=== Después de insertar', valor, '===');
            console.log('Inorder:', inorder(newTree));
            console.log('Preorder:', preorder(newTree));
            console.log('Postorder:', postorder(newTree));
            setInputValue('');
        }
    };

    const handleSearch = () => {
        const valor = parseInt(searchValue);
        if (!isNaN(valor)) {
            const found = search(tree, valor);
            setSearchResult(found);
            console.log(`¿El valor ${valor} está en el árbol?`, found);
        }
    };

    const treeData = convertToD3Format(tree);

    return (
        <div className="tree-container">
            <div className="controls">
                <div className="control-group">
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Insertar número"
                    />
                    <button onClick={handleInsert}>Insertar</button>
                </div>
                <div className="control-group">
                    <input
                        type="number"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Buscar número"
                    />
                    <button onClick={handleSearch}>Buscar</button>
                    {searchResult !== null && (
                        <span className={searchResult ? 'found' : 'not-found'}>
                            {searchResult ? '✓ Encontrado' : '✗ No encontrado'}
                        </span>
                    )}
                </div>
            </div>
            <div ref={containerRef} className="tree" style={{ width: '100%', height: '600px' }}>
                <Tree
                    data={treeData}
                    orientation="vertical"
                    translate={translate}
                    pathFunc="step"
                    nodeSize={{ x: 200, y: 200 }}
                    separation={{ siblings: 1, nonSiblings: 1.5 }}
                    centeringTransitionDuration={0}
                />
            </div>
        </div>
    );
};

export default BinaryTree;