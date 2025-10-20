import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './MathComponents.css';

/**
 * EllipticCurveVisualizer component - Interactive tool for learning about elliptic curves
 * 
 * @param {Object} props
 * @param {Function} props.onSolve - Callback when exercise is solved
 * @returns {React.Element} The rendered EllipticCurveVisualizer component
 */
function EllipticCurveVisualizer({ onSolve }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const canvasRef = useRef(null);

  // Parameters for the elliptic curve y^2 = x^3 + ax + b
  const [params, setParams] = useState({
    a: -3,
    b: 5
  });

  const stages = [
    {
      title: "Introduction to Elliptic Curves",
      content: "Elliptic curves are mathematical objects that have fascinating properties and are fundamental to modern cryptography, especially in zero-knowledge proofs. An elliptic curve over real numbers can be defined by the equation y² = x³ + ax + b, where 4a³ + 27b² ≠ 0."
    },
    {
      title: "Exploring the Curve",
      content: "Use the sliders to modify parameters a and b to see how they affect the curve shape. Elliptic curves used in cryptography are usually defined over finite fields rather than real numbers, but the intuition is similar."
    },
    {
      title: "Point Addition",
      content: "A key property of elliptic curves is that points on the curve form a group. We can define an operation called 'addition' between points. If you draw a line through two points P and Q on the curve, it will intersect the curve at a third point. Reflect this point across the x-axis to get P + Q."
    },
    {
      title: "The Discrete Logarithm Problem",
      content: "Elliptic curve cryptography relies on the difficulty of the discrete logarithm problem: Given points P and Q = nP on an elliptic curve, finding the scalar n is computationally difficult for large numbers. This property enables secure cryptographic operations."
    },
    {
      title: "Applications in ZK Proofs",
      content: "Elliptic curves are used extensively in zero-knowledge protocols like zk-SNARKs and zk-STARKs. They enable efficient pairing-based cryptography, which allows for succinct proofs and verification with minimal information disclosure."
    }
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: "Which equation defines an elliptic curve in the simplified Weierstrass form?",
      options: [
        "y² = x³ + ax + b",
        "y² = x² + ax + b",
        "y = x³ + ax² + b",
        "x² + y² = a² + b²"
      ],
      correctAnswer: 0
    },
    {
      id: 'q2',
      question: "What makes elliptic curve cryptography secure?",
      options: [
        "The ease of calculating point multiplication",
        "The difficulty of the discrete logarithm problem",
        "The simplicity of the curve equation",
        "The limited number of points on the curve"
      ],
      correctAnswer: 1
    },
    {
      id: 'q3',
      question: "In zero-knowledge proofs, elliptic curves are used for:",
      options: [
        "Storing large amounts of data",
        "Making calculations faster but less secure",
        "Enabling efficient pairing-based cryptography",
        "Simplifying mathematical notation"
      ],
      correctAnswer: 2
    },
    {
      id: 'q4',
      question: "What happens when you geometrically add two points on an elliptic curve?",
      options: [
        "You get a point that's the average of the two points",
        "You get a point that doesn't lie on the curve",
        "You get a third point on the curve based on a line intersection",
        "You get a point that forms an isosceles triangle with the original points"
      ],
      correctAnswer: 2
    },
    {
      id: 'q5',
      question: "Why are elliptic curves over finite fields preferred in cryptography over curves over real numbers?",
      options: [
        "They're easier to visualize",
        "They require less computational power",
        "They provide better security with smaller key sizes",
        "They're impossible to solve mathematically"
      ],
      correctAnswer: 2
    }
  ];

  // Draw the elliptic curve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up coordinate system
    const scale = 20;
    const originX = width / 2;
    const originY = height / 2;
    
    // Draw axes
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();
    
    // Draw elliptic curve y^2 = x^3 + ax + b
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    
    const { a, b } = params;
    
    // Plot top half of the curve (y > 0)
    ctx.beginPath();
    let started = false;
    
    for (let screenX = 0; screenX < width; screenX++) {
      const x = (screenX - originX) / scale;
      const rhs = x*x*x + a*x + b;
      
      if (rhs >= 0) {
        const y = Math.sqrt(rhs);
        const screenY = originY - y * scale;
        
        if (!started) {
          ctx.moveTo(screenX, screenY);
          started = true;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      } else {
        if (started) {
          ctx.stroke();
          started = false;
        }
      }
    }
    
    if (started) {
      ctx.stroke();
    }
    
    // Plot bottom half of the curve (y < 0)
    ctx.beginPath();
    started = false;
    
    for (let screenX = 0; screenX < width; screenX++) {
      const x = (screenX - originX) / scale;
      const rhs = x*x*x + a*x + b;
      
      if (rhs >= 0) {
        const y = -Math.sqrt(rhs);
        const screenY = originY - y * scale;
        
        if (!started) {
          ctx.moveTo(screenX, screenY);
          started = true;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      } else {
        if (started) {
          ctx.stroke();
          started = false;
        }
      }
    }
    
    if (started) {
      ctx.stroke();
    }
    
    // Add curve equation label
    ctx.font = '16px Arial';
    ctx.fillStyle = '#6366f1';
    ctx.fillText(`y² = x³ + ${a}x + ${b}`, 20, 30);
    
  }, [params]);

  const handleParamChange = (param, value) => {
    setParams(prev => ({
      ...prev,
      [param]: Number(value)
    }));
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
      <div className="math-interactive elliptic-curve-visualizer">
        <h3 className="math-interactive__title">Elliptic Curve Operations - Quiz</h3>
        
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
    <div className="math-interactive elliptic-curve-visualizer">
      <h3 className="math-interactive__title">Elliptic Curve Operations</h3>
      
      <div className="math-interactive__content">
        <div className="math-interactive__stage">
          <h4>{stages[currentStage].title}</h4>
          <p>{stages[currentStage].content}</p>
        </div>
        
        <div className="math-interactive__visualization">
          <canvas 
            ref={canvasRef} 
            width={400} 
            height={300}
            className="math-interactive__canvas"
          />
          
          {currentStage === 1 && (
            <div className="math-interactive__controls">
              <div className="math-interactive__control-group">
                <label htmlFor="param-a">Parameter a:</label>
                <input
                  id="param-a"
                  type="range"
                  min="-10"
                  max="10"
                  step="0.5"
                  value={params.a}
                  onChange={(e) => handleParamChange('a', e.target.value)}
                />
                <span>{params.a}</span>
              </div>
              
              <div className="math-interactive__control-group">
                <label htmlFor="param-b">Parameter b:</label>
                <input
                  id="param-b"
                  type="range"
                  min="-10"
                  max="10"
                  step="0.5"
                  value={params.b}
                  onChange={(e) => handleParamChange('b', e.target.value)}
                />
                <span>{params.b}</span>
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
          Elliptic curves are fundamental to modern cryptography and ZK proofs. They enable efficient 
          implementations of zk-SNARKs and zk-STARKs by providing structures where the discrete logarithm 
          problem is believed to be hard, allowing for secure commitments and verifiable computations 
          with smaller proof sizes than traditional approaches.
        </p>
      </div>
    </div>
  );
}

EllipticCurveVisualizer.propTypes = {
  onSolve: PropTypes.func
};

export default EllipticCurveVisualizer;