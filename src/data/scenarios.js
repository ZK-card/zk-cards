/**
 * Main scenarios index file that aggregates all worlds
 */
import zkFoundationsScenarios from './worlds/zkfoundations-scenarios';
import privacyScenarios from './worlds/privacy-scenarios';
import mathFoundationsScenarios from './worlds/math-foundations-scenarios';

// Aggregate all worlds into a single object
const scenarios = {
  [zkFoundationsScenarios.id]: zkFoundationsScenarios,
  [privacyScenarios.id]: privacyScenarios,
  [mathFoundationsScenarios.id]: mathFoundationsScenarios,
  // Add additional worlds here as they are created
  // Example: [defiScenarios.id]: defiScenarios,
};

export default scenarios;