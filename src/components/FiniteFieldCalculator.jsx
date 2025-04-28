import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MathComponents.css';

/**
 * FiniteFieldCalculator component - Interactive tool for finite field arithmetic
 * @param {Object} props - Component props
 * @param {number} props.initialFieldSize - The initial size of the finite field (prime)
 * @param {Function} props.onSolve - Callback when exercise is solved
 * @returns {React.Element} The rendered FiniteFieldCalculator component
 */
function FiniteFieldCalculator({ initialFieldSize = 11, onSolve }) {
  const [fieldSize, setFieldSize] = useState(initialFieldSize);
  const [value1, setValue1] = useState(5);
  const [value2, setValue2] = useState(8);
  const [operation, setOperation] = useState('addition');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [expectedAnswer, setExpectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [fieldValues, setFieldValues] = useState([]);

  // Generate all values in the field when field size changes
  useEffect(() => {
    const isPrime = (num) => {
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return num > 1;
    };

    // Ensure fieldSize is prime
    let newFieldSize = fieldSize;
    if (!isPrime(newFieldSize)) {
      // Find next prime number
      while (!isPrime(newFieldSize)) {
        newFieldSize++;
      }
      setFieldSize(newFieldSize);
    }

    // Generate field values
    const values = Array.from({ length: newFieldSize }, (_, i) => i);
    setFieldValues(values);

    // Update default values if they're too large
    if (value1 >= newFieldSize) setValue1(newFieldSize - 1);
    if (value2 >= newFieldSize) setValue2(newFieldSize - 1);

    // Calculate expected answer
    calculateExpectedAnswer(value1, value2, operation, newFieldSize);
  }, [fieldSize]);

  // Calculate expected answer when inputs change
  useEffect(() => {
    calculateExpectedAnswer(value1, value2, operation, fieldSize);
  }, [value1, value2, operation, fieldSize]);

  // Calculate the expected answer based on operation
  const calculateExpectedAnswer = (a, b, op, fSize) => {
    let result;

    switch (op) {
      case 'addition':
        result = (a + b) % fSize;
        break;
      case 'subtraction':
        result = ((a - b) % fSize + fSize) % fSize; // Ensure positive result
        break;
      case 'multiplication':
        result = (a * b) % fSize;
        break;
      case 'division':
        // For division, need to find multiplicative inverse
        if (b === 0) {
          result = null; // Division by zero
        } else {
          const inverse = modInverse(b, fSize);
          if (inverse === null) {
            result = null; // No inverse exists
          } else {
            result = (a * inverse) % fSize;
          }
        }
        break;
      case 'exponentiation':
        result = modPow(a, b, fSize);
        break;
      default:
        result = null;
    }

    setExpectedAnswer(result);
    return result;
  };

  // Calculate the modular multiplicative inverse
  const modInverse = (a, m) => {
    // Extended Euclidean Algorithm to find modular multiplicative inverse
    a = ((a % m) + m) % m; // Ensure positive
    if (gcd(a, m) !== 1) return null; // No inverse exists

    return modPow(a, m - 2, m); // Fermat's little theorem for prime m
  };

  // Calculate the greatest common divisor
  const gcd = (a, b) => {
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  // Calculate modular exponentiation efficiently
  const modPow = (base, exponent, modulus) => {
    if (modulus === 1) return 0;
    
    let result = 1;
    base = base % modulus;
    
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      exponent = Math.floor(exponent / 2);
      base = (base * base) % modulus;
    }
    
    return result;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert user answer to number
    const userNum = parseInt(userAnswer, 10);
    
    // Check if the answer is correct
    const correct = userNum === expectedAnswer;
    setIsCorrect(correct);
    
    // If correct, increment success count
    if (correct) {
      setSuccessCount(prev => prev + 1);
      
      // Generate new problem after a delay
      setTimeout(() => {
        // Generate new random values
        const newVal1 = Math.floor(Math.random() * fieldSize);
        const newVal2 = Math.floor(Math.random() * fieldSize);
        
        // Occasionally change operation too (20% chance)
        if (Math.random() < 0.2) {
          const operations = ['addition', 'subtraction', 'multiplication', 'exponentiation'];
          const newOp = operations[Math.floor(Math.random() * operations.length)];
          setOperation(newOp);
        }
        
        setValue1(newVal1);
        setValue2(newVal2);
        setUserAnswer('');
        setIsCorrect(null);
        
        // If user has solved 5 problems correctly, call onSolve
        if (successCount + 1 >= 5 && onSolve) {
          onSolve();
        }
      }, 1500);
    }
  };

  // Operation symbols for display
  const operationSymbol =
    operation === 'addition' ? '+' :
    operation === 'subtraction' ? '−' :
    operation === 'multiplication' ? '×' :
    operation === 'division' ? '÷' :
    '^';

  // Field size can only be changed if it's the first problem
  const canChangeFieldSize = successCount === 0;

  return (
    <div className="math-interactive finite-field-calculator">
      <h3 className="math-interactive__title">Finite Field Calculator (F<sub>{fieldSize}</sub>)</h3>
      
      <div className="math-interactive__field-display">
        <p>Field Elements:</p>
        <div className="finite-field__elements">
          {fieldValues.map(val => (
            <span key={val} className="finite-field__element">{val}</span>
          ))}
        </div>
      </div>

      <div className="math-interactive__problem">
        <p className="math-interactive__instruction">
          Calculate the result of this operation in the finite field F<sub>{fieldSize}</sub>:
        </p>
        
        <div className="math-interactive__expression">
          <span className="math-interactive__value">{value1}</span>
          <span className="math-interactive__operator">{operationSymbol}</span>
          <span className="math-interactive__value">{value2}</span>
          <span className="math-interactive__operator">=</span>
          <span className="math-interactive__question">?</span>
        </div>

        <form onSubmit={handleSubmit} className="math-interactive__form">
          <div className="math-interactive__input-group">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              min="0"
              max={fieldSize - 1}
              required
              className="math-interactive__input"
            />
            <button type="submit" className="math-interactive__submit">Check</button>
          </div>
        </form>

        {isCorrect !== null && (
          <div className={`math-interactive__feedback ${isCorrect ? 'math-interactive__feedback--correct' : 'math-interactive__feedback--incorrect'}`}>
            {isCorrect ? (
              <span>Correct! {value1} {operationSymbol} {value2} ≡ {expectedAnswer} (mod {fieldSize})</span>
            ) : (
              <span>Incorrect. Try again or check the hint.</span>
            )}
          </div>
        )}

        <div className="math-interactive__controls">
          <div className="math-interactive__control-group">
            <label htmlFor="operation">Operation:</label>
            <select
              id="operation"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="math-interactive__select"
            >
              <option value="addition">Addition (+)</option>
              <option value="subtraction">Subtraction (−)</option>
              <option value="multiplication">Multiplication (×)</option>
              <option value="exponentiation">Exponentiation (^)</option>
            </select>
          </div>

          {canChangeFieldSize && (
            <div className="math-interactive__control-group">
              <label htmlFor="field-size">Field Size (prime):</label>
              <input
                id="field-size"
                type="number"
                min="2"
                max="31"
                value={fieldSize}
                onChange={(e) => setFieldSize(parseInt(e.target.value, 10) || 2)}
                className="math-interactive__input math-interactive__input--small"
              />
            </div>
          )}
        </div>

        <div className="math-interactive__hint-container">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="math-interactive__hint-button"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          
          {showHint && (
            <div className="math-interactive__hint">
              <p>
                {operation === 'addition' && 
                  `To add in a finite field, add normally then take the remainder when divided by ${fieldSize}. Example: ${value1} + ${value2} = ${value1 + value2} ≡ ${(value1 + value2) % fieldSize} (mod ${fieldSize})`}
                {operation === 'subtraction' && 
                  `To subtract in a finite field, subtract normally then take the remainder when divided by ${fieldSize}. If the result is negative, add ${fieldSize} to get a value in the field. Example: ${value1} - ${value2} = ${value1 - value2} ≡ ${((value1 - value2) % fieldSize + fieldSize) % fieldSize} (mod ${fieldSize})`}
                {operation === 'multiplication' && 
                  `To multiply in a finite field, multiply normally then take the remainder when divided by ${fieldSize}. Example: ${value1} × ${value2} = ${value1 * value2} ≡ ${(value1 * value2) % fieldSize} (mod ${fieldSize})`}
                {operation === 'exponentiation' && 
                  `To compute exponentiation in a finite field, calculate base^exponent then take the remainder when divided by ${fieldSize}. For ${value1}^${value2} (mod ${fieldSize}), the result is ${modPow(value1, value2, fieldSize)}.`}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="math-interactive__progress">
        <p>Problems solved: {successCount}/5</p>
        <div className="math-interactive__progress-bar">
          <div
            className="math-interactive__progress-fill"
            style={{ width: `${(successCount / 5) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

FiniteFieldCalculator.propTypes = {
  initialFieldSize: PropTypes.number,
  onSolve: PropTypes.func
};

export default FiniteFieldCalculator;