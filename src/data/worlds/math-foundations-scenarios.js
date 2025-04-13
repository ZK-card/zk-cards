/**
 * Math Foundations World Scenarios
 */
const mathFoundationsScenarios = {
    id: 'math-world',
    name: 'Math Foundations',
    description: 'Master the mathematical foundations essential for understanding Zero-Knowledge proofs',
    scenarios: [
        {
            id: 'modular-arithmetic',
            name: 'Modular Arithmetic Fundamentals',
            description: 'Learn and practice modular arithmetic operations, a critical foundation for ZK cryptography.',
            difficulty: 1,
            hints: [
                {
                    stage: 'understand-modular',
                    text: "Think of modular arithmetic like a clock. After reaching the modulus (like 12 on a clock), numbers wrap around to 0. For example, 14 mod 12 = 2."
                },
                {
                    stage: 'practice-operations',
                    text: "For modular addition, add normally then take the remainder when divided by the modulus. For modular multiplication, multiply normally then take the remainder."
                }
            ],
            stages: [
                {
                    id: 'understand-modular',
                    name: 'Understanding Modular Arithmetic',
                    description: 'Learn how numbers "wrap around" when reaching a modulus, forming the basis of many cryptographic operations.',
                    component: 'FiniteFieldCalculator',
                    componentProps: {
                        initialFieldSize: 11
                    }
                },
                {
                    id: 'practice-operations',
                    name: 'Mastering Modular Operations',
                    description: 'Practice with more complex modular arithmetic operations used in ZK protocols.',
                    component: 'FiniteFieldCalculator',
                    componentProps: {
                        initialFieldSize: 17
                    }
                }
            ],
            completionCriteria: {
                minimumScore: 80
            },
            feedbackContent: {
                optimal: "Excellent! Your understanding of modular arithmetic shows you've mastered this fundamental concept. This mathematical foundation is critical for zero-knowledge cryptography, where operations are frequently performed within finite fields.",
                good: "Good job! You've demonstrated a solid grasp of modular arithmetic. This knowledge will help you understand how zero-knowledge proofs handle mathematical operations in constrained systems.",
                suboptimal: "You've made progress with modular arithmetic, but there's room for improvement. Consider revisiting the tutorial to strengthen your understanding of this essential ZK concept.",
                incorrect: "Modular arithmetic seems challenging right now, but with practice, you'll improve. This concept is crucial for understanding zero-knowledge proofs, so take your time to master it."
            }
        },

        {
            id: 'elliptic-curves',
            name: 'Elliptic Curve Operations',
            description: 'Explore elliptic curves and their operations, which form the backbone of many modern cryptographic protocols.',
            difficulty: 2,
            hints: [
                {
                    stage: 'curve-exploration',
                    text: "Elliptic curves in cryptography follow the equation y² = x³ + ax + b (mod p). Points on this curve form a group, meaning they can be added together following specific rules."
                },
                {
                    stage: 'point-operations',
                    text: "When adding points P and Q on an elliptic curve, we draw a line through them, find where it intersects the curve, and reflect that point across the x-axis."
                }
            ],
            stages: [
                {
                    id: 'curve-exploration',
                    name: 'Exploring Elliptic Curves',
                    description: 'Visualize and understand the properties of elliptic curves used in ZK cryptography.',
                    component: 'EllipticCurveVisualizer',
                    componentProps: {}
                },
                {
                    id: 'point-operations',
                    name: 'Point Addition and Multiplication',
                    description: 'Master the operations on elliptic curves that enable secure cryptographic protocols.',
                    component: 'EllipticCurveVisualizer',
                    componentProps: {}
                }
            ],
            completionCriteria: {
                minimumScore: 80
            },
            feedbackContent: {
                optimal: "Outstanding! Your mastery of elliptic curve operations demonstrates that you understand one of the most powerful tools in modern cryptography. ZK protocols like zk-SNARKs and zk-STARKs often leverage these structures.",
                good: "Good work with elliptic curves! These mathematical structures are fundamental to many zero-knowledge protocols, and your understanding will help you grasp how ZK systems achieve their security properties.",
                suboptimal: "You're making progress with elliptic curves, but these concepts are worth revisiting. Many zero-knowledge systems rely heavily on elliptic curve operations for their security and efficiency.",
                incorrect: "Elliptic curves are challenging but incredibly important in cryptography. Don't be discouraged - with practice, you'll understand how these mathematical structures enable powerful zero-knowledge protocols."
            }
        },

        {
            id: 'polynomial-commitments',
            name: 'Polynomial Commitments',
            description: 'Learn how polynomials are used to create commitments in ZK systems, allowing for efficient verification of computational claims.',
            difficulty: 3,
            hints: [
                {
                    stage: 'polynomial-basics',
                    text: "Polynomials allow us to encode multiple values in a single mathematical object. In ZK proofs, we often use polynomials to represent computation steps."
                },
                {
                    stage: 'commitment-schemes',
                    text: "A polynomial commitment allows you to commit to a polynomial and later reveal only specific evaluations of it, without revealing the entire polynomial."
                }
            ],
            stages: [
                {
                    id: 'polynomial-basics',
                    name: 'Polynomial Fundamentals',
                    description: 'Understand polynomial representation and evaluation, crucial for ZK commitment schemes.',
                    component: 'PolynomialCommitment',
                    componentProps: {}
                },
                {
                    id: 'commitment-schemes',
                    name: 'Commitment Strategies',
                    description: 'Learn how polynomials enable efficient and secure commitment schemes in zero-knowledge protocols.',
                    component: 'PolynomialCommitment',
                    componentProps: {}
                }
            ],
            completionCriteria: {
                minimumScore: 80
            },
            feedbackContent: {
                optimal: "Excellent! Your understanding of polynomial commitments puts you well on your way to mastering ZK cryptography. Protocols like PLONK and Bulletproofs rely heavily on these mathematical structures for their security and efficiency.",
                good: "Good work with polynomial commitments! This concept is central to many modern ZK protocols, allowing provers to commit to data without revealing it entirely.",
                suboptimal: "You've begun to understand polynomial commitments, but there's more to explore. These structures are fundamental to how ZK systems like PLONK create efficient and secure proofs.",
                incorrect: "Polynomial commitments are complex but worth mastering. They form the foundation of many ZK proving systems, enabling critical properties like succinctness and zero-knowledge."
            }
        },

        {
            id: 'hash-functions',
            name: 'Cryptographic Hash Functions',
            description: 'Explore the properties of hash functions that make them essential building blocks for ZK protocols and commitment schemes.',
            difficulty: 3,
            hints: [
                {
                    stage: 'hash-properties',
                    text: "Hash functions map data of arbitrary size to fixed-size values. Their key properties include being one-way (hard to reverse) and collision-resistant (hard to find two inputs with the same hash)."
                },
                {
                    stage: 'commitment-applications',
                    text: "In ZK proofs, hash functions are often used to create commitments to data without revealing the data itself, forming a critical building block for privacy-preserving protocols."
                }
            ],
            stages: [
                {
                    id: 'hash-properties',
                    name: 'Hash Function Properties',
                    description: 'Learn about the critical properties of hash functions that enable secure cryptographic protocols.',
                    component: 'HashChallenge',
                    componentProps: {}
                },
                {
                    id: 'commitment-applications',
                    name: 'Commitments and Applications',
                    description: 'Discover how hash functions create secure commitments in zero-knowledge systems.',
                    component: 'HashChallenge',
                    componentProps: {}
                }
            ],
            completionCriteria: {
                minimumScore: 80
            },
            feedbackContent: {
                optimal: "Outstanding! Your understanding of hash functions demonstrates mastery of these foundational tools. In ZK systems, hash functions are used for commitments, Merkle trees, and maintaining privacy while ensuring integrity.",
                good: "Good job with hash functions! These are critical components in ZK systems, allowing commitments to data without revealing the data itself - a cornerstone of privacy-preserving technology.",
                suboptimal: "You're making progress with hash functions, but there's more to explore. These cryptographic primitives are essential for how ZK proofs maintain both privacy and integrity.",
                incorrect: "Hash functions are fundamental to cryptography and worth revisiting. They enable many key features of ZK systems, including efficient verification and secure commitments."
            }
        },

        {
            id: 'discrete-logarithm',
            name: 'The Discrete Logarithm Problem',
            description: 'Understand the discrete logarithm problem, a fundamental computational hardness assumption underlying many cryptographic protocols.',
            difficulty: 4,
            hints: [
                {
                    stage: 'discrete-log-basics',
                    text: "The discrete logarithm problem asks: given g, h, and p, find x such that g^x ≡ h (mod p). For small numbers, this is solvable by testing values, but for large numbers, it becomes computationally infeasible."
                },
                {
                    stage: 'cryptographic-applications',
                    text: "Many cryptographic protocols, including some ZK systems, rely on the hardness of the discrete logarithm problem for security. Understanding this problem helps you grasp the security foundations of these systems."
                }
            ],
            stages: [
                {
                    id: 'discrete-log-basics',
                    name: 'Understanding Discrete Logarithms',
                    description: 'Learn about the discrete logarithm problem and why it is computationally hard for large numbers.',
                    component: 'DiscreteLogPuzzle',
                    componentProps: {}
                },
                {
                    id: 'cryptographic-applications',
                    name: 'Applications in Cryptography',
                    description: 'Explore how the discrete logarithm problem enables secure cryptographic protocols, including ZK systems.',
                    component: 'DiscreteLogPuzzle',
                    componentProps: {}
                }
            ],
            completionCriteria: {
                minimumScore: 80
            },
            feedbackContent: {
                optimal: "Excellent! Your understanding of the discrete logarithm problem shows you've mastered one of the core computational hardness assumptions in cryptography. This problem underpins the security of many ZK protocols.",
                good: "Good work with the discrete logarithm problem! This mathematical challenge forms the security basis for many cryptographic systems, including several ZK protocols.",
                suboptimal: "You've begun to understand the discrete logarithm problem, but there's more to explore. This concept is crucial for the security of many advanced cryptographic protocols.",
                incorrect: "The discrete logarithm problem is challenging but fundamental to cryptography. With practice, you'll understand why this problem is so important for secure ZK systems."
            }
        }
    ]
};

export default mathFoundationsScenarios;