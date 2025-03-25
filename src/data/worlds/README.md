# World Scenarios

This directory contains scenario data for each world in ZK Card Clash.

## Adding a New World

To add a new world:

1. Copy `world-template.js` and rename it according to your world (e.g., `defi-scenarios.js`)
2. Edit the file to add your world's scenarios, stages, and card requirements
3. Import your new world module in `src/data/scenarios.js` and add it to the scenarios object

## World Structure

Each world file follows this structure:

```javascript
const worldScenarios = {
  id: 'world-id',
  name: 'World Name',
  description: 'World description',
  scenarios: [
    // Array of scenario objects
  ]
};
```

Scenario Structure
Each scenario should include:

Basic information (id, name, description, difficulty)
Hints for each stage
Stages with their requirements
Available cards for the scenario
Optimal and alternative solution paths
Completion criteria
Feedback for different solution qualities

See world-template.js for a detailed example structure.

