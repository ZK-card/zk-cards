/**
 * Template for new worlds - Copy this file to create a new world
 */
const newWorldScenarios = {
    id: 'world-x',  // Change this to a unique ID (e.g., 'world-3')
    name: 'New World Name',
    description: 'Brief description of this world and its focus',
    scenarios: [
        {
            id: 'scenario-1',
            name: 'Scenario Name',
            description: 'Brief description of the scenario challenge',
            difficulty: 3,  // 1-5 scale
            hints: [
                {
                    stage: 'stage-id-1',
                    text: "Hint text for the first stage"
                },
                // Add more hints for other stages
            ],
            stages: [
                {
                    id: 'stage-id-1',
                    name: 'Stage Name',
                    description: 'Description of what this stage requires',
                    acceptableCards: ['card-id-1', 'card-id-2', 'card-id-3', 'card-id-4'],
                    optimalCards: ['card-id-1']  // Best card(s) for this stage
                },
                // Add more stages as needed
            ],
            availableCards: [
                // List of card IDs available for this scenario
                'card-id-1', 'card-id-2', 'card-id-3', 'card-id-4', 'card-id-5', 'card-id-6'
            ],
            optimalPath: [
                // List of card IDs that form the optimal solution path
                'card-id-1', 'card-id-3', 'card-id-5'
            ],
            alternativePaths: [
                {
                    path: ['card-id-2', 'card-id-4', 'card-id-6'],
                    effectivenessScore: 85
                },
                // Add more alternative paths as needed
            ],
            completionCriteria: {
                minimumScore: 80
            },
            feedbackContent: {
                optimal: "Feedback for optimal solution (90-100% score)",
                good: "Feedback for good solution (70-89% score)",
                suboptimal: "Feedback for suboptimal solution (50-69% score)",
                incorrect: "Feedback for incorrect solution (below 50% score)"
            }
        },
        // Add more scenarios as needed
    ]
};

export default newWorldScenarios;