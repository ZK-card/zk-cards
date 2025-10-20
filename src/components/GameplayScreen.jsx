import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useGameStore from '../store/gameStore';
import { getCardById } from '../data/cards';
import GameBoard from './GameBoard';
import AvailableCards from './AvailableCards';
import FeedbackModal from './FeedbackModal';
import NumberTheoryChallenge from './NumberTheoryChallenge';
import MathChallengeScreen from './MathChallengeScreen';
import './GameplayScreen.css';

/**
 * GameplayScreen component - the main game interface
 */
function GameplayScreen({ scenario, onExitClick, onCompleteScenario }) {
  const {
    placedCards,
    selectedCardId,
    isSubmitting,
    score,
    feedback,
    hintsUsed,
    startScenario,
    selectCard,
    placeCard,
    removeCard,
    submitSolution,
    resetGame,
    useHint,
    completeScenario,
    allStagesFilled
  } = useGameStore();

  const [availableCards, setAvailableCards] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  // Track which stages the user has already received hints for
  const [hintedStages, setHintedStages] = useState(new Set());

  // Get card objects for the placed card IDs
  const placedCardObjects = placedCards.map(cardId => getCardById(cardId));

  // Get the selected card object
  const selectedCard = getCardById(selectedCardId);
  
  // Check if this is a math challenge scenario
  const isMathChallenge = scenario?.type && (
    scenario.type === 'number-theory' || 
    scenario.type === 'finite-field' || 
    scenario.type === 'elliptic-curve' || 
    scenario.type === 'polynomial' || 
    scenario.type === 'hash-function' || 
    scenario.type === 'discrete-log'
  );

  // Initialize game when scenario changes
  useEffect(() => {
    if (!scenario) return;
    
    startScenario(scenario);
    
    // Skip loading cards for math challenges since they don't use cards
    if (!isMathChallenge && scenario.availableCards) {
      // Load available cards
      const cardObjects = scenario.availableCards.map(cardId => getCardById(cardId)).filter(Boolean);
      setAvailableCards(cardObjects);
    } else {
      // For math challenges, set empty cards array
      setAvailableCards([]);
    }

    // Reset hinted stages when starting a new scenario
    setHintedStages(new Set());
  }, [scenario, startScenario, isMathChallenge]);

  // Handle card selection
  const handleCardSelect = (card) => {
    selectCard(card.id);
  };

  // Handle stage click for card placement
  const handleStageClick = (stageIndex) => {
    if (selectedCardId && !placedCards[stageIndex]) {
      placeCard(selectedCardId, stageIndex);
    }
  };

  // Handle solution submission
  const handleSubmit = () => {
    if (!scenario) return;

    // Check if all slots are filled
    if (!allStagesFilled()) {
      alert('Please place cards in all stages before submitting your solution.');
      return;
    }

    // Submit solution for scoring
    submitSolution(scenario);
  };

  // Handle continue after feedback
  const handleContinue = () => {
    const minimumScore = scenario?.completionCriteria?.minimumScore || 80;

    if (score >= minimumScore) {
      completeScenario(scenario.id, score);
      onCompleteScenario(score);
    } else {
      resetGame();
      // Reset hinted stages when restarting
      setHintedStages(new Set());
    }
  };

  // Improved hint generation function that only decreases counter for new stages
  const handleHint = () => {
    if (!scenario || hintsUsed >= 3) return;

    // Find first empty stage or use index 0
    const emptyStageIndex = placedCards.findIndex(cardId => cardId === null);
    const currentStageIndex = emptyStageIndex >= 0 ? emptyStageIndex : 0;
    const currentStage = scenario.stages[currentStageIndex];

    // Check if this stage has already been hinted
    const isNewStageHint = !hintedStages.has(currentStage.id);

    // Find the predefined hint for the current stage
    let hint = '';
    if (scenario.hints && scenario.hints.length > 0) {
      const stageHint = scenario.hints.find(h => h.stage === currentStage.id);
      if (stageHint) {
        hint = stageHint.text;
      }
    }

    // Fallback to generated hint if no predefined hint is found
    if (!hint) {
      if (currentStage.optimalCards && currentStage.optimalCards.length > 0) {
        const optimalCardId = currentStage.optimalCards[0];
        const optimalCard = getCardById(optimalCardId);

        if (optimalCard) {
          hint = `For the "${currentStage.name}" stage, consider a ${optimalCard.category} card that addresses ${currentStage.description}.`;
        }
      } else if (currentStage.optimalCard) {
        const optimalCard = getCardById(currentStage.optimalCard);

        if (optimalCard) {
          hint = `For the "${currentStage.name}" stage, consider a ${optimalCard.category} card that addresses ${currentStage.description}.`;
        }
      } else {
        hint = `For the "${currentStage.name}" stage, look for a card that addresses: ${currentStage.description}`;
      }
    }

    // Set current hint and show hint modal
    setCurrentHint(hint);
    setShowHint(true);

    // Only decrease hint counter if this is a new stage
    if (isNewStageHint) {
      useHint();
      // Add this stage to the hinted stages set
      setHintedStages(prevHinted => new Set([...prevHinted, currentStage.id]));
    }
  };

  // Handle math challenge completion
  const handleMathChallengeComplete = () => {
    // Set a high score for math challenges
    const mathScore = 95;
    completeScenario(scenario.id, mathScore);
    onCompleteScenario(mathScore);
  };

  // Render math challenge if this is a math scenario
  if (isMathChallenge) {
    return (
      <MathChallengeScreen 
        challenge={{
          id: scenario.id,
          name: scenario.name,
          description: scenario.description,
          type: scenario.type
        }}
        onComplete={handleMathChallengeComplete}
        onExit={onExitClick}
      />
    );
  }

  // Regular card game UI for normal scenarios
  return (
    <div className="gameplay-screen">
      {/* Header */}
      <div className="gameplay-screen__header">
        <div className="gameplay-screen__scenario-info">
          <h1>{scenario?.name}</h1>
          <p>{scenario?.description}</p>
        </div>

        <div className="gameplay-screen__actions">
          <button
            className="gameplay-screen__hint-button"
            onClick={handleHint}
            disabled={isSubmitting || hintsUsed >= 3}
          >
            Get Hint ({3 - hintsUsed} left)
          </button>

          <button
            className="gameplay-screen__exit-button"
            onClick={onExitClick}
          >
            Exit
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="gameplay-screen__content">
        <div className="gameplay-screen__board-container">
          <GameBoard
            stages={scenario?.stages?.map(stage => ({
              ...stage,
              // Add acceptableCards if it doesn't exist
              acceptableCards: stage.acceptableCards || []
            })) || []}
            placedCards={placedCardObjects}
            selectedCard={selectedCard}
            onStageClick={handleStageClick}
            onCardRemove={removeCard}
            isSubmitting={isSubmitting}
          />

          <div className="gameplay-screen__controls">
            <button
              className="gameplay-screen__reset-button"
              onClick={resetGame}
              disabled={isSubmitting}
            >
              Reset Solution
            </button>

            <button
              className="gameplay-screen__submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting || !allStagesFilled()}
            >
              Submit Solution
            </button>
          </div>
        </div>

        <AvailableCards
          cards={availableCards}
          placedCards={placedCards}
          selectedCard={selectedCard}
          onCardSelect={handleCardSelect}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Hint modal */}
      {showHint && (
        <div className="gameplay-screen__hint-modal">
          <div className="gameplay-screen__hint-content">
            <h3>Hint</h3>
            <p>{currentHint}</p>
            <button onClick={() => setShowHint(false)}>Got it</button>
          </div>
        </div>
      )}

      {/* Feedback modal */}
      {isSubmitting && (
        <FeedbackModal
          score={score}
          feedback={feedback}
          minimumScore={scenario?.completionCriteria?.minimumScore || 80}
          onContinue={handleContinue}
          onTryAgain={resetGame}
        />
      )}
    </div>
  );
}

GameplayScreen.propTypes = {
  scenario: PropTypes.object,
  onExitClick: PropTypes.func.isRequired,
  onCompleteScenario: PropTypes.func.isRequired
};

export default GameplayScreen;