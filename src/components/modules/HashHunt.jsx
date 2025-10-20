import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './HashHunt.css';

// Simple hash function for educational purposes
const simpleHash = (input, modulus = 100) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = (hash + input.charCodeAt(i) * (i + 1)) % modulus;
    }
    return hash;
};

// Function to visualize hash process
const HashVisualizer = ({ input, steps = true, speed = 1 }) => {
    const [hashSteps, setHashSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    // Generate hash steps for visualization
    useEffect(() => {
        if (!input) {
            setHashSteps([]);
            return;
        }

        const newSteps = [];
        let runningHash = 0;

        // Initial state
        newSteps.push({
            step: 0,
            description: 'Start with hash = 0',
            hash: 0,
            highlightChar: -1
        });

        // Process each character
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            const charCode = input.charCodeAt(i);
            const contribution = charCode * (i + 1);
            runningHash = (runningHash + contribution) % 100;

            newSteps.push({
                step: i + 1,
                description: `Add (${charCode} × ${i + 1}) = ${contribution} for character '${char}'`,
                hash: runningHash,
                highlightChar: i
            });
        }

        // Final result
        newSteps.push({
            step: input.length + 1,
            description: 'Final hash value',
            hash: runningHash,
            highlightChar: -1
        });

        setHashSteps(newSteps);
        setCurrentStep(0);

        // Auto-advance steps if animation is enabled
        if (steps && newSteps.length > 0) {
            let timeout;
            const timer = () => {
                if (currentStep < newSteps.length - 1) {
                    setCurrentStep(step => step + 1);
                    timeout = setTimeout(timer, 1000 / speed);
                }
            };

            timeout = setTimeout(timer, 1000 / speed);
            return () => clearTimeout(timeout);
        } else {
            setCurrentStep(newSteps.length - 1);
        }
    }, [input, steps, speed]);

    // If no steps, show empty state
    if (hashSteps.length === 0) {
        return (
            <div className="hash-visualizer empty">
                <p>Enter text to see the hashing process</p>
            </div>
        );
    }

    const currentData = hashSteps[currentStep];

    return (
        <div className="hash-visualizer">
            <div className="hash-input-display">
                {input.split('').map((char, index) => (
                    <span
                        key={index}
                        className={`hash-char ${currentData.highlightChar === index ? 'highlight' : ''}`}
                    >
                        {char}
                    </span>
                ))}
            </div>

            <div className="hash-step-display">
                <div className="hash-step-progress">
                    <div
                        className="hash-step-progress-bar"
                        style={{ width: `${(currentStep / (hashSteps.length - 1)) * 100}%` }}
                    ></div>
                </div>
                <div className="hash-step-info">
                    <div className="hash-step-description">
                        {currentData.description}
                    </div>
                    <div className="hash-step-value">
                        hash = {currentData.hash}
                    </div>
                </div>
            </div>

            {steps && (
                <div className="hash-step-controls">
                    <button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                    >
                        Previous
                    </button>
                    <span className="hash-step-counter">
                        Step {currentStep} of {hashSteps.length - 1}
                    </span>
                    <button
                        onClick={() => setCurrentStep(Math.min(hashSteps.length - 1, currentStep + 1))}
                        disabled={currentStep === hashSteps.length - 1}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

// Hash property demonstration
const HashPropertyDemo = ({ property }) => {
    const [inputA, setInputA] = useState('');
    const [inputB, setInputB] = useState('');
    const [showResult, setShowResult] = useState(false);

    // Reset when property changes
    useEffect(() => {
        setInputA('');
        setInputB('');
        setShowResult(false);
    }, [property]);

    const hashA = simpleHash(inputA);
    const hashB = simpleHash(inputB);

    // Generate a slightly different input for collision resistance
    const generateSimilarInput = () => {
        if (!inputA) return;

        // Swap two characters, change one character, or add/remove a character
        const strategy = Math.floor(Math.random() * 3);
        let newInput = inputA;

        switch (strategy) {
            case 0: // Swap two characters
                if (inputA.length >= 2) {
                    const i = Math.floor(Math.random() * (inputA.length - 1));
                    newInput = inputA.split('');
                    [newInput[i], newInput[i + 1]] = [newInput[i + 1], newInput[i]];
                    newInput = newInput.join('');
                } else {
                    newInput = inputA + 'a';
                }
                break;

            case 1: // Change one character
                if (inputA.length >= 1) {
                    const i = Math.floor(Math.random() * inputA.length);
                    const newChar = String.fromCharCode(
                        97 + Math.floor(Math.random() * 26)
                    );
                    newInput = inputA.substring(0, i) + newChar + inputA.substring(i + 1);
                } else {
                    newInput = 'a';
                }
                break;

            case 2: // Add/remove a character
                if (inputA.length >= 1 && Math.random() < 0.5) {
                    // Remove a character
                    const i = Math.floor(Math.random() * inputA.length);
                    newInput = inputA.substring(0, i) + inputA.substring(i + 1);
                } else {
                    // Add a character
                    const i = Math.floor(Math.random() * (inputA.length + 1));
                    const newChar = String.fromCharCode(
                        97 + Math.floor(Math.random() * 26)
                    );
                    newInput = inputA.substring(0, i) + newChar + inputA.substring(i);
                }
                break;
        }

        setInputB(newInput);
    };

    const renderPropertyDemo = () => {
        switch (property) {
            case 'deterministic':
                return (
                    <>
                        <h3>Deterministic Property</h3>
                        <p className="property-description">
                            The same input always produces the same hash output.
                        </p>

                        <div className="property-demo">
                            <div className="input-control">
                                <label>Input Text</label>
                                <input
                                    type="text"
                                    value={inputA}
                                    onChange={(e) => setInputA(e.target.value)}
                                    placeholder="Type something..."
                                />
                            </div>

                            <button
                                className="demo-button"
                                onClick={() => setShowResult(true)}
                                disabled={!inputA}
                            >
                                Hash It!
                            </button>

                            {showResult && (
                                <div className="hash-results">
                                    <div className="hash-result">
                                        <div className="hash-result-input">Input: "{inputA}"</div>
                                        <div className="hash-result-value">Hash: {hashA}</div>
                                    </div>

                                    <p className="hash-result-explanation">
                                        Every time you hash "{inputA}", you'll get {hashA}.
                                        This deterministic property is essential for verification in ZK systems.
                                    </p>

                                    <button
                                        className="demo-button secondary"
                                        onClick={() => {
                                            setShowResult(false);
                                        }}
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                );

            case 'avalanche':
                return (
                    <>
                        <h3>Avalanche Effect</h3>
                        <p className="property-description">
                            A small change in the input produces a completely different hash output.
                        </p>

                        <div className="property-demo">
                            <div className="input-control">
                                <label>First Input</label>
                                <input
                                    type="text"
                                    value={inputA}
                                    onChange={(e) => setInputA(e.target.value)}
                                    placeholder="Type something..."
                                />
                            </div>

                            <button
                                className="demo-button"
                                onClick={() => {
                                    generateSimilarInput();
                                    setShowResult(true);
                                }}
                                disabled={!inputA}
                            >
                                Generate Similar Input
                            </button>

                            {showResult && (
                                <div className="hash-results">
                                    <div className="hash-result">
                                        <div className="hash-result-input">Input 1: "{inputA}"</div>
                                        <div className="hash-result-value">Hash 1: {hashA}</div>
                                    </div>

                                    <div className="hash-result">
                                        <div className="hash-result-input">Input 2: "{inputB}"</div>
                                        <div className="hash-result-value">Hash 2: {hashB}</div>
                                    </div>

                                    <p className="hash-result-explanation">
                                        Notice how even a small change in the input creates a completely different hash!
                                        This property helps ensure that attackers can't easily guess inputs from hash outputs.
                                    </p>

                                    <button
                                        className="demo-button secondary"
                                        onClick={() => {
                                            setShowResult(false);
                                        }}
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                );

            case 'one-way':
                return (
                    <>
                        <h3>One-Way Function</h3>
                        <p className="property-description">
                            It's easy to compute a hash from an input, but practically impossible to derive the original input from a hash.
                        </p>

                        <div className="property-demo">
                            <div className="hash-search-explanation">
                                <p>
                                    Let's try to find an input that hashes to a specific value.
                                    In real cryptographic hash functions, this would be computationally infeasible.
                                </p>
                            </div>

                            <div className="input-control">
                                <label>Target Hash Value (0-99)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="99"
                                    value={inputA}
                                    onChange={(e) => setInputA(e.target.value)}
                                    placeholder="Enter a number 0-99"
                                />
                            </div>

                            <button
                                className="demo-button"
                                onClick={() => {
                                    // Simple brute force for demo purposes
                                    let found = false;
                                    let attempt = '';

                                    for (let length = 1; length <= 3 && !found; length++) {
                                        for (let i = 0; i < 100 && !found; i++) {
                                            attempt = 'a'.repeat(length) + i;
                                            if (simpleHash(attempt) === parseInt(inputA)) {
                                                found = true;
                                                break;
                                            }
                                        }
                                    }

                                    if (found) {
                                        setInputB(attempt);
                                    } else {
                                        setInputB("No simple solution found. Try another hash value!");
                                    }

                                    setShowResult(true);
                                }}
                                disabled={!inputA || inputA < 0 || inputA > 99}
                            >
                                Find Input (Brute Force)
                            </button>

                            {showResult && (
                                <div className="hash-results">
                                    <div className="hash-result">
                                        <div className="hash-result-input">Target Hash: {inputA}</div>
                                        <div className="hash-result-value">Found Input: "{inputB}"</div>
                                    </div>

                                    <p className="hash-result-explanation">
                                        In our simple educational hash function, we can brute force a solution.
                                        However, for cryptographic hash functions like SHA-256 used in real ZK proofs,
                                        finding an input that produces a specific hash is computationally infeasible.
                                    </p>

                                    <button
                                        className="demo-button secondary"
                                        onClick={() => {
                                            setShowResult(false);
                                        }}
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="hash-property-demo">
            {renderPropertyDemo()}
        </div>
    );
};

// Main component
const HashHunt = ({ onComplete }) => {
    const [stage, setStage] = useState('intro');
    const [hashInput, setHashInput] = useState('hello');
    const [selectedProperty, setSelectedProperty] = useState('deterministic');
    const [completedProperties, setCompletedProperties] = useState({
        deterministic: false,
        avalanche: false,
        'one-way': false
    });

    // Mark property as completed
    const completeProperty = (property) => {
        setCompletedProperties({
            ...completedProperties,
            [property]: true
        });

        // Check if all properties are completed
        const allCompleted = Object.values({
            ...completedProperties,
            [property]: true
        }).every(value => value);

        if (allCompleted) {
            setTimeout(() => {
                setStage('complete');
            }, 1000);
        }
    };

    // Render different stages
    const renderStage = () => {
        switch (stage) {
            case 'intro':
                return (
                    <div className="module-stage">
                        <h2>Welcome to Hash Hunt!</h2>
                        <p>
                            Cryptographic hash functions are fundamental building blocks of zero-knowledge proofs.
                            They transform input data of any size into a fixed-size output in a way that's secure and efficient.
                        </p>
                        <p>
                            In this module, we'll explore how hash functions work and why they're essential for ZK systems.
                        </p>

                        <div className="intro-visualization">
                            <HashVisualizer input="hello" steps={false} />
                        </div>

                        <button className="module-button" onClick={() => setStage('visualization')}>
                            See How Hashing Works →
                        </button>
                    </div>
                );

            case 'visualization':
                return (
                    <div className="module-stage">
                        <h2>Hash Function Visualization</h2>
                        <p>
                            Let's see how a simplified hash function works. Enter any text below to see the hashing process.
                        </p>

                        <div className="hash-playground">
                            <div className="hash-input-control">
                                <input
                                    type="text"
                                    value={hashInput}
                                    onChange={(e) => setHashInput(e.target.value)}
                                    placeholder="Enter text to hash..."
                                    className="hash-input"
                                />
                            </div>

                            <div className="hash-output">
                                <HashVisualizer input={hashInput} steps={true} speed={1.5} />
                            </div>

                            <div className="hash-explanation">
                                <h3>How does this hash function work?</h3>
                                <p>
                                    Our simplified educational hash function:
                                </p>
                                <ol>
                                    <li>Starts with hash = 0</li>
                                    <li>For each character in the input string:</li>
                                    <li>Takes the character's ASCII code</li>
                                    <li>Multiplies it by the character's position (1-indexed)</li>
                                    <li>Adds this value to the running hash</li>
                                    <li>Takes modulo 100 to keep the hash value in range 0-99</li>
                                </ol>
                                <p>
                                    Real cryptographic hash functions are much more complex, but follow similar principles
                                    of combining and transforming input data in ways that are hard to reverse.
                                </p>
                            </div>
                        </div>

                        <div className="module-buttons">
                            <button className="module-button" onClick={() => setStage('properties')}>
                                Explore Hash Properties →
                            </button>
                            <button className="module-secondary-button" onClick={() => setStage('intro')}>
                                ← Back to Introduction
                            </button>
                        </div>
                    </div>
                );

            case 'properties':
                return (
                    <div className="module-stage">
                        <h2>Properties of Hash Functions</h2>
                        <p>
                            Cryptographic hash functions have several important properties that make them useful for ZK proofs.
                            Explore each property to understand its importance.
                        </p>

                        <div className="properties-container">
                            <div className="properties-selector">
                                <button
                                    className={`property-button ${selectedProperty === 'deterministic' ? 'active' : ''} ${completedProperties.deterministic ? 'completed' : ''}`}
                                    onClick={() => setSelectedProperty('deterministic')}
                                >
                                    {completedProperties.deterministic && <span className="check-mark">✓</span>}
                                    Deterministic
                                </button>
                                <button
                                    className={`property-button ${selectedProperty === 'avalanche' ? 'active' : ''} ${completedProperties.avalanche ? 'completed' : ''}`}
                                    onClick={() => setSelectedProperty('avalanche')}
                                >
                                    {completedProperties.avalanche && <span className="check-mark">✓</span>}
                                    Avalanche Effect
                                </button>
                                <button
                                    className={`property-button ${selectedProperty === 'one-way' ? 'active' : ''} ${completedProperties['one-way'] ? 'completed' : ''}`}
                                    onClick={() => setSelectedProperty('one-way')}
                                >
                                    {completedProperties['one-way'] && <span className="check-mark">✓</span>}
                                    One-Way Function
                                </button>
                            </div>

                            <div className="property-demonstration">
                                <HashPropertyDemo property={selectedProperty} />

                                <button
                                    className="complete-property-button"
                                    onClick={() => completeProperty(selectedProperty)}
                                    disabled={completedProperties[selectedProperty]}
                                >
                                    {completedProperties[selectedProperty] ? 'Completed!' : 'Mark as Completed'}
                                </button>
                            </div>
                        </div>

                        <div className="hash-zk-connection">
                            <h3>How Hash Functions Enable Zero-Knowledge Proofs</h3>
                            <p>
                                In ZK systems, hash functions enable:
                            </p>
                            <ul>
                                <li><strong>Commitments:</strong> Allow a prover to commit to a value without revealing it</li>
                                <li><strong>Merkle Trees:</strong> Efficiently verify membership in large datasets</li>
                                <li><strong>Random Challenges:</strong> Generate unpredictable challenges in interactive proofs</li>
                                <li><strong>Input Hiding:</strong> Protect sensitive information while allowing verification</li>
                            </ul>
                        </div>

                        <button
                            className="module-secondary-button"
                            onClick={() => setStage('visualization')}
                        >
                            ← Back to Visualization
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
                            You've completed the Hash Hunt module and gained valuable insights into
                            how hash functions enable zero-knowledge proof systems.
                        </p>
                        <p>
                            Hash functions are used extensively in ZK proofs for commitments,
                            Merkle trees, and other cryptographic constructions that allow
                            verification without revealing sensitive information.
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
        <div className="hash-hunt">
            {renderStage()}
        </div>
    );
};

export default HashHunt;