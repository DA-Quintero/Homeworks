import React, { useState, useCallback } from 'react';
import { Son } from './Son';

export const Father = () => {
  const list = [2, 4, 6, 8, 10];
  const [valor, setValor] = useState(0);
  const [numero, setNumero] = useState(null);

  const increment = useCallback((num) => {
    setNumero(num);
    setValor(v => v + num);
  }, []);

    return (
        <div>
            <h1>Father</h1>
            <p>Total: {valor}</p>
            <p>numero: <strong>{numero ?? ''}</strong></p>
            <hr />
            {list.map((n, idx) => {
                return (
                    <Son
                        key={idx}
                        numero={n}
                        increment={increment} />
                );
            })}
        </div>
    );
};
