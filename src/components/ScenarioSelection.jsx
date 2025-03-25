import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import useGameStore from '../store/gameStore';
import scenariosData from '../data/scenarios';
import './ScenarioSelection.css';

/**
 * ScenarioSelection component - shows scenarios for a selected world
 * @param {Object} props - Component props
 * @param {Object} props.world - Selected world data
 * @param {Function} props.onScenarioSelect - Handler for scenario selection
 * @param {Function} props.onBackClick - Handler for back button click
 * @returns {React.Element} The rendered ScenarioSelection component
 */
function ScenarioSelection({ world, onScenarioSelect, onBackClick }) {
  // Get completedScenarios directly from the flattened store structure
  const { completedScenarios } = useGameStore();
  const [scenarios, setScenarios] = useState([]);

  // Load scenarios for the selected world
  useEffect(() => {
    if (world && scenariosData[world.id]) {
      const worldScenarios = scenariosData[world.id].scenarios.map(scenario => ({
        ...scenario,
        isCompleted: isScenarioCompleted(scenario.id),
        isLocked: isScenarioLocked(scenario.id, scenariosData[world.id].scenarios),
      }));

      setScenarios(worldScenarios);
    }
  }, [world, completedScenarios]);

  // Check if a scenario is completed
  function isScenarioCompleted(scenarioId) {
    return !!completedScenarios[scenarioId];
  }

  // Check if a scenario is locked
  // Updated to require 80+ score for unlocking
  function isScenarioLocked(scenarioId, allScenarios) {
    // First scenario is always unlocked
    if (scenarioId === allScenarios[0].id) {
      return false;
    }

    // Find previous scenario
    const currentIndex = allScenarios.findIndex(s => s.id === scenarioId);
    if (currentIndex <= 0) return false;

    const previousScenarioId = allScenarios[currentIndex - 1].id;

    // A scenario is unlocked if the previous one is completed with a score of 80 or higher
    const previousScenario = completedScenarios[previousScenarioId];
    return !previousScenario || previousScenario.score < 80;
  }

  // Animation for page entry
  const pageSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 120, friction: 14 },
  });

  // Handle scenario selection
  const handleScenarioSelect = (scenario) => {
    if (!scenario.isLocked) {
      onScenarioSelect(scenario);
    }
  };

  // Get score for a scenario
  function getScenarioScore(scenarioId) {
    return completedScenarios[scenarioId]?.score || 0;
  }

  // Display difficulty stars
  const renderDifficultyStars = (difficulty) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`scenario-selection__difficulty-star ${i < difficulty ? 'scenario-selection__difficulty-star--active' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <animated.div className="scenario-selection" style={pageSpring}>
      <div className="scenario-selection__header">
        <h1>{world?.name}</h1>
        <p>{world?.description}</p>
      </div>

      <div className="scenario-selection__scenarios">
        {scenarios.map((scenario, index) => (
          <div
            key={scenario.id}
            className={`scenario-selection__scenario ${scenario.isLocked ? 'scenario-selection__scenario--locked' : ''} ${scenario.isCompleted ? 'scenario-selection__scenario--completed' : ''}`}
            onClick={() => handleScenarioSelect(scenario)}
          >
            <div className="scenario-selection__scenario-content">
              <div className="scenario-selection__scenario-header">
                <h2>
                  <span className="scenario-selection__scenario-number">{index + 1}</span>
                  {scenario.name}
                </h2>

                <div className="scenario-selection__difficulty">
                  {renderDifficultyStars(scenario.difficulty)}
                </div>
              </div>

              <p className="scenario-selection__scenario-description">{scenario.description}</p>

              {scenario.isCompleted && (
                <div className="scenario-selection__completion-badge">
                  <div className="scenario-selection__checkmark">✓</div>
                  <span className="scenario-selection__score">{getScenarioScore(scenario.id)}%</span>
                </div>
              )}

              {scenario.isLocked && (
                <div className="scenario-selection__locked-overlay">
                  <div className="scenario-selection__lock-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 1 1 14 0v1zm-2 0V9A5 5 0 0 0 7 9v1h10zm-6 4v4h2v-4h-2z" fill="rgba(255,255,255,0.8)" />
                    </svg>
                  </div>
                  <p>Complete previous scenario with 80% or higher score to unlock</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="scenario-selection__footer">
        <button className="scenario-selection__back-button" onClick={onBackClick}>
          Back to World Selection
        </button>
      </div>
    </animated.div>
  );
}

ScenarioSelection.propTypes = {
  world: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  onScenarioSelect: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default ScenarioSelection;