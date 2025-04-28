import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './FiniteFieldExplorer.css';

// Finite field visualization component
const FiniteFieldGrid = ({ field, selectedElements = [], selectedOperation = null }) => {
  const gridSize = Math.ceil(Math.sqrt(field));
  const cellSize = 40;
  const padding = 10;
  const width = gridSize * cellSize + padding * 2;
  const height = gridSize * cellSize + padding * 2;
  
  // Create grid of elements
  const elements = [];
  for (let i = 0; i < field; i++) {
    const x = (i % gridSize) * cellSize + padding + cellSize / 2;
    const y = Math.floor(i / gridSize) * cellSize + padding + cellSize / 2;
    
    elements.push({
      value: i,
      x,
      y,
      isSelected: selectedElements.includes(i)
    });
  }
  
  return (
    <div className="finite-field-grid">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Grid background */}
        <rect x="0" y="0" width={width} height={height} fill="#f8fafc" rx="8" />
        
        {/* Grid cells */}
        {elements.map(element => (
          <g key={element.value}>
            <circle 
              cx={element.x} 
              cy={element.y} 
              r={cellSize / 2 - 5}
              fill={element.isSelected ? "#818cf8" : "#fff"}
              stroke={element.isSelected ? "#4f46e5" : "#cbd5e1"}
              strokeWidth="2"
            />
            <text 
              x={element.x} 
              y={element.y} 
              textAnchor="middle" 
              dominantBaseline="middle"
              fontSize="14"
              fontWeight={element.isSelected ? "bold" : "normal"}
              fill={element.isSelected ? "#fff" : "#0f172a"}
            >
              {element.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Main component
const FiniteFieldExplorer = ({ onComplete }) => {
  const [stage, setStage] = useState('intro');
  const [fieldSize, setFieldSize] = useState(7); // Prime field GF(7)
  const [operandA, setOperandA] = useState(3);
  const [operandB, setOperandB] = useState(5);
  const [operation, setOperation] = useState('+');
  
  // Calculate result in finite field
  const calculateResult = () => {
    switch (operation) {
      case '+':
        return (operandA + operandB) % fieldSize;
      case '-':
        return ((operandA - operandB) % fieldSize + fieldSize) % fieldSize;
      case '×':
        return (operandA * operandB) % fieldSize;
      case '^':
        // Modular exponentiation
        let result = 1;
        for (let i = 0; i < operandB; i++) {
          result = (result * operandA) % fieldSize;
        }
        return result;
      default:
        return operandA;
    }
  };
  
  const result = calculateResult();
  
  // Render different stages
  const renderStage = () => {
    switch (stage) {
      case 'intro':
        return (
          <div className="module-stage">
            <h2>Welcome to Finite Field Explorer!</h2>
            <p>
              Finite fields are mathematical structures with a finite number of elements where
              all operations are defined. They are crucial for cryptographic protocols, especially
              for zero-knowledge proofs.
            </p>
            <p>
              In this module, we'll explore prime fields GF(p), which contain p elements: 0, 1, 2, ..., p-1,
              where p is a prime number. All operations wrap around to stay within the field.
            </p>
            <div className="intro-visualization">
              <FiniteFieldGrid field={7} selectedElements={[0, 1, 2, 3, 4, 5, 6]} />
              <div className="intro-caption">
                The Finite Field GF(7) has elements {'{0, 1, 2, 3, 4, 5, 6}'}
              </div>
            </div>
            <button className="module-button" onClick={() => setStage('playground')}>
              Explore Finite Fields →
            </button>
          </div>
        );
      
      case 'playground':
        return (
          <div className="module-stage">
            <h2>Finite Field Operations</h2>
            <p>
              Explore how arithmetic operations work in a finite field.
              Notice how results always stay within the field's elements.
            </p>
            
            <div className="field-playground">
              <div className="field-controls">
                <div className="field-size-control">
                  <label>Field Size (GF(p))</label>
                  <div className="field-size-buttons">
                    {[5, 7, 11, 13, 17].map(size => (
                      <button 
                        key={size} 
                        onClick={() => setFieldSize(size)}
                        className={`field-size-button ${fieldSize === size ? 'active' : ''}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="operation-selector">
                  <label>Operation</label>
                  <div className="operation-buttons">
                    {['+', '-', '×', '^'].map(op => (
                      <button 
                        key={op} 
                        onClick={() => setOperation(op)}
                        className={`operation-button ${operation === op ? 'active' : ''}`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="field-operands">
                  <div className="field-operand">
                    <label>First Value</label>
                    <div className="operand-buttons">
                      {Array.from({ length: fieldSize }, (_, i) => (
                        <button 
                          key={i} 
                          onClick={() => setOperandA(i)}
                          className={`operand-button ${operandA === i ? 'active' : ''}`}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="field-operand">
                    <label>Second Value</label>
                    <div className="operand-buttons">
                      {Array.from({ length: fieldSize }, (_, i) => (
                        <button 
                          key={i} 
                          onClick={() => setOperandB(i)}
                          className={`operand-button ${operandB === i ? 'active' : ''}`}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="result-display">
                  <span className="result-equation">
                    {operandA} {operation} {operandB} = {result} in GF({fieldSize})
                  </span>
                </div>
              </div>
              
              <div className="field-visualization">
                <FiniteFieldGrid 
                  field={fieldSize} 
                  selectedElements={[operandA, operandB, result]}
                  selectedOperation={operation}
                />
              </div>
            </div>
            
            <div className="field-description">
              <h3>Why Finite Fields Matter for ZK Proofs</h3>
              <p>
                Zero-knowledge proofs rely heavily on finite field arithmetic because:
              </p>
              <ul>
                <li>Operations always produce results within the field, making them predictable</li>
                <li>They enable mathematical structures needed for cryptographic security</li>
                <li>They allow for efficient computational representation</li>
                <li>Many ZK protocols like SNARKs and STARKs are built on finite field operations</li>
              </ul>
            </div>
            
            <div className="module-buttons">
              <button className="module-button" onClick={() => setStage('application')}>
                See Real-World Applications →
              </button>
              <button className="module-secondary-button" onClick={() => setStage('intro')}>
                ← Back to Introduction
              </button>
            </div>
          </div>
        );
        
      case 'application':
        return (
          <div className="module-stage">
            <h2>Finite Fields in ZK Applications</h2>
            <p>
              Finite fields are the mathematical foundation of many zero-knowledge protocols.
              Let's see how they're used in real applications.
            </p>
            
            <div className="applications-container">
              <div className="application-card">
                <h3>ZK-SNARKs</h3>
                <p>
                  Uses finite field arithmetic to create efficient proofs. Operations in these fields
                  allow the prover to demonstrate knowledge without revealing the actual values.
                </p>
              </div>
              
              <div className="application-card">
                <h3>Elliptic Curve Cryptography</h3>
                <p>
                  Elliptic curves are defined over finite fields. The discrete logarithm problem
                  in these fields provides the security basis for many ZK protocols.
                </p>
              </div>
              
              <div className="application-card">
                <h3>Polynomial Commitments</h3>
                <p>
                  Finite fields are used to create polynomial commitments, allowing a prover to
                  commit to a polynomial and later reveal evaluations without exposing the entire polynomial.
                </p>
              </div>
            </div>
            
            <button className="module-button" onClick={() => setStage('complete')}>
              Complete the module →
            </button>
          </div>
        );
        
      case 'complete':
        return (
          <div className="module-stage module-complete">
            <div className="module-complete-graphic">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#4ade80" opacity="0.2" />
                <circle cx="50" cy="50" r="30" fill="#4ade80" />
                <path d="M35 50 L45 60 L65 40" stroke="white" strokeWidth="6" fill="none" />
              </svg>
            </div>
            <h2>Congratulations!</h2>
            <p>
              You've completed the Finite Field Explorer module and gained insights into how
              these mathematical structures power zero-knowledge proof systems.
            </p>
            <p>
              Understanding finite fields is crucial for anyone working with ZK technologies,
              as they form the foundation for protocols like SNARKs, STARKs, and Bulletproofs.
            </p>
            <button className="module-button" onClick={() => onComplete(100)}>
              Continue to next module
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="finite-field-explorer">
      {renderStage()}
    </div>
  );
};

export default FiniteFieldExplorer;