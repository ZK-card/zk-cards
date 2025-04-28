import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './ModuloQuest.css';

// ModuloClock component for visualizing modular arithmetic on a clock face
const ModuloClock = ({ modulus = 12, value = 0, highlightedValues = [], size = 300 }) => {
  // Calculate positions for each number on the clock
  const getPositionForNumber = (num) => {
    const angle = (num / modulus) * 2 * Math.PI - Math.PI / 2;
    const radius = size / 2 - 30;
    return {
      x: size / 2 + radius * Math.cos(angle),
      y: size / 2 + radius * Math.sin(angle),
    };
  };
  
  // Animation for the current value pointer
  const pointerSpring = useSpring({
    rotate: ((value / modulus) * 360 - 90),
    config: { tension: 120, friction: 14 },
  });
  
  // Generate all the numbers for the clock face
  const clockNumbers = Array.from({ length: modulus }, (_, i) => i);
  
  return (
    <div className="modulo-clock" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Clock face circle */}
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 10} fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Clock numbers */}
        {clockNumbers.map(num => {
          const { x, y } = getPositionForNumber(num);
          const isHighlighted = highlightedValues.includes(num);
          return (
            <g key={num}>
              <circle 
                cx={x} 
                cy={y} 
                r={isHighlighted ? 24 : 20}
                fill={isHighlighted ? "#818cf8" : "#fff"}
                stroke={isHighlighted ? "#4f46e5" : "#cbd5e1"}
                strokeWidth="2"
              />
              <text 
                x={x} 
                y={y} 
                textAnchor="middle" 
                dominantBaseline="middle"
                fontSize="16"
                fontWeight={isHighlighted ? "bold" : "normal"}
                fill={isHighlighted ? "#fff" : "#0f172a"}
              >
                {num}
              </text>
            </g>
          );
        })}
        
        {/* Center of clock */}
        <circle cx={size / 2} cy={size / 2} r={8} fill="#4f46e5" />
        
        {/* Pointer for current value */}
        <animated.line
          x1={size / 2}
          y1={size / 2}
          x2={size / 2}
          y2={30}
          stroke="#4f46e5"
          strokeWidth="4"
          transform={pointerSpring.rotate.to(r => `rotate(${r} ${size / 2} ${size / 2})`)}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// Operation control component
const OperationControl = ({ operation, value, onChange, modulus }) => {
  const handleValueChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      onChange(newValue);
    }
  };
  
  return (
    <div className="operation-control">
      <label>{operation}</label>
      <div className="operation-input-group">
        <button 
          onClick={() => onChange(Math.max(0, value - 1))}
          className="operation-button"
        >
          -
        </button>
        <input 
          type="number" 
          min="0" 
          max={modulus - 1}
          value={value} 
          onChange={handleValueChange} 
          className="operation-input"
        />
        <button 
          onClick={() => onChange((value + 1) % modulus)}
          className="operation-button"
        >
          +
        </button>
      </div>
    </div>
  );
};

