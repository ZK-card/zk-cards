import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import cardsData, { getCardById } from '../data/cards';

/**
 * Simplified Game state store using Zustand
 */
const useGameStore = create(
  persist(
    (set, get) => ({
      // Player progress - flattened structure
      completedScenarios: {}, // { scenarioId: { score } }
      unlockedWorlds: ['world-1'], // Start with first world unlocked
      tutorialCompleted: false,

      // Current game state - simplified
      placedCards: [],
      selectedCardId: null,
      hintsUsed: 0,
      score: 0,
      feedback: null,
      isSubmitting: false,

      // Actions
      completeTutorial: () => set({ tutorialCompleted: true }),

      completeScenario: (scenarioId, score) => set((state) => ({
        completedScenarios: {
          ...state.completedScenarios,
          [scenarioId]: { score }
        }
      })),

      // Add unlock world function
      unlockWorld: (worldId) => set((state) => ({
        unlockedWorlds: [...new Set([...state.unlockedWorlds, worldId])]
      })),

      startScenario: (scenario) => {
        if (!scenario) return;
        set({
          placedCards: Array(scenario.stages ? scenario.stages.length : 0).fill(null),
          selectedCardId: null,
          hintsUsed: 0,
          score: 0,
          feedback: null,
          isSubmitting: false
        });
      },

      selectCard: (cardId) => set({ selectedCardId: cardId }),

      placeCard: (cardId, stageIndex) => set((state) => {
        const newPlacedCards = [...state.placedCards];
        newPlacedCards[stageIndex] = cardId;
        return { placedCards: newPlacedCards, selectedCardId: null };
      }),

      removeCard: (stageIndex) => set((state) => {
        const newPlacedCards = [...state.placedCards];
        newPlacedCards[stageIndex] = null;
        return { placedCards: newPlacedCards };
      }),

      useHint: () => set((state) => ({
        hintsUsed: state.hintsUsed + 1
      })),

      // Updated submission logic that properly handles alternative paths
      submitSolution: (scenario) => {
        if (!scenario) return 0;

        const { placedCards, hintsUsed } = get();

        // First, check if this solution matches any alternative path
        // This should be done BEFORE calculating individual stage scores
        if (scenario.alternativePaths && scenario.alternativePaths.length > 0) {
          for (const altPath of scenario.alternativePaths) {
            // Important: Make sure placedCards doesn't contain null values
            const cleanPlacedCards = placedCards.filter(card => card !== null);

            // Compare arrays using JSON.stringify for exact matching
            if (JSON.stringify(cleanPlacedCards) === JSON.stringify(altPath.path)) {
              // Found a matching alternative path - use its score
              const altScore = altPath.effectivenessScore;
              const finalScore = Math.max(0, altScore - (hintsUsed * 5));

              // Update game state
              set({
                score: finalScore,
                feedback: getFeedback(scenario, finalScore),
                isSubmitting: true
              });

              return finalScore;
            }
          }
        }

        // If no alternative path matched, calculate score based on individual card placements
        let score = 0;
        const stagePoints = 100 / placedCards.length;

        for (let i = 0; i < placedCards.length; i++) {
          const cardId = placedCards[i];
          const stage = scenario.stages[i];

          if (!cardId || !stage) continue;

          // Check optimal cards (which may be an array in the updated format)
          if (stage.optimalCards && stage.optimalCards.includes(cardId)) {
            score += stagePoints;
          }
          // Check for single optimal card (older format)
          else if (stage.optimalCard && cardId === stage.optimalCard) {
            score += stagePoints;
          }
          // Check acceptable cards
          else if (stage.acceptableCards && stage.acceptableCards.includes(cardId)) {
            score += stagePoints * 0.7; // 70% of points for acceptable
          }
          // Any card placed
          else {
            score += stagePoints * 0.3; // 30% for any card
          }
        }

        // Adjust for hints
        score = Math.max(0, score - (hintsUsed * 5));
        const finalScore = Math.round(score);

        // Update state
        set({
          score: finalScore,
          feedback: getFeedback(scenario, finalScore),
          isSubmitting: true
        });

        return finalScore;
      },

      resetGame: () => set((state) => ({
        placedCards: Array(state.placedCards.length).fill(null),
        isSubmitting: false,
        score: 0,
        feedback: null
      })),

      // Utility for checking if all stages have cards
      allStagesFilled: () => {
        return get().placedCards.every(card => card !== null);
      }
    }),
    {
      name: 'zk-card-clash-storage',
      partialize: (state) => ({
        completedScenarios: state.completedScenarios,
        unlockedWorlds: state.unlockedWorlds,
        tutorialCompleted: state.tutorialCompleted
      }),
    }
  )
);

// Helper function to generate feedback based on score
function getFeedback(scenario, score) {
  if (scenario.feedbackContent) {
    // New format
    if (score >= 90) {
      return scenario.feedbackContent.optimal;
    } else if (score >= 70) {
      return scenario.feedbackContent.good;
    } else if (score >= 50) {
      return scenario.feedbackContent.suboptimal;
    } else {
      return scenario.feedbackContent.incorrect;
    }
  } else if (scenario.feedbackMessages) {
    // Old format
    if (score >= 90) {
      return scenario.feedbackMessages.excellent;
    } else if (score >= 70) {
      return scenario.feedbackMessages.good;
    } else {
      return scenario.feedbackMessages.needsImprovement;
    }
  } else {
    return "Thanks for submitting your solution!";
  }
}

export default useGameStore;