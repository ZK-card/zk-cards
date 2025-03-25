import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import './ExpansionPlanScreen.css';

/**
 * ExpansionPlanScreen component - displays future plans and roadmap for the game
 * @param {Object} props - Component props
 * @param {Function} props.onBackClick - Handler for back button click
 * @returns {React.Element} The rendered ExpansionPlanScreen component
 */
function ExpansionPlanScreen({ onBackClick }) {
    // Animation for page entry
    const pageSpring = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { tension: 120, friction: 14 },
    });

    // Animation for content sections with staggered delay
    const contentSpring1 = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 200,
        config: { tension: 100, friction: 12 },
    });

    const contentSpring2 = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 300,
        config: { tension: 100, friction: 12 },
    });

    const contentSpring3 = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 400,
        config: { tension: 100, friction: 12 },
    });

    const contentSpring4 = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 500,
        config: { tension: 100, friction: 12 },
    });

    return (
        <animated.div className="expansion-plan" style={pageSpring}>
            <div className="expansion-plan__content">
                <h1 className="expansion-plan__title">Expansion Plans</h1>
                <p className="expansion-plan__subtitle">Our roadmap for the future of ZK Card Game</p>


                <animated.div className="expansion-plan__section" style={contentSpring1}>
                    <div className="expansion-plan__section-header">
                        <div className="expansion-plan__icon-container expansion-plan__icon-container--phase1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z" fill="currentColor" />
                            </svg>
                        </div>
                        <h2>Phase 1: Foundation (Current)</h2>
                    </div>
                    <p className="expansion-plan__text">
                        Our current phase focuses on establishing the core educational experience through the first two worlds:
                        "ZK Foundations" and "Verifiable Privacy World." We're gathering feedback and refining the gameplay to
                        ensure a solid foundation for future expansion.
                    </p>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker expansion-plan__milestone-marker--complete"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>Core Game Mechanics ✓</h4>
                            <p>Card-based decision making, scenario challenges, and educational feedback.</p>
                        </div>
                    </div>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker expansion-plan__milestone-marker--complete"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>Initial ZK Card Set ✓</h4>
                            <p>First collection of ZK technologies across different categories.</p>
                        </div>
                    </div>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker expansion-plan__milestone-marker--active"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>Early Player Feedback</h4>
                            <p>Collecting feedback to improve user experience and learning outcomes.</p>
                        </div>
                    </div>
                </animated.div>

                <animated.div className="expansion-plan__section" style={contentSpring2}>
                    <div className="expansion-plan__section-header">
                        <div className="expansion-plan__icon-container expansion-plan__icon-container--phase2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M14 9V4H5v16h6.056c.328.417.724.785 1.18 1.085l1.39.915H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.444 3.445 2 3.993 2h10.014c.548 0 .993.444.993.992V9h-1zm6.656 6.171a.993.993 0 0 1 0 1.415l-5.656 5.657a.993.993 0 0 1-1.401.013l-2.825-2.827a.993.993 0 0 1 0-1.415c.391-.391 1.024-.39 1.415 0l2.117 2.118 4.95-4.95a.993.993 0 0 1 1.4-.01z" fill="currentColor" />
                            </svg>
                        </div>
                        <h2>Phase 2: Expansion (Q2 2025)</h2>
                    </div>
                    <p className="expansion-plan__text">
                        The second phase will focus on expanding the game content and enhancing the learning experience with more
                        interactive elements and detailed educational resources.
                    </p>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>New Worlds: ZK in DeFi and Identity & Privacy</h4>
                            <p>Two new worlds with 5 scenarios each, focusing on real-world applications of ZK in financial systems and identity solutions.</p>
                        </div>
                    </div>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>Expanded Card Collection</h4>
                            <p>Additional ZK technology cards reflecting the latest advancements and emerging protocols.</p>
                        </div>
                    </div>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>Interactive Tutorials</h4>
                            <p>Enhanced learning resources with step-by-step explanations of ZK concepts and implementations.</p>
                        </div>
                    </div>
                </animated.div>

                <animated.div className="expansion-plan__section" style={contentSpring3}>
                    <div className="expansion-plan__section-header">
                        <div className="expansion-plan__icon-container expansion-plan__icon-container--phase3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M17.754 15a5.502 5.502 0 0 1-7.397 3.016 5.5 5.5 0 0 1-8.415-2.328A9.004 9.004 0 0 0 10.999 22a9.003 9.003 0 0 0 8.615-6.394l-1.86-.666zM17.5 13c-1.931 0-3.5-1.57-3.5-3.5S15.569 6 17.5 6 21 7.57 21 9.5s-1.569 3.5-3.5 3.5zM6.5 13c-1.931 0-3.5-1.57-3.5-3.5S4.569 6 6.5 6 10 7.57 10 9.5 8.431 13 6.5 13z" fill="currentColor" />
                            </svg>
                        </div>
                        <h2>Phase 3: Community & Collaboration (Q4 2025)</h2>
                    </div>
                    <p className="expansion-plan__text">
                        The third phase will introduce collaborative features and community-driven content, allowing players to
                        create and share their own scenarios and educational resources.
                    </p>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>Scenario Editor</h4>
                            <p>Tools for creating and sharing custom ZK scenarios with the community.</p>
                        </div>
                    </div>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>Collaborative Challenges</h4>
                            <p>Multi-player scenarios requiring team solutions to complex ZK implementation challenges.</p>
                        </div>
                    </div>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>Community Leaderboards</h4>
                            <p>Recognition for players who create the most educational and engaging content.</p>
                        </div>
                    </div>
                </animated.div>

                <animated.div className="expansion-plan__section" style={contentSpring4}>
                    <div className="expansion-plan__section-header">
                        <div className="expansion-plan__icon-container expansion-plan__icon-container--phase4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M6.5 9H4c-.55 0-1-.45-1-1s.45-1 1-1h2.5c.55 0 1 .45 1 1s-.45 1-1 1zm14.5 3h-9c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1s-.45 1-1 1zM8.5 11.5H11c.55 0 1 .45 1 1V14c0 .55-.45 1-1 1H8.5c-.55 0-1-.45-1-1v-1.5c0-.55.45-1 1-1zm-3-6.5H8c.55 0 1 .45 1 1V7c0 .55-.45 1-1 1H5.5c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1zm6 10H14c.55 0 1 .45 1 1v1.5c0 .55-.45 1-1 1h-2.5c-.55 0-1-.45-1-1V16c0-.55.45-1 1-1zm1-8H14c.55 0 1 .45 1 1V10c0 .55-.45 1-1 1h-1.5c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1zm9 0H19c-.55 0-1 .45-1 1V10c0 .55.45 1 1 1h1.5c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1zm0 8H19c-.55 0-1 .45-1 1v1.5c0 .55.45 1 1 1h1.5c.55 0 1-.45 1-1V16c0-.55-.45-1-1-1z" fill="currentColor" />
                            </svg>
                        </div>
                        <h2>Phase 4: Beyond Cards (late 2025)</h2>
                    </div>
                    <p className="expansion-plan__text">
                        The long-term vision for ZK Card game extends beyond the card game format to provide a comprehensive
                        educational platform for ZK technologies.
                    </p>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>Interactive ZK Circuit Builder</h4>
                            <p>Visual tools for designing and testing simple ZK circuits and applications.</p>
                        </div>
                    </div>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>Real-World Implementation Sandbox</h4>
                            <p>Simplified environment for testing ZK concepts in simulated real-world scenarios.</p>
                        </div>
                    </div>
                    <div className="expansion-plan__milestone">
                        <div className="expansion-plan__milestone-marker"></div>
                        <div className="expansion-plan__milestone-content">
                            <h4>Educational Certification Program</h4>
                            <p>Formal recognition of ZK knowledge acquired through the platform.</p>
                        </div>
                    </div>
                </animated.div>

                <div className="expansion-plan__get-involved">
                    <h3>Get Involved!</h3>
                    <p>
                        We're actively seeking feedback and contributions from the community. If you have ideas for new scenarios,
                        card concepts, or feature suggestions, please share them through our feedback form or DM me on X.
                    </p>
                    <div className="expansion-plan__links">
                        <a href="https://y75i33evn8q.typeform.com/to/Zyrj63FI" target="_blank" rel="noopener noreferrer" className="expansion-plan__link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zm-.692-2H20V5H4v13.385L5.763 17zM11 10h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2z" fill="currentColor" />
                            </svg>
                            <span>Submit Feedback</span>
                        </a>
                        <a href="https://github.com/hackertron/zk-card-clash" target="_blank" rel="noopener noreferrer" className="expansion-plan__link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" fill="currentColor" />
                            </svg>
                            <span>GitHub Repository</span>
                        </a>
                        <a href="https://x.com/jayssj1" target="_blank" rel="noopener noreferrer" className="expansion-plan__link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" fill="currentColor" />
                            </svg>
                            <span>Follow for Updates</span>
                        </a>
                    </div>
                </div>

                <div className="expansion-plan__footer">
                    <button
                        className="expansion-plan__back-button"
                        onClick={onBackClick}
                    >
                        Back to Main Menu
                    </button>
                </div>
            </div>
        </animated.div>
    );
}

ExpansionPlanScreen.propTypes = {
    onBackClick: PropTypes.func.isRequired,
};

export default ExpansionPlanScreen;