// Challenge component
const ModuloChallenge = ({ modulus, difficulty, onSolve, onSkip }) => {
  const operations = ['+', '-', '×'];
  
  // Generate a random challenge based on difficulty
  const generateChallenge = () => {
    const a = Math.floor(Math.random() * modulus);
    const b = Math.floor(Math.random() * modulus);
    const opIndex = Math.min(difficulty - 1, operations.length - 1);
    const operation = operations[Math.floor(Math.random() * (opIndex + 1))];
    
    let result;
    switch (operation) {
      case '+':
        result = (a + b) % modulus;
        break;
      case '-':
        result = ((a - b) % modulus + modulus) % modulus;
        break;
      case '×':
        result = (a * b) % modulus;
        break;
      default:
        result = a;
    }
    
    return { a, b, operation, result };
  };
  
  const [challenge, setChallenge] = useState(generateChallenge());
  const [userAnswer, setUserAnswer] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  
  const handleSubmit = () => {
    const userResult = parseInt(userAnswer, 10);
    
    if (isNaN(userResult)) {
      setFeedbackMessage('Please enter a number');
      return;
    }
    
    if (userResult === challenge.result) {
      setIsCorrect(true);
      setFeedbackMessage('Correct! Great job!');
      setTimeout(() => {
        onSolve();
        setChallenge(generateChallenge());
        setUserAnswer('');
        setFeedbackMessage('');
        setIsCorrect(null);
      }, 1500);
    } else {
      setIsCorrect(false);
      setFeedbackMessage(`Incorrect. Try again! Remember we're working in mod ${modulus}.`);
    }
  };
  
  return (
    <div className="modulo-challenge">
      <h3>Solve this challenge</h3>
      
      <div className="challenge-problem">
        <span className="challenge-value">{challenge.a}</span>
        <span className="challenge-operation">{challenge.operation}</span>
        <span className="challenge-value">{challenge.b}</span>
        <span className="challenge-operation">≡</span>
        <span className="challenge-value">?</span>
        <span className="challenge-operation">(mod {modulus})</span>
      </div>
      
      <div className="challenge-input-group">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
          className={`challenge-input ${isCorrect === true ? 'correct' : ''} ${isCorrect === false ? 'incorrect' : ''}`}
        />
        <button onClick={handleSubmit} className="challenge-button">
          Check
        </button>
      </div>
      
      {feedbackMessage && (
        <div className={`challenge-feedback ${isCorrect === true ? 'correct' : ''} ${isCorrect === false ? 'incorrect' : ''}`}>
          {feedbackMessage}
        </div>
      )}
      
      <button onClick={onSkip} className="challenge-skip-button">
        Skip this challenge
      </button>
    </div>
  );
};

