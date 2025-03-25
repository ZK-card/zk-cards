/**
 * ZK Foundations World Scenarios
 */
const zkFoundationsScenarios = {
    id: 'world-1',
    name: 'ZK Foundations',
    description: 'Learn the core concepts and applications of Zero-Knowledge technologies',
    scenarios: [
        {
            id: 'private-voting',
            name: 'Anonymous Voting System',
            description: 'Build a system that allows users to vote anonymously while ensuring each person can only vote once.',
            difficulty: 1,
            // Added hints array with educational content for each stage
            hints: [
                {
                    stage: 'identity-verification',
                    text: "For identity verification, look for technology that allows proving unique identity without revealing personal information. Anonymous Credentials are particularly effective as they provide cryptographic guarantees that a person is authorized to vote without linking their identity across different voting events."
                },
                {
                    stage: 'vote-mechanism',
                    text: "When choosing a voting mechanism, consider technologies specifically designed for private voting. The Private Voting card implements zero-knowledge protocols tailored for ballot privacy while maintaining verifiability of the vote count."
                },
                {
                    stage: 'result-verification',
                    text: "For result verification, you need a technology that can efficiently verify computations without a trusted setup. ZK-STARKs are well-suited for this as they provide transparent verification and quantum resistance, important properties for long-term election integrity."
                }
            ],
            stages: [
                {
                    id: 'identity-verification',
                    name: 'Identity Verification',
                    description: 'Verify each voter is eligible to participate without revealing their identity.',
                    acceptableCards: ['zk-identity', 'anonymous-credentials', 'proof-of-personhood', 'sybil-resistance'],
                    optimalCards: ['anonymous-credentials']
                },
                {
                    id: 'vote-mechanism',
                    name: 'Voting Mechanism',
                    description: 'Create a system for casting votes that preserves privacy.',
                    acceptableCards: ['zk-snarks', 'zk-starks', 'private-voting', 'semaphore'],
                    optimalCards: ['private-voting']
                },
                {
                    id: 'result-verification',
                    name: 'Result Verification',
                    description: 'Allow anyone to verify the vote count is correct without revealing individual votes.',
                    acceptableCards: ['circom', 'zk-snarks', 'zk-starks', 'marlin'],
                    optimalCards: ['zk-starks']
                }
            ],
            availableCards: ['zk-identity', 'anonymous-credentials', 'proof-of-personhood', 'sybil-resistance', 'zk-snarks', 'zk-starks', 'private-voting', 'plonk', 'circom', 'noir', 'marlin', 'semaphore'],
            optimalPath: ['anonymous-credentials', 'private-voting', 'zk-starks'],
            alternativePaths: [
                {
                    path: ['proof-of-personhood', 'zk-snarks', 'zk-starks'],
                    effectivenessScore: 85
                },
                {
                    path: ['zk-identity', 'semaphore', 'zk-snarks'],
                    effectivenessScore: 80
                }
            ],
            completionCriteria: {
                minimumScore: 80
            },
            feedbackContent: {
                optimal: "Excellent solution! Using Anonymous Credentials for identity verification, Private Voting for the voting mechanism, and zk-starks for result verification provides a comprehensive privacy-preserving voting system.",
                good: "Good approach! Your solution effectively preserves voting privacy with strong zero-knowledge technologies.",
                suboptimal: "Your solution has some privacy preservation, but could be improved by selecting more complementary ZK technologies.",
                incorrect: "This solution fails to provide adequate privacy and verifiability for an anonymous voting system."
            }
        },
        {
            id: 'confidential-transactions',
            name: 'Confidential Transactions',
            description: 'Develop a system for financial transactions that hide the amount while proving it is valid.',
            difficulty: 2,
            // Added hints for this scenario
            hints: [
                {
                    stage: 'balance-proof',
                    text: "For balance verification, you need technology specifically designed for proving numeric ranges without revealing the actual values. Bulletproofs are ideal here as they're specifically optimized for efficient range proofs without requiring a trusted setup, perfect for proving a user has sufficient funds without disclosing their balance."
                },
                {
                    stage: 'transaction-mechanism',
                    text: "For the transaction processing stage, look for a technology that specializes in private financial transfers. Private Transactions technology allows for confidential transfer amounts while still enabling verification that no new money is created in the transaction."
                },
                {
                    stage: 'implementation',
                    text: "When implementing confidential transactions at scale, consider layer-2 technologies that batch multiple private transactions. ZK-Rollups provide the scalability needed for a financial system while maintaining privacy and inheriting security from the underlying blockchain."
                }
            ],
            stages: [
                {
                    id: 'balance-proof',
                    name: 'Balance Verification',
                    description: 'Prove a user has sufficient funds without revealing their balance.',
                    acceptableCards: ['bulletproofs', 'zk-snarks', 'private-transactions', 'private-smart-contracts'],
                    optimalCards: ['bulletproofs']
                },
                {
                    id: 'transaction-mechanism',
                    name: 'Transaction Processing',
                    description: 'Process transactions with hidden amounts that can be verified as valid.',
                    acceptableCards: ['zk-snarks', 'private-transactions', 'shielded-pool', 'private-smart-contracts'],
                    optimalCards: ['private-transactions']
                },
                {
                    id: 'implementation',
                    name: 'Implementation Layer',
                    description: 'Choose a system to implement the confidential transaction protocol.',
                    acceptableCards: ['circom', 'noir', 'zk-rollups', 'zkevm'],
                    optimalCards: ['zk-rollups']
                }
            ],
            availableCards: ['bulletproofs', 'zk-snarks', 'private-transactions', 'private-smart-contracts', 'shielded-pool', 'circom', 'noir', 'zk-rollups', 'zkevm', 'validium'],
            optimalPath: ['bulletproofs', 'private-transactions', 'zk-rollups'],
            alternativePaths: [
                {
                    path: ['zk-snarks', 'shielded-pool', 'zkevm'],
                    effectivenessScore: 85
                },
                {
                    path: ['bulletproofs', 'private-smart-contracts', 'noir'],
                    effectivenessScore: 80
                }
            ],
            completionCriteria: {
                minimumScore: 80
            },
            feedbackContent: {
                optimal: "Perfect solution! Bulletproofs for range proofs, Private Transactions for confidential transfers, and ZK-Rollups for efficient implementation showcase a comprehensive privacy-preserving financial system.",
                good: "Strong approach! Your solution provides robust privacy for financial transactions.",
                suboptimal: "Your solution offers basic privacy but lacks a fully integrated approach to confidential transactions.",
                incorrect: "This approach fails to provide adequate privacy and verifiability for confidential transactions."
            }
        },
        {
            id: 'identity-verification',
            name: 'Selective Identity Disclosure',
            description: 'Create a system that allows users to prove specific attributes about themselves without revealing other information.',
            difficulty: 3,
            // Added hints for this scenario
            hints: [
                {
                    stage: 'identity-storage',
                    text: "For secure identity data management, consider solutions designed specifically for privacy-preserving identity. ZK Identity technologies allow secure storage of credentials while enabling selective, private proofs about those credentials later."
                },
                {
                    stage: 'selective-disclosure',
                    text: "The selective disclosure mechanism requires a general-purpose zero-knowledge proof system. ZK-SNARKs are ideal for this as they support complex statements about identity attributes with very small proof sizes, making them efficient for verifiers."
                },
                {
                    stage: 'verification-layer',
                    text: "For verification infrastructure, you need a platform that can execute complex smart contracts with ZK-proof verification. zkEVM provides Ethereum compatibility while supporting the verification of zero-knowledge proofs, making it ideal for identity verification infrastructure."
                }
            ],
            stages: [
                {
                    id: 'identity-storage',
                    name: 'Identity Data Management',
                    description: 'Establish a system for securely storing identity attributes.',
                    acceptableCards: ['zk-identity', 'zk-kyc', 'anonymous-credentials', 'proof-of-personhood'],
                    optimalCards: ['zk-identity']
                },
                {
                    id: 'selective-disclosure',
                    name: 'Selective Disclosure Mechanism',
                    description: 'Enable users to selectively prove specific attributes without revealing others.',
                    acceptableCards: ['zk-snarks', 'zk-starks', 'plonk', 'marlin'],
                    optimalCards: ['zk-snarks']
                },
                {
                    id: 'verification-layer',
                    name: 'Verification Infrastructure',
                    description: 'Implement the verification system that third parties can use to check claims.',
                    acceptableCards: ['zk-rollups', 'zkevm', 'validium', 'circom'],
                    optimalCards: ['zkevm']
                }
            ],
            availableCards: ['zk-identity', 'zk-kyc', 'anonymous-credentials', 'proof-of-personhood', 'zk-snarks', 'zk-starks', 'plonk', 'marlin', 'zk-rollups', 'zkevm', 'validium', 'circom'],
            optimalPath: ['zk-identity', 'zk-snarks', 'zkevm'],
            alternativePaths: [
                {
                    path: ['anonymous-credentials', 'plonk', 'circom'],
                    effectivenessScore: 85
                },
                {
                    path: ['zk-kyc', 'zk-starks', 'zk-rollups'],
                    effectivenessScore: 80
                }
            ],
            completionCriteria: {
                minimumScore: 80
            },
            feedbackContent: {
                optimal: "Excellent solution! ZK Identity for identity management, ZK-SNARKs for selective disclosure, and zkEVM for verification infrastructure provide a robust privacy-preserving identity system.",
                good: "Strong approach! Your solution offers good privacy and selective disclosure capabilities.",
                suboptimal: "Your solution provides basic identity verification but lacks comprehensive privacy protection.",
                incorrect: "This approach fails to provide adequate privacy and selective disclosure for identity verification."
            }
        },
        {
            id: 'scaling-blockchain',
            name: 'Scaling Public Blockchain',
            description: 'Develop a scaling solution for a public blockchain that preserves security while increasing transaction throughput.',
            difficulty: 4,
            // Added hints for this scenario
            hints: [
                {
                    stage: 'proof-system',
                    text: "For a scalable proof system, consider transparency and scalability requirements. ZK-STARKs are excellent for scaling blockchains as they provide transparent setup (no trusted ceremony needed) and have better proving time scalability for larger computations compared to other systems."
                },
                {
                    stage: 'implementation-layer',
                    text: "When implementing ZK-STARKs, you need a language specifically designed for their unique constraints. Cairo is purpose-built for writing provable programs for STARKs, making it the ideal choice for implementing a STARK-based scaling solution."
                },
                {
                    stage: 'rollup-protocol',
                    text: "For the rollup architecture, consider data availability and scalability trade-offs. ZK-Rollups provide the best of both worlds by posting transaction data on-chain for maximum security while using zero-knowledge proofs to minimize verification costs."
                }
            ],
            stages: [
                {
                    id: 'proof-system',
                    name: 'Proof System Selection',
                    description: 'Choose a proof system for validating off-chain transactions.',
                    acceptableCards: ['zk-snarks', 'zk-starks', 'plonk', 'fflonk'],
                    optimalCards: ['zk-starks']
                },
                {
                    id: 'implementation-layer',
                    name: 'Implementation Layer',
                    description: 'Select the technology to implement the scaling solution.',
                    acceptableCards: ['cairo', 'noir', 'circom', 'leo'],
                    optimalCards: ['cairo']
                },
                {
                    id: 'rollup-protocol',
                    name: 'Rollup Protocol',
                    description: 'Choose a rollup architecture to batch transactions and reduce costs.',
                    acceptableCards: ['zk-rollups', 'validium', 'zkporter', 'zk-coprocessor'],
                    optimalCards: ['zk-rollups']
                }
            ],
            availableCards: ['zk-snarks', 'zk-starks', 'plonk', 'fflonk', 'cairo', 'noir', 'circom', 'leo', 'zk-rollups', 'validium', 'zkporter', 'zk-coprocessor'],
            optimalPath: ['zk-starks', 'cairo', 'zk-rollups'],
            alternativePaths: [
                {
                    path: ['zk-snarks', 'noir', 'validium'],
                    effectivenessScore: 85
                },
                {
                    path: ['plonk', 'circom', 'zkporter'],
                    effectivenessScore: 80
                }
            ],
            completionCriteria: {
                minimumScore: 80
            },
            feedbackContent: {
                optimal: "Perfect scaling solution! ZK-STARKs for proving system, Cairo for implementation, and ZK-Rollups as the rollup protocol provide a highly scalable and secure blockchain solution.",
                good: "Strong approach! Your solution effectively addresses blockchain scaling challenges.",
                suboptimal: "Your solution offers some improvements to blockchain scalability but lacks a comprehensive approach.",
                incorrect: "This approach fails to provide an effective solution for blockchain scaling."
            }
        },
        {
            id: 'private-computation',
            name: 'Private Smart Contract Execution',
            description: 'Create a system for executing smart contracts with private inputs and state while ensuring correctness.',
            difficulty: 5,
            // Added hints for this scenario
            hints: [
                {
                    stage: 'privacy-mechanism',
                    text: "For contract privacy, you need technology designed specifically for private computation. Private Smart Contracts technology enables keeping inputs, state, and even contract logic confidential while still proving execution correctness using zero-knowledge proofs."
                },
                {
                    stage: 'contract-language',
                    text: "When writing private contracts, the language needs to be both developer-friendly and efficient for ZK proofs. Noir provides a Rust-like syntax that's easier to use than low-level constraint systems, while being designed specifically for zero-knowledge applications."
                },
                {
                    stage: 'execution-environment',
                    text: "For executing private contracts, you need an environment that supports Ethereum compatibility with privacy. zkEVM allows running private contracts within an Ethereum-compatible environment while supporting zero-knowledge verification."
                },
                {
                    stage: 'interoperability',
                    text: "To ensure private contracts can interact with public blockchain ecosystems, you need a scalable layer-2 with strong security guarantees. ZK-Rollups provide the necessary bridge between private contract execution and public blockchain verification, with immediate finality when proofs are verified on layer-1."
                }
            ],
            stages: [
                {
                    id: 'privacy-mechanism',
                    name: 'Privacy Mechanism',
                    description: 'Select a technology to keep contract inputs and state private.',
                    acceptableCards: ['zk-snarks', 'zk-starks', 'private-smart-contracts', 'private-data-marketplace'],
                    optimalCards: ['private-smart-contracts']
                },
                {
                    id: 'contract-language',
                    name: 'Contract Language & Framework',
                    description: 'Choose a language or framework for writing private smart contracts.',
                    acceptableCards: ['noir', 'circom', 'cairo', 'zinc'],
                    optimalCards: ['noir']
                },
                {
                    id: 'execution-environment',
                    name: 'Execution Environment',
                    description: 'Select the platform where private contracts will be executed.',
                    acceptableCards: ['zk-rollups', 'zkevm', 'private-smart-contracts', 'zk-coprocessor'],
                    optimalCards: ['zkevm']
                },
                {
                    id: 'interoperability',
                    name: 'Interoperability Layer',
                    description: 'Ensure private contracts can interact with public blockchain ecosystems.',
                    acceptableCards: ['zkevm', 'zk-rollups', 'validium', 'zkporter'],
                    optimalCards: ['zk-rollups']
                }
            ],
            availableCards: ['zk-snarks', 'zk-starks', 'private-smart-contracts', 'private-data-marketplace', 'noir', 'circom', 'cairo', 'zinc', 'zk-rollups', 'zkevm', 'zk-coprocessor', 'validium', 'zkporter'],
            optimalPath: ['private-smart-contracts', 'noir', 'zkevm', 'zk-rollups'],
            alternativePaths: [
                {
                    path: ['zk-snarks', 'circom', 'validium', 'zkporter'],
                    effectivenessScore: 85
                },
                {
                    path: ['private-data-marketplace', 'cairo', 'zkevm', 'validium'],
                    effectivenessScore: 80
                }
            ],
            completionCriteria: {
                minimumScore: 80
            },
            feedbackContent: {
                optimal: "Exceptional solution! Private Smart Contracts for privacy mechanism, Noir for contract language, zkEVM for execution, and ZK-Rollups for interoperability create a comprehensive private smart contract system.",
                good: "Strong approach! Your solution provides robust privacy for smart contract execution.",
                suboptimal: "Your solution offers basic privacy for smart contracts but lacks a fully integrated approach.",
                incorrect: "This approach fails to provide adequate privacy and verifiability for smart contract execution."
            }
        }
    ]
};

export default zkFoundationsScenarios;