import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MathComponents.css';

/**
 * PolynomialCommitment component - Interactive tool for learning about polynomial commitments
 * 
 * @param {Object} props
 * @param {Function} props.onSolve - Callback when exercise is solved
 * @returns {React.Element} The rendered PolynomialCommitment component
 */
function PolynomialCommitment({ onSolve }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const canvasRef = useRef(null);
  
  // Polynomial coefficients
  const [polynomial, setPolynomial] = useState([2, -3, 1]); // represents x^2 - 3x + 2
  const [evaluationPoint, setEvaluationPoint] = useState(2);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const stages = [
    {
      title: "Introduction to Polynomials",
      content: "Polynomials are mathematical expressions consisting of variables and coefficients. In zero-knowledge proofs, polynomials are fundamental building blocks. They can represent computation steps, encode data, and enable efficient verification of complex statements."
    },
    {
      title: "Polynomial Evaluation",
      content: "One key property of polynomials is that they can be evaluated at specific points. For a polynomial p(x), we can compute p(a) for any value a. Try evaluating the polynomial p(x) = x² - 3x + 2 at different points using the interactive tool below."
    },
    {
      title: "Polynomial Commitments",
      content: "A polynomial commitment scheme allows a prover to commit to a polynomial p(x) and later prove that p(a) = v for specific points. This is powerful because the commitment reveals nothing about the polynomial itself, yet the prover can selectively reveal evaluations with proofs that they're correct."
    },
    {
      title: "The Schwartz-Zippel Lemma",
      content: "This important lemma states that two different polynomials of degree d can agree on at most d points. This means that if two polynomials of degree d match on d+1 points, they must be the same polynomial. This property is crucial for the security of polynomial commitment schemes."
    },
    {
      title: "Applications in ZK Proofs",
      content: "Polynomial commitments are central to modern ZK proof systems like PLONK, Marlin, and Groth16. They allow cryptographic protocols to work with polynomials efficiently, enabling succinct proofs for complex computations while maintaining the zero-knowledge property."
    }
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: "What is a polynomial commitment scheme?",
      options: [
        "A way to promise to complete a mathematical homework assignment",
        "A method to encrypt polynomial equations",
        "A cryptographic primitive that allows committing to a polynomial and later proving evaluations at specific points",
        "A technique for factoring large polynomials quickly"
      ],
      correctAnswer: 2
    },
    {
      id: 'q2',
      question: "According to the Schwartz-Zippel Lemma, if two polynomials of degree 3 match on how many distinct points must they be identical?",
      options: [
        "2 points",
        "3 points",
        "4 points",
        "5 points"
      ],
      correctAnswer: 2
    },
    {
      id: 'q3',
      question: "Which ZK proof system uses polynomial commitments extensively?",
      options: [
        "RSA encryption",
        "SHA-256 hashing",
        "PLONK",
        "Diffie-Hellman key exchange"
      ],
      correctAnswer: 2
    },
    {
      id: 'q4',
      question: "What makes polynomial commitments useful in zero-knowledge proofs?",
      options: [
        "They allow verifying claims about a polynomial without revealing the entire polynomial",
        "They make mathematical calculations impossible to trace",
        "They encrypt the underlying data permanently",
        "They eliminate the need for cryptographic keys"
      ],
      correctAnswer: 0
    },
    {
      id: 'q5',
      question: "If a prover commits to a polynomial p(x) and later reveals p(7) = 42, what property does this demonstrate?",
      options: [
        "That the polynomial's degree is 7",
        "That the polynomial evaluates to 42 at x = 7, without revealing the full polynomial",
        "That 42 is a root of the polynomial",
        "That the polynomial must be quadratic"
      ],
      correctAnswer: 1
    }
  ];

  // Draw polynomial visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up coordinate system
    const scale = 30;
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
    
    // Draw grid lines
    ctx.strokeStyle = '#f0f0f0';
    
    // Vertical grid lines
    for (let x = originX % scale; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = originY % scale; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw polynomial
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let screenX = 0; screenX < width; screenX += 2) {
      const x = (screenX - originX) / scale;
      
      // Evaluate polynomial at x
      let y = 0;
      for (let i = 0; i < polynomial.length; i++) {
        y += polynomial[i] * Math.pow(x, polynomial.length - 1 - i);
      }
      
      // Convert y to screen coordinates (flip y-axis)
      const screenY = originY - y * scale;
      
      if (screenX === 0) {
        ctx.moveTo(screenX, screenY);
      } else {
        ctx.lineTo(screenX, screenY);
      }
    }
    
    ctx.stroke();
    
    // Draw evaluation point if set
    if (evaluationPoint !== null && evaluationResult !== null) {
      const screenX = originX + evaluationPoint * scale;
      const screenY = originY - evaluationResult * scale;
      
      // Draw point
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(screenX, screenY, 5, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw label
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.fillText(`(${evaluationPoint}, ${evaluationResult})`, screenX + 10, screenY - 10);
    }
    
    // Draw polynomial equation
    ctx.font = '16px Arial';
    ctx.fillStyle = '#6366f1';
    
    let equation = 'p(x) = ';
    for (let i = 0; i < polynomial.length; i++) {
      const power = polynomial.length - 1 - i;
      const coeff = polynomial[i];
      
      if (coeff === 0) continue;
      
      if (i > 0 && coeff > 0) equation += '+ ';
      if (coeff < 0) equation += '- ';
      
      const absCoeff = Math.abs(coeff);
      if (absCoeff !== 1 || power === 0) equation += absCoeff;
      
      if (power > 0) equation += 'x';
      if (power > 1) equation += `^${power}`;
      
      equation += ' ';
    }
    
    ctx.fillText(equation, 20, 30);
    
  }, [polynomial, evaluationPoint, evaluationResult]);

  // Evaluate polynomial at a point
  const evaluatePolynomial = (x) => {
    let result = 0;
    for (let i = 0; i < polynomial.length; i++) {
      result += polynomial[i] * Math.pow(x, polynomial.length - 1 - i);
    }
    return result;
  };

  // Handle polynomial coefficient change
  const handleCoefficientChange = (index, value) => {
    const newPolynomial = [...polynomial];
    newPolynomial[index] = Number(value);
    setPolynomial(newPolynomial);
    
    // Update evaluation result if point is set
    if (evaluationPoint !== null) {
      setEvaluationResult(evaluatePolynomial(evaluationPoint));
    }
  };

  // Handle evaluation point change
  const handleEvaluationPointChange = (value) => {
    const point = Number(value);
    setEvaluationPoint(point);
    setEvaluationResult(evaluatePolynomial(point));
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
      <div className="math-interactive polynomial-commitment">
        <h3 className="math-interactive__title">Polynomial Commitments - Quiz</h3>
        
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
    <div className="math-interactive polynomial-commitment">
      <h3 className="math-interactive__title">Polynomial Commitments</h3>
      
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
              <h4>Interactive Polynomial Evaluator</h4>
              
              <div className="math-interactive__polynomial-controls">
                <div className="math-interactive__polynomial-equation">
                  p(x) =
                  {polynomial.map((coeff, index) => (
                    <div key={index} className="math-interactive__polynomial-term">
                      <input
                        type="number"
                        value={coeff}
                        onChange={(e) => handleCoefficientChange(index, e.target.value)}
                        className="math-interactive__input math-interactive__input--small"
                      />
                      {index < polynomial.length - 1 && (
                        <span>x{polynomial.length - 1 - index > 1 ? <sup>{polynomial.length - 1 - index}</sup> : ''} +</span>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="math-interactive__evaluation">
                  <label>
                    Evaluate at x =
                    <input
                      type="number"
                      value={evaluationPoint}
                      onChange={(e) => handleEvaluationPointChange(e.target.value)}
                      className="math-interactive__input math-interactive__input--small"
                    />
                  </label>
                  
                  {evaluationResult !== null && (
                    <div className="math-interactive__result">
                      p({evaluationPoint}) = {evaluationResult}
                    </div>
                  )}
                </div>
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
          Polynomial commitments are a cornerstone of modern ZK proof systems. They allow a prover to commit to a polynomial and later reveal evaluations at specific points without revealing the entire polynomial. This property enables succinct proofs in systems like PLONK, Marlin, and Bulletproofs, making zero-knowledge technology more efficient and practical for real-world applications.
        </p>
      </div>
    </div>
  );
}

PolynomialCommitment.propTypes = {
  onSolve: PropTypes.func
};

export default PolynomialCommitment;