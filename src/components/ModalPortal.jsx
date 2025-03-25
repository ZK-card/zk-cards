import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * ModalPortal - Component that renders its children in a portal outside the normal DOM hierarchy
 * This helps prevent z-index issues and improves modal rendering
 */
function ModalPortal({ children, isOpen }) {
    // Create and clean up the portal root element
    useEffect(() => {
        if (isOpen) {
            // Lock scroll when modal is open
            document.body.classList.add('modal-open');
        }

        // Cleanup
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Get existing portal root or create it
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);
    }

    // Create portal
    return ReactDOM.createPortal(children, modalRoot);
}

ModalPortal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired
};

export default ModalPortal;