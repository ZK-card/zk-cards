import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import ModuloQuest from './modules/ModuloQuest';
import FiniteFieldExplorer from './modules/FiniteFieldExplorer';
import HashHunt from './modules/HashHunt';
import './MathWorld.css';

// Math modules configuration
const mathModules = [
  {
    id: 'modulo-quest',
    name: 'Modulo Quest',
    description: 'Master the basics of modular arithmetic - the foundation of ZK cryptography',
    icon: '🕒',
    difficulty: 1,
    component: ModuloQuest,
    unlocked: true,
  },
  {
    id: 'finite-field-explorer',
    name: 'Finite Field Explorer',
    description: 'Discover the properties of finite fields used in cryptographic protocols',
    icon: '🔢',
    difficulty: 2,
    component: FiniteFieldExplorer,
    unlocked: false,
  },
  {
    id: 'hash-hunt',
    name: 'Hash Hunt',
    description: 'Learn how cryptographic hash functions work through interactive challenges',
    icon: '🔍',
    difficulty: 2,
    component: HashHunt,
    unlocked: false,
  }
];

const MathWorld = ({ onBackClick }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  
  // Animation for page entry
  const pageSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 120, friction: 14 },
  });
  
  // Return to module selection
  const handleBackToModules = () => {
    setSelectedModule(null);
  };
  
  // Handle module completion
  const handleModuleComplete = (moduleId, score) => {
    // Here we would update the store to mark module as completed
    // and potentially unlock the next module
    setSelectedModule(null);
  };
  
  // Render selected module or module selection screen
  if (selectedModule) {
    const ModuleComponent = selectedModule.component;
    return (
      <div className="math-world">
        <div className="math-world__header">
          <button 
            className="math-world__back-button" 
            onClick={handleBackToModules}
          >
            ← Back to Modules
          </button>
          <h1>{selectedModule.name}</h1>
        </div>
        <ModuleComponent onComplete={(score) => handleModuleComplete(selectedModule.id, score)} />
      </div>
    );
  }

  return (
    <animated.div className="math-world" style={pageSpring}>
      <div className="math-world__header">
        <button 
          className="math-world__back-button" 
          onClick={onBackClick}
        >
          ← Back to Worlds
        </button>
        <h1>Math Foundations</h1>
        <p className="math-world__description">
          Master the mathematical concepts behind zero-knowledge proofs through interactive challenges
        </p>
      </div>
      
      <div className="math-world__modules">
        {mathModules.map((module, index) => (
          <div 
            key={module.id}
            className={`math-world__module ${module.unlocked ? '' : 'math-world__module--locked'}`}
            onClick={() => module.unlocked && setSelectedModule(module)}
          >
            <div className="math-world__module-icon">{module.icon}</div>
            <div className="math-world__module-content">
              <h2>{module.name}</h2>
              <div className="math-world__module-difficulty">
                {'⭐'.repeat(module.difficulty)}
              </div>
              <p>{module.description}</p>
            </div>
            {!module.unlocked && (
              <div className="math-world__module-locked">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" 
                  fill="currentColor"/>
                </svg>
                <p>Complete previous modules to unlock</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </animated.div>
  );
};

export default MathWorld;