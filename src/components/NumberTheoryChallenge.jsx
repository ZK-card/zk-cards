import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MathComponents.css';

/**
 * NumberTheoryChallenge component - Interactive tool for learning number theory concepts
 * relevant to Zero-Knowledge proofs
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSolve - Callback when exercise is solved
 * @returns {React.Element} The rendered NumberTheoryChallenge component
 */
function NumberTheoryChallenge({ onSolve }) {
    // Current challenge type
    const [challengeType, setChallengeType] = useState('gcd');
    
    // Challenge parameters
    const [number1, setNumber1] = useState(12);
    const [number2, setNumber2] = useState(18);
    
    // User answer
    const [userAnswer, setUserAnswer] = useState('');
    
    // Feedback states
    const [isCorrect, setIsCorrect] = useState(null);
    const [expectedAnswer, setExpectedAnswer] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [successCount, setSuccessCount] = useState(0);
    
    // Calculate expected answer when parameters change
    useEffect(() => {
        calculateExpectedAnswer(number1, number2, challengeType);
    }, [number1, number2, challengeType]);
    
    // Calculate the expected answer based on challenge type
    const calculateExpectedAnswer = (a, b, type) => {
        let result;
        
        switch (type) {
            case 'gcd':
                result = gcd(a, b);
                break;
            case 'lcm':
                result = lcm(a, b);
                break;
            case 'coprime':
                result = gcd(a, b) === 1 ? 1 : 0; // 1 for true, 0 for false
                break;
            case 'modular-inverse':
                result = modInverse(a, b);
                break;
            default:
                result = null;
        }
        
        setExpectedAnswer(result);
        return result;
    };
    
    // Calculate greatest common divisor using Euclidean algorithm
    const gcd = (a, b) => {
        a = Math.abs(a);
        b = Math.abs(b);
        
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        
        return a;
    };
    
    // Calculate least common multiple
    const lcm = (a, b) => {
        return (Math.abs(a) * Math.abs(b)) / gcd(a, b);
    };
    
    // Calculate modular multiplicative inverse
    const modInverse = (a, m) => {
        a = ((a % m) + m) % m; // Ensure positive
        
        // Check if inverse exists
        if (gcd(a, m) !== 1) {
            return null; // No modular inverse exists
        }
        
        // Extended Euclidean Algorithm
        const extendedGCD = (a, b) => {
            if (a === 0) {
                return [b, 0, 1];
            }
            
            const [gcd, x1, y1] = extendedGCD(b % a, a);
            const x = y1 - Math.floor(b / a) * x1;
            const y = x1;
            
            return [gcd, x, y];
        };
        
        const [, x] = extendedGCD(a, m);
        return ((x % m) + m) % m; // Ensure positive result
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convert user answer to number
        const userNum = parseInt(userAnswer, 10);
        
        // Check if the answer is correct
        let correct = false;
        
        if (challengeType === 'modular-inverse' && expectedAnswer === null) {
            // Special case: No modular inverse exists
            correct = userAnswer.toLowerCase() === 'none' || userAnswer.toLowerCase() === 'no inverse';
        } else {
            correct = userNum === expectedAnswer;
        }
        
        setIsCorrect(correct);
        
        // If correct, increment success count
        if (correct) {
            setSuccessCount(prev => prev + 1);
            
            // Generate new problem after a delay
            setTimeout(() => {
                // Generate new random values
                const maxVal = challengeType === 'modular-inverse' ? 20 : 50; // Smaller values for modular inverse
                const newVal1 = Math.floor(Math.random() * maxVal) + 2; // Avoid 0 and 1
                let newVal2 = Math.floor(Math.random() * maxVal) + 2;
                
                // For modular inverse, ensure the modulus is at least 3
                if (challengeType === 'modular-inverse') {
                    newVal2 = Math.max(3, newVal2);
                }
                
                // For co-prime challenges, make it somewhat balanced between yes/no answers
                if (challengeType === 'coprime' && Math.random() < 0.5) {
                    // Increase chance of co-prime values
                    newVal2 = newVal1 + 1 + Math.floor(Math.random() * 3);
                }
                
                setNumber1(newVal1);
                setNumber2(newVal2);
                setUserAnswer('');
                setIsCorrect(null);
                
                // Occasionally change challenge type (20% chance)
                if (Math.random() < 0.2) {
                    const types = ['gcd', 'lcm', 'coprime', 'modular-inverse'];
                    const currentIndex = types.indexOf(challengeType);
                    const newIndex = (currentIndex + 1) % types.length;
                    setChallengeType(types[newIndex]);
                }
                
                // If user has solved 5 problems correctly, call onSolve
                if (successCount + 1 >= 5 && onSolve) {
                    onSolve();
                }
            }, 1500);
        }
    };
    
    // Get challenge instructions based on type
    const getChallengeInstructions = () => {
        switch (challengeType) {
            case 'gcd':
                return `Calculate the greatest common divisor (GCD) of ${number1} and ${number2}.`;
            case 'lcm':
                return `Calculate the least common multiple (LCM) of ${number1} and ${number2}.`;
            case 'coprime':
                return `Are ${number1} and ${number2} coprime? Enter 1 for Yes, 0 for No.`;
            case 'modular-inverse':
                return `Calculate the modular multiplicative inverse of ${number1} modulo ${number2}. If none exists, enter "none".`;
            default:
                return 'Solve the number theory challenge.';
        }
    };
    
    // Get hint based on challenge type
    const getHint = () => {
        switch (challengeType) {
            case 'gcd':
                return `To find the GCD of ${number1} and ${number2}, you can use the Euclidean algorithm. Divide ${Math.max(number1, number2)} by ${Math.min(number1, number2)}, then take the remainder and divide ${Math.min(number1, number2)} by it. Continue until the remainder is 0.`;
            case 'lcm':
                return `The LCM of ${number1} and ${number2} can be calculated as (${number1} × ${number2}) ÷ GCD(${number1}, ${number2}). First find the GCD using the Euclidean algorithm.`;
            case 'coprime':
                return `Two numbers are coprime if their GCD is 1. Calculate the GCD of ${number1} and ${number2} to determine if they're coprime.`;
            case 'modular-inverse':
                return `The modular inverse of ${number1} modulo ${number2} is a number x such that (${number1} × x) ≡ 1 (mod ${number2}). It exists only if gcd(${number1}, ${number2}) = 1.`;
            default:
                return 'Think about the relationship between the numbers.';
        }
    };
    
    // Get the label for the answer input based on challenge type
    const getAnswerLabel = () => {
        switch (challengeType) {
            case 'gcd':
                return 'Enter GCD:';
            case 'lcm':
                return 'Enter LCM:';
            case 'coprime':
                return 'Enter 1 for Yes, 0 for No:';
            case 'modular-inverse':
                return 'Enter modular inverse or "none":';
            default:
                return 'Your answer:';
        }
    };
    
    // Get the challenge title
    const getChallengeTitle = () => {
        switch (challengeType) {
            case 'gcd':
                return 'Greatest Common Divisor (GCD)';
            case 'lcm':
                return 'Least Common Multiple (LCM)';
            case 'coprime':
                return 'Coprime Numbers Detection';
            case 'modular-inverse':
                return 'Modular Multiplicative Inverse';
            default:
                return 'Number Theory Challenge';
        }
    };
    
    return (
        <div className="math-interactive number-theory-challenge">
            <h3 className="math-interactive__title">{getChallengeTitle()}</h3>
            
            <div className="math-interactive__problem">
                <p className="math-interactive__instruction">
                    {getChallengeInstructions()}
                </p>
                
                <form onSubmit={handleSubmit} className="math-interactive__form">
                    <div className="math-interactive__input-group">
                        <label htmlFor="answer">{getAnswerLabel()}</label>
                        <input
                            id="answer"
                            type={challengeType === 'modular-inverse' ? 'text' : 'number'}
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Your answer"
                            min="0"
                            className="math-interactive__input"
                            required
                        />
                        <button type="submit" className="math-interactive__submit">Check</button>
                    </div>
                </form>
                
                {isCorrect !== null && (
                    <div className={`math-interactive__feedback ${isCorrect ? 'math-interactive__feedback--correct' : 'math-interactive__feedback--incorrect'}`}>
                        {isCorrect ? (
                            <span>Correct!</span>
                        ) : (
                            <span>
                                {challengeType === 'modular-inverse' && expectedAnswer === null
                                    ? 'Incorrect. No modular inverse exists because the numbers are not coprime.'
                                    : `Incorrect. The correct answer is ${expectedAnswer}.`}
                            </span>
                        )}
                    </div>
                )}
                
                <div className="math-interactive__challenge-type">
                    <label htmlFor="challenge-type">Challenge Type:</label>
                    <select
                        id="challenge-type"
                        value={challengeType}
                        onChange={(e) => setChallengeType(e.target.value)}
                        className="math-interactive__select"
                    >
                        <option value="gcd">Greatest Common Divisor (GCD)</option>
                        <option value="lcm">Least Common Multiple (LCM)</option>
                        <option value="coprime">Coprime Detection</option>
                        <option value="modular-inverse">Modular Inverse</option>
                    </select>
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
                            <p>{getHint()}</p>
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
            
            <div className="math-interactive__zk-connection">
                <h4>Connection to Zero-Knowledge Proofs:</h4>
                <p>
                    {challengeType === 'gcd' && 
                        "The GCD is fundamental in ZK proofs, especially for operations in finite fields and determining when modular inverses exist."}
                    {challengeType === 'lcm' && 
                        "LCM is used in cryptographic protocols to determine cycle lengths in modular operations, essential for many ZK proof systems."}
                    {challengeType === 'coprime' && 
                        "Coprime numbers are essential in ZK cryptography - they determine when modular inverses exist and are crucial for operations in RSA and other cryptosystems."}
                    {challengeType === 'modular-inverse' && 
                        "Modular inverses are used extensively in ZK proofs for division operations in finite fields and are key to many cryptographic operations."}
                </p>
            </div>
        </div>
    );
}

NumberTheoryChallenge.propTypes = {
    onSolve: PropTypes.func
};

export default NumberTheoryChallenge;