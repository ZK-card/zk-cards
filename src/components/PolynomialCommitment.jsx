import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './MathComponents.css';

/**
 * PolynomialCommitment component - Interactive demonstration of polynomial commitments
 * @param {Object} props - Component props
 * @param {Function} props.onSolve - Handler when user completes the challenge
 * @returns {React.Element} The rendered PolynomialCommitment component
 */
function PolynomialCommitment({ onSolve }) {
  // State for the polynomial
  const [coefficients, setCoefficients] = useState([3, 1, 2]); // represents 3 + x + 2x²
  const [degree, setDegree] = useState(2);
  const [pointX, setPointX] = useState(4);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [expectedAnswer, setExpectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [challengeType, setChallengeType] = useState('evaluation'); // 'evaluation' or 'coefficient'
  const [primeModulus, setPrimeModulus] = useState(17); // Small prime for modular arithmetic
  const canvasRef = useRef(null);

  // Calculate the expected answer when inputs change
  useEffect(() => {
    if (challengeType === 'evaluation') {
      // Calculate polynomial evaluation at point x
      setExpectedAnswer(evaluatePolynomial(coefficients, pointX, primeModulus));
    } else {
      // Coefficient challenge - no calculation needed as we'll ask for a specific coefficient
    }
  }, [coefficients, pointX, challengeType, primeModulus]);

  // Draw the polynomial visualization
  useEffect(() => {
    drawPolynomial();
  }, [coefficients, pointX, expectedAnswer, isCorrect]);

  // Set up a new challenge when needed
  useEffect(() => {
    setupNewChallenge();
  }, [successCount]);

  // Evaluate polynomial at a given point x
  const evaluatePolynomial = (coeffs, x, mod) => {
    let result = 0;
    for (let i = 0; i < coeffs.length; i++) {
      // result += coefficient * x^i
      result = (result + (coeffs[i] * Math.pow(x, i))) % mod;
    }
    return result;
  };

  // Draw polynomial visualization
  const drawPolynomial = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 30;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up coordinate system
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Draw axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    
    // X axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Y axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // Draw axis labels
    ctx.fillStyle = '#1e293b';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('x', width - padding + 10, height - padding + 12);
    ctx.textAlign = 'right';
    ctx.fillText('P(x)', padding - 5, padding - 5);
    
    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines (y axis)
    for (let y = 0; y <= primeModulus; y += 4) {
      const yPos = height - padding - (y / primeModulus) * (height - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(padding, yPos);
      ctx.lineTo(width - padding, yPos);
      ctx.stroke();
      
      // Label
      if (y % 4 === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(y.toString(), padding - 5, yPos + 3);
      }
    }
    
    // Vertical grid lines (x axis)
    for (let x = 0; x <= primeModulus; x += 2) {
      const xPos = padding + (x / primeModulus) * (width - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(xPos, padding);
      ctx.lineTo(xPos, height - padding);
      ctx.stroke();
      
      // Label
      if (x % 2 === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(x.toString(), xPos, height - padding + 12);
      }
    }
    
    // Draw polynomial curve
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Plot points and connect with a curve
    const pointsToPlot = 100;
    for (let i = 0; i <= pointsToPlot; i++) {
      const x = (i / pointsToPlot) * primeModulus;
      const y = evaluatePolynomial(coefficients, x, primeModulus);
      
      const xPos = padding + (x / primeModulus) * (width - 2 * padding);
      const yPos = height - padding - (y / primeModulus) * (height - 2 * padding);
      
      if (i === 0) {
        ctx.moveTo(xPos, yPos);
      } else {
        ctx.lineTo(xPos, yPos);
      }
    }
    
    ctx.stroke();
    
    // Draw the evaluation point if we have one
    if (challengeType === 'evaluation') {
      const xPos = padding + (pointX / primeModulus) * (width - 2 * padding);
      const yPos = height - padding - (expectedAnswer / primeModulus) * (height - 2 * padding);
      
      // Draw vertical line to the point
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(xPos, height - padding);
      ctx.lineTo(xPos, yPos);
      ctx.stroke();
      
      // Draw horizontal line to the point
      ctx.beginPath();
      ctx.moveTo(padding, yPos);
      ctx.lineTo(xPos, yPos);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw the point
      ctx.fillStyle = isCorrect === null ? '#f97316' : (isCorrect ? '#10b981' : '#ef4444');
      ctx.beginPath();
      ctx.arc(xPos, yPos, 5, 0, 2 * Math.PI);
      ctx.fill();
      
      // Label the point
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`P(${pointX}) = ${expectedAnswer}`, xPos + 10, yPos - 10);
    }
    
    // Draw polynomial equation
    ctx.fillStyle = '#1e293b';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(getPolynomialEquation(), width / 2, 20);
  };

  // Get polynomial equation string representation
  const getPolynomialEquation = () => {
    if (coefficients.length === 0) return "P(x) = 0";
    
    let equation = "P(x) = ";
    let terms = [];
    
    coefficients.forEach((coeff, index) => {
      if (coeff === 0) return;
      
      let term = '';
      if (coeff !== 1 || index === 0) {
        term += coeff;
      }
      
      if (index > 0) {
        term += 'x';
        if (index > 1) {
          term += '²'.charAt(index-1);
        }
      }
      
      terms.push(term);
    });
    
    equation += terms.join(' + ').replace(/\+ -/g, '- ');
    equation += ` (mod ${primeModulus})`;
    return equation;
  };

  // Set up a new challenge
  const setupNewChallenge = () => {
    // Decide challenge type (evaluation or coefficient)
    if (successCount >= 2) {
      // After 2 successful evaluation challenges, switch to coefficient challenges
      setChallengeType('coefficient');
    } else {
      setChallengeType('evaluation');
    }
    
    // Generate a new random polynomial
    const newDegree = 2 + Math.floor(Math.random() * 2); // Degree 2 or 3
    const newCoefficients = [];
    
    for (let i = 0; i <= newDegree; i++) {
      newCoefficients.push(Math.floor(Math.random() * primeModulus));
    }
    
    // Ensure the leading coefficient is non-zero
    if (newCoefficients[newDegree] === 0) {
      newCoefficients[newDegree] = 1 + Math.floor(Math.random() * (primeModulus - 1));
    }
    
    setCoefficients(newCoefficients);
    setDegree(newDegree);
    
    // Set a random evaluation point
    const newPointX = Math.floor(Math.random() * primeModulus);
    setPointX(newPointX);
    
    // Reset user answer and feedback
    setUserAnswer('');
    setIsCorrect(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert user answer to number
    const userNum = parseInt(userAnswer, 10);
    
    // Check if the answer is correct
    if (challengeType === 'evaluation') {
      const correct = userNum === expectedAnswer;
      setIsCorrect(correct);
      
      // If correct, increment success count
      if (correct) {
        setSuccessCount(prev => prev + 1);
        
        // Check if we've completed enough challenges
        if (successCount + 1 >= 4 && onSolve) {
          setTimeout(() => {
            onSolve();
          }, 1500);
        } else {
          // Generate new challenge after a delay
          setTimeout(() => {
            setupNewChallenge();
          }, 1500);
        }
      }
    } else {
      // Coefficient challenge
      const coeffIndex = pointX; // Using pointX as the coefficient index to find
      const correct = userNum === coefficients[coeffIndex];
      setIsCorrect(correct);
      
      // If correct, increment success count
      if (correct) {
        setSuccessCount(prev => prev + 1);
        
        // Check if we've completed enough challenges
        if (successCount + 1 >= 4 && onSolve) {
          setTimeout(() => {
            onSolve();
          }, 1500);
        } else {
          // Generate new challenge after a delay
          setTimeout(() => {
            setupNewChallenge();
          }, 1500);
        }
      }
    }
  };

  return (
    <div className="math-interactive polynomial-commitment">
      <h3 className="math-interactive__title">Polynomial Commitment Challenge</h3>
      
      <div className="math-interactive__visualization">
        <canvas
          ref={canvasRef}
          width={320}
          height={220}
          className="polynomial__canvas"
        />
      </div>
      
      <div className="math-interactive__problem">
        <p className="math-interactive__instruction">
          {challengeType === 'evaluation'
            ? `Calculate the value of the polynomial P(x) at x = ${pointX}`
            : `What is the coefficient of the x^${pointX} term in the polynomial?`}
        </p>
        
        <form onSubmit={handleSubmit} className="math-interactive__form">
          <div className="math-interactive__input-group">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={
                challengeType === 'evaluation'
                  ? `P(${pointX}) = ?`
                  : `Coefficient of x^${pointX} = ?`
              }
              min="0"
              max={primeModulus - 1}
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
                {challengeType === 'evaluation'
                  ? `Correct! P(${pointX}) = ${expectedAnswer} (mod ${primeModulus})`
                  : `Correct! The coefficient of x^${pointX} is ${coefficients[pointX]}`}
              </span>
            ) : (
              <span>Incorrect. Try again or check the hint.</span>
            )}
          </div>
        )}

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
              {challengeType === 'evaluation' ? (
                <>
                  <p>
                    <strong>How to evaluate a polynomial:</strong>
                  </p>
                  <p>
                    For a polynomial P(x) = a₀ + a₁x + a₂x² + ... + aₙxⁿ:
                  </p>
                  <ol>
                    <li>Substitute the value of x = {pointX} into the polynomial.</li>
                    <li>Calculate each term: a₀, a₁ × {pointX}, a₂ × {pointX}², etc.</li>
                    <li>Add all terms together.</li>
                    <li>Take the result modulo {primeModulus}.</li>
                  </ol>
                  <p>
                    For our polynomial {getPolynomialEquation()}:
                  </p>
                  <ul>
                    {coefficients.map((coeff, i) => (
                      <li key={i}>
                        Term {i}: {coeff} × {pointX}^{i} = {coeff} × {Math.pow(pointX, i)} = {(coeff * Math.pow(pointX, i)) % primeModulus} (mod {primeModulus})
                      </li>
                    ))}
                  </ul>
                  <p>
                    Add all terms together and take modulo {primeModulus}.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>How to find a coefficient:</strong>
                  </p>
                  <p>
                    For a polynomial P(x) = a₀ + a₁x + a₂x² + ... + aₙxⁿ:
                  </p>
                  <p>
                    The coefficient of x^{pointX} is a_{pointX}.
                  </p>
                  <p>
                    In this case, look at the term containing x^{pointX} in the polynomial {getPolynomialEquation()}.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="math-interactive__progress">
        <p>Problems solved: {successCount}/4</p>
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

PolynomialCommitment.propTypes = {
  onSolve: PropTypes.func
};

export default PolynomialCommitment;