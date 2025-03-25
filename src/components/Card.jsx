import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalPortal from './ModalPortal';
import './Card.css';

/**
 * Improved Card component - represents a ZK technology card
 */
function Card({ card, simplified = false, onClick }) {
  const [showModal, setShowModal] = useState(false);

  // Handle Learn More button click
  const handleLearnMoreClick = (e) => {
    e.stopPropagation(); // Prevent card click
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle click outside modal
  const handleOverlayClick = (e) => {
    if (e.target.className === 'card-modal-overlay') {
      handleCloseModal();
    }
  };

  // For compact view in Available Cards panel
  if (simplified) {
    return (
      <div
        className={`card-simple card-simple--${card.category.toLowerCase().replace(/\s+/g, '-')}`}
        onClick={() => onClick && onClick(card)}
      >
        <div className="card-simple__header">
          <h4 className="card-simple__name">{card.name}</h4>
          <span className="card-simple__category">{card.category}</span>
        </div>
        <div className="card-simple__icon-container">
          <img
            src={`/images/card-icons/${card.id}.svg`}
            alt={card.name}
            className="card-simple__icon"
          />
        </div>
        <button
          className="card-simple__learn-more"
          onClick={handleLearnMoreClick}
        >
          Learn More
        </button>

        {/* Modal using Portal */}
        {showModal && (
          <ModalPortal isOpen={showModal} onClose={handleCloseModal}>
            <div className="card-modal-overlay" onClick={handleOverlayClick}>
              <div className="card-modal" onClick={e => e.stopPropagation()}>
                <div className="card-modal__header">
                  <h3 className="card-modal__title">{card.name}</h3>
                  <button
                    className="card-modal__close"
                    onClick={handleCloseModal}
                  >
                    ×
                  </button>
                </div>

                <div className="card-modal__content">
                  <div className="card-modal__icon-container">
                    <img
                      src={`/images/card-icons/${card.id}.svg`}
                      alt={card.name}
                      className="card-modal__icon"
                    />
                  </div>

                  <div className="card-modal__info">
                    <div className="card-modal__category">{card.category}</div>
                    <p className="card-modal__description">{card.description}</p>

                    <div className="card-modal__section">
                      <h4>Capabilities</h4>
                      <ul>
                        {card.capabilities.map((capability, index) => (
                          <li key={index}>{capability}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="card-modal__section">
                      <h4>Limitations</h4>
                      <ul>
                        {card.limitations.map((limitation, index) => (
                          <li key={index}>{limitation}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="card-modal__attributes">
                      <h4>Attributes</h4>
                      {Object.entries(card.attributes).map(([attr, value]) => (
                        <div key={attr} className="card-modal__attribute">
                          <div className="card-modal__attribute-name">{attr}</div>
                          <div className="card-modal__attribute-bar">
                            <div
                              className="card-modal__attribute-fill"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="card-modal__attribute-value">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalPortal>
        )}
      </div>
    );
  }

  // Full card version for other views
  return (
    <div
      className={`card card--${card.category.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={() => onClick && onClick(card)}
    >
      <div className="card__header">
        <h3 className="card__name">{card.name}</h3>
        <div className="card__category">{card.category}</div>
      </div>

      <div className="card__image">
        <img
          src={`/images/card-icons/${card.id}.svg`}
          alt={card.name}
          className="card__icon"
        />
      </div>

      <div className="card__content">
        <p className="card__description">{card.description}</p>

        <div className="card__attributes">
          {Object.entries(card.attributes).map(([attr, value]) => (
            <div key={attr} className="card__attribute">
              <div className="card__attribute-name">{attr}</div>
              <div className="card__attribute-bar">
                <div
                  className="card__attribute-fill"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          className="card__learn-more"
          onClick={handleLearnMoreClick}
        >
          Learn More
        </button>
      </div>

      {/* Modal using Portal */}
      {showModal && (
        <ModalPortal isOpen={showModal} onClose={handleCloseModal}>
          <div className="card-modal-overlay" onClick={handleOverlayClick}>
            <div className="card-modal" onClick={e => e.stopPropagation()}>
              <div className="card-modal__header">
                <h3 className="card-modal__title">{card.name}</h3>
                <button
                  className="card-modal__close"
                  onClick={handleCloseModal}
                >
                  ×
                </button>
              </div>

              <div className="card-modal__content">
                <div className="card-modal__icon-container">
                  <img
                    src={`/images/card-icons/${card.id}.svg`}
                    alt={card.name}
                    className="card-modal__icon"
                  />
                </div>

                <div className="card-modal__info">
                  <div className="card-modal__category">{card.category}</div>
                  <p className="card-modal__description">{card.description}</p>

                  <div className="card-modal__section">
                    <h4>Capabilities</h4>
                    <ul>
                      {card.capabilities.map((capability, index) => (
                        <li key={index}>{capability}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-modal__section">
                    <h4>Limitations</h4>
                    <ul>
                      {card.limitations.map((limitation, index) => (
                        <li key={index}>{limitation}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-modal__attributes">
                    <h4>Attributes</h4>
                    {Object.entries(card.attributes).map(([attr, value]) => (
                      <div key={attr} className="card-modal__attribute">
                        <div className="card-modal__attribute-name">{attr}</div>
                        <div className="card-modal__attribute-bar">
                          <div
                            className="card-modal__attribute-fill"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <span className="card-modal__attribute-value">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    capabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    limitations: PropTypes.arrayOf(PropTypes.string).isRequired,
    attributes: PropTypes.object.isRequired,
    tooltipContent: PropTypes.string
  }).isRequired,
  simplified: PropTypes.bool,
  onClick: PropTypes.func
};

export default Card;