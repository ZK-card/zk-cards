/**
 * Card data for ZK Card Clash
 * Updated to focus on ZK technologies rather than specific implementations
 */
const cards = [
  // Math Concepts Category
  {
    id: 'modular-addition',
    name: 'Modular Addition',
    category: 'Math Concepts',
    description: 'Addition in a modular system, where numbers wrap around after reaching the modulus.',
    capabilities: [
      'Understand addition in finite, cyclical systems',
      'Calculate (a + b) mod n efficiently',
      'Visualize the "clock arithmetic" model',
      'Apply to cryptographic protocols'
    ],
    limitations: [
      'Must specify the modulus clearly',
      'Does not directly reveal mathematical insights without exploration',
      'Requires understanding of the underlying group structure'
    ],
    compatibilityTags: ['modular-arithmetic', 'fundamental-math', 'cryptography-basics'],
    attributes: {
      learnability: 90,
      applicability: 95,
      fundamentality: 100,
      complexity: 30
    },
    image: 'modular-addition.svg',
    tooltipContent: 'Modular addition involves computing (a + b) mod n, which is the remainder when (a + b) is divided by n. It\'s like a clock where after reaching 12, we start again at 1.'
  },
  {
    id: 'modular-multiplication',
    name: 'Modular Multiplication',
    category: 'Math Concepts',
    description: 'Multiplication in a modular system, where the product is reduced by taking the remainder when divided by the modulus.',
    capabilities: [
      'Understand multiplication in finite groups',
      'Calculate (a × b) mod n efficiently',
      'Identify patterns in modular multiplication tables',
      'Apply to encryption algorithms like RSA'
    ],
    limitations: [
      'Must specify the modulus clearly',
      'Not all elements have multiplicative inverses',
      'Computation can be intensive for large numbers'
    ],
    compatibilityTags: ['modular-arithmetic', 'fundamental-math', 'cryptography-basics'],
    attributes: {
      learnability: 85,
      applicability: 95,
      fundamentality: 100,
      complexity: 45
    },
    image: 'modular-multiplication.svg',
    tooltipContent: 'Modular multiplication involves computing (a × b) mod n, which is the remainder when (a × b) is divided by n. This operation is fundamental to many cryptographic algorithms.'
  },
  {
    id: 'modular-exponentiation',
    name: 'Modular Exponentiation',
    category: 'Math Concepts',
    description: 'Raising a number to a power in a modular system, a fundamental operation in public-key cryptography.',
    capabilities: [
      'Efficiently calculate (a^b) mod n even for large numbers',
      'Understand the patterns of powers in modular systems',
      'Apply to cryptographic algorithms like Diffie-Hellman',
      'Form the basis for many ZK proof systems'
    ],
    limitations: [
      'Computation can be resource-intensive for naive implementations',
      'Requires understanding of number theory for proper application',
      'Security depends on careful parameter selection'
    ],
    compatibilityTags: ['modular-arithmetic', 'advanced-math', 'cryptography-core'],
    attributes: {
      learnability: 75,
      applicability: 100,
      fundamentality: 100,
      complexity: 70
    },
    image: 'modular-exponentiation.svg',
    tooltipContent: 'Modular exponentiation involves computing (a^b) mod n efficiently. This operation is at the heart of many public-key cryptosystems and is essential for understanding ZK proofs.'
  },

  // Proof Systems Category
  {
    id: 'zk-snarks',
    name: 'ZK-SNARKs',
    category: 'Proof Systems',
    description: 'Zero-Knowledge Succinct Non-interactive Arguments of Knowledge - compact cryptographic proofs that require an initial trusted setup.',
    capabilities: [
      'Extremely small proof size',
      'Fast verification times',
      'Supports complex computations',
      'Production-ready with many implementations'
    ],
    limitations: [
      'Requires trusted setup',
      'Vulnerable to quantum computing attacks',
      'Relatively complex implementation'
    ],
    compatibilityTags: ['trusted-setup', 'production-ready', 'elliptic-curves'],
    attributes: {
      privacy: 95,
      scalability: 85,
      costEfficiency: 70,
      usability: 60
    },
    image: 'zk-snarks.svg',
    tooltipContent: 'ZK-SNARKs are the most widely used ZK proof system, featuring extremely compact proofs and fast verification times. They power many privacy and scaling solutions in blockchain, but require an initial trusted setup phase.'
  },
  {
    id: 'zk-starks',
    name: 'ZK-STARKs',
    category: 'Proof Systems',
    description: 'Zero-Knowledge Scalable Transparent Arguments of Knowledge - transparent setup, quantum-resistant proofs that are larger than SNARKs.',
    capabilities: [
      'No trusted setup required',
      'Quantum-resistant security',
      'Faster proving times for large computations',
      'Highly parallelizable'
    ],
    limitations: [
      'Larger proof sizes than SNARKs',
      'Slower verification for simple computations',
      'Higher on-chain verification costs'
    ],
    compatibilityTags: ['transparent-setup', 'quantum-resistant', 'production-ready'],
    attributes: {
      privacy: 90,
      scalability: 80,
      costEfficiency: 60,
      usability: 65
    },
    image: 'zk-starks.svg',
    tooltipContent: 'ZK-STARKs offer transparency by eliminating the trusted setup and provide quantum-resistant security. While their proofs are larger than SNARKs, they generally offer faster proving times for complex computations.'
  },
  {
    id: 'bulletproofs',
    name: 'Bulletproofs',
    category: 'Proof Systems',
    description: 'Short, non-interactive zero-knowledge proofs without a trusted setup, ideal for range proofs and relatively simple computations.',
    capabilities: [
      'No trusted setup required',
      'Compact proofs for range proofs',
      'Logarithmic proof size in the number of commitments',
      'Simple implementation'
    ],
    limitations: [
      'Slower proving and verification times',
      'Not ideal for complex circuit computations',
      'Linear verification time'
    ],
    compatibilityTags: ['transparent-setup', 'range-proofs', 'simple-circuits'],
    attributes: {
      privacy: 85,
      scalability: 65,
      costEfficiency: 80,
      usability: 75
    },
    image: 'bulletproofs.svg',
    tooltipContent: 'Bulletproofs are perfect for range proofs and relatively simple computations. They require no trusted setup and have compact proof sizes, but suffer from slower verification times compared to SNARKs and STARKs.'
  },
  {
    id: 'plonk',
    name: 'PLONK',
    category: 'Proof Systems',
    description: 'Permutations over Lagrange-bases for Oecumenical Noninteractive arguments of Knowledge - a universal SNARK with updateable trusted setup.',
    capabilities: [
      'Universal trusted setup',
      'Better proving performance than early SNARKs',
      'Supports general-purpose circuits',
      'Updateable trusted setup'
    ],
    limitations: [
      'Still requires initial trusted setup',
      'Larger proof size than Groth16',
      'Complex mathematics'
    ],
    compatibilityTags: ['trusted-setup', 'universal-circuit', 'updatable-setup'],
    attributes: {
      privacy: 90,
      scalability: 75,
      costEfficiency: 70,
      usability: 70
    },
    image: 'plonk.svg',
    tooltipContent: 'PLONK offers a universal and updateable trusted setup, meaning the same setup can be used for different circuits. This makes it more flexible than earlier SNARKs like Groth16 while maintaining good performance.'
  },
  {
    id: 'marlin',
    name: 'Marlin',
    category: 'Proof Systems',
    description: 'A universal SNARK with a universal and updatable trusted setup, optimized for improved prover efficiency.',
    capabilities: [
      'Universal trusted setup',
      'Improved prover efficiency',
      'Supports various polynomial commitment schemes',
      'Compatible with multiple cryptographic primitives'
    ],
    limitations: [
      'Requires trusted setup',
      'Less established than some other SNARKs',
      'Complex mathematics and implementation'
    ],
    compatibilityTags: ['universal-setup', 'trusted-setup', 'polynomial-commitments'],
    attributes: {
      privacy: 90,
      scalability: 80,
      costEfficiency: 75,
      usability: 65
    },
    image: 'marlin.svg',
    tooltipContent: 'Marlin is a universal SNARK that leverages preprocessing for improved prover time. It separates the polynomial IOP from the commitment scheme, allowing for flexibility in different cryptographic implementations.'
  },
  {
    id: 'fflonk',
    name: 'FFLONK',
    category: 'Proof Systems',
    description: 'A variant of PLONK with faster proving time and smaller proofs by leveraging folding schemes and improved polynomial commitment techniques.',
    capabilities: [
      'Faster proving times than PLONK',
      'Reduced proof sizes',
      'Universal trusted setup',
      'Improved cryptographic primitives'
    ],
    limitations: [
      'Requires trusted setup',
      'Complex cryptographic constructions',
      'Newer with less widespread adoption'
    ],
    compatibilityTags: ['trusted-setup', 'fast-proving', 'universal-setup'],
    attributes: {
      privacy: 90,
      scalability: 85,
      costEfficiency: 75,
      usability: 65
    },
    image: 'fflonk.svg',
    tooltipContent: 'FFLONK improves upon PLONK by optimizing polynomial commitments and leveraging folding schemes to reduce proof generation time and size while maintaining the universal setup benefits.'
  },

  // Circuit Languages Category
  {
    id: 'circom',
    name: 'Circom',
    category: 'Circuit Languages',
    description: 'A domain-specific language for writing arithmetic circuits that can be compiled into constraints for ZK-SNARKs.',
    capabilities: [
      'Expressive syntax for writing circuits',
      'Strong integration with SNARKs',
      'Reusable circuit templates',
      'Active community development'
    ],
    limitations: [
      'Limited to writing circuits for R1CS',
      'Steep learning curve',
      'Complex debugging'
    ],
    compatibilityTags: ['snark-compatible', 'r1cs', 'javascript-integration'],
    attributes: {
      privacy: 85,
      scalability: 70,
      costEfficiency: 75,
      usability: 65
    },
    image: 'circom.svg',
    tooltipContent: 'Circom allows developers to write arithmetic circuits that compile to R1CS constraints for ZK-SNARKs. It offers templating and reusable components but has a steep learning curve for developers new to zero-knowledge proofs.'
  },
  {
    id: 'noir',
    name: 'Noir',
    category: 'Circuit Languages',
    description: 'A domain-specific language for creating and verifying proofs, designed to be more developer-friendly than previous ZK languages.',
    capabilities: [
      'Rust-like syntax for familiar programming',
      'Backend agnostic for different proof systems',
      'Easier debugging features',
      'Built-in testing framework'
    ],
    limitations: [
      'Relatively new ecosystem',
      'Limited libraries compared to mature languages',
      'Still evolving language features'
    ],
    compatibilityTags: ['rust-like', 'multi-backend', 'developer-friendly'],
    attributes: {
      privacy: 80,
      scalability: 75,
      costEfficiency: 80,
      usability: 85
    },
    image: 'noir.svg',
    tooltipContent: 'Noir aims to make ZK circuit programming more accessible with a Rust-like syntax and focus on developer experience. It supports multiple proving backends and provides better debugging capabilities than earlier languages.'
  },
  {
    id: 'cairo',
    name: 'Cairo',
    category: 'Circuit Languages',
    description: 'A programming language for writing provable programs for STARKs, powering StarkNet and other STARK-based applications.',
    capabilities: [
      'Turing-complete language for provable programs',
      'STARK-native architecture',
      'Support for complex applications',
      'Robust testing framework'
    ],
    limitations: [
      'Complex memory model',
      'Steep learning curve',
      'Limited to STARK proof systems'
    ],
    compatibilityTags: ['stark-compatible', 'turing-complete', 'production-ready'],
    attributes: {
      privacy: 85,
      scalability: 90,
      costEfficiency: 70,
      usability: 60
    },
    image: 'cairo.svg',
    tooltipContent: 'Cairo is the native language for writing provable programs for STARKs. It powers StarkNet scaling solution and has a unique "single-assignment" memory model that facilitates proof generation but requires a different programming approach.'
  },
  {
    id: 'leo',
    name: 'Leo',
    category: 'Circuit Languages',
    description: 'A functional, statically-typed programming language for writing zero-knowledge applications with a focus on user-friendliness.',
    capabilities: [
      'Rust-inspired syntax',
      'Static type checking',
      'Compiler optimizations for circuit efficiency',
      'Built-in test framework'
    ],
    limitations: [
      'Specialized ecosystem',
      'Limited to specific ZK frameworks',
      'Developing library support'
    ],
    compatibilityTags: ['functional', 'static-typing', 'developer-friendly'],
    attributes: {
      privacy: 85,
      scalability: 75,
      costEfficiency: 70,
      usability: 80
    },
    image: 'leo.svg',
    tooltipContent: 'Leo is designed to make zero-knowledge programming more accessible to typical developers by providing a familiar syntax inspired by Rust, with static type checking and built-in testing tools to simplify the development process.'
  },
  {
    id: 'zinc',
    name: 'Zinc',
    category: 'Circuit Languages',
    description: 'A language for writing zero-knowledge smart contracts and ZK circuits with syntax inspired by Rust.',
    capabilities: [
      'Rust-inspired syntax',
      'Supports ZK-friendly data structures',
      'Designed for smart contract development',
      'Integration with multiple backends'
    ],
    limitations: [
      'Evolving language specification',
      'Limited production examples',
      'Developing tooling ecosystem'
    ],
    compatibilityTags: ['rust-like', 'smart-contracts', 'zk-circuits'],
    attributes: {
      privacy: 80,
      scalability: 75,
      costEfficiency: 70,
      usability: 75
    },
    image: 'zinc.svg',
    tooltipContent: 'Zinc is a ZK-friendly programming language designed for developing privacy-preserving smart contracts, combining Rust-like syntax with zero-knowledge circuit capabilities for building confidential applications.'
  },

  // ZK Rollups/Scaling Category
  {
    id: 'zk-rollups',
    name: 'ZK-Rollups',
    category: 'ZK Rollups/Scaling',
    description: 'Layer 2 scaling solution that bundles (rolls up) transactions off-chain and generates ZK proofs to verify transaction validity.',
    capabilities: [
      'Immediate finality when proofs are verified',
      'Inherits security from Layer 1',
      'Increased throughput up to 2000+ TPS',
      'Reduced transaction costs'
    ],
    limitations: [
      'Complex proof generation',
      'Computational overhead for proof creation',
      'Typically requires specialized hardware for proving'
    ],
    compatibilityTags: ['layer-2', 'scaling-solution', 'immediate-finality'],
    attributes: {
      privacy: 75,
      scalability: 95,
      costEfficiency: 85,
      usability: 70
    },
    image: 'zk-rollups.svg',
    tooltipContent: 'ZK-Rollups bundle hundreds of transactions off-chain and generate cryptographic proofs that verify their validity, significantly increasing throughput and reducing gas costs while inheriting the security of the base layer.'
  },
  {
    id: 'validium',
    name: 'Validium',
    category: 'ZK Rollups/Scaling',
    description: 'An off-chain scaling solution that uses zero-knowledge proofs for validity but stores data off-chain, further increasing scalability.',
    capabilities: [
      'Extremely high scalability (thousands of TPS)',
      'Very low transaction costs',
      'Zero-knowledge proof security',
      'No on-chain data storage costs'
    ],
    limitations: [
      'Data availability concerns',
      'Typically relies on data availability committees',
      'Less decentralized than full ZK-Rollups'
    ],
    compatibilityTags: ['off-chain-data', 'scaling-solution', 'high-throughput'],
    attributes: {
      privacy: 80,
      scalability: 98,
      costEfficiency: 95,
      usability: 70
    },
    image: 'validium.svg',
    tooltipContent: 'Validium achieves extreme scalability by using zero-knowledge proofs for transaction validity while storing transaction data off-chain, dramatically reducing costs but requiring trust in data availability systems.'
  },
  {
    id: 'zkporter',
    name: 'ZK Porter',
    category: 'ZK Rollups/Scaling',
    description: 'A hybrid scaling solution that combines aspects of ZK-Rollups with Validium, allowing users to choose between on-chain and off-chain data availability.',
    capabilities: [
      'User choice between security models',
      'Flexible data availability options',
      'High scalability potential',
      'Graduated security options'
    ],
    limitations: [
      'Complex architecture',
      'Mixed security guarantees',
      'Developing ecosystem and standards'
    ],
    compatibilityTags: ['hybrid-scaling', 'flexible-security', 'high-throughput'],
    attributes: {
      privacy: 85,
      scalability: 95,
      costEfficiency: 90,
      usability: 65
    },
    image: 'zkporter.svg',
    tooltipContent: 'ZK Porter provides hybrid scaling by allowing users to choose between full ZK-Rollup security with on-chain data availability or higher throughput with off-chain data storage, offering flexibility based on security requirements.'
  },
  {
    id: 'zkevm',
    name: 'zkEVM',
    category: 'ZK Rollups/Scaling',
    description: 'Zero-Knowledge Ethereum Virtual Machine that enables proving the correctness of EVM execution with zero-knowledge proofs.',
    capabilities: [
      'EVM compatibility at bytecode level',
      'Support for existing Ethereum smart contracts',
      'Developer-friendly environment',
      'ZK-powered security and verification'
    ],
    limitations: [
      'Complex proof generation for EVM opcodes',
      'Performance optimizations still in progress',
      'Varying levels of EVM equivalence in implementations'
    ],
    compatibilityTags: ['evm-compatible', 'smart-contracts', 'developer-friendly'],
    attributes: {
      privacy: 70,
      scalability: 90,
      costEfficiency: 80,
      usability: 85
    },
    image: 'zkevm.svg',
    tooltipContent: 'zkEVM implements an Ethereum-compatible virtual machine that can generate zero-knowledge proofs of execution, enabling existing Ethereum contracts to be proven and verified in a ZK context.'
  },
  {
    id: 'zk-coprocessor',
    name: 'ZK Coprocessor',
    category: 'ZK Rollups/Scaling',
    description: 'Specialized hardware or software components that offload ZK proof generation from the main computing environment for improved performance.',
    capabilities: [
      'Accelerated proof generation',
      'Reduced computational overhead',
      'Specialized hardware optimization',
      'Parallel processing capabilities'
    ],
    limitations: [
      'Potential centralization from hardware requirements',
      'Additional infrastructure complexity',
      'May require specialized knowledge to operate'
    ],
    compatibilityTags: ['hardware-acceleration', 'proving-efficiency', 'specialized-circuits'],
    attributes: {
      privacy: 80,
      scalability: 85,
      costEfficiency: 70,
      usability: 60
    },
    image: 'zk-coprocessor.svg',
    tooltipContent: 'ZK Coprocessors offload zero-knowledge proof computation to specialized hardware or optimized software environments, dramatically improving proving speed and enabling more complex ZK applications.'
  },

  // Privacy Applications Category
  {
    id: 'private-transactions',
    name: 'Private Transactions',
    category: 'Privacy Applications',
    description: 'Technology that shields transaction details including sender, receiver, and amount while proving transaction validity.',
    capabilities: [
      'Confidential transfer amounts',
      'Potential sender/receiver privacy',
      'Provable transaction validity',
      'Compatible with existing blockchains'
    ],
    limitations: [
      'Performance overhead for privacy',
      'Varying levels of metadata leakage',
      'Regulatory considerations'
    ],
    compatibilityTags: ['financial-privacy', 'confidential-transfers', 'shielded-transactions'],
    attributes: {
      privacy: 95,
      scalability: 70,
      costEfficiency: 60,
      usability: 70
    },
    image: 'private-transactions.svg',
    tooltipContent: 'Private transaction technologies use zero-knowledge proofs to enable users to transfer assets without revealing critical details like amount or participant identity, while still ensuring transaction validity.'
  },
  {
    id: 'semaphore',
    name: 'Semaphore',
    category: 'Privacy Applications',
    description: 'A zero-knowledge protocol for anonymous signaling and group membership proofs, designed for privacy-preserving interactions.',
    capabilities: [
      'Anonymous group messaging',
      'Proof of membership without revealing identity',
      'Efficient Merkle tree-based structure',
      'Used in private voting and reputation systems'
    ],
    limitations: [
      'Requires off-chain coordination for group management',
      'Limited to specific use cases like signaling and voting',
      'Depends on Merkle tree updates for membership changes'
    ],
    compatibilityTags: ['anonymous-interaction', 'merkle-tree', 'zkp'],
    attributes: {
      privacy: 90,
      scalability: 80,
      costEfficiency: 85,
      usability: 70
    },
    image: 'semaphore.svg',
    tooltipContent: 'Semaphore enables privacy-preserving group interactions by allowing users to prove membership and signal anonymously without revealing their identity. It is widely used in voting, reputation systems, and anonymous signaling applications.'
  },
  {
    id: 'private-voting',
    name: 'Private Voting',
    category: 'Privacy Applications',
    description: 'Zero-knowledge voting systems that enable anonymous participation while ensuring vote correctness and preventing double-voting.',
    capabilities: [
      'Voter anonymity',
      'Vote correctness verification',
      'Protection against double-voting',
      'Public result verification'
    ],
    limitations: [
      'Complex vote setup process',
      'Scaling challenges for large elections',
      'Requires careful cryptographic implementation'
    ],
    compatibilityTags: ['anonymous-voting', 'governance', 'collective-decision-making'],
    attributes: {
      privacy: 95,
      scalability: 75,
      costEfficiency: 65,
      usability: 70
    },
    image: 'private-voting.svg',
    tooltipContent: 'Private voting systems use zero-knowledge proofs to allow participants to cast verifiable votes without revealing their identity, while ensuring each eligible voter can only vote once and results can be publicly verified.'
  },
  {
    id: 'private-smart-contracts',
    name: 'Private Smart Contracts',
    category: 'Privacy Applications',
    description: 'Smart contracts that keep inputs, state, and logic confidential while still proving correct execution.',
    capabilities: [
      'Confidential contract state',
      'Private transaction inputs and outputs',
      'Verifiable correct execution',
      'Programmable privacy rules'
    ],
    limitations: [
      'Performance overhead for privacy',
      'Complex programming model',
      'Limited tooling compared to public contracts'
    ],
    compatibilityTags: ['confidential-computing', 'private-state', 'encrypted-execution'],
    attributes: {
      privacy: 95,
      scalability: 65,
      costEfficiency: 60,
      usability: 60
    },
    image: 'private-smart-contracts.svg',
    tooltipContent: 'Private smart contracts enable confidential programmable logic where inputs, outputs, and contract state remain encrypted while still providing cryptographic proof that execution followed the correct rules.'
  },
  {
    id: 'shielded-pool',
    name: 'Shielded Pool',
    category: 'Privacy Applications',
    description: 'A privacy mechanism that allows users to deposit assets into a shared pool and withdraw them later, breaking the transaction link.',
    capabilities: [
      'Transaction linkability prevention',
      'Anonymity set benefits',
      'Compatible with various assets',
      'Zero-knowledge proof security'
    ],
    limitations: [
      'Fixed denomination requirements',
      'Privacy depends on pool size/usage',
      'Regulatory compliance challenges'
    ],
    compatibilityTags: ['anonymity-set', 'transaction-privacy', 'financial-privacy'],
    attributes: {
      privacy: 90,
      scalability: 75,
      costEfficiency: 70,
      usability: 75
    },
    image: 'shielded-pool.svg',
    tooltipContent: 'Shielded pools allow users to deposit assets and later withdraw them using zero-knowledge proofs to demonstrate they own a deposit without revealing which one, effectively breaking the on-chain transaction trail.'
  },
  {
    id: 'private-data-marketplace',
    name: 'Private Data Marketplace',
    category: 'Privacy Applications',
    description: 'A system for confidential data sharing and trading where data can be verified and paid for without revealing its contents.',
    capabilities: [
      'Data confidentiality in market transactions',
      'Verifiable data quality without disclosure',
      'Secure payment mechanics',
      'Privacy-preserving data utilization'
    ],
    limitations: [
      'Complex multi-party interaction',
      'Performance constraints for large datasets',
      'Evolving market mechanisms'
    ],
    compatibilityTags: ['data-economy', 'confidential-analytics', 'verifiable-computation'],
    attributes: {
      privacy: 90,
      scalability: 70,
      costEfficiency: 75,
      usability: 65
    },
    image: 'private-data-marketplace.svg',
    tooltipContent: 'Private data marketplaces enable entities to share, trade, and utilize data while maintaining confidentiality and providing cryptographic guarantees about data quality and processing compliance.'
  },

  // Identity Solutions Category
  {
    id: 'zk-identity',
    name: 'ZK Identity',
    category: 'Identity Solutions',
    description: 'Identity systems that use zero-knowledge proofs to verify user attributes without revealing the underlying data.',
    capabilities: [
      'Selective disclosure of identity attributes',
      'Privacy-preserving verification',
      'Prevention of identity correlation',
      'User-controlled attribute sharing'
    ],
    limitations: [
      'Complex credential issuance process',
      'Requires trusted credential issuers',
      'User experience challenges'
    ],
    compatibilityTags: ['selective-disclosure', 'credential-verification', 'user-control'],
    attributes: {
      privacy: 95,
      scalability: 80,
      costEfficiency: 75,
      usability: 70
    },
    image: 'zk-identity.svg',
    tooltipContent: 'ZK Identity systems allow users to prove specific facts about their identity (like being over 18) without revealing their actual age or other personal information, using zero-knowledge proofs for verification.'
  },
  {
    id: 'anonymous-credentials',
    name: 'Anonymous Credentials',
    category: 'Identity Solutions',
    description: 'Cryptographic credentials that allow proving possession of attributes without revealing user identity, preventing tracking.',
    capabilities: [
      'Unlinkable credential usage',
      'Prevention of tracking across verifications',
      'Selective disclosure of attributes',
      'Strong cryptographic guarantees'
    ],
    limitations: [
      'Requires specialized cryptographic schemes',
      'More complex than standard credentials',
      'Limited real-world adoption and standards'
    ],
    compatibilityTags: ['unlinkability', 'anti-tracking', 'credential-anonymity'],
    attributes: {
      privacy: 95,
      scalability: 75,
      costEfficiency: 70,
      usability: 65
    },
    image: 'anonymous-credentials.svg',
    tooltipContent: 'Anonymous credentials allow users to prove they possess authorized credentials without revealing which specific credential is being used, preventing service providers from tracking users across different interactions.'
  },
  {
    id: 'zk-kyc',
    name: 'ZK KYC',
    category: 'Identity Solutions',
    description: 'Know Your Customer verification that uses zero-knowledge proofs to confirm user verification status without sharing personal data.',
    capabilities: [
      'Regulatory compliance without data sharing',
      'Reusable verification across services',
      'Privacy-preserving identity checks',
      'Reduced data breach risks'
    ],
    limitations: [
      'Requires regulator acceptance',
      'Complex implementation',
      'Evolving regulatory landscape'
    ],
    compatibilityTags: ['regulatory-compliance', 'financial-identity', 'privacy-regulations'],
    attributes: {
      privacy: 90,
      scalability: 80,
      costEfficiency: 85,
      usability: 75
    },
    image: 'zk-kyc.svg',
    tooltipContent: 'ZK KYC enables financial services to verify that users have passed required identity checks without accessing or storing personal data, reducing compliance costs and data breach risks while maintaining privacy.'
  },
  {
    id: 'sybil-resistance',
    name: 'Sybil Resistance',
    category: 'Identity Solutions',
    description: 'Techniques using zero-knowledge proofs to ensure each real-world entity can only create one valid identity without revealing personal data.',
    capabilities: [
      'Prevention of multiple identities per person',
      'Privacy-preserving uniqueness verification',
      'Protection against system manipulation',
      'Compatible with anonymous usage'
    ],
    limitations: [
      'Often requires initial biometric verification',
      'Complex cryptographic protocols',
      'Potential centralization in verification process'
    ],
    compatibilityTags: ['unique-humanity', 'anti-manipulation', 'proof-of-personhood'],
    attributes: {
      privacy: 85,
      scalability: 80,
      costEfficiency: 75,
      usability: 70
    },
    image: 'sybil-resistance.svg',
    tooltipContent: 'Sybil resistance mechanisms ensure that each real human can only create one valid identity in a system, preventing manipulation through multiple accounts while preserving anonymity and privacy.'
  },
  {
    id: 'proof-of-personhood',
    name: 'Proof of Personhood',
    category: 'Identity Solutions',
    description: 'Protocols that verify a user is a unique human without revealing their identity, using zero-knowledge proofs and other cryptographic techniques.',
    capabilities: [
      'Unique humanity verification',
      'Anonymous personhood proof',
      'Protection against bots and duplicate accounts',
      'Democratic resource allocation'
    ],
    limitations: [
      'Various methods with different security/privacy tradeoffs',
      'Some require physical presence or hardware',
      'Challenge of true centralization-free implementation'
    ],
    compatibilityTags: ['unique-human', 'anti-bot', 'democratic-systems'],
    attributes: {
      privacy: 90,
      scalability: 85,
      costEfficiency: 75,
      usability: 70
    },
    image: 'proof-of-personhood.svg',
    tooltipContent: 'Proof of Personhood protocols allow individuals to prove they are unique humans without revealing their identity, enabling fair resource allocation and protection against sybil attacks in democratic systems.'
  },
  {
    id: 'anon-aadhaar',
    name: 'Anon-Aadhaar',
    category: 'Identity Solutions',
    description: 'A zero-knowledge protocol that enables users to prove they possess a verified Aadhaar (Indian digital identity) without revealing any personal data.',
    capabilities: [
      'Verifiable Aadhaar identity proofs without revealing personal data',
      'Government-backed identity verification with privacy',
      'Compatible with existing identity infrastructure',
      'Client-side verification without server access to personal data'
    ],
    limitations: [
      'Reliance on Aadhaar digital signature infrastructure',
      'Limited to Aadhaar-verified individuals',
      'May require periodic reverification with Aadhaar system'
    ],
    compatibilityTags: ['identity-verification', 'government-credentials', 'zero-knowledge-proofs'],
    attributes: {
      privacy: 95,
      scalability: 80,
      costEfficiency: 85,
      usability: 75
    },
    image: 'anon-aadhaar.svg',
    tooltipContent: 'Anon-Aadhaar enables private verification of Aadhaar identity, allowing users to prove they have a verified government identity without revealing any personal information. Perfect for applications requiring strong identity assurance with maximum privacy.'
  },
  {
    id: 'maci',
    name: 'MACI',
    category: 'Privacy Applications',
    description: 'Minimum Anti-Collusion Infrastructure - a framework that prevents vote buying and collusion in voting systems by breaking the link between voter identity and their vote.',
    capabilities: [
      'Prevents vote buying and voter coercion',
      'Ensures vote privacy and anonymity',
      'Allows verification of correct vote tallying',
      'Supports complex voting mechanisms'
    ],
    limitations: [
      'Complex key management requirements',
      'Trade-off between usability and security',
      'Relatively heavyweight cryptographic processes'
    ],
    compatibilityTags: ['voting-systems', 'anti-collusion', 'private-governance'],
    attributes: {
      privacy: 90,
      scalability: 70,
      costEfficiency: 75,
      usability: 65
    },
    image: 'maci.svg',
    tooltipContent: 'MACI (Minimum Anti-Collusion Infrastructure) is designed to prevent vote buying and coercion through cryptographic techniques that make it impossible for voters to prove how they voted even to themselves, while ensuring votes are correctly tallied.'
  },
  {
    id: 'tlsnotary',
    name: 'TLSNotary',
    category: 'Privacy Applications',
    description: 'A protocol that enables a user to prove to a third party that specific content was obtained from a secure HTTPS website without revealing private information.',
    capabilities: [
      'Proves the contents of encrypted web sessions to third parties',
      'Maintains privacy of session data outside the proven statement',
      'Works with standard HTTPS/TLS connections',
      'Doesn\'t require website cooperation'
    ],
    limitations: [
      'Complex cryptographic setup',
      'Limited to current TLS protocol versions',
      'Cannot prove client-side interactions'
    ],
    compatibilityTags: ['web-verification', 'https-proofs', 'selective-disclosure'],
    attributes: {
      privacy: 85,
      scalability: 70,
      costEfficiency: 80,
      usability: 65
    },
    image: 'tlsnotary.svg',
    tooltipContent: 'TLSNotary allows proving that specific data was obtained from a secure website without revealing everything. This enables selective verification of web-based information while maintaining privacy for sensitive data.'
  },
  {
    id: 'openpassport',
    name: 'OpenPassport',
    category: 'Identity Solutions',
    description: 'An open framework for creating, managing, and verifying digital identity credentials with privacy-preserving properties and selective disclosure capabilities.',
    capabilities: [
      'Creating and managing verifiable credentials',
      'Selective disclosure of identity attributes',
      'Cross-platform credential verification',
      'User-controlled identity management'
    ],
    limitations: [
      'Requires adoption by credential issuers',
      'Varying levels of privacy based on implementation',
      'Evolving standards and interoperability'
    ],
    compatibilityTags: ['verifiable-credentials', 'selective-disclosure', 'identity-management'],
    attributes: {
      privacy: 90,
      scalability: 85,
      costEfficiency: 80,
      usability: 80
    },
    image: 'openpassport.svg',
    tooltipContent: 'OpenPassport provides a framework for privacy-preserving digital identity with selective disclosure capabilities, allowing users to prove specific facts about their identity without revealing all their personal information.'
  },
  {
    id: 'zkemail',
    name: 'ZKEmail',
    category: 'Privacy Applications',
    description: 'A protocol that enables users to prove properties about email contents using zero-knowledge proofs without revealing the actual email.',
    capabilities: [
      'Verifiable email content proofs without exposing private data',
      'Proving email authenticity and sender verification',
      'Selective disclosure of email properties',
      'Compatible with standard email providers'
    ],
    limitations: [
      'Complex proof generation process',
      'Limited by email cryptographic infrastructure',
      'Scaling challenges for large email proofs'
    ],
    compatibilityTags: ['email-verification', 'document-proofs', 'selective-disclosure'],
    attributes: {
      privacy: 90,
      scalability: 75,
      costEfficiency: 80,
      usability: 70
    },
    image: 'zkemail.svg',
    tooltipContent: 'ZKEmail enables creating zero-knowledge proofs about email contents, allowing verification of email properties (such as sender, content excerpts, or attachments) without revealing the entire email or private information.'
  },
  {
    id: 'mopro',
    name: 'MoPro',
    category: 'Identity Solutions',
    description: 'A system for verifiable mobile phone property proofs that allows users to prove facts about their device without revealing the device itself.',
    capabilities: [
      'Device verification without revealing device details',
      'Proof of mobile identity factor ownership',
      'Compatible with various mobile authentication schemes',
      'Low device resource requirements'
    ],
    limitations: [
      'Requires secure mobile execution environment',
      'Varying levels of security across different devices',
      'Limited to provable device properties'
    ],
    compatibilityTags: ['mobile-verification', 'device-proofs', 'authentication'],
    attributes: {
      privacy: 85,
      scalability: 90,
      costEfficiency: 85,
      usability: 80
    },
    image: 'mopro.svg',
    tooltipContent: 'MoPro enables privacy-preserving mobile device verification, allowing users to prove properties about their mobile devices (like ownership, model type, or security features) without revealing sensitive device identifiers.'
  },
  {
    id: 'zkp2p',
    name: 'ZKP2P',
    category: 'Privacy Applications',
    description: 'Zero-Knowledge Peer-to-Peer protocol allowing direct, private transactions between users with cryptographic verification but without revealing transaction details.',
    capabilities: [
      'Direct peer-to-peer private transactions',
      'Transaction validity verification without revealing details',
      'No central intermediary required',
      'Cryptographic guarantees for both parties'
    ],
    limitations: [
      'Complex key management for users',
      'Scaling challenges for large transaction networks',
      'Requires both parties to use compatible software'
    ],
    compatibilityTags: ['peer-to-peer', 'private-transactions', 'direct-exchange'],
    attributes: {
      privacy: 95,
      scalability: 80,
      costEfficiency: 85,
      usability: 70
    },
    image: 'zkp2p.svg',
    tooltipContent: 'ZKP2P enables direct private transactions between peers using zero-knowledge proofs to verify transaction validity without revealing amounts or participant details, ideal for private exchanges without intermediaries.'
  }
];

const getCardById = (cardId) => {
  return cards.find(card => card.id === cardId);
};

export { getCardById };
export default cards;
