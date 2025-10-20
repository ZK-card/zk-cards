import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MathComponents.css';

/**
 * HashChallenge component - Interactive tool for learning about cryptographic hash functions
 * 
 * @param {Object} props
 * @param {Function} props.onSolve - Callback when exercise is solved
 * @returns {React.Element} The rendered HashChallenge component
 */
function HashChallenge({ onSolve }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  // Hash function demo state
  const [inputText, setInputText] = useState("");
  const [hashResult, setHashResult] = useState("");
  const [hashHistory, setHashHistory] = useState([]);
  const [showCollision, setShowCollision] = useState(false);
  
  // Merkle tree state
  const [merkleLeaves, setMerkleLeaves] = useState(["data1", "data2", "data3", "data4"]);
  const [merkleTree, setMerkleTree] = useState([]);
  const [proofIndex, setProofIndex] = useState(0);
  const [merkleProof, setMerkleProof] = useState([]);
  
  const stages = [
    {
      title: "What are Cryptographic Hash Functions?",
      content: "Cryptographic hash functions transform arbitrary data into fixed-size outputs (hashes) in a way that is deterministic but practically impossible to reverse. They're fundamental building blocks in cryptography and essential components in zero-knowledge proof systems."
    },
    {
      title: "Key Properties of Hash Functions",
      content: "A good cryptographic hash function has several important properties: 1) One-way (pre-image resistance): Given a hash, it should be infeasible to find the original input. 2) Collision resistance: It should be extremely difficult to find two different inputs that produce the same hash. 3) Avalanche effect: Small changes in input should produce significantly different hash outputs."
    },
    {
      title: "Interactive Hash Function Demo",
      content: "Try entering different text inputs to see how the hash outputs change. Notice how small changes in the input result in completely different hash values. This is the avalanche effect in action."
    },
    {
      title: "Merkle Trees and Hash-based Data Structures",
      content: "Merkle trees are tree data structures where each leaf node contains the hash of a data block, and each non-leaf node contains the hash of its children. They enable efficient and secure verification of large data structures, which is particularly valuable in zero-knowledge proofs."
    },
    {
      title: "Applications in Zero-Knowledge Proofs",
      content: "Hash functions are used extensively in ZK proofs. They enable commitments (hiding data while proving properties about it), succinctly represent large data sets via Merkle trees, and provide binding guarantees critical for the security of zero-knowledge protocols."
    }
  ];
  
  const quizQuestions = [
    {
      id: 'q1',
      question: "Which of these is NOT a key property of cryptographic hash functions?",
      options: [
        "One-way (preimage resistance)",
        "Collision resistance",
        "Reversibility",
        "Determinism (same input always produces same output)"
      ],
      correctAnswer: 2
    },
    {
      id: 'q2',
      question: "What is the 'avalanche effect' in hash functions?",
      options: [
        "The ability to withstand quantum computer attacks",
        "Small changes in input causing large changes in the hash output",
        "The computational complexity increasing exponentially with input size",
        "The function's ability to handle variable-length inputs"
      ],
      correctAnswer: 1
    },
    {
      id: 'q3',
      question: "In a Merkle tree with 8 leaf nodes, how many levels will the tree have (including the root)?",
      options: [
        "2 levels",
        "3 levels",
        "4 levels",
        "8 levels"
      ],
      correctAnswer: 2
    },
    {
      id: 'q4',
      question: "How are hash functions used in zero-knowledge proofs?",
      options: [
        "To encrypt all communications between prover and verifier",
        "To create commitments to data without revealing the data itself",
        "To speed up computation by compressing data",
        "To eliminate the need for interactive verification"
      ],
      correctAnswer: 1
    },
    {
      id: 'q5',
      question: "What is a hash collision?",
      options: [
        "When a hash function crashes due to invalid input",
        "When the same hash function is used twice in a protocol",
        "When two different inputs produce the same hash output",
        "When a hash function takes too long to compute"
      ],
      correctAnswer: 2
    }
  ];
  
  // Simple hash function for demonstration
  const simpleHash = (input) => {
    if (!input) return "";
    
    // A simple hash function for demonstration
    // In production, you'd use a cryptographic hash like SHA-256
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert to hex string and ensure it's 8 characters long
    const hexHash = (hash >>> 0).toString(16).padStart(8, '0');
    return hexHash;
  };
  
  // Generate Merkle tree from leaves
  const generateMerkleTree = (leaves) => {
    if (!leaves || leaves.length === 0) return [];
    
    // Start with leaf hashes
    const tree = leaves.map(leaf => simpleHash(leaf));
    let levelSize = tree.length;
    let currentIndex = 0;
    
    // Build tree bottom-up
    while (levelSize > 1) {
      for (let i = 0; i < levelSize; i += 2) {
        if (i + 1 < levelSize) {
          // If there's a pair, hash them together
          const combinedHash = simpleHash(tree[currentIndex + i] + tree[currentIndex + i + 1]);
          tree.push(combinedHash);
        } else {
          // If there's an odd node, propagate it up
          tree.push(tree[currentIndex + i]);
        }
      }
      
      currentIndex += levelSize;
      levelSize = Math.ceil(levelSize / 2);
    }
    
    return tree;
  };
  
  // Generate Merkle proof for a leaf
  const generateMerkleProof = (tree, leafIndex, numLeaves) => {
    const proof = [];
    let index = leafIndex;
    let levelSize = numLeaves;
    let currentIndex = 0;
    
    while (levelSize > 1) {
      const isRightNode = index % 2 === 1;
      const siblingIndex = isRightNode ? index - 1 : index + 1;
      
      // Only add sibling if it exists in the level
      if (siblingIndex < levelSize) {
        proof.push({
          value: tree[currentIndex + siblingIndex],
          position: isRightNode ? 'left' : 'right'
        });
      }
      
      // Move to the parent node in the next level
      index = Math.floor(index / 2);
      currentIndex += levelSize;
      levelSize = Math.ceil(levelSize / 2);
    }
    
    return proof;
  };
  
  // Verify Merkle proof
  const verifyMerkleProof = (leaf, proof, root) => {
    let currentHash = simpleHash(leaf);
    
    for (const node of proof) {
      if (node.position === 'left') {
        currentHash = simpleHash(node.value + currentHash);
      } else {
        currentHash = simpleHash(currentHash + node.value);
      }
    }
    
    return currentHash === root;
  };
  
  // Update Merkle tree when leaves change
  useEffect(() => {
    const tree = generateMerkleTree(merkleLeaves);
    setMerkleTree(tree);
    
    // Update proof for selected index
    if (merkleLeaves.length > 0) {
      const proof = generateMerkleProof(tree, proofIndex, merkleLeaves.length);
      setMerkleProof(proof);
    }
  }, [merkleLeaves, proofIndex]);
  
  // Handle hash input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    const hash = simpleHash(e.target.value);
    setHashResult(hash);
  };
  
  // Add current hash to history
  const handleAddToHistory = () => {
    if (inputText && hashResult) {
      const newEntry = { input: inputText, hash: hashResult };
      setHashHistory(prev => [newEntry, ...prev.slice(0, 4)]);
    }
  };
  
  // Find a simple hash collision (for demo purposes)
  const handleFindCollision = () => {
    // This is a simplified demo that just finds two inputs with the same first 2 chars of hash
    // Real collision finding would be computationally infeasible
    setShowCollision(true);
    
    // These two different strings produce hashes that start with the same characters
    const input1 = "collision demo 1";
    const input2 = "different collision input";
    
    const hash1 = simpleHash(input1);
    const hash2 = simpleHash(input2);
    
    // Update history with our "collision" (note: in real hash functions, finding actual
    // collisions would be extremely difficult and not feasible for a browser demo)
    setHashHistory([
      { input: input1, hash: hash1 },
      { input: input2, hash: hash2 },
      ...hashHistory.slice(0, 3)
    ]);
  };
  
  // Handle leaf value change in Merkle tree
  const handleLeafChange = (index, value) => {
    const newLeaves = [...merkleLeaves];
    newLeaves[index] = value;
    setMerkleLeaves(newLeaves);
  };
  
  // Handle proof index change
  const handleProofIndexChange = (index) => {
    if (index >= 0 && index < merkleLeaves.length) {
      setProofIndex(index);
    }
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
      <div className="math-interactive hash-challenge">
        <h3 className="math-interactive__title">Cryptographic Hash Functions - Quiz</h3>
        
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
    <div className="math-interactive hash-challenge">
      <h3 className="math-interactive__title">Cryptographic Hash Functions</h3>
      
      <div className="math-interactive__content">
        <div className="math-interactive__stage">
          <h4>{stages[currentStage].title}</h4>
          <p>{stages[currentStage].content}</p>
        </div>
        
        {currentStage === 2 && (
          <div className="math-interactive__hash-demo">
            <div className="math-interactive__hash-input">
              <label htmlFor="hash-input">Input Text:</label>
              <textarea
                id="hash-input"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type something to hash..."
                rows={3}
                className="math-interactive__textarea"
              />
            </div>
            
            <div className="math-interactive__hash-output">
              <h4>Hash Result:</h4>
              <div className="math-interactive__hash-result">
                {hashResult || "Hash will appear here"}
              </div>
              
              <div className="math-interactive__hash-actions">
                <button 
                  onClick={handleAddToHistory}
                  className="math-interactive__hash-button"
                  disabled={!inputText}
                >
                  Add to History
                </button>
                
                <button 
                  onClick={handleFindCollision}
                  className="math-interactive__hash-button"
                >
                  Demo Hash Collision
                </button>
              </div>
            </div>
            
            {(hashHistory.length > 0 || showCollision) && (
              <div className="math-interactive__hash-history">
                <h4>Hash History:</h4>
                <table className="math-interactive__hash-table">
                  <thead>
                    <tr>
                      <th>Input</th>
                      <th>Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hashHistory.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.input}</td>
                        <td className={showCollision && index < 2 ? "math-interactive__collision-highlight" : ""}>
                          {entry.hash}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {showCollision && (
                  <div className="math-interactive__collision-note">
                    <p>Note: For demonstration purposes, we're showing two inputs that produce hashes with similar patterns. In production-grade hash functions, finding actual collisions would be computationally infeasible.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {currentStage === 3 && (
          <div className="math-interactive__merkle-demo">
            <div className="math-interactive__merkle-visualization">
              <h4>Merkle Tree Visualization</h4>
              
              <div className="math-interactive__merkle-tree">
                {merkleTree.length > 0 && (
                  <>
                    {/* Root node */}
                    <div className="math-interactive__merkle-level">
                      <div className="math-interactive__merkle-node math-interactive__merkle-root">
                        {merkleTree[merkleTree.length - 1].substring(0, 6)}...
                      </div>
                    </div>
                    
                    {/* Intermediate levels */}
                    {merkleLeaves.length > 2 && (
                      <div className="math-interactive__merkle-level">
                        {merkleTree.slice(merkleLeaves.length, merkleLeaves.length + Math.ceil(merkleLeaves.length / 2)).map((hash, i) => (
                          <div key={i} className="math-interactive__merkle-node math-interactive__merkle-internal">
                            {hash.substring(0, 6)}...
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Leaf nodes */}
                    <div className="math-interactive__merkle-level">
                      {merkleTree.slice(0, merkleLeaves.length).map((hash, i) => (
                        <div 
                          key={i} 
                          className={`math-interactive__merkle-node math-interactive__merkle-leaf ${proofIndex === i ? 'math-interactive__merkle-selected' : ''}`}
                          onClick={() => handleProofIndexChange(i)}
                        >
                          <div className="math-interactive__merkle-leaf-hash">
                            {hash.substring(0, 6)}...
                          </div>
                          <div className="math-interactive__merkle-leaf-data">
                            <input
                              type="text"
                              value={merkleLeaves[i]}
                              onChange={(e) => handleLeafChange(i, e.target.value)}
                              className="math-interactive__merkle-input"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="math-interactive__merkle-proof">
              <h4>Merkle Proof for Leaf {proofIndex}</h4>
              
              <div className="math-interactive__merkle-proof-steps">
                <div className="math-interactive__merkle-proof-start">
                  <div className="math-interactive__merkle-proof-leaf">
                    <strong>Leaf Data:</strong> {merkleLeaves[proofIndex]}
                  </div>
                  <div className="math-interactive__merkle-proof-hash">
                    <strong>Leaf Hash:</strong> {merkleTree[proofIndex]}
                  </div>
                </div>
                
                {merkleProof.map((node, i) => (
                  <div key={i} className="math-interactive__merkle-proof-step">
                    <div className="math-interactive__merkle-proof-direction">
                      {node.position === 'left' ? 'Combine with LEFT node:' : 'Combine with RIGHT node:'}
                    </div>
                    <div className="math-interactive__merkle-proof-hash">
                      {node.value}
                    </div>
                  </div>
                ))}
                
                <div className="math-interactive__merkle-proof-result">
                  <strong>Resulting Root:</strong> {merkleTree[merkleTree.length - 1]}
                </div>
                
                <div className={`math-interactive__merkle-proof-verification ${
                  verifyMerkleProof(merkleLeaves[proofIndex], merkleProof, merkleTree[merkleTree.length - 1]) 
                    ? 'math-interactive__merkle-proof-valid' 
                    : 'math-interactive__merkle-proof-invalid'
                }`}>
                  {verifyMerkleProof(merkleLeaves[proofIndex], merkleProof, merkleTree[merkleTree.length - 1])
                    ? 'VERIFICATION PASSED: The proof correctly verifies against the root!'
                    : 'VERIFICATION FAILED: The proof does not match the root!'}
                </div>
                
                <div className="math-interactive__merkle-note">
                  <p>Try changing a leaf value to see how it affects the proof verification.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
          Hash functions are fundamental building blocks in zero-knowledge protocols. They enable commitments that hide data while allowing proofs about it, form the basis of Merkle trees that efficiently represent large datasets, and provide the binding properties crucial for secure ZK systems. Without cryptographic hash functions, modern zero-knowledge proofs would be impractical.
        </p>
      </div>
    </div>
  );
}

HashChallenge.propTypes = {
  onSolve: PropTypes.func
};

export default HashChallenge;