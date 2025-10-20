// math challenge screen
import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import FiniteFieldCalculator from './FiniteFieldCalculator';
import EllipticCurveVisualizer from './EllipticCurveVisualizer';
import PolynomialCommitment from './PolynomialCommitment';
import HashChallenge from './HashChallenge';
import DiscreteLogPuzzle from './DiscreteLogPuzzle';
import NumberTheoryChallenge from './NumberTheoryChallenge';
import './MathChallengeScreen.css';

/**
 * MathChallengeScreen - Displays a math challenge with related ZK concepts
 * @param {Object} props - Component props
 * @param {Object} props.challenge - The selected challenge object
 * @param {Function} props.onComplete - Handler called when challenge is completed
 * @param {Function} props.onExit - Handler called when user chooses to exit
 * @returns {React.Element} The rendered MathChallengeScreen component
 */
function MathChallengeScreen({ challenge, onComplete, onExit }) {
    // Animation for page entry
    const pageSpring = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { tension: 120, friction: 14 },
    });

    // Handle the completion of a math challenge
    const handleChallengeComplete = () => {
        // Show a success message or animation before calling onComplete
        setTimeout(() => {
            onComplete();
        }, 1000);
    };

    // Render the appropriate component based on challenge type
    const renderChallenge = () => {
        if (!challenge) return null;

        switch (challenge.type) {
            case 'finite-field':
                return <FiniteFieldCalculator onSolve={handleChallengeComplete} />;
            case 'elliptic-curve':
                return <EllipticCurveVisualizer onSolve={handleChallengeComplete} />;
            case 'polynomial':
                return <PolynomialCommitment onSolve={handleChallengeComplete} />;
            case 'hash-function':
                return <HashChallenge onSolve={handleChallengeComplete} />;
            case 'discrete-log':
                return <DiscreteLogPuzzle onSolve={handleChallengeComplete} />;
            case 'number-theory':
                return <NumberTheoryChallenge onSolve={handleChallengeComplete} />;
            default:
                return (
                    <div className="math-challenge__error">
                        <h2>Unknown Challenge Type</h2>
                        <p>The challenge type "{challenge.type}" is not recognized.</p>
                    </div>
                );
        }
    };

    return (
        <animated.div className="math-challenge-screen" style={pageSpring}>
            <div className="math-challenge-screen__header">
                <h1 className="math-challenge-screen__title">{challenge?.name || 'Math Challenge'}</h1>
                <p className="math-challenge-screen__description">
                    {challenge?.description || 'Explore mathematical concepts used in Zero-Knowledge proofs.'}
                </p>
            </div>

            <div className="math-challenge-screen__content">
                {renderChallenge()}
            </div>

            <div className="math-challenge-screen__footer">
                <button className="math-challenge-screen__exit-button" onClick={onExit}>
                    Exit Challenge
                </button>
            </div>
        </animated.div>
    );
}

MathChallengeScreen.propTypes = {
    challenge: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        type: PropTypes.string.isRequired
    }),
    onComplete: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired
};

export default MathChallengeScreen;