import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  let gridItems = [
    { display: 'AC', class: 'top-row', type: 'function', value: 'reset' },
    { display: '+/-', class: 'top-row', type: 'function', value: 'negate' },
    { display: '%', class: 'top-row', type: 'function', value: 'percentage' },
    { display: '/', class: 'side-row', type: 'operation', value: '/' },
    { display: '7', class: 'number', type: 'number', value: '7' },
    { display: '8', class: 'number', type: 'number', value: '8' },
    { display: '9', class: 'number', type: 'number', value: '9' },
    { display: 'x', class: 'side-row', type: 'operation', value: 'X' },
    { display: '4', class: 'number', type: 'number', value: '4' },
    { display: '5', class: 'number', type: 'number', value: '5' },
    { display: '6', class: 'number', type: 'number', value: '6' },
    { display: '-', class: 'side-row', type: 'operation', value: '-' },
    { display: '1', class: 'number', type: 'number', value: '1' },
    { display: '2', class: 'number', type: 'number', value: '2' },
    { display: '3', class: 'number', type: 'number', value: '3' },
    { display: '+', class: 'side-row', type: 'operation', value: '+' },
    { display: '0', class: 'zero', type: 'number', value: '0' },
    { display: '.', class: 'number', type: 'number', value: '.' },
    { display: '=', class: 'side-row', type: 'operation', value: 'calculate' },
  ];
  const [result, setResult] = useState('0');
  const [memory, setMemory] = useState(0);
  const [operation, setOperation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);
  const displayOperation = useRef();

  useEffect(() => {
    operation === '' ? (displayOperation.current.style.display = 'none') : (displayOperation.current.style.display = 'block');
  }, [operation]);

  const handleCalculate = () => {
    operation === '+' && setResult((prevValue) => memory + parseFloat(prevValue));
    operation === '-' && setResult((prevValue) => memory - parseFloat(prevValue));
    operation === 'X' && setResult((prevValue) => memory * parseFloat(prevValue));
    operation === '/' && setResult((prevValue) => memory / parseFloat(prevValue));
    setMemory(result);
    setOperation('');
    setIsNewNumber(true);
  };

  const handleClick = (type, value) => {
    if (type === 'operation') {
      if (value === 'calculate') {
        handleCalculate();
      } else {
        setMemory(parseFloat(result));
        setOperation(value);
        setIsNewNumber(true);
      }
    }
    if (type === 'function' && value === 'reset') {
      setResult('0');
      setMemory(null);
      setOperation('');
      setIsNewNumber(true);
    }
    if (type === 'function' && value === 'negate') {
      setResult((prevValue) => parseFloat(prevValue) * -1);
      setMemory((prevValue) => parseFloat(prevValue) * -1);
      setIsNewNumber(true);
    }
    if (type === 'function' && value === 'percentage') {
      setResult((prevValue) => parseFloat(prevValue) / 100);
      setMemory((prevValue) => parseFloat(prevValue) / 100);
      setIsNewNumber(true);
      setOperation('');
    }
    if (type === 'number') {
      setResult((prevValue) => (prevValue === '0' || isNewNumber ? value : prevValue + value));
      setIsNewNumber(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">My React Calculator!</header>
      <div className="display-container">
        <div className="display-result">{result}</div>
        <div ref={displayOperation} className="operation">
          {operation}
        </div>
      </div>
      <div className="grid-container">
        {gridItems.map((item, index) => {
          return (
            <div key={index} className={`grid-item ${item.class}`} onClick={() => handleClick(item.type, item.value)}>
              {item.display}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
