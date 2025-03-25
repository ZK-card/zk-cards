import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import './AboutScreen.css';

/**
 * AboutScreen component - displays information about the game
 * @param {Object} props - Component props
 * @param {Function} props.onBackClick - Handler for back button click
 * @returns {React.Element} The rendered AboutScreen component
 */
function AboutScreen({ onBackClick }) {
  // Animation for page entry
  const pageSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div className="about-screen" style={pageSpring}>
      <div className="about-screen__content">
        <h1 className="about-screen__title">About ZK Cards</h1>

        <div className="about-screen__section">
          <h2>What is ZK Cards Game?</h2>
          <p>
            ZK Card Game is an educational card game focused on Zero-Knowledge technologies.
            It offers an engaging way to learn about various ZK protocols, tools, and applications
            by solving real-world privacy and verification challenges.
          </p>
        </div>

        <div className="about-screen__section">
          <h2>How to Play</h2>
          <p>
            Each scenario presents a problem that requires Zero-Knowledge technology solutions.
            Players select appropriate ZK technology cards and place them in the solution pathway to
            create an effective solution. The game evaluates your solution and provides feedback on
            your approach.
          </p>
        </div>

        <div className="about-screen__section">
          <h2>Learning Objectives</h2>
          <p>
            Through playing ZK Card Game, you will:
          </p>
          <ul>
            <li>Understand the core concepts of Zero-Knowledge proofs</li>
            <li>Learn about various ZK protocols and their applications</li>
            <li>Identify appropriate ZK technologies for different use cases</li>
            <li>Recognize the strengths and limitations of different approaches</li>
            <li>Gain insight into real-world applications of ZK technologies</li>
          </ul>
        </div>

        <div className="about-screen__section">
          <h2>About Zero-Knowledge Proofs</h2>
          <p>
            Zero-Knowledge proofs are cryptographic methods that allow one party to prove to another
            that a statement is true without revealing any additional information beyond the validity
            of the statement itself. These techniques are fundamental to privacy-preserving applications
            in blockchain, identity verification, and secure computation.
          </p>
        </div>

        <div className="about-screen__section about-screen__footer">
          <p className="about-screen__version">Version 1.0 - Phase 1 MVP</p>
          <button className="about-screen__back-button" onClick={onBackClick}>
            Back to Main Menu
          </button>
        </div>
      </div>
    </animated.div>
  );
}

AboutScreen.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};

export default AboutScreen;