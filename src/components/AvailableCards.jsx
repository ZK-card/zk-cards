import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './AvailableCards.css';

/**
 * AvailableCards component - shows cards that can be used in the scenario
 */
function AvailableCards({ cards, placedCards, selectedCard, onCardSelect, isSubmitting }) {
    // Check if card is placed in any slot
    const isCardPlaced = (cardId) => {
        return placedCards.includes(cardId);
    };

    // Handle card click
    const handleCardClick = (card) => {
        if (isSubmitting || isCardPlaced(card.id)) return;
        onCardSelect(card);
    };

    // Group cards by category
    const cardsByCategory = cards.reduce((groups, card) => {
        const category = card.category;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(card);
        return groups;
    }, {});

    return (
        <div className="available-cards">
            <h2 className="available-cards__title">Available Cards</h2>

            {Object.entries(cardsByCategory).map(([category, categoryCards]) => (
                <div key={category} className="available-cards__category">
                    <h3 className="available-cards__category-title">{category}</h3>
                    <div className="available-cards__grid">
                        {categoryCards.map(card => (
                            <div
                                key={card.id}
                                className={`available-cards__card 
                  ${isCardPlaced(card.id) ? 'available-cards__card--used' : ''} 
                  ${selectedCard?.id === card.id ? 'available-cards__card--selected' : ''}`}
                            >
                                <Card
                                    card={card}
                                    simplified={true}
                                    onClick={() => handleCardClick(card)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

AvailableCards.propTypes = {
    cards: PropTypes.array.isRequired,
    placedCards: PropTypes.array.isRequired,
    selectedCard: PropTypes.object,
    onCardSelect: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool
};

export default AvailableCards;