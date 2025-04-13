import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './MathComponents.css';

/**
 * DiscreteLogPuzzle component - Interactive discrete logarithm challenge
 * @param {Object} props - Component props
 * @param {Function} props.onSolve - Handler when user completes the challenge
 * @returns {React.Element} The rendered DiscreteLogPuzzle component
 */
function DiscreteLogPuzzle({ onSolve }) {
  // State for discrete log parameters
  const [modulus, setModulus] = useState(11); // Small prime for visualization
  const [base, setBase] = useState(2);
  const [result, setResult] = useState(9);
  const [exponent, setExponent] = useState(6); // base^exponent ≡ result (mod modulus)
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const canvasRef = useRef(null);

  // Update the result when base, exponent, or modulus change
  useEffect(() => {
    // Calculate base^exponent mod modulus
    const newResult = calculateModPow(base, exponent, modulus);
    setResult(newResult);
  }, [base, exponent, modulus]);

  // Draw the discrete log visualization
  useEffect(() => {
    drawVisualization();
  }, [base, modulus, result, exponent, isCorrect]);

  // Set up a new challenge when needed
  useEffect(() => {
    setupNewChallenge();
  }, [successCount]);

  // Calculate modular exponentiation
  const calculateModPow = (base, exp, mod) => {
    if (mod === 1) return 0;
    
    let result = 1;
    base = base % mod;
    
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod;
      }
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    
    return result;
  };

  // Draw the discrete log visualization
  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw circle
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw points around the circle
    for (let i = 0; i < modulus; i++) {
      const angle = (i / modulus) * 2 * Math.PI - Math.PI / 2; // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Check if this point is special
      let pointColor = '#94a3b8';
      let pointRadius = 5;
      let label = '';
      
      // Base point
      if (i === base) {
        pointColor = '#4f46e5'; // Primary
        pointRadius = 7;
        label = 'g';
      }
      
      // Result point
      if (i === result) {
        pointColor = '#f97316'; // Warning
        pointRadius = 7;
        label = 'h';
      }
      
      // Base^exponent point (same as result, but shown if answer is correct)
      if (i === result && isCorrect) {
        pointColor = '#10b981'; // Success
        label = `g^${exponent}`;
      }
      
      // Draw the point
      ctx.fillStyle = pointColor;
      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw the label if needed
      if (label) {
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Position the label outside the point
        const labelAngle = angle;
        const labelRadius = radius + 15;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);
        
        ctx.fillText(label, labelX, labelY);
      }
      
      // Draw the value
      ctx.fillStyle = '#64748b';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(i.toString(), x, y);
    }
    
    // Draw lines to represent powers of the base
    if (isCorrect) {
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)'; // Success color with transparency
      ctx.lineWidth = 1.5;
      
      let current = base;
      for (let i = 1; i <= exponent; i++) {
        const prevValue = current;
        current = (current * base) % modulus;
        
        const startAngle = (prevValue / modulus) * 2 * Math.PI - Math.PI / 2;
        const endAngle = (current / modulus) * 2 * Math.PI - Math.PI / 2;
        
        const startX = centerX + radius * 0.7 * Math.cos(startAngle);
        const startY = centerY + radius * 0.7 * Math.sin(startAngle);
        const endX = centerX + radius * 0.7 * Math.cos(endAngle);
        const endY = centerY + radius * 0.7 * Math.sin(endAngle);
        
        // Draw arrow
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Draw arrowhead
        const arrowSize = 5;
        const angle = Math.atan2(endY - startY, endX - startX);
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(
          endX - arrowSize * Math.cos(angle - Math.PI / 6),
          endY - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          endX - arrowSize * Math.cos(angle + Math.PI / 6),
          endY - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
      }
    }
    
    // Draw the problem statement
    ctx.fillStyle = '#1e293b';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Find x where ${base}^x ≡ ${result} (mod ${modulus})`, centerX, 20);
  };

  // Generate a small prime number
  const generateSmallPrime = (min, max) => {
    const isPrime = (num) => {
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return num > 1;
    };
    
    // Find a random prime in the range
    let candidate;
    do {
      candidate = min + Math.floor(Math.random() * (max - min + 1));
    } while (!isPrime(candidate));
    
    return candidate;
  };

  // Set up a new challenge
  const setupNewChallenge = () => {
    // Adjust difficulty based on success count
    const newDifficulty = Math.min(3, 1 + Math.floor(successCount / 2));
    setDifficulty(newDifficulty);
    
    // Generate parameters based on difficulty
    let newModulus, newBase, newExponent;
    
    switch (newDifficulty) {
      case 1:
        // Easy: small prime modulus, small exponent
        newModulus = generateSmallPrime(7, 13);
        newBase = 2 + Math.floor(Math.random() * (newModulus - 3));
        newExponent = 2 + Math.floor(Math.random() * 5); // 2-6
        break;
      case 2:
        // Medium: larger prime modulus, medium exponent
        newModulus = generateSmallPrime(11, 19);
        newBase = 2 + Math.floor(Math.random() * (newModulus - 3));
        newExponent = 3 + Math.floor(Math.random() * 6); // 3-8
        break;
      case 3:
        // Hard: larger prime modulus, larger exponent
        newModulus = generateSmallPrime(17, 29);
        newBase = 2 + Math.floor(Math.random() * (newModulus - 3));
        newExponent = 4 + Math.floor(Math.random() * 7); // 4-10
        break;
      default:
        newModulus = 11;
        newBase = 2;
        newExponent = 4;
    }
    
    setModulus(newModulus);
    setBase(newBase);
    setExponent(newExponent);
    
    // Reset user input and feedback
    setUserAnswer('');
    setIsCorrect(null);
    setShowTable(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert user answer to number
    const userExp = parseInt(userAnswer, 10);
    
    // Calculate the result of base^userExp mod modulus
    const userResult = calculateModPow(base, userExp, modulus);
    
    // Check if the result matches the target
    const correct = userResult === result;
    setIsCorrect(correct);
    
    // If correct, increment success count
    if (correct) {
      const newSuccessCount = successCount + 1;
      setSuccessCount(newSuccessCount);
      
      // If user has solved enough challenges, call onSolve
      if (newSuccessCount >= 4 && onSolve) {
        setTimeout(() => {
          onSolve();
        }, 2000);
      } else {
        // Set up a new challenge after a delay
        setTimeout(() => {
          setupNewChallenge();
        }, 2000);
      }
    }
  };

  // Generate the powers table for the current base and modulus
  const generatePowersTable = () => {
    const powers = [];
    
    for (let i = 0; i <= modulus; i++) {
      const value = calculateModPow(base, i, modulus);
      powers.push({ exponent: i, value });
    }
    
    return powers;
  };

  return (
    <div className="math-interactive discrete-log-puzzle">
      <h3 className="math-interactive__title">Discrete Logarithm Challenge</h3>
      
      <div className="math-interactive__description">
        <p>
          The Discrete Logarithm Problem: Given values g, h, and p, find x such that g^x ≡ h (mod p).
          This problem is computationally hard for large numbers and forms the basis of many cryptographic protocols.
        </p>
      </div>
      
      <div className="math-interactive__visualization">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="discrete-log__canvas"
        />
      </div>
      
      <div className="math-interactive__problem">
        <p className="math-interactive__instruction">
          Find the exponent x such that {base}^x ≡ {result} (mod {modulus})
        </p>
        
        <form onSubmit={handleSubmit} className="math-interactive__form">
          <div className="math-interactive__input-group">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Exponent (x)"
              min="0"
              max={modulus - 1}
              required
              className="math-interactive__input"
            />
            <button type="submit" className="math-interactive__submit">Check</button>
          </div>
        </form>

        {isCorrect !== null && (
          <div className={`math-interactive__feedback ${isCorrect ? 'math-interactive__feedback--correct' : 'math-interactive__feedback--incorrect'}`}>
            {isCorrect ? (
              <span>
                Correct! {base}^{exponent} ≡ {calculateModPow(base, exponent, modulus)} ≡ {result} (mod {modulus})
              </span>
            ) : (
              <span>
                Incorrect. {base}^{userAnswer} ≡ {calculateModPow(base, parseInt(userAnswer, 10) || 0, modulus)} ≢ {result} (mod {modulus})
              </span>
            )}
          </div>
        )}

        <div className="math-interactive__controls">
          <button
            type="button"
            onClick={() => setShowTable(!showTable)}
            className="math-interactive__helper-button"
          >
            {showTable ? 'Hide Powers Table' : 'Show Powers Table'}
          </button>
          
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="math-interactive__hint-button"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        </div>
        
        {showTable && (
          <div className="math-interactive__table-container">
            <h4>Powers of {base} modulo {modulus}</h4>
            <div className="math-interactive__table">
              <table>
                <thead>
                  <tr>
                    <th>Exponent (x)</th>
                    <th>{base}^x mod {modulus}</th>
                  </tr>
                </thead>
                <tbody>
                  {generatePowersTable().map(entry => (
                    <tr 
                      key={entry.exponent}
                      className={entry.value === result ? 'math-interactive__table-highlight' : ''}
                    >
                      <td>{entry.exponent}</td>
                      <td>{entry.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {showHint && (
          <div className="math-interactive__hint">
            <p>
              <strong>How to solve the Discrete Logarithm Problem:</strong>
            </p>
            <p>
              For small groups (like we're using here), you can simply compute all possible values of g^x and find which one equals h.
            </p>
            <ol>
              <li>Start with x = 0 and compute g^0 mod p</li>
              <li>If g^x mod p = h, you've found the answer!</li>
              <li>Otherwise, increment x and try again: g^(x+1) mod p</li>
              <li>Continue until you find the value of x where g^x mod p = h</li>
            </ol>
            <p>
              For our problem: find x where {base}^x ≡ {result} (mod {modulus})
            </p>
            <p>
              Try computing:
              <br />
              {base}^0 ≡ {calculateModPow(base, 0, modulus)} (mod {modulus})
              <br />
              {base}^1 ≡ {calculateModPow(base, 1, modulus)} (mod {modulus})
              <br />
              {base}^2 ≡ {calculateModPow(base, 2, modulus)} (mod {modulus})
              <br />
              ...and so on until you find the value that equals {result}.
            </p>
            <p>
              <em>Note: For large numbers used in real cryptography, this brute-force approach would be computationally infeasible.</em>
            </p>
          </div>
        )}
      </div>
      
      <div className="math-interactive__progress">
        <p>Difficulty: {difficulty}/3 | Problems solved: {successCount}/4</p>
        <div className="math-interactive__progress-bar">
          <div
            className="math-interactive__progress-fill"
            style={{ width: `${(successCount / 4) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

DiscreteLogPuzzle.propTypes = {
  onSolve: PropTypes.func
};

export default DiscreteLogPuzzle;