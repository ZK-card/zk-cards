// Updated App.jsx with Math Tutorial integration
import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import WorldSelection from './components/WorldSelection';
import ScenarioSelection from './components/ScenarioSelection';
import GameplayScreen from './components/GameplayScreen';
import TutorialScreen from './components/TutorialScreen';
import MathTutorialScreen from './components/MathTutorialScreen'; // Import the MathTutorialScreen
import AboutScreen from './components/AboutScreen';
import WorldCompletionScreen from './components/WorldCompletionScreen';
import ExpansionPlanScreen from './components/ExpansionPlanScreen';
import useGameStore from './store/gameStore';
import scenariosData from './data/scenarios';

/**
 * Main App component that handles navigation between different screens
 */
function App() {
  // Screen state to manage navigation
  const [currentScreen, setCurrentScreen] = useState('main-menu');
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);

  // Access game store for player progress
  const {
    completedScenarios,
    tutorialCompleted,
    mathTutorialCompleted, // New state for math tutorial completion
    startScenario,
    completeScenario,
    completeMathTutorial, // New action to mark math tutorial as completed
  } = useGameStore();

  // Check if tutorial has been completed on initial load
  useEffect(() => {
    if (!tutorialCompleted) {
      setCurrentScreen('tutorial');
    }
  }, [tutorialCompleted]);

  // Check if a world is completed including a newly completed scenario
  const isWorldCompleted = (worldId, currentScenarioId, currentScore) => {
    const worldScenarios = scenariosData[worldId]?.scenarios || [];

    return worldScenarios.every(scenario => {
      // If this is the scenario that was just completed
      if (scenario.id === currentScenarioId) {
        return currentScore >= 80;
      }
      // Otherwise check the store data
      const completedScenario = completedScenarios[scenario.id];
      return completedScenario && completedScenario.score >= 80;
    });
  };

  // Navigation handlers
  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const handleWorldSelect = (world) => {
    setSelectedWorld(world);

    // If selecting the math world and tutorial not completed, show the math tutorial first
    if (world.id === 'math-world' && !mathTutorialCompleted) {
      setCurrentScreen('math-tutorial');
    } else {
      setCurrentScreen('scenario-selection');
    }
  };

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
    startScenario(scenario);
    setCurrentScreen('gameplay');
  };

  const handleBackToMainMenu = () => {
    setCurrentScreen('main-menu');
    setSelectedWorld(null);
    setSelectedScenario(null);
  };

  const handleBackToWorldSelection = () => {
    setCurrentScreen('world-selection');
    setSelectedWorld(null);
  };

  const handleBackToScenarioSelection = () => {
    setCurrentScreen('scenario-selection');
    setSelectedScenario(null);
  };

  const handleMathTutorialComplete = () => {
    completeMathTutorial(); // Mark the math tutorial as completed in the store
    setCurrentScreen('scenario-selection');
  };

  const handleMathTutorialSkip = () => {
    completeMathTutorial(); // Mark the math tutorial as completed in the store
    setCurrentScreen('scenario-selection');
  };

  const handleRevisitMathTutorial = () => {
    setCurrentScreen('math-tutorial');
  };

  const handleScenarioComplete = (score) => {
    if (!selectedScenario || !selectedWorld) return;

    // Find the current world's scenarios
    const worldScenarios = scenariosData[selectedWorld.id]?.scenarios || [];
    const currentIndex = worldScenarios.findIndex(s => s.id === selectedScenario.id);

    // Always store the completion
    completeScenario(selectedScenario.id, score);

    // Check if this scenario completes the world
    if (currentIndex === worldScenarios.length - 1 && score >= 80) {
      if (isWorldCompleted(selectedWorld.id, selectedScenario.id, score)) {
        // Unlock the next world if it exists
        const worldIds = Object.keys(scenariosData);
        const nextWorldIndex = worldIds.indexOf(selectedWorld.id) + 1;

        if (nextWorldIndex < worldIds.length) {
          useGameStore.getState().unlockWorld(worldIds[nextWorldIndex]);
        }

        setCurrentScreen('world-completion');
        return;
      }
    }

    // Continue to next scenario or back to selection
    if (currentIndex < worldScenarios.length - 1 && score >= 80) {
      const nextScenario = worldScenarios[currentIndex + 1];

      setCurrentScreen('scenario-selection');
      setTimeout(() => {
        setSelectedScenario(nextScenario);
        startScenario(nextScenario);
        setCurrentScreen('gameplay');
      }, 50);
    } else {
      setCurrentScreen('scenario-selection');
      setSelectedScenario(null);
    }
  };

  const handleWorldCompletionContinue = () => {
    setCurrentScreen('world-selection');
    setSelectedWorld(null);
    setSelectedScenario(null);
  };

  // Render different screens based on state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'main-menu':
        return (
          <MainMenu
            onPlayClick={() => handleNavigate('world-selection')}
            onTutorialClick={() => handleNavigate('tutorial')}
            onAboutClick={() => handleNavigate('about')}
            onExpansionPlanClick={() => handleNavigate('expansion-plan')}
          />
        );
      case 'world-selection':
        return (
          <WorldSelection
            onWorldSelect={handleWorldSelect}
            onBackClick={handleBackToMainMenu}
          />
        );
      case 'scenario-selection':
        return (
          <ScenarioSelection
            world={selectedWorld}
            onScenarioSelect={handleScenarioSelect}
            onBackClick={handleBackToWorldSelection}
            onRevisitMathTutorial={selectedWorld?.id === 'math-world' ? handleRevisitMathTutorial : undefined}
          />
        );
      case 'gameplay':
        return (
          <GameplayScreen
            scenario={selectedScenario}
            onExitClick={handleBackToScenarioSelection}
            onCompleteScenario={handleScenarioComplete}
          />
        );
      case 'tutorial':
        return (
          <TutorialScreen
            onComplete={handleBackToMainMenu}
            onSkip={handleBackToMainMenu}
          />
        );
      case 'math-tutorial':
        return (
          <MathTutorialScreen
            onComplete={handleMathTutorialComplete}
            onSkip={handleMathTutorialSkip}
          />
        );
      case 'about':
        return (
          <AboutScreen
            onBackClick={handleBackToMainMenu}
          />
        );
      case 'world-completion':
        return (
          <WorldCompletionScreen
            world={selectedWorld}
            onContinue={handleWorldCompletionContinue}
          />
        );
      case 'expansion-plan':
        return (
          <ExpansionPlanScreen
            onBackClick={handleBackToMainMenu}
          />
        );
      default:
        return <MainMenu onPlayClick={() => handleNavigate('world-selection')} />;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
}

export default App;