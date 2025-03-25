import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import './WorldCompletionScreen.css';

/**
 * WorldCompletionScreen component - displays when a world is completed
 * @param {Object} props - Component props
 * @param {Object} props.world - The completed world data
 * @param {Function} props.onContinue - Handler for continue button click
 * @returns {React.Element} The rendered WorldCompletionScreen component
 */
function WorldCompletionScreen({ world, onContinue }) {
    // Animation for page entry with staggered elements
    const containerSpring = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { tension: 120, friction: 14 },
    });

    const titleSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 300,
        config: { tension: 100, friction: 10 },
    });

    const contentSpring = useSpring({
        from: { opacity: 0, transform: 'scale(0.8)' },
        to: { opacity: 1, transform: 'scale(1)' },
        delay: 600,
        config: { tension: 120, friction: 12 },
    });

    const buttonSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(30px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 1000,
        config: { tension: 120, friction: 12 },
    });

    return (
        <animated.div className="world-completion" style={containerSpring}>
            <div className="world-completion__content">
                <animated.div className="world-completion__header" style={titleSpring}>
                    <div className="world-completion__trophy">
                        <svg viewBox="0 0 24 24" width="80" height="80">
                            <path fill="#FFD700" d="M11,10H5L3,8V6L5,4H10V2H14V4H19L21,6V8L19,10H13V15L15,17H13L11,15V10M6,8H12V6H6V8Z" />
                        </svg>
                    </div>
                    <h1>World Completed!</h1>
                </animated.div>

                <animated.div className="world-completion__details" style={contentSpring}>
                    <h2>Congratulations!</h2>
                    <p>
                        You have successfully completed <span className="world-completion__highlight">{world.name}</span>.
                        You've demonstrated a strong understanding of Zero-Knowledge technologies and
                        their practical applications!
                    </p>

                    <div className="world-completion__achievements">
                        <div className="world-completion__achievement">
                            <div className="world-completion__achievement-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="#4f46e5" d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z" />
                                </svg>
                            </div>
                            <div className="world-completion__achievement-text">
                                <h3>Master of ZK Foundations</h3>
                                <p>Completed all 5 scenarios</p>
                            </div>
                        </div>

                        <div className="world-completion__achievement">
                            <div className="world-completion__achievement-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="#10b981" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                                </svg>
                            </div>
                            <div className="world-completion__achievement-text">
                                <h3>Expert Problem Solver</h3>
                                <p>Achieved scores of 80% or higher</p>
                            </div>
                        </div>
                    </div>

                    <div className="world-completion__next-steps">
                        <h3>What's Next?</h3>
                        <p>
                            Stay tuned for more worlds and challenges coming soon! In the meantime,
                            you can revisit any scenario to experiment with different solutions or
                            try to achieve higher scores.
                        </p>
                    </div>
                </animated.div>

                <animated.div className="world-completion__footer" style={buttonSpring}>
                    <button className="world-completion__continue-button" onClick={onContinue}>
                        Continue
                    </button>
                </animated.div>
            </div>
        </animated.div>
    );
}

WorldCompletionScreen.propTypes = {
    world: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired,
    onContinue: PropTypes.func.isRequired,
};

export default WorldCompletionScreen;