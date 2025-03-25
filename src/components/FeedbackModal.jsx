import React from 'react';
import PropTypes from 'prop-types';
import './FeedbackModal.css';

/**
 * FeedbackModal component - shows feedback after solution submission
 */
function FeedbackModal({ score, feedback, minimumScore, onContinue, onTryAgain }) {
    const isSuccessful = score >= minimumScore;

    return (
        <div className="feedback-modal">
            <div className="feedback-modal__content">
                <h2 className="feedback-modal__title">Solution Feedback</h2>

                <div className="feedback-modal__score-container">
                    <div className="feedback-modal__score-label">Score:</div>
                    <div className="feedback-modal__score-value">{score}</div>
                </div>

                <div className={`feedback-modal__status ${isSuccessful ? 'feedback-modal__status--success' : 'feedback-modal__status--incomplete'}`}>
                    {isSuccessful
                        ? "Scenario completed successfully!"
                        : `You need a score of at least ${minimumScore}% to complete this scenario.`
                    }
                </div>

                <p className="feedback-modal__feedback">{feedback}</p>

                <div className="feedback-modal__actions">
                    {isSuccessful ? (
                        <button
                            className="feedback-modal__button feedback-modal__button--continue"
                            onClick={onContinue}
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            className="feedback-modal__button feedback-modal__button--try-again"
                            onClick={onTryAgain || onContinue}
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

FeedbackModal.propTypes = {
    score: PropTypes.number.isRequired,
    feedback: PropTypes.string.isRequired,
    minimumScore: PropTypes.number.isRequired,
    onContinue: PropTypes.func.isRequired,
    onTryAgain: PropTypes.func
};

export default FeedbackModal;