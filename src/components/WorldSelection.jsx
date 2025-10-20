// Update to WorldSelection.jsx to include Math Foundations world

import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import useGameStore from '../store/gameStore';
import scenariosData from '../data/scenarios';
import './WorldSelection.css';

/**
 * WorldSelection component - shows available game worlds
 * @param {Object} props - Component props 
 * @param {Function} props.onWorldSelect - Handler for world selection
 * @param {Function} props.onBackClick - Handler for back button click
 * @param {Function} props.onMathWorldSelect - Handler for Math World selection
 * @returns {React.Element} The rendered WorldSelection component
 */
function WorldSelection({ onWorldSelect, onBackClick, onMathWorldSelect }) {
  // Use flattened store structure - get completedScenarios directly
  const { completedScenarios, unlockedWorlds } = useGameStore();

  // Define available worlds - use scenariosData for existing worlds, hardcode future worlds
  const availableWorlds = Object.keys(scenariosData).map(worldId => {
    const worldData = scenariosData[worldId];
    const isUnlocked = unlockedWorlds.includes(worldId);
    const scenarioCount = worldData?.scenarios?.length || 0;
    const completedCount = getCompletedScenariosCount(worldId);

    return {
      id: worldId,
      name: worldData.name,
      description: worldData.description,
      isUnlocked: isUnlocked,
      isCompleted: completedCount === scenarioCount,
      scenarioCount: scenarioCount,
      completedScenarios: completedCount,
    };
  });

  // Create a copy of availableWorlds
  const worldsWithMath = [...availableWorlds];
  
  // Find math world if it exists
  const mathWorldIndex = worldsWithMath.findIndex(world => world.id === 'math-world');
  
  if (mathWorldIndex >= 0) {
    // Update the existing math world with required properties
    worldsWithMath[mathWorldIndex] = {
      ...worldsWithMath[mathWorldIndex],
      isUnlocked: true,  // Always unlock math world
      isMathWorld: true  // Mark as math world
    };
  }

  // Add hardcoded future worlds
  const futureWorlds = [
    {
      id: 'world-3',
      name: 'ZK in DeFi',
      description: 'Apply Zero-Knowledge proofs to decentralized finance use cases',
      isUnlocked: false,
      isCompleted: false,
      scenarioCount: 5,
      completedScenarios: 0,
    },
    {
      id: 'world-4',
      name: 'Identity & Privacy',
      description: 'Build privacy-preserving identity solutions with Zero-Knowledge proofs',
      isUnlocked: false,
      isCompleted: false,
      scenarioCount: 5,
      completedScenarios: 0,
    },
  ];

  // Combine all worlds
  const worlds = [...worldsWithMath, ...futureWorlds];

  // Animation for page entry
  const pageSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 120, friction: 14 },
  });

  // Animation for cards, with staggered appearance
  const getCardSpring = (index) => useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 100 + index * 100,
    config: { tension: 170, friction: 12 },
  });

  // Get number of completed scenarios for a world
  function getCompletedScenariosCount(worldId) {
    if (!completedScenarios) return 0;

    // Get all scenarios for this world
    const worldScenarios = scenariosData[worldId]?.scenarios || [];

    // Count completed scenarios with score >= 80
    let count = 0;
    for (const scenario of worldScenarios) {
      const completedInfo = completedScenarios[scenario.id];
      if (completedInfo && completedInfo.score >= 80) {
        count++;
      }
    }

    return count;
  }

  // Handle world selection
  const handleWorldSelect = (world) => {
    if (!world.isUnlocked) return;

    // Special handling for Math World
    if (world.isMathWorld || world.id === 'math-world') {
      // Ensure we pass a consistent world object regardless of how it was created
      const mathWorldObj = {
        id: 'math-world',
        name: 'Math Foundations',
        description: 'Learn the essential mathematical concepts behind zero-knowledge proofs'
      };
      onMathWorldSelect(mathWorldObj);
    } else {
      onWorldSelect(world);
    }
  };

  return (
    <animated.div className="world-selection" style={pageSpring}>
      <div className="world-selection__header">
        <h1>Select World</h1>
        <p>Choose a world to start your Zero-Knowledge journey</p>
      </div>

      <div className="world-selection__worlds">
        {worlds.map((world, index) => (
          <animated.div
            key={world.id}
            className={`world-selection__world ${world.isUnlocked ? '' : 'world-selection__world--locked'} ${world.isMathWorld ? 'world-selection__world--math' : ''}`}
            style={getCardSpring(index)}
            onClick={() => handleWorldSelect(world)}
          >
            <div className="world-selection__world-content">
              <div className="world-selection__world-header">
                <h2>{world.name}</h2>
                <div className="world-selection__world-progress">
                  <div className="world-selection__progress-bar">
                    <div
                      className="world-selection__progress-fill"
                      style={{ width: `${(world.completedScenarios / world.scenarioCount) * 100}%` }}
                    ></div>
                  </div>
                  <span>{world.completedScenarios}/{world.scenarioCount}</span>
                </div>
              </div>

              <p className="world-selection__world-description">{world.description}</p>

              {!world.isUnlocked && (
                <div className="world-selection__world-locked-overlay">
                  <div className="world-selection__lock-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 1 1 14 0v1zm-2 0V9A5 5 0 0 0 7 9v1h10zm-6 4v4h2v-4h-2z" fill="rgba(255,255,255,0.8)" />
                    </svg>
                  </div>
                  <p>
                    {availableWorlds.some(w => w.id === world.id)
                      ? "Complete previous world to unlock"
                      : "Coming Soon"}
                  </p>
                </div>
              )}
            </div>
          </animated.div>
        ))}
      </div>

      <div className="world-selection__footer">
        <button className="world-selection__back-button" onClick={onBackClick}>
          Back to Main Menu
        </button>
      </div>
    </animated.div>
  );
}

WorldSelection.propTypes = {
  onWorldSelect: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onMathWorldSelect: PropTypes.func.isRequired
};

export default WorldSelection;