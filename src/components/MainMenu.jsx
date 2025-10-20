import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import './MainMenu.css';
import zkLogo from '/images/zk-logo.svg';

/**
 * MainMenu component - the entry point of the game
 * @param {Object} props - Component props
 * @param {Function} props.onPlayClick - Handler for Play button click
 * @param {Function} props.onTutorialClick - Handler for Tutorial button click
 * @param {Function} props.onAboutClick - Handler for About button click
 * @param {Function} props.onExpansionPlanClick - Handler for Expansion Plan button click
 * @returns {React.Element} The rendered MainMenu component
 */
function MainMenu({ onPlayClick, onTutorialClick, onAboutClick, onExpansionPlanClick }) {
  // Animation for the main title
  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 120, friction: 14 },
  });

  // Animation for the buttons, staggered appearance
  const buttonSpring1 = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 300,
    config: { tension: 200, friction: 12 },
  });

  const buttonSpring2 = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 400,
    config: { tension: 200, friction: 12 },
  });

  const buttonSpring3 = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 500,
    config: { tension: 200, friction: 12 },
  });

  const buttonSpring4 = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 600,
    config: { tension: 200, friction: 12 },
  });

  return (
    <div className="main-menu">
      <div className="main-menu__background">
        <div className="main-menu__overlay"></div>
      </div>

      <div className="main-menu__content">
        <animated.div className="main-menu__title-container" style={titleSpring}>
          <div className="main-menu__logo-container">
            <img src={zkLogo} alt="ZK Card Clash Logo" className="main-menu__logo" />
          </div>
          <p className="main-menu__subtitle" style={{ color: 'black' }}>Master Zero-Knowledge technologies through strategic gameplay</p>
        </animated.div>

        <div className="main-menu__buttons">
          <animated.button
            className="main-menu__button main-menu__button--primary"
            onClick={onPlayClick}
            style={buttonSpring1}
          >
            Play Game
          </animated.button>

          <animated.button
            className="main-menu__button"
            onClick={onTutorialClick}
            style={buttonSpring2}
          >
            Tutorial
          </animated.button>

          <animated.button
            className="main-menu__button"
            onClick={onAboutClick}
            style={buttonSpring3}
          >
            About
          </animated.button>

          <animated.button
            className="main-menu__button"
            onClick={onExpansionPlanClick}
            style={buttonSpring3}
          >
            Expansion Plan
          </animated.button>

          <animated.button
            className="main-menu__button"
            onClick={() => window.open('https://y75i33evn8q.typeform.com/to/Zyrj63FI', '_blank')}
            style={buttonSpring4}
          >
            Feedback
          </animated.button>
        </div>

        <div className="main-menu__footer" style={{ color: 'black' }}>
          <span>Version 1.0 - Phase 1 MVP</span>
          <span>An educational project about Zero-Knowledge technologies created by <a href='https://github.com/hackertron/'>@hackertron</a></span>
          <span>
            <a href="https://github.com/ZK-card/zk-cards" target="_blank" rel="noopener noreferrer">
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub Logo"
                style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginLeft: '5px' }}
              />
            </a>
          </span>
          <span>Follow for more on <a href='https://x.com/zk_cards'>X</a></span>
        </div>
      </div>
    </div>
  );
}

MainMenu.propTypes = {
  onPlayClick: PropTypes.func.isRequired,
  onTutorialClick: PropTypes.func.isRequired,
  onAboutClick: PropTypes.func.isRequired,
  onExpansionPlanClick: PropTypes.func.isRequired,
};

export default MainMenu;