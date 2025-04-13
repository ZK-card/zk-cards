import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MathComponents.css';

/**
 * Simple hash function for educational purposes
 * @param {string} input - The input string to hash
 * @param {number} modulus - The modulus for the hash
 * @returns {number} - The hash value
 */
const simpleHash = (input, modulus) => {
  let hash = 0;
  
  for (let i = 0; i < input.length; i++) {
    // Simple hashing: multiply by 31 and add character code
    hash = ((hash * 31) + input.charCodeAt(i)) % modulus;
  }
  
  return hash;
};

/**
 * HashChallenge component - Interactive hash function demonstration
 * @param {Object} props - Component props
 * @param {Function} props.onSolve - Handler when the challenge is solved
 * @returns {React.Element} The rendered HashChallenge component
 */
function HashChallenge({ onSolve }) {
  const [hashModulus, setHashModulus] = useState(97); // Small prime for hash output
  const [challengeType, setChallengeType] = useState('forward');
  const [input, setInput] = useState('');
  const [targetHash, setTargetHash] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [preimagePool, setPreimagePool] = useState([]);
  const [hashTable, setHashTable] = useState({});
  const [collisionFound, setCollisionFound] = useState(null);

  // Generate pre-image pool on init
  useEffect(() => {
    generatePreimagePool();
  }, []);

  // Set up a new challenge when needed
  useEffect(() => {
    setupNewChallenge();
  }, [successCount, challengeType, preimagePool]);

  // Generate a pool of potential pre-images
  const generatePreimagePool = () => {
    // Generate pool of words to use as pre-images
    const wordPool = [
      'zero', 'knowledge', 'proof', 'math', 'commit', 
      'hash', 'crypto', 'secure', 'privacy', 'blockchain',
      'elliptic', 'curve', 'finite', 'field', 'modular',
      'polynomial', 'arithmetic', 'prime', 'verifier', 'prover',
      'snark', 'stark', 'bullet', 'signature', 'plonk'
    ];
    
    // Add numbers and combinations
    const numericPool = [];
    for (let i = 0; i < 15; i++) {
      numericPool.push(String(Math.floor(Math.random() * 1000)));
      
      // Add some combinations of words with numbers
      if (i < 10) {
        const word = wordPool[Math.floor(Math.random() * wordPool.length)];
        numericPool.push(`${word}${Math.floor(Math.random() * 100)}`);
      }
    }
    
    setPreimagePool([...wordPool, ...numericPool]);
  };

  // Set up a new challenge
  const setupNewChallenge = () => {
    if (!preimagePool.length) return;
    
    // Decide challenge type based on success count
    if (successCount >= 2 && successCount < 4) {
      setChallengeType('preimage');
    } else if (successCount >= 4) {
      setChallengeType('collision');
    } else {
      setChallengeType('forward');
    }
    
    // Reset state for the new challenge
    setIsCorrect(null);
    setUserAnswer('');
    setCollisionFound(null);
    
    if (challengeType === 'forward') {
      // Forward hashing: provide input, ask for hash
      const randomInput = preimagePool[Math.floor(Math.random() * preimagePool.length)];
      setInput(randomInput);
      setTargetHash(simpleHash(randomInput, hashModulus));
    } 
    else if (challengeType === 'preimage') {
      // Pre-image challenge: provide hash, ask for input
      const randomInput = preimagePool[Math.floor(Math.random() * preimagePool.length)];
      setInput('');
      setTargetHash(simpleHash(randomInput, hashModulus));
    }
    else if (challengeType === 'collision') {
      // Collision challenge: find two inputs with same hash
      // Build a hash table of some inputs
      const newHashTable = {};
      
      preimagePool.forEach(word => {
        const hash = simpleHash(word, hashModulus);
        if (!newHashTable[hash]) {
          newHashTable[hash] = [];
        }
        newHashTable[hash].push(word);
      });
      
      // Only include hashes that have collisions in our pool
      const hashesWithCollisions = Object.keys(newHashTable).filter(
        hash => newHashTable[hash].length > 1
      );
      
      // If we found collisions, pick one for the challenge
      if (hashesWithCollisions.length > 0) {
        const targetHashStr = hashesWithCollisions[Math.floor(Math.random() * hashesWithCollisions.length)];
        setTargetHash(parseInt(targetHashStr, 10));
        setHashTable(newHashTable);
      } else {
        // If no collisions in our pool, add some by hand
        const newPreimagePool = [...preimagePool];
        
        // Create some known collisions by manipulating characters
        for (let i = 0; i < 5; i++) {
          const baseWord = preimagePool[Math.floor(Math.random() * preimagePool.length)];
          let collision = '';
          
          // Find a collision by brute force
          for (let j = 0; j < 100; j++) {
            collision = baseWord + '_' + j;
            if (simpleHash(collision, hashModulus) === simpleHash(baseWord, hashModulus)) {
              break;
            }
          }
          
          // Add the collision to the pool
          if (collision) {
            newPreimagePool.push(collision);
          }
        }
        
        setPreimagePool(newPreimagePool);
        
        // Retry with the new pool
        setChallengeType('forward'); // Start easier
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (challengeType === 'forward') {
      // Forward hashing: check if the user's hash matches the correct hash
      const userHashNum = parseInt(userAnswer, 10);
      const correct = userHashNum === targetHash;
      setIsCorrect(correct);
      
      if (correct) {
        handleSuccess();
      }
    } 
    else if (challengeType === 'preimage') {
      // Pre-image challenge: check if the hash of the user's input matches the target
      const userHashValue = simpleHash(userAnswer, hashModulus);
      const correct = userHashValue === targetHash;
      setIsCorrect(correct);
      
      if (correct) {
        handleSuccess();
      }
    }
    else if (challengeType === 'collision') {
      // Collision challenge: check if the hash of the user's input matches the target
      // and is different from the first input
      if (input && userAnswer && input !== userAnswer) {
        const inputHash = simpleHash(input, hashModulus);
        const userAnswerHash = simpleHash(userAnswer, hashModulus);
        
        const correct = inputHash === userAnswerHash;
        setIsCorrect(correct);
        
        if (correct) {
          setCollisionFound({
            input1: input,
            input2: userAnswer,
            hash: inputHash
          });
          handleSuccess();
        }
      } else {
        // First collision input
        const userHashValue = simpleHash(userAnswer, hashModulus);
        
        // Find a collision in our hash table
        const collisions = hashTable[userHashValue] || [];
        
        if (collisions.length > 1) {
          // Find a collision different from the user input
          const otherCollision = collisions.find(c => c !== userAnswer);
          
          if (otherCollision) {
            setInput(userAnswer);
            setUserAnswer('');
            setIsCorrect(true);
            
            // Give user a hint about the collision
            alert(`Great! "${userAnswer}" hashes to ${userHashValue}.\nNow enter a different value that also hashes to ${userHashValue}.`);
            return;
          }
        }
        
        // No collision found in our table, let user try again
        setIsCorrect(false);
      }
    }
  };

  // Handle successful challenge completion
  const handleSuccess = () => {
    const newSuccessCount = successCount + 1;
    setSuccessCount(newSuccessCount);
    
    // If user has solved enough challenges, call onSolve
    if (newSuccessCount >= 5 && onSolve) {
      setTimeout(() => {
        onSolve();
      }, 1500);
    } else {
      // Set up a new challenge after a delay
      setTimeout(() => {
        setupNewChallenge();
      }, 1500);
    }
  };

  return (
    <div className="math-interactive hash-challenge">
      <h3 className="math-interactive__title">Hash Function Challenge</h3>
      
      <div className="math-interactive__description">
        <p>
          Hash functions are one-way functions that map input data of arbitrary size to a fixed-size output (hash).
          {challengeType === 'forward' && " Given an input, calculate the hash value."}
          {challengeType === 'preimage' && " Given a hash value, find an input that produces that hash."}
          {challengeType === 'collision' && " Find two different inputs that produce the same hash value."}
        </p>
        <p className="math-interactive__formula">
          Hash(input) mod {hashModulus}
        </p>
      </div>
      
      <div className="math-interactive__problem">
        <p className="math-interactive__instruction">
          {challengeType === 'forward' && `Calculate the hash value of "${input}" modulo ${hashModulus}.`}
          {challengeType === 'preimage' && `Find any input that hashes to ${targetHash} modulo ${hashModulus}.`}
          {challengeType === 'collision' && (
            input 
              ? `You entered "${input}" which hashes to ${simpleHash(input, hashModulus)}. Now enter a different input that also hashes to the same value.`
              : `Find any input and we'll help you find a collision.`
          )}
        </p>
        
        <form onSubmit={handleSubmit} className="math-interactive__form">
          <div className="math-interactive__input-group">
            <input
              type={challengeType === 'forward' ? 'number' : 'text'}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={
                challengeType === 'forward' 
                  ? "Hash value" 
                  : "Enter input"
              }
              min={challengeType === 'forward' ? 0 : undefined}
              max={challengeType === 'forward' ? hashModulus - 1 : undefined}
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
                {challengeType === 'forward' && `Correct! Hash("${input}") = ${targetHash} mod ${hashModulus}`}
                {challengeType === 'preimage' && `Correct! Hash("${userAnswer}") = ${targetHash} mod ${hashModulus}`}
                {challengeType === 'collision' && collisionFound && 
                  `Collision found! Both "${collisionFound.input1}" and "${collisionFound.input2}" hash to ${collisionFound.hash} mod ${hashModulus}`
                }
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
              {challengeType === 'forward' && (
                <>
                  <p>
                    <strong>How to calculate a hash value:</strong>
                  </p>
                  <p>
                    Our simplified hash function works like this:
                  </p>
                  <ol>
                    <li>Start with hash = 0</li>
                    <li>For each character in the input:</li>
                    <ul>
                      <li>Multiply the current hash by 31</li>
                      <li>Add the ASCII code of the character</li>
                      <li>Take the result modulo {hashModulus}</li>
                    </ul>
                  </ol>
                  <p>
                    For example, with input "{input[0] || 'a'}", the first step would be:
                    <br />
                    (0 * 31) + {input[0] ? input[0].charCodeAt(0) : 97} = {input[0] ? input[0].charCodeAt(0) : 97}
                  </p>
                </>
              )}
              
              {challengeType === 'preimage' && (
                <>
                  <p>
                    <strong>How to find a preimage:</strong>
                  </p>
                  <p>
                    Finding a specific input that produces a given hash is generally difficult (that's why hash functions are used in cryptography).
                    However, for our simple hash function and small modulus, you can try:
                  </p>
                  <ul>
                    <li>Simple words or numbers</li>
                    <li>Combinations of letters and numbers</li>
                    <li>Try using words related to zero-knowledge proofs</li>
                  </ul>
                  <p>
                    For reference, here's a partial list of words you can try: zero, knowledge, proof, math, commit, hash, crypto, secure, privacy, blockchain...
                  </p>
                </>
              )}
              
              {challengeType === 'collision' && (
                <>
                  <p>
                    <strong>How to find a collision:</strong>
                  </p>
                  <p>
                    Because our hash function outputs values modulo {hashModulus}, there are only {hashModulus} possible hash values.
                    By the pigeonhole principle, if we have more than {hashModulus} inputs, at least two must have the same hash.
                  </p>
                  <p>
                    One approach to find collisions:
                  </p>
                  <ol>
                    <li>Start with a word or number</li>
                    <li>Try appending different characters or numbers to it</li>
                    <li>Calculate the hash values and look for matches</li>
                  </ol>
                  <p>
                    Try variations like "word1", "word2", etc. or completely different words.
                  </p>
                </>
              )}
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

HashChallenge.propTypes = {
  onSolve: PropTypes.func
};

export default HashChallenge;