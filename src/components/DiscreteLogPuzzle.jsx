import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './MathComponents.css';

/**
 * DiscreteLogPuzzle component - Interactive tool for learning about the discrete logarithm problem
 * 
 * @param {Object} props
 * @param {Function} props.onSolve - Callback when exercise is solved
 * @returns {React.Element} The rendered DiscreteLogPuzzle component
 */
function DiscreteLogPuzzle({ onSolve }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const canvasRef = useRef(null);
  
  // Parameters for discrete log calculation
  const [params, setParams] = useState({
    base: 3,
    modulus: 17,
    exponent: 4
  });
  
  const [result, setResult] = useState(null);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [bruteForceResults, setBruteForceResults] = useState([]);
  const [isBruteForcing, setIsBruteForcing] = useState(false);
  const [currentBruteForceStep, setCurrentBruteForceStep] = useState(0);
  
  const stages = [
    {
      title: "What is the Discrete Logarithm Problem?",
      content: "The discrete logarithm problem asks: given values g, h, and p, find x such that g^x ≡ h (mod p). In other words, if you know g, h, and p, how difficult is it to find the exponent x? This mathematical challenge forms the basis for many cryptographic systems."
    },
    {
      title: "Modular Exponentiation",
      content: "Before we tackle the discrete logarithm problem, let's understand modular exponentiation. For g^x mod p, we compute g raised to the power x and then find the remainder when divided by p. Try different values in the interactive calculator below."
    },
    {
      title: "The Hard Part: Finding the Exponent",
      content: "While calculating g^x mod p is straightforward, finding x when given g, h, and p (where h = g^x mod p) becomes extremely difficult as the numbers get larger. This asymmetry—easy in one direction but hard in reverse—is what makes it useful for cryptography."
    },
    {
      title: "Brute Force Approach",
      content: "For small numbers, we can solve the discrete logarithm problem by trying every possible value of x. This is called a brute force approach. See how this works in the interactive demo, but remember: this becomes infeasible for large numbers used in actual cryptography."
    },
    {
      title: "Applications in Cryptography and ZK Proofs",
      content: "The difficulty of the discrete logarithm problem enables secure key exchange protocols like Diffie-Hellman, digital signature schemes like DSA, and is fundamental to many zero-knowledge proof systems. It allows parties to share public values while keeping certain information (the exponent) private."
    }
  ];
  
  const quizQuestions = [
    {
      id: 'q1',
      question: "What is the discrete logarithm problem?",
      options: [
        "Finding the logarithm of a discrete number",
        "Given g, h, and p, find x where g^x ≡ h (mod p)",
        "Finding the discrete derivative of a function",
        "Calculating the modular inverse of a number"
      ],
      correctAnswer: 1
    },
    {
      id: 'q2',
      question: "Why is the discrete logarithm problem important in cryptography?",
      options: [
        "It's easy to calculate in both directions",
        "It creates perfectly random numbers",
        "It's easy to compute in one direction but hard to reverse",
        "It has no known mathematical solution"
      ],
      correctAnswer: 2
    },
    {
      id: 'q3',
      question: "For cryptographic applications using the discrete logarithm problem, which parameters need to be large?",
      options: [
        "Only the base (g) needs to be large",
        "Only the modulus (p) needs to be large",
        "Both the modulus (p) and the exponent (x) should be large",
        "The result (h) needs to be large, but other parameters can be small"
      ],
      correctAnswer: 2
    },
    {
      id: 'q4',
      question: "Which cryptographic protocol relies on the discrete logarithm problem?",
      options: [
        "AES encryption",
        "SHA-256 hashing",
        "Diffie-Hellman key exchange",
        "Block cipher mode of operation"
      ],
      correctAnswer: 2
    },
    {
      id: 'q5',
      question: "How does the discrete logarithm problem relate to zero-knowledge proofs?",
      options: [
        "It has no relationship to zero-knowledge proofs",
        "It allows a prover to demonstrate knowledge of a secret value without revealing it",
        "It makes zero-knowledge proofs impossible to implement",
        "It forces all zero-knowledge proofs to be interactive"
      ],
      correctAnswer: 1
    }
  ];
  
  // Calculate modular exponentiation: (base^exponent) % modulus
  const modPow = (base, exponent, modulus) => {
    if (modulus === 1) return 0;
    
    let result = 1;
    base = base % modulus;
    
    while (exponent > 0) {
      // If exponent is odd, multiply result with base
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      
      // Square the base
      base = (base * base) % modulus;
      
      // Divide exponent by 2
      exponent = Math.floor(exponent / 2);
    }
    
    return result;
  };
  
  // Calculate result when parameters change
  useEffect(() => {
    const { base, exponent, modulus } = params;
    const calculatedResult = modPow(base, exponent, modulus);
    setResult(calculatedResult);
  }, [params]);
  
  // Draw visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const { base, modulus } = params;
    
    // Calculate all possible values: base^x mod modulus for x = 0, 1, 2...
    const values = [];
    const seenValues = new Set();
    const cycle = [];
    
    // Find cycle length (when values start repeating)
    for (let x = 0; x <= modulus; x++) {
      const value = modPow(base, x, modulus);
      values.push(value);
      
      if (seenValues.has(value)) {
        const firstIndex = values.indexOf(value);
        cycle.push({ start: firstIndex, end: x - 1, length: x - firstIndex });
        break;
      }
      
      seenValues.add(value);
    }
    
    // Draw coordinate system
    const margin = 30;
    const graphWidth = width - 2 * margin;
    const graphHeight = height - 2 * margin;
    
    // Calculate scale based on modulus
    const xScale = graphWidth / Math.min(values.length, 50);
    const yScale = graphHeight / modulus;
    
    // Draw axes
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height - margin);
    ctx.stroke();
    
    // X-axis labels
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    for (let x = 0; x <= Math.min(values.length - 1, 20); x += 5) {
      const xPos = margin + x * xScale;
      ctx.fillText(x.toString(), xPos, height - margin + 15);
      
      // Tick marks
      ctx.beginPath();
      ctx.moveTo(xPos, height - margin - 3);
      ctx.lineTo(xPos, height - margin + 3);
      ctx.stroke();
    }
    
    // Y-axis labels
    ctx.textAlign = 'right';
    
    for (let y = 0; y < modulus; y += Math.max(1, Math.floor(modulus / 10))) {
      const yPos = height - margin - y * yScale;
      ctx.fillText(y.toString(), margin - 5, yPos + 4);
      
      // Tick marks
      ctx.beginPath();
      ctx.moveTo(margin - 3, yPos);
      ctx.lineTo(margin + 3, yPos);
      ctx.stroke();
    }
    
    // Axis labels
    ctx.fillText('x (exponent)', width / 2, height - 5);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('value (mod ' + modulus + ')', 0, 0);
    ctx.restore();
    
    // Plot points
    ctx.fillStyle = '#6366f1';
    
    for (let x = 0; x < Math.min(values.length, 50); x++) {
      const value = values[x];
      const xPos = margin + x * xScale;
      const yPos = height - margin - value * yScale;
      
      ctx.beginPath();
      ctx.arc(xPos, yPos, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Connect points with line
      if (x > 0) {
        ctx.strokeStyle = '#a5b4fc';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(margin + (x - 1) * xScale, height - margin - values[x - 1] * yScale);
        ctx.lineTo(xPos, yPos);
        ctx.stroke();
      }
    }
    
    // Highlight cycle if found
    if (cycle.length > 0) {
      const { start, end } = cycle[0];
      const startX = margin + start * xScale;
      const endX = margin + end * xScale;
      
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.lineWidth = graphHeight;
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.moveTo(startX, height - margin - graphHeight / 2);
      ctx.lineTo(endX, height - margin - graphHeight / 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      
      // Add cycle annotation
      ctx.fillStyle = '#ef4444';
      ctx.textAlign = 'center';
      ctx.fillText(`Cycle length: ${end - start + 1}`, (startX + endX) / 2, margin / 2);
    }
    
    // Highlight the result point for the current exponent
    if (result !== null) {
      const xPos = margin + params.exponent * xScale;
      const yPos = height - margin - result * yScale;
      
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(xPos, yPos, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Add label
      ctx.fillStyle = '#000';
      ctx.textAlign = 'left';
      ctx.fillText(`(${params.exponent}, ${result})`, xPos + 10, yPos - 10);
    }
    
  }, [params, result]);
  
  // Handle parameter change
  const handleParamChange = (param, value) => {
    // Ensure values are within reasonable ranges
    let newValue = parseInt(value, 10);
    
    if (param === 'base') {
      newValue = Math.max(2, Math.min(newValue, 100));
    } else if (param === 'modulus') {
      newValue = Math.max(3, Math.min(newValue, 100));
    } else if (param === 'exponent') {
      newValue = Math.max(0, Math.min(newValue, 100));
    }
    
    setParams(prev => ({
      ...prev,
      [param]: newValue
    }));
    
    setCalculationHistory([]);
    setBruteForceResults([]);
    setIsBruteForcing(false);
    setCurrentBruteForceStep(0);
  };
  
  // Add current calculation to history
  const handleAddToHistory = () => {
    const { base, exponent, modulus } = params;
    const newEntry = {
      base,
      exponent,
      modulus,
      result
    };
    
    setCalculationHistory(prev => [newEntry, ...prev.slice(0, 4)]);
  };
  
  // Start brute force search
  const handleStartBruteForce = () => {
    const { base, modulus } = params;
    const target = result;
    
    // Reset brute force state
    setBruteForceResults([]);
    setIsBruteForcing(true);
    setCurrentBruteForceStep(0);
    
    // Start with an empty array, we'll populate it step by step
    const results = [];
    
    // Set up a timer to simulate step-by-step calculation
    const bruteForceTimer = setInterval(() => {
      setCurrentBruteForceStep(step => {
        const newStep = step + 1;
        
        // Calculate current step
        const currentResult = modPow(base, newStep, modulus);
        results.push({
          exponent: newStep,
          value: currentResult,
          isMatch: currentResult === target
        });
        
        setBruteForceResults([...results]);
        
        // Stop if we found the result or reached the modulus
        if (currentResult === target || newStep >= modulus) {
          clearInterval(bruteForceTimer);
          setIsBruteForcing(false);
        }
        
        return newStep;
      });
    }, 200); // Adjust speed as needed
  };
  
  const handleNextStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    } else {
      // Start the quiz when we've gone through all stages
      setIsQuizActive(true);
    }
  };
  
  const handlePrevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };
  
  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  const handleQuizSubmit = () => {
    // Calculate score
    let correctCount = 0;
    quizQuestions.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const finalScore = Math.round((correctCount / quizQuestions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    // Complete the challenge if score is 80% or higher
    if (finalScore >= 80 && onSolve) {
      setTimeout(() => {
        onSolve();
      }, 2000);
    }
  };
  
  if (isQuizActive) {
    return (
      <div className="math-interactive discrete-log-puzzle">
        <h3 className="math-interactive__title">The Discrete Logarithm Problem - Quiz</h3>
        
        <div className="math-interactive__quiz">
          {showResults ? (
            <div className="math-interactive__quiz-results">
              <h4>Quiz Results</h4>
              <p>Your score: {score}%</p>
              
              {score >= 80 ? (
                <div className="math-interactive__success-message">
                  <p>Congratulations! You have successfully completed this challenge.</p>
                  <p>Redirecting to the next challenge...</p>
                </div>
              ) : (
                <div className="math-interactive__retry-message">
                  <p>You need a score of at least 80% to complete this challenge.</p>
                  <button 
                    onClick={() => {
                      setQuizAnswers({});
                      setShowResults(false);
                    }}
                    className="math-interactive__submit"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {quizQuestions.map((question, index) => (
                <div key={question.id} className="math-interactive__quiz-question">
                  <h4>Question {index + 1}</h4>
                  <p>{question.question}</p>
                  
                  <div className="math-interactive__quiz-options">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="math-interactive__quiz-option">
                        <input
                          type="radio"
                          id={`${question.id}-${optIndex}`}
                          name={question.id}
                          checked={quizAnswers[question.id] === optIndex}
                          onChange={() => handleQuizAnswer(question.id, optIndex)}
                        />
                        <label htmlFor={`${question.id}-${optIndex}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <button 
                onClick={handleQuizSubmit}
                className="math-interactive__submit"
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
              >
                Submit Answers
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="math-interactive discrete-log-puzzle">
      <h3 className="math-interactive__title">The Discrete Logarithm Problem</h3>
      
      <div className="math-interactive__content">
        <div className="math-interactive__stage">
          <h4>{stages[currentStage].title}</h4>
          <p>{stages[currentStage].content}</p>
        </div>
        
        <div className="math-interactive__visualization">
          <canvas 
            ref={canvasRef} 
            width={500} 
            height={300}
            className="math-interactive__canvas"
          />
          
          <div className="math-interactive__controls">
            <div className="math-interactive__control-group">
              <label htmlFor="base">Base (g):</label>
              <input
                id="base"
                type="number"
                min="2"
                max="100"
                value={params.base}
                onChange={(e) => handleParamChange('base', e.target.value)}
                className="math-interactive__input math-interactive__input--small"
              />
            </div>
            
            <div className="math-interactive__control-group">
              <label htmlFor="exponent">Exponent (x):</label>
              <input
                id="exponent"
                type="number"
                min="0"
                max="100"
                value={params.exponent}
                onChange={(e) => handleParamChange('exponent', e.target.value)}
                className="math-interactive__input math-interactive__input--small"
              />
            </div>
            
            <div className="math-interactive__control-group">
              <label htmlFor="modulus">Modulus (p):</label>
              <input
                id="modulus"
                type="number"
                min="3"
                max="100"
                value={params.modulus}
                onChange={(e) => handleParamChange('modulus', e.target.value)}
                className="math-interactive__input math-interactive__input--small"
              />
            </div>
          </div>
          
          <div className="math-interactive__result-display">
            <div className="math-interactive__formula">
              {params.base}<sup>{params.exponent}</sup> mod {params.modulus} = {result}
            </div>
            
            <div className="math-interactive__dl-buttons">
              <button 
                onClick={handleAddToHistory}
                className="math-interactive__dl-button"
              >
                Add to History
              </button>
              
              {currentStage >= 3 && (
                <button 
                  onClick={handleStartBruteForce}
                  className="math-interactive__dl-button"
                  disabled={isBruteForcing}
                >
                  {isBruteForcing ? 'Searching...' : 'Brute Force Search'}
                </button>
              )}
            </div>
          </div>
          
          {calculationHistory.length > 0 && (
            <div className="math-interactive__history">
              <h4>Calculation History:</h4>
              <table className="math-interactive__history-table">
                <thead>
                  <tr>
                    <th>g (base)</th>
                    <th>x (exponent)</th>
                    <th>p (modulus)</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {calculationHistory.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.base}</td>
                      <td>{entry.exponent}</td>
                      <td>{entry.modulus}</td>
                      <td>{entry.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {bruteForceResults.length > 0 && (
            <div className="math-interactive__brute-force">
              <h4>Brute Force Results:</h4>
              <p className="math-interactive__brute-force-target">
                Target value: {result} (for the equation g<sup>x</sup> mod p)
              </p>
              
              <div className="math-interactive__brute-force-table-container">
                <table className="math-interactive__brute-force-table">
                  <thead>
                    <tr>
                      <th>x (trying)</th>
                      <th>g<sup>x</sup> mod p</th>
                      <th>Match?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bruteForceResults.map((entry, index) => (
                      <tr key={index} className={entry.isMatch ? 'math-interactive__match-row' : ''}>
                        <td>{entry.exponent}</td>
                        <td>{entry.value}</td>
                        <td>{entry.isMatch ? '✓' : '✗'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {bruteForceResults.some(r => r.isMatch) && (
                <div className="math-interactive__brute-force-success">
                  <p>Found the discrete logarithm!</p>
                  <p>For {params.base}<sup>x</sup> ≡ {result} (mod {params.modulus}),</p>
                  <p>x = {bruteForceResults.find(r => r.isMatch)?.exponent}</p>
                </div>
              )}
              
              {!isBruteForcing && !bruteForceResults.some(r => r.isMatch) && bruteForceResults.length >= params.modulus && (
                <div className="math-interactive__brute-force-failure">
                  <p>No solution found after checking all possible values.</p>
                  <p>This could happen if the base and modulus are not coprime.</p>
                </div>
              )}
              
              <div className="math-interactive__brute-force-note">
                <p>Note: In real cryptographic applications, modulus and exponent values would be much larger (hundreds of digits), making brute force attacks computationally infeasible.</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="math-interactive__navigation">
          <button 
            onClick={handlePrevStage}
            disabled={currentStage === 0}
            className="math-interactive__nav-button"
          >
            Previous
          </button>
          
          <div className="math-interactive__progress">
            <span>Stage {currentStage + 1} of {stages.length}</span>
            <div className="math-interactive__progress-bar">
              <div 
                className="math-interactive__progress-fill" 
                style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <button 
            onClick={handleNextStage}
            className="math-interactive__nav-button"
          >
            {currentStage < stages.length - 1 ? "Next" : "Take Quiz"}
          </button>
        </div>
      </div>
      
      <div className="math-interactive__zk-connection">
        <h4>Connection to Zero-Knowledge Proofs:</h4>
        <p>
          The discrete logarithm problem enables many zero-knowledge proof systems. It allows a prover to demonstrate knowledge of a secret value (the exponent) without revealing it, by only sharing the result of modular exponentiation. This property is crucial for protocols like Schnorr identification, which forms the basis for many modern ZK systems.
        </p>
      </div>
    </div>
  );
}

DiscreteLogPuzzle.propTypes = {
  onSolve: PropTypes.func
};

export default DiscreteLogPuzzle;