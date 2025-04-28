import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ModularClock.css';

/**
 * ModularClock component - Interactive visualization for modular arithmetic
 * @param {Object} props - Component props
 * @param {string} props.operation - The modular operation to visualize (addition, subtraction, multiplication, division, or exponentiation)
 * @returns {React.Element} The rendered ModularClock component
 */
function ModularClock({ operation = 'addition' }) {
    const [modulus, setModulus] = useState(12);
    const [value1, setValue1] = useState(5);
    const [value2, setValue2] = useState(8);
    const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showAnimation, setShowAnimation] = useState(false);

    // Calculate result when inputs change
    useEffect(() => {
        calculateResult();
    }, [modulus, value1, value2, operation]);

    // Calculate result based on operation
    const calculateResult = () => {
        let newResult;
        setErrorMessage('');

        try {
            switch (operation) {
                case 'addition':
                    newResult = ((value1 % modulus) + (value2 % modulus)) % modulus;
                    break;
                case 'subtraction':
                    // Ensure positive result with (value1 - value2) % modulus
                    newResult = ((value1 % modulus) - (value2 % modulus) + modulus) % modulus;
                    break;
                case 'multiplication':
                    newResult = ((value1 % modulus) * (value2 % modulus)) % modulus;
                    break;
                case 'division':
                    // For division, we need to find the multiplicative inverse
                    const inverse = modularMultiplicativeInverse(value2, modulus);
                    if (inverse === null) {
                        setErrorMessage(`${value2} has no multiplicative inverse modulo ${modulus}`);
                        newResult = null;
                        return;
                    }
                    newResult = ((value1 % modulus) * inverse) % modulus;
                    break;
                case 'exponentiation':
                    // For exponentiation, use a more efficient algorithm to avoid large numbers
                    newResult = modularExponentiation(value1, value2, modulus);
                    break;
                default:
                    newResult = value1 % modulus;
            }

            setResult(newResult);
            setShowAnimation(true);
            setTimeout(() => setShowAnimation(false), 1500);
        } catch (error) {
            console.error("Error calculating result:", error);
            setErrorMessage("Error in calculation. Please check your values.");
            setResult(null);
        }
    };

    // Find the modular multiplicative inverse using Extended Euclidean Algorithm
    const modularMultiplicativeInverse = (a, m) => {
        // Ensure a is positive and within modular range
        a = ((a % m) + m) % m;

        // Check if a and m are coprime (gcd should be 1)
        if (gcd(a, m) !== 1) {
            return null; // No inverse exists
        }

        // Find using Extended Euclidean Algorithm
        const { x } = extendedGCD(a, m);

        // Make sure the result is positive
        return ((x % m) + m) % m;
    };

    // Greatest Common Divisor (GCD) calculation
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

    // Extended Euclidean Algorithm to find coefficients of Bézout's identity
    const extendedGCD = (a, b) => {
        if (b === 0) {
            return { gcd: a, x: 1, y: 0 };
        }

        const { gcd, x: x1, y: y1 } = extendedGCD(b, a % b);
        const x = y1;
        const y = x1 - Math.floor(a / b) * y1;

        return { gcd, x, y };
    };

    // Efficient modular exponentiation algorithm
    const modularExponentiation = (base, exponent, modulus) => {
        if (modulus === 1) return 0;

        let result = 1;
        base = base % modulus;

        while (exponent > 0) {
            // If exponent is odd, multiply result with base
            if (exponent % 2 === 1) {
                result = (result * base) % modulus;
            }

            // Exponent must be even now
            exponent = Math.floor(exponent / 2);
            base = (base * base) % modulus;
        }

        return result;
    };

    // Generate clock numbers
    const clockNumbers = [];
    for (let i = 0; i < modulus; i++) {
        const angle = (i * 360) / modulus;
        const radians = (angle - 90) * (Math.PI / 180);
        const radius = 80; // Radius of the circle where numbers are placed
        const x = 100 + radius * Math.cos(radians);
        const y = 100 + radius * Math.sin(radians);

        const isResult = result === i;

        clockNumbers.push(
            <g key={i} className={isResult ? 'modular-clock__number--result' : ''}>
                <circle
                    cx={x}
                    cy={y}
                    r={15}
                    className={`modular-clock__number-bg ${isResult ? 'modular-clock__number-bg--result' : ''}`}
                />
                <text
                    x={x}
                    y={y}
                    dy=".3em"
                    textAnchor="middle"
                    className="modular-clock__number"
                >
                    {i}
                </text>
            </g>
        );
    }

    // Operation symbols for display
    const operationSymbol =
        operation === 'addition' ? '+' :
            operation === 'subtraction' ? '−' :
                operation === 'multiplication' ? '×' :
                    operation === 'division' ? '÷' :
                        '^';

    // Convert operation name for display (capitalize first letter)
    const operationName = operation.charAt(0).toUpperCase() + operation.slice(1);

    return (
        <div className="modular-clock">
            <h3 className="modular-clock__title">Modular {operationName}</h3>

            <div className="modular-clock__controls">
                <div className="modular-clock__input-group">
                    <label htmlFor="value1">Value 1:</label>
                    <input
                        id="value1"
                        type="number"
                        min="0"
                        max={operation === 'exponentiation' ? 20 : 100}
                        value={value1}
                        onChange={(e) => setValue1(parseInt(e.target.value) || 0)}
                    />
                </div>

                <div className="modular-clock__operation">
                    {operationSymbol}
                </div>

                <div className="modular-clock__input-group">
                    <label htmlFor="value2">Value 2:</label>
                    <input
                        id="value2"
                        type="number"
                        min="0"
                        max={operation === 'exponentiation' ? 10 : 100}
                        value={value2}
                        onChange={(e) => setValue2(parseInt(e.target.value) || 0)}
                    />
                </div>

                <div className="modular-clock__operation">
                    mod
                </div>

                <div className="modular-clock__input-group">
                    <label htmlFor="modulus">Modulus:</label>
                    <input
                        id="modulus"
                        type="number"
                        min="2"
                        max="24"
                        value={modulus}
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || 2;
                            setModulus(Math.min(24, Math.max(2, value))); // Limit between 2 and 24
                        }}
                    />
                </div>
            </div>

            <div className="modular-clock__visualization">
                <svg viewBox="0 0 200 200" className="modular-clock__svg">
                    {/* Clock outline */}
                    <circle cx="100" cy="100" r="90" className="modular-clock__outline" />

                    {/* Clock numbers */}
                    {clockNumbers}

                    {/* Result indicator */}
                    {result !== null && (
                        <g className="modular-clock__result-indicator">
                            <line
                                x1="100"
                                y1="100"
                                x2={100 + 70 * Math.cos((result * 360 / modulus - 90) * (Math.PI / 180))}
                                y2={100 + 70 * Math.sin((result * 360 / modulus - 90) * (Math.PI / 180))}
                                className="modular-clock__hand"
                            />
                            <circle cx="100" cy="100" r="5" className="modular-clock__center" />
                        </g>
                    )}
                </svg>
            </div>

            {errorMessage && (
                <div className="modular-clock__error">
                    {errorMessage}
                </div>
            )}

            <div className="modular-clock__explanation">
                <p className="modular-clock__formula">
                    {operation === 'addition' && `${value1} + ${value2} ≡ ${result} (mod ${modulus})`}
                    {operation === 'subtraction' && `${value1} - ${value2} ≡ ${result} (mod ${modulus})`}
                    {operation === 'multiplication' && `${value1} × ${value2} ≡ ${result} (mod ${modulus})`}
                    {operation === 'division' && (result !== null ?
                        `${value1} ÷ ${value2} ≡ ${value1} × ${value2}⁻¹ ≡ ${result} (mod ${modulus})` :
                        `${value1} ÷ ${value2} is undefined (mod ${modulus})`
                    )}
                    {operation === 'exponentiation' && `${value1}^${value2} ≡ ${result} (mod ${modulus})`}
                </p>
                <p className="modular-clock__hint">
                    {operation === 'addition' && 'In modular addition, we add numbers normally, then find the remainder when divided by the modulus. This is like a clock that wraps around after reaching a certain number.'}
                    {operation === 'subtraction' && 'In modular subtraction, we subtract numbers and then take the remainder. If the result is negative, we add the modulus to get a positive result between 0 and modulus-1.'}
                    {operation === 'multiplication' && 'In modular multiplication, we multiply numbers normally, then find the remainder when divided by the modulus. This operation is fundamental to many cryptographic algorithms.'}
                    {operation === 'division' && 'Division in modular arithmetic requires finding the multiplicative inverse. The inverse of a only exists if a and the modulus are coprime (have no common factors).'}
                    {operation === 'exponentiation' && 'In modular exponentiation, we raise one number to the power of another, then find the remainder when divided by the modulus. This operation is at the heart of many public-key cryptosystems.'}
                </p>
            </div>
        </div>
    );
}

ModularClock.propTypes = {
    operation: PropTypes.oneOf(['addition', 'subtraction', 'multiplication', 'division', 'exponentiation'])
};

export default ModularClock;