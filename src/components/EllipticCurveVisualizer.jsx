import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './MathComponents.css';

/**
 * EllipticCurveVisualizer component - Interactive visualization for elliptic curves
 * @param {Object} props - Component props
 * @param {Function} props.onSolve - Handler when user completes the challenge
 * @returns {React.Element} The rendered EllipticCurveVisualizer component
 */
function EllipticCurveVisualizer({ onSolve }) {
  // Constants for the curve parameters in simplified form y² = x³ + ax + b (mod p)
  const [a, setA] = useState(0);
  const [b, setB] = useState(7);
  const [modulus, setModulus] = useState(17); // Small prime for visualization
  const [points, setPoints] = useState([]);
  const [selectedPoint1, setSelectedPoint1] = useState(null);
  const [selectedPoint2, setSelectedPoint2] = useState(null);
  const [resultPoint, setResultPoint] = useState(null);
  const [userAnswer, setUserAnswer] = useState({ x: '', y: '' });
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [challenge, setChallenge] = useState({ type: 'addition', text: '' });
  const [successCount, setSuccessCount] = useState(0);
  const canvasRef = useRef(null);

  // Generate all points on the elliptic curve
  useEffect(() => {
    computeCurvePoints();
  }, [a, b, modulus]);

  // Draw the elliptic curve and points
  useEffect(() => {
    drawCurve();
  }, [points, selectedPoint1, selectedPoint2, resultPoint]);

  // Set up a new challenge when points change or after a successful answer
  useEffect(() => {
    if (points.length > 0) {
      setupNewChallenge();
    }
  }, [points, successCount]);

  // Compute all points on the elliptic curve y² = x³ + ax + b (mod p)
  const computeCurvePoints = () => {
    // Ensure modulus is prime (simplification)
    if (modulus < 3) {
      setModulus(3);
      return;
    }

    // Check if 4a³ + 27b² ≠ 0 (mod p) for a valid curve
    const discriminant = (4 * Math.pow(a, 3) + 27 * Math.pow(b, 2)) % modulus;
    if (discriminant === 0) {
      // Invalid curve parameters, adjust b
      setB((b + 1) % modulus);
      return;
    }

    const newPoints = [];
    
    // Find all points on the curve
    for (let x = 0; x < modulus; x++) {
      // Calculate y² = x³ + ax + b (mod p)
      const rhs = (Math.pow(x, 3) + a * x + b) % modulus;
      
      // Find y values where y² ≡ rhs (mod p)
      for (let y = 0; y < modulus; y++) {
        if ((y * y) % modulus === rhs) {
          newPoints.push({ x, y });
        }
      }
    }
    
    // Add point at infinity (represented as null for simplicity)
    newPoints.push({ x: 'O', y: 'O' });
    
    setPoints(newPoints);
  };

  // Draw the elliptic curve and points on the canvas
  const drawCurve = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const pointRadius = 5;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up coordinate system
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines
    for (let x = 0; x < modulus; x++) {
      const xPos = (x / modulus) * (width - 2 * padding) + padding;
      ctx.beginPath();
      ctx.moveTo(xPos, padding);
      ctx.lineTo(xPos, height - padding);
      ctx.stroke();
      
      // Draw x axis labels
      ctx.fillStyle = '#64748b';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(x.toString(), xPos, height - 5);
    }
    
    // Horizontal grid lines
    for (let y = 0; y < modulus; y++) {
      const yPos = height - ((y / modulus) * (height - 2 * padding) + padding);
      ctx.beginPath();
      ctx.moveTo(padding, yPos);
      ctx.lineTo(width - padding, yPos);
      ctx.stroke();
      
      // Draw y axis labels
      ctx.fillStyle = '#64748b';
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(y.toString(), padding - 5, yPos + 3);
    }
    
    // Draw curve points
    points.forEach(point => {
      // Skip point at infinity
      if (point.x === 'O' && point.y === 'O') return;
      
      const xPos = (point.x / modulus) * (width - 2 * padding) + padding;
      const yPos = height - ((point.y / modulus) * (height - 2 * padding) + padding);
      
      // Determine if this is a selected point
      let isSelected = false;
      if (selectedPoint1 && point.x === selectedPoint1.x && point.y === selectedPoint1.y) {
        isSelected = true;
        ctx.fillStyle = '#4f46e5'; // Primary color for first selected point
      } else if (selectedPoint2 && point.x === selectedPoint2.x && point.y === selectedPoint2.y) {
        isSelected = true;
        ctx.fillStyle = '#10b981'; // Success color for second selected point
      } else if (resultPoint && point.x === resultPoint.x && point.y === resultPoint.y) {
        isSelected = true;
        ctx.fillStyle = '#f97316'; // Warning color for result point
      } else {
        ctx.fillStyle = '#94a3b8'; // Default point color
      }
      
      // Draw the point
      ctx.beginPath();
      ctx.arc(xPos, yPos, isSelected ? pointRadius + 1 : pointRadius, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add labels to selected points
      if (isSelected) {
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        
        if (selectedPoint1 && point.x === selectedPoint1.x && point.y === selectedPoint1.y) {
          ctx.fillText('P', xPos, yPos - 10);
        } else if (selectedPoint2 && point.x === selectedPoint2.x && point.y === selectedPoint2.y) {
          ctx.fillText('Q', xPos, yPos - 10);
        } else if (resultPoint && point.x === resultPoint.x && point.y === resultPoint.y) {
          ctx.fillText('R', xPos, yPos - 10);
        }
      }
    });
    
    // Draw curve equation
    ctx.fillStyle = '#1e293b';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Elliptic Curve: y² ≡ x³ + ${a}x + ${b} (mod ${modulus})`, width / 2, 15);
  };

  // Set up a new challenge
  const setupNewChallenge = () => {
    // Filter out point at infinity for challenges
    const finitePoints = points.filter(p => p.x !== 'O');
    if (finitePoints.length < 2) return;
    
    // Select two random points
    const pointIdx1 = Math.floor(Math.random() * finitePoints.length);
    let pointIdx2 = Math.floor(Math.random() * finitePoints.length);
    
    // Ensure points are different (if possible)
    if (finitePoints.length > 1) {
      while (pointIdx2 === pointIdx1) {
        pointIdx2 = Math.floor(Math.random() * finitePoints.length);
      }
    }
    
    const point1 = finitePoints[pointIdx1];
    const point2 = finitePoints[pointIdx2];
    
    setSelectedPoint1(point1);
    setSelectedPoint2(point2);
    
    // Calculate result for point addition
    const result = addEllipticCurvePoints(point1, point2);
    setResultPoint(result);
    
    // Set up challenge text
    if (Math.random() < 0.7 || successCount < 1) {
      // Point addition challenge (more common)
      setChallenge({
        type: 'addition',
        text: `What is the result of adding points P(${point1.x},${point1.y}) and Q(${point2.x},${point2.y})?`
      });
    } else {
      // Point doubling challenge
      setSelectedPoint2(point1); // Same point for doubling
      const doubleResult = addEllipticCurvePoints(point1, point1);
      setResultPoint(doubleResult);
      
      setChallenge({
        type: 'doubling',
        text: `What is the result of doubling point P(${point1.x},${point1.y})? (i.e., P + P)`
      });
    }
    
    // Reset user answer and feedback
    setUserAnswer({ x: '', y: '' });
    setIsCorrect(null);
  };

  // Elliptic curve point addition: P + Q
  const addEllipticCurvePoints = (P, Q) => {
    // Handle point at infinity cases
    if (P.x === 'O') return Q;
    if (Q.x === 'O') return P;
    
    // If P = -Q, result is point at infinity
    if (P.x === Q.x && ((P.y + Q.y) % modulus === 0)) {
      return { x: 'O', y: 'O' };
    }
    
    let slope;
    
    if (P.x === Q.x && P.y === Q.y) {
      // Point doubling: P + P
      // slope = (3x_P^2 + a) / (2y_P)
      const numerator = (3 * Math.pow(P.x, 2) + a) % modulus;
      const denominator = (2 * P.y) % modulus;
      
      // Calculate modular inverse of denominator
      const invDenominator = modInverse(denominator, modulus);
      
      if (invDenominator === null) {
        // This should not happen with proper EC parameters
        return { x: 'O', y: 'O' };
      }
      
      slope = (numerator * invDenominator) % modulus;
    } else {
      // Point addition: P + Q where P ≠ Q
      // slope = (y_Q - y_P) / (x_Q - x_P)
      const numerator = ((Q.y - P.y) % modulus + modulus) % modulus;
      const denominator = ((Q.x - P.x) % modulus + modulus) % modulus;
      
      // Calculate modular inverse of denominator
      const invDenominator = modInverse(denominator, modulus);
      
      if (invDenominator === null) {
        // This should not happen with proper EC parameters
        return { x: 'O', y: 'O' };
      }
      
      slope = (numerator * invDenominator) % modulus;
    }
    
    // Calculate x_R = slope^2 - x_P - x_Q
    let x_R = (Math.pow(slope, 2) - P.x - Q.x) % modulus;
    if (x_R < 0) x_R += modulus;
    
    // Calculate y_R = slope(x_P - x_R) - y_P
    let y_R = (slope * (P.x - x_R) - P.y) % modulus;
    if (y_R < 0) y_R += modulus;
    
    return { x: x_R, y: y_R };
  };

  // Calculate modular inverse using Extended Euclidean Algorithm
  const modInverse = (a, m) => {
    a = ((a % m) + m) % m; // Ensure positive
    
    if (a === 0) return null; // No inverse exists for 0
    
    let [old_r, r] = [a, m];
    let [old_s, s] = [1, 0];
    let [old_t, t] = [0, 1];
    
    while (r !== 0) {
      const quotient = Math.floor(old_r / r);
      [old_r, r] = [r, old_r - quotient * r];
      [old_s, s] = [s, old_s - quotient * s];
      [old_t, t] = [t, old_t - quotient * t];
    }
    
    if (old_r !== 1) return null; // No inverse exists
    
    return ((old_s % m) + m) % m;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert user answer to numbers
    const userX = userAnswer.x === 'O' ? 'O' : parseInt(userAnswer.x, 10);
    const userY = userAnswer.y === 'O' ? 'O' : parseInt(userAnswer.y, 10);
    
    // Check if the answer is correct
    const isAnswerCorrect = 
      (userX === 'O' && resultPoint.x === 'O') || 
      (userX === resultPoint.x && userY === resultPoint.y);
    
    setIsCorrect(isAnswerCorrect);
    
    // If correct, increment success count
    if (isAnswerCorrect) {
      const newSuccessCount = successCount + 1;
      setSuccessCount(newSuccessCount);
      
      // If user has solved enough problems, call onSolve
      if (newSuccessCount >= 3 && onSolve) {
        setTimeout(() => {
          onSolve();
        }, 1500);
      } else {
        // Set up a new challenge after a delay
        setTimeout(() => {
          setupNewChallenge();
        }, 1500);
      }
    }
  };

  // Handle input changes for point at infinity
  const handlePointInput = (field, value) => {
    if (value.toLowerCase() === 'o' || value.toLowerCase() === 'inf') {
      setUserAnswer({ ...userAnswer, [field]: 'O' });
    } else {
      setUserAnswer({ ...userAnswer, [field]: value });
    }
  };

  return (
    <div className="math-interactive elliptic-curve-visualizer">
      <h3 className="math-interactive__title">Elliptic Curve Visualizer</h3>
      
      <div className="math-interactive__visualization">
        <canvas 
          ref={canvasRef}
          width={320}
          height={320}
          className="elliptic-curve__canvas"
        />
      </div>
      
      <div className="math-interactive__problem">
        <p className="math-interactive__instruction">
          {challenge.text}
        </p>
        
        <form onSubmit={handleSubmit} className="math-interactive__form">
          <div className="math-interactive__point-input">
            <label>Result Point R = (</label>
            <input
              type="text"
              value={userAnswer.x}
              onChange={(e) => handlePointInput('x', e.target.value)}
              placeholder="x"
              className="math-interactive__input math-interactive__input--small"
              required
            />
            <span>, </span>
            <input
              type="text"
              value={userAnswer.y}
              onChange={(e) => handlePointInput('y', e.target.value)}
              placeholder="y"
              className="math-interactive__input math-interactive__input--small"
              required
            />
            <span>)</span>
            <button type="submit" className="math-interactive__submit">Check</button>
          </div>
          <p className="math-interactive__note">
            Use "O" for the point at infinity
          </p>
        </form>

        {isCorrect !== null && (
          <div className={`math-interactive__feedback ${isCorrect ? 'math-interactive__feedback--correct' : 'math-interactive__feedback--incorrect'}`}>
            {isCorrect ? (
              <span>Correct! {challenge.type === 'addition' ? 'P + Q' : 'P + P'} = ({resultPoint.x},{resultPoint.y})</span>
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
              <p>
                <strong>Elliptic Curve Point Addition:</strong>
              </p>
              <p>
                For two points P(x₁,y₁) and Q(x₂,y₂) on the curve y² = x³ + {a}x + {b} mod {modulus}:
              </p>
              <ul>
                <li>If P is the point at infinity O, then P + Q = Q</li>
                <li>If Q is the point at infinity O, then P + Q = P</li>
                <li>If x₁ = x₂ and y₁ = -y₂ mod {modulus}, then P + Q = O (point at infinity)</li>
                <li>Otherwise, calculate:</li>
              </ul>
              <p>
                If P ≠ Q: slope = (y₂ - y₁)/(x₂ - x₁) mod {modulus}<br />
                If P = Q: slope = (3x₁² + {a})/(2y₁) mod {modulus}
              </p>
              <p>
                Then: x₃ = slope² - x₁ - x₂ mod {modulus}<br />
                y₃ = slope(x₁ - x₃) - y₁ mod {modulus}
              </p>
              <p>
                The result is R(x₃,y₃).
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="math-interactive__progress">
        <p>Problems solved: {successCount}/3</p>
        <div className="math-interactive__progress-bar">
          <div
            className="math-interactive__progress-fill"
            style={{ width: `${(successCount / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

EllipticCurveVisualizer.propTypes = {
  onSolve: PropTypes.func
};

export default EllipticCurveVisualizer;