// Main ModuloQuest component
const ModuloQuest = ({ onComplete }) => {
  const [stage, setStage] = useState('intro'); // intro, playground, challenge, complete
  const [modulus, setModulus] = useState(12);
  const [currentValue, setCurrentValue] = useState(0);
  const [operandA, setOperandA] = useState(3);
  const [operandB, setOperandB] = useState(5);
  const [operation, setOperation] = useState('+');
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [requiredChallenges, setRequiredChallenges] = useState(5);
  const [difficulty, setDifficulty] = useState(1);
  
  // Calculate result based on current operation and operands
  const calculateResult = () => {
    switch (operation) {
      case '+':
        return (operandA + operandB) % modulus;
      case '-':
        return ((operandA - operandB) % modulus + modulus) % modulus; // Ensure positive result
      case '×':
        return (operandA * operandB) % modulus;
      default:
        return operandA;
    }
  };
  
  // Update current value when operands or operation change
  useEffect(() => {
    setCurrentValue(calculateResult());
  }, [operandA, operandB, operation, modulus]);
  
  // Highlight values on the clock based on current operation
  const getHighlightedValues = () => {
    switch (operation) {
      case '+':
        return [operandA, operandB, currentValue];
      case '-':
        return [operandA, currentValue, operandB];
      case '×':
        // For multiplication, highlight multiples leading to the result
        const highlights = [];
        for (let i = 1; i <= operandB; i++) {
          highlights.push((operandA * i) % modulus);
        }
        return highlights;
      default:
        return [currentValue];
    }
  };
  
  // Handle challenge completion
  const handleChallengeComplete = () => {
    const newCompleted = challengesCompleted + 1;
    setChallengesCompleted(newCompleted);
    
    // Increase difficulty after some challenges
    if (newCompleted === 2) {
      setDifficulty(2);
    } else if (newCompleted === 4) {
      setDifficulty(3);
    }
    
    // Check if module is complete
    if (newCompleted >= requiredChallenges) {
      setStage('complete');
    }
  };
  
  // Render different stages
  const renderStage = () => {
    switch (stage) {
      case 'intro':
        return (
          <div className="module-stage">
            <h2>Welcome to Modulo Quest!</h2>
            <p>
              Modular arithmetic is a fundamental concept in zero-knowledge proofs and cryptography.
              It's like clock arithmetic - after you reach the maximum value, you wrap around to zero.
            </p>
            <p>
              For example, on a 12-hour clock, 7 hours after 9 o'clock is not 16 o'clock, but 4 o'clock.
              In modular arithmetic notation: 9 + 7 ≡ 4 (mod 12)
            </p>
            <div className="intro-visualization">
              <ModuloClock modulus={12} value={4} highlightedValues={[9, 4]} />
            </div>
            <button className="module-button" onClick={() => setStage('playground')}>
              Try it yourself →
            </button>
          </div>
        );
        
      case 'playground':
        return (
          <div className="module-stage">
            <h2>Modular Arithmetic Playground</h2>
            <p>
              Experiment with different operations in modulo {modulus}.
              See how the results wrap around the clock!
            </p>
            
            <div className="modulo-playground">
              <div className="modulo-controls">
                <div className="modulus-control">
                  <label>Modulus</label>
                  <div className="modulus-buttons">
                    {[5, 7, 10, 12, 24].map(m => (
                      <button 
                        key={m} 
                        onClick={() => setModulus(m)}
                        className={`modulus-button ${modulus === m ? 'active' : ''}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="operation-selector">
                  <label>Operation</label>
                  <div className="operation-buttons">
                    {['+', '-', '×'].map(op => (
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
                
                <OperationControl 
                  operation="First Value" 
                  value={operandA} 
                  onChange={setOperandA}
                  modulus={modulus}
                />
                
                <OperationControl 
                  operation="Second Value" 
                  value={operandB} 
                  onChange={setOperandB}
                  modulus={modulus}
                />
                
                <div className="result-display">
                  <span className="result-equation">
                    {operandA} {operation} {operandB} ≡ {currentValue} (mod {modulus})
                  </span>
                </div>
              </div>
              
              <div className="clock-visualization">
                <ModuloClock 
                  modulus={modulus} 
                  value={currentValue}
                  highlightedValues={getHighlightedValues()}
                />
              </div>
            </div>
            
            <button className="module-button" onClick={() => setStage('challenge')}>
              Take the challenge →
            </button>
          </div>
        );
        
      case 'challenge':
        return (
          <div className="module-stage">
            <h2>Modular Arithmetic Challenges</h2>
            <p>
              Solve {requiredChallenges} challenges to complete this module! 
              Current difficulty: {Array(difficulty).fill('⭐').join('')}
            </p>
            
            <div className="challenge-progress">
              <div className="challenge-progress-bar">
                <div 
                  className="challenge-progress-fill" 
                  style={{ width: `${(challengesCompleted / requiredChallenges) * 100}%` }}
                ></div>
              </div>
              <span className="challenge-progress-text">
                {challengesCompleted} / {requiredChallenges} Completed
              </span>
            </div>
            
            <div className="challenge-container">
              <ModuloChallenge 
                modulus={modulus} 
                difficulty={difficulty}
                onSolve={handleChallengeComplete}
                onSkip={() => {
                  // Skip penalty - make another challenge but don't count it
                  setDifficulty(Math.max(1, difficulty - 1));
                }}
              />
              
              <div className="modulo-help">
                <ModuloClock 
                  modulus={modulus} 
                  value={0}
                  size={200}
                />
                <div className="modulo-help-text">
                  <h4>Reminder:</h4>
                  <p>
                    <strong>a + b (mod m)</strong>: Add, then wrap around if necessary<br />
                    <strong>a - b (mod m)</strong>: Subtract, then add m until result is positive<br />
                    <strong>a × b (mod m)</strong>: Multiply, then find the remainder when divided by m
                  </p>
                </div>
              </div>
            </div>
            
            <button className="module-secondary-button" onClick={() => setStage('playground')}>
              ← Back to playground
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
              You've completed the Modulo Quest module and mastered the basics of modular arithmetic!
            </p>
            <p>
              This mathematical concept is crucial for understanding how zero-knowledge proofs work,
              particularly for operations in finite fields and elliptic curves.
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
    <div className="modulo-quest">
      {renderStage()}
    </div>
  );
};

export default ModuloQuest;