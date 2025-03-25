/**
 * Updated Scenario data for ZK Card Clash
 * Refocused to emphasize ZK technologies rather than specific company implementations
 */
const scenarios = {
  'world-1': {
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
        // Custom flow layout for nodes in a complex workflow
        // flowLayout: {
        //   'privacy-mechanism': { x: 100, y: 150 },
        //   'contract-language': { x: 350, y: 50 },
        //   'execution-environment': { x: 600, y: 150 },
        //   'interoperability': { x: 850, y: 250 },
        // },
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
  },
  // New World: Verifiable Privacy World
  'world-2': {
    id: 'world-2',
    name: 'Verifiable Privacy World',
    description: 'Explore advanced zero-knowledge applications for privacy-preserving verification, identity, and secure communication',
    scenarios: [
      // Scenario 2: Secure Document Verification
      {
        id: 'document-verification',
        name: 'Secure Document Verification',
        description: 'Create a system for verifying the authenticity of sensitive documents without revealing their contents.',
        difficulty: 4,
        hints: [
          {
            stage: 'document-authentication',
            text: "For document authentication, you need a technology that can verify digital documents while preserving privacy. ZKEmail allows proving properties of emails (which may contain documents) without revealing their entire content."
          },
          {
            stage: 'content-verification',
            text: "To verify document content without exposing it, consider technologies designed for proving web content integrity. TLSNotary can prove the contents of a secure HTTPS connection, enabling verification of online documents without revealing them."
          },
          {
            stage: 'issuer-verification',
            text: "Verifying document issuers requires a reliable identity system. OpenPassport provides a framework for verifying the identity of document issuers while maintaining privacy."
          },
          {
            stage: 'verification-platform',
            text: "For a complete verification platform, you need a proven zero-knowledge protocol system. ZK-SNARKs offer the necessary cryptographic foundation to create proofs that documents meet specific criteria without revealing their contents."
          }
        ],
        stages: [
          {
            id: 'document-authentication',
            name: 'Document Authentication',
            description: 'Verify digital documents are legitimate without revealing their contents.',
            acceptableCards: ['zkemail', 'zk-snarks', 'private-data-marketplace', 'zk-identity'],
            optimalCards: ['zkemail']
          },
          {
            id: 'content-verification',
            name: 'Content Verification',
            description: 'Prove specific properties about document content without exposing sensitive information.',
            acceptableCards: ['tlsnotary', 'zk-snarks', 'private-smart-contracts', 'private-data-marketplace'],
            optimalCards: ['tlsnotary']
          },
          {
            id: 'issuer-verification',
            name: 'Issuer Verification',
            description: 'Verify the identity of document issuers while maintaining their privacy.',
            acceptableCards: ['openpassport', 'zk-kyc', 'anonymous-credentials', 'zk-identity'],
            optimalCards: ['openpassport']
          },
          {
            id: 'verification-platform',
            name: 'Verification Platform',
            description: 'Create a secure platform for document verification workflows.',
            acceptableCards: ['zk-snarks', 'zk-starks', 'private-smart-contracts', 'zkevm'],
            optimalCards: ['zk-snarks']
          }
        ],
        availableCards: [
          'zkemail', 'tlsnotary', 'openpassport', 'zk-snarks', 'zk-starks',
          'private-data-marketplace', 'zk-identity', 'private-smart-contracts',
          'zk-kyc', 'anonymous-credentials', 'zkevm'
        ],
        optimalPath: ['zkemail', 'tlsnotary', 'openpassport', 'zk-snarks'],
        alternativePaths: [
          {
            path: ['zk-identity', 'zk-snarks', 'anonymous-credentials', 'private-smart-contracts'],
            effectivenessScore: 85
          },
          {
            path: ['zkemail', 'private-data-marketplace', 'zk-kyc', 'zkevm'],
            effectivenessScore: 80
          }
        ],
        completionCriteria: {
          minimumScore: 80
        },
        feedbackContent: {
          optimal: "Perfect solution! ZKEmail for document authentication, TLSNotary for content verification, OpenPassport for issuer verification, and ZK-SNARKs for the verification platform create a comprehensive and secure document verification system.",
          good: "Strong approach! Your solution offers robust document verification while preserving privacy.",
          suboptimal: "Your solution provides basic document verification but lacks the specialized technologies for maximum privacy and security.",
          incorrect: "This approach fails to provide adequate privacy and security for document verification."
        }
      },

      // Scenario 3: Privacy-Preserving Digital Identity
      {
        id: 'digital-identity',
        name: 'Privacy-Preserving Digital Identity',
        description: 'Develop a digital identity system that allows users to selectively disclose personal information without revealing everything.',
        difficulty: 3,
        hints: [
          {
            stage: 'identity-verification',
            text: "For base identity verification, you need a secure system that can verify real identities while protecting privacy. Anon-Aadhaar lets users prove they have a verified government identity without revealing the actual identity data."
          },
          {
            stage: 'credential-management',
            text: "For credential management, consider systems designed specifically for privacy-preserving credentials. OpenPassport provides an open framework for managing verifiable credentials with selective disclosure capabilities."
          },
          {
            stage: 'selective-disclosure',
            text: "For the selective disclosure mechanism, you need a protocol that enables proving specific attributes without revealing others. Semaphore enables anonymous group membership proofs, perfect for selectively proving identity attributes."
          },
          {
            stage: 'cross-platform-verification',
            text: "For cross-platform verification, consider systems that can verify credentials across different platforms. ZK-identity specializes in privacy-preserving identity verification that works across various systems and platforms."
          }
        ],
        stages: [
          {
            id: 'identity-verification',
            name: 'Base Identity Verification',
            description: 'Verify users have legitimate identities without exposing their personal data for Indian citizens.',
            acceptableCards: ['anon-aadhaar', 'zk-kyc', 'proof-of-personhood', 'zk-identity'],
            optimalCards: ['anon-aadhaar']
          },
          {
            id: 'credential-management',
            name: 'Credential Management',
            description: 'Create a system for issuing and managing verifiable credentials.',
            acceptableCards: ['openpassport', 'anonymous-credentials', 'zk-identity', 'zk-kyc'],
            optimalCards: ['openpassport']
          },
          {
            id: 'selective-disclosure',
            name: 'Selective Disclosure Mechanism',
            description: 'Enable users to prove specific attributes without revealing others.',
            acceptableCards: ['semaphore', 'zk-snarks', 'anonymous-credentials', 'zk-identity'],
            optimalCards: ['semaphore']
          },
          {
            id: 'cross-platform-verification',
            name: 'Cross-Platform Verification',
            description: 'Ensure credentials can be verified across different platforms and systems.',
            acceptableCards: ['zk-identity', 'zk-snarks', 'openpassport', 'mopro'],
            optimalCards: ['zk-identity']
          }
        ],
        availableCards: [
          'anon-aadhaar', 'openpassport', 'semaphore', 'zk-identity', 'zk-kyc',
          'proof-of-personhood', 'anonymous-credentials', 'zk-snarks', 'mopro'
        ],
        optimalPath: ['anon-aadhaar', 'openpassport', 'semaphore', 'zk-identity'],
        alternativePaths: [
          {
            path: ['zk-kyc', 'anonymous-credentials', 'zk-snarks', 'openpassport'],
            effectivenessScore: 85
          },
          {
            path: ['proof-of-personhood', 'zk-identity', 'anonymous-credentials', 'mopro'],
            effectivenessScore: 80
          }
        ],
        completionCriteria: {
          minimumScore: 80
        },
        feedbackContent: {
          optimal: "Excellent solution! Using Anon-Aadhaar for base verification, OpenPassport for credential management, Semaphore for selective disclosure, and ZK-Identity for cross-platform verification creates a comprehensive privacy-preserving identity system.",
          good: "Strong approach! Your solution provides robust identity verification with good privacy protection.",
          suboptimal: "Your solution offers basic identity verification but lacks the specialized technologies for maximum privacy and selective disclosure.",
          incorrect: "This approach fails to provide adequate privacy and selective disclosure capabilities for a digital identity system."
        }
      },

      // Scenario 4: Private Financial Bridge
      {
        id: 'financial-bridge',
        name: 'Private Financial Bridge',
        description: 'Build a system for secure financial transactions that verifies participants without revealing their identities or transaction details.',
        difficulty: 4,
        hints: [
          {
            stage: 'identity-verification',
            text: "For verifying financial participants, you need a technology that can verify real identities while protecting privacy. MoPro allows proving properties about a user's mobile device, which can serve as a secure identity factor."
          },
          {
            stage: 'transaction-verification',
            text: "For verifying transactions without revealing details, consider systems built specifically for peer-to-peer verification. ZKP2P enables proving transaction validity without revealing transaction amounts or participant identities."
          },
          {
            stage: 'financial-compliance',
            text: "For regulatory compliance while maintaining privacy, you need specialized identity verification. ZK-KYC enables Know Your Customer verification while keeping personal data private, satisfying regulatory requirements."
          },
          {
            stage: 'cross-platform-integration',
            text: "For seamless integration with existing financial systems, consider general-purpose zero-knowledge systems. ZK-SNARKs provide the cryptographic foundation for creating financial bridges that can connect to multiple platforms."
          }
        ],
        stages: [
          {
            id: 'identity-verification',
            name: 'Financial Participant Verification',
            description: 'Verify participants in financial transactions without exposing their identities.',
            acceptableCards: ['mopro', 'anon-aadhaar', 'zk-kyc', 'proof-of-personhood'],
            optimalCards: ['mopro']
          },
          {
            id: 'transaction-verification',
            name: 'Private Transaction Verification',
            description: 'Verify transactions are valid without revealing their details.',
            acceptableCards: ['zkp2p', 'zk-rollups', 'private-transactions', 'shielded-pool'],
            optimalCards: ['zkp2p']
          },
          {
            id: 'financial-compliance',
            name: 'Regulatory Compliance',
            description: 'Ensure compliance with financial regulations while preserving privacy.',
            acceptableCards: ['zk-kyc', 'tlsnotary', 'private-smart-contracts', 'zkemail'],
            optimalCards: ['zk-kyc']
          },
          {
            id: 'cross-platform-integration',
            name: 'Cross-Platform Integration',
            description: 'Enable integration with multiple financial platforms and systems.',
            acceptableCards: ['zk-snarks', 'zk-rollups', 'zkevm', 'zk-coprocessor'],
            optimalCards: ['zk-snarks']
          }
        ],
        availableCards: [
          'mopro', 'zkp2p', 'zk-kyc', 'zk-snarks', 'anon-aadhaar',
          'zk-rollups', 'private-transactions', 'shielded-pool',
          'tlsnotary', 'private-smart-contracts', 'zkemail', 'zkevm',
          'zk-coprocessor', 'proof-of-personhood'
        ],
        optimalPath: ['mopro', 'zkp2p', 'zk-kyc', 'zk-snarks'],
        alternativePaths: [
          {
            path: ['anon-aadhaar', 'private-transactions', 'zk-kyc', 'zk-rollups'],
            effectivenessScore: 85
          },
          {
            path: ['proof-of-personhood', 'shielded-pool', 'tlsnotary', 'zkevm'],
            effectivenessScore: 80
          }
        ],
        completionCriteria: {
          minimumScore: 80
        },
        feedbackContent: {
          optimal: "Perfect solution! Using MoPro for participant verification, ZKP2P for transaction verification, ZK-KYC for regulatory compliance, and ZK-SNARKs for cross-platform integration creates a comprehensive private financial bridge.",
          good: "Strong approach! Your solution offers solid privacy protection for financial transactions while maintaining verifiability.",
          suboptimal: "Your solution provides basic transaction privacy but lacks the specialized technologies for maximum security and regulatory compliance.",
          incorrect: "This approach fails to provide adequate privacy, verifiability, and regulatory compliance for financial transactions."
        }
      },

      // Scenario 5: Anonymous Whistleblowing Platform
      {
        id: 'whistleblowing-platform',
        name: 'Anonymous Whistleblowing Platform',
        description: 'Create a platform that allows whistleblowers to securely share information while protecting their identities and proving document authenticity.',
        difficulty: 5,
        hints: [
          {
            stage: 'document-authenticity',
            text: "For verifying document authenticity without revealing sources, consider technologies that can prove email properties. ZKEmail allows proving properties about emails without revealing the sender, perfect for validating whistleblower documents."
          },
          {
            stage: 'anonymous-submission',
            text: "For anonymous submissions that maintain group membership verification, you need anonymous signaling technology. Semaphore allows whistleblowers to prove they belong to a specific organization without revealing their identity."
          },
          {
            stage: 'information-verification',
            text: "For verifying online information without exposing sources, consider technologies for proving web content. TLSNotary can prove the contents of secure web sessions, enabling verification of online information without revealing access details."
          },
          {
            stage: 'secure-communication',
            text: "For secure communication with whistleblowers, you need specialized peer-to-peer technology. ZKP2P enables secure, private communication channels that can verify participants without revealing identities."
          }
        ],
        stages: [
          {
            id: 'document-authenticity',
            name: 'Document Authenticity',
            description: 'Verify whistleblower documents are genuine without revealing their source.',
            acceptableCards: ['zkemail', 'tlsnotary', 'zk-snarks', 'private-data-marketplace'],
            optimalCards: ['zkemail']
          },
          {
            id: 'anonymous-submission',
            name: 'Anonymous Submission',
            description: 'Enable whistleblowers to submit information without revealing their identities.',
            acceptableCards: ['semaphore', 'private-transactions', 'anonymous-credentials', 'shielded-pool'],
            optimalCards: ['semaphore']
          },
          {
            id: 'information-verification',
            name: 'Information Verification',
            description: 'Verify the accuracy of submitted information without exposing sources.',
            acceptableCards: ['tlsnotary', 'zk-snarks', 'zkemail', 'private-smart-contracts'],
            optimalCards: ['tlsnotary']
          },
          {
            id: 'secure-communication',
            name: 'Secure Communication Channel',
            description: 'Establish secure communication with whistleblowers while protecting their identities.',
            acceptableCards: ['zkp2p', 'private-smart-contracts', 'semaphore', 'private-transactions'],
            optimalCards: ['zkp2p']
          }
        ],
        availableCards: [
          'zkemail', 'semaphore', 'tlsnotary', 'zkp2p', 'zk-snarks',
          'private-transactions', 'anonymous-credentials', 'shielded-pool',
          'private-data-marketplace', 'private-smart-contracts'
        ],
        optimalPath: ['zkemail', 'semaphore', 'tlsnotary', 'zkp2p'],
        alternativePaths: [
          {
            path: ['zk-snarks', 'anonymous-credentials', 'zkemail', 'private-smart-contracts'],
            effectivenessScore: 85
          },
          {
            path: ['tlsnotary', 'private-transactions', 'zk-snarks', 'semaphore'],
            effectivenessScore: 80
          }
        ],
        completionCriteria: {
          minimumScore: 80
        },
        feedbackContent: {
          optimal: "Excellent solution! Using ZKEmail for document authenticity, Semaphore for anonymous submission, TLSNotary for information verification, and ZKP2P for secure communication creates a comprehensive whistleblowing platform that balances anonymity with verifiability.",
          good: "Strong approach! Your solution provides robust protection for whistleblowers while ensuring information validity.",
          suboptimal: "Your solution addresses some whistleblower protection concerns but lacks the specialized technologies for maximum anonymity and verification.",
          incorrect: "This approach fails to provide adequate anonymity, security, or verifiability for a whistleblowing platform."
        }
      }
    ]
  }
};

export default scenarios;