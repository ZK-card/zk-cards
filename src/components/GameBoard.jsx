import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './GameBoard.css';

/**
 * GameBoard component - displays the stages and card slots
 */
function GameBoard({ stages, placedCards, selectedCard, onStageClick, onCardRemove, isSubmitting }) {
    return (
        <div className="game-board">
            {stages.map((stage, index) => (
                <div key={stage.id} className="game-board__stage-container">
                    {/* Stage box */}
                    <div
                        className={`game-board__stage ${placedCards[index] ? 'game-board__stage--filled' : ''} ${!placedCards[index] && selectedCard ? 'game-board__stage--highlight' : ''}`}
                        onClick={() => !placedCards[index] && selectedCard && onStageClick(index)}
                    >
                        <div className="game-board__stage-header">
                            <div className="game-board__stage-number">{index + 1}</div>
                            <h3 className="game-board__stage-title">{stage.name}</h3>
                        </div>

                        <p className="game-board__stage-description">{stage.description}</p>

                        <div className="game-board__card-slot">
                            {placedCards[index] ? (
                                <div className="game-board__placed-card">
                                    <Card card={placedCards[index]} simplified={true} />

                                    {!isSubmitting && (
                                        <button
                                            className="game-board__remove-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onCardRemove(index);
                                            }}
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="game-board__empty-slot">
                                    {selectedCard ? (
                                        <span>Click to place selected card</span>
                                    ) : (
                                        <span>Select a card from the sidebar</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Connection line between stages */}
                    {index < stages.length - 1 && (
                        <div className="game-board__connection">
                            <svg width="40" height="20">
                                <path d="M0,10 L40,10" stroke="#818cf8" strokeWidth="2" />
                                <path d="M30,5 L40,10 L30,15" fill="none" stroke="#818cf8" strokeWidth="2" />
                            </svg>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

GameBoard.propTypes = {
    stages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            acceptableCards: PropTypes.arrayOf(PropTypes.string).isRequired,
            optimalCards: PropTypes.arrayOf(PropTypes.string),
            optimalCard: PropTypes.string
        })
    ).isRequired,
    placedCards: PropTypes.array.isRequired,
    selectedCard: PropTypes.object,
    onStageClick: PropTypes.func.isRequired,
    onCardRemove: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool
};

export default GameBoard;