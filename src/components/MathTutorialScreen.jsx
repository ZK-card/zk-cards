import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import ModularClock from './ModularClock';
import './MathTutorialScreen.css';

/**
 * MathTutorialScreen component - Teaches mathematical concepts in a step-by-step tutorial format
 * @param {Object} props - Component props
 * @param {Function} props.onComplete - Handler when tutorial is completed
 * @param {Function} props.onSkip - Handler when tutorial is skipped
 * @returns {React.Element} The rendered MathTutorialScreen component
 */
function MathTutorialScreen({ onComplete, onSkip }) {
    const [currentStep, setCurrentStep] = useState(0);

    // Tutorial steps
    const tutorialSteps = [
        {
            title: "Introduction to Modular Arithmetic",
            content: "Modular arithmetic is a system of arithmetic for integers, where numbers 'wrap around' after reaching a certain value—the modulus. Think of a clock: after 12, we go back to 1. In mathematical notation, we write a ≡ b (mod n) to say 'a is congruent to b modulo n', meaning a and b have the same remainder when divided by n.",
            operation: null,
        },
        {
            title: "Modular Addition",
            content: "In modular addition, we add numbers as usual but then take the remainder when divided by our modulus. If we're working modulo 12 (like a clock) and we add 7 + 8, we get 15. Since 15 ÷ 12 gives remainder 3, we say 7 + 8 ≡ 3 (mod 12). Try different values in the interactive clock below!",
            operation: "addition",
        },
        {
            title: "Modular Subtraction (Additive Inverse)",
            content: "Subtraction in modular arithmetic works similarly to addition. The additive inverse of a number a is the number that, when added to a, gives 0. In mod n, the additive inverse of a is n - a. For example, in mod 12, the additive inverse of 7 is 5, because 7 + 5 ≡ 0 (mod 12).",
            operation: "subtraction",
        },
        {
            title: "Modular Multiplication",
            content: "To multiply in modular arithmetic, multiply the numbers regularly and then take the remainder when divided by the modulus. For example, in mod 7, 3 × 5 = 15, and 15 ÷ 7 has remainder 1, so 3 × 5 ≡ 1 (mod 7). Multiplication is used extensively in cryptographic operations.",
            operation: "multiplication",
        },
        {
            title: "Modular Division (Multiplicative Inverse)",
            content: "Division in modular arithmetic is defined using the multiplicative inverse. The multiplicative inverse of a (mod n) is a number b where a × b ≡ 1 (mod n). Unlike regular numbers, not all numbers have multiplicative inverses in modular arithmetic. A number a has a multiplicative inverse only if a and n are coprime (have no common factors).",
            operation: "division",
        },
        {
            title: "Modular Exponentiation",
            content: "Modular exponentiation is raising a number to a power and then taking the remainder. This operation is crucial for cryptography, especially in algorithms like RSA and Diffie-Hellman. Computing a^b mod n efficiently, even when b is very large, is a key aspect of modern cryptography and zero-knowledge proofs.",
            operation: "exponentiation",
        },
        {
            title: "Applications in Cryptography",
            content: "These modular operations form the foundation of modern cryptography and zero-knowledge proofs. RSA encryption uses modular exponentiation with large primes. Zero-knowledge proofs often involve proving knowledge of values that satisfy modular equations without revealing those values. Understanding these operations is essential for understanding how these systems work.",
            operation: null,
        }
    ];

    // Animation for tutorial content
    const contentSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        reset: true,
        key: currentStep,
        config: { tension: 150, friction: 15 },
    });

    // Handle next step button
    const handleNextStep = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Tutorial completed
            onComplete();
        }
    };

    // Handle previous step button
    const handlePreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Handle skip tutorial button
    const handleSkipTutorial = () => {
        onSkip();
    };

    // Calculate progress percentage
    const progressPercentage = ((currentStep + 1) / tutorialSteps.length) * 100;

    return (
        <div className="math-tutorial-screen">
            <div className="math-tutorial-screen__content">
                <div className="math-tutorial-screen__progress">
                    <div
                        className="math-tutorial-screen__progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                <animated.div className="math-tutorial-screen__step" style={contentSpring}>
                    <h1 className="math-tutorial-screen__title">{tutorialSteps[currentStep].title}</h1>

                    <div className="math-tutorial-screen__explanation">
                        <p className="math-tutorial-screen__text">{tutorialSteps[currentStep].content}</p>
                    </div>

                    {tutorialSteps[currentStep].operation && (
                        <div className="math-tutorial-screen__interactive">
                            <ModularClock operation={tutorialSteps[currentStep].operation} />
                        </div>
                    )}

                    <div className="math-tutorial-screen__buttons">
                        <button
                            className="math-tutorial-screen__previous-button"
                            onClick={handlePreviousStep}
                            disabled={currentStep === 0}
                        >
                            Previous
                        </button>

                        {currentStep < tutorialSteps.length - 1 ? (
                            <button
                                className="math-tutorial-screen__next-button"
                                onClick={handleNextStep}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                className="math-tutorial-screen__complete-button"
                                onClick={handleNextStep}
                            >
                                Start Challenges
                            </button>
                        )}

                        {currentStep < tutorialSteps.length - 1 && (
                            <button
                                className="math-tutorial-screen__skip-button"
                                onClick={handleSkipTutorial}
                            >
                                Skip to Challenges
                            </button>
                        )}
                    </div>
                </animated.div>
            </div>
        </div>
    );
}

MathTutorialScreen.propTypes = {
    onComplete: PropTypes.func.isRequired,
    onSkip: PropTypes.func.isRequired,
};

export default MathTutorialScreen;