import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import useGameStore from '../store/gameStore';
import './TutorialScreen.css';

// Import tutorial images
import welcomeImage from '/images/tutorial-welcome.svg';
import scenarioImage from '/images/tutorial-scenario.svg';
import cardsImage from '/images/tutorial-cards.svg';
import solutionImage from '/images/tutorial-solution.svg';
import submitImage from '/images/tutorial-submit.svg';
import completeImage from '/images/tutorial-complete.svg';

/**
 * TutorialScreen component - guides the user through gameplay
 * @param {Object} props - Component props
 * @param {Function} props.onComplete - Handler when tutorial is completed
 * @param {Function} props.onSkip - Handler when tutorial is skipped
 * @returns {React.Element} The rendered TutorialScreen component
 */
function TutorialScreen({ onComplete, onSkip }) {
  const [currentStep, setCurrentStep] = useState(0);
  const completeTutorial = useGameStore(state => state.completeTutorial);

  // Tutorial steps
  const tutorialSteps = [
    {
      title: "Welcome to ZK Card Clash!",
      content: "This tutorial will guide you through the basics of the game. ZK Card Clash is an educational card game that teaches you about Zero-Knowledge technologies through solving practical challenges.",
      image: welcomeImage,
    },
    {
      title: "Understanding the Challenge",
      content: "Each scenario presents a real-world problem that can be solved using Zero-Knowledge technologies. Read the scenario description carefully to understand what you need to accomplish.",
      image: scenarioImage,
    },
    {
      title: "Using Your Cards",
      content: "You'll have access to various ZK technology cards. Each card has different capabilities, limitations, and attributes. Select a card by clicking on it, then click on a stage to place it.",
      image: cardsImage,
    },
    {
      title: "Creating a Solution",
      content: "To solve a scenario, you need to place appropriate cards in each stage of the solution pathway. The stages represent different components of your solution.",
      image: solutionImage,
    },
    {
      title: "Submitting Your Solution",
      content: "Once you've placed cards in all stages, you can submit your solution. The system will evaluate it and provide feedback on your approach.",
      image: submitImage,
    },
    {
      title: "Ready to Play!",
      content: "You've completed the tutorial! You now know the basics of ZK Card Clash. Continue to start your journey into Zero-Knowledge technologies!",
      image: completeImage,
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
      completeTutorial();
      onComplete();
    }
  };

  // Handle skip tutorial button
  const handleSkipTutorial = () => {
    completeTutorial();
    onSkip();
  };

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <div className="tutorial-screen">
      <div className="tutorial-screen__content">
        <div className="tutorial-screen__progress">
          <div
            className="tutorial-screen__progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <animated.div className="tutorial-screen__step" style={contentSpring}>
          <h1 className="tutorial-screen__title">{tutorialSteps[currentStep].title}</h1>

          <div className="tutorial-screen__image-container">
            <img
              src={tutorialSteps[currentStep].image}
              alt={tutorialSteps[currentStep].title}
              className="tutorial-screen__image"
            />
          </div>

          <p className="tutorial-screen__description">{tutorialSteps[currentStep].content}</p>

          <div className="tutorial-screen__buttons">
            {currentStep < tutorialSteps.length - 1 ? (
              <button
                className="tutorial-screen__next-button"
                onClick={handleNextStep}
              >
                Next
              </button>
            ) : (
              <button
                className="tutorial-screen__complete-button"
                onClick={handleNextStep}
              >
                Start Playing
              </button>
            )}

            {currentStep < tutorialSteps.length - 1 && (
              <button
                className="tutorial-screen__skip-button"
                onClick={handleSkipTutorial}
              >
                Skip Tutorial
              </button>
            )}
          </div>
        </animated.div>
      </div>
    </div>
  );
}

TutorialScreen.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

export default TutorialScreen;