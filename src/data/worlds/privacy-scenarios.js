/**
 * Verifiable Privacy World Scenarios
 */
const privacyScenarios = {
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
};

export default privacyScenarios;