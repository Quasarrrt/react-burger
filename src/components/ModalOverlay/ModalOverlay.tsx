import React from 'react';
import stylesModalOverlay from './ModalOverlay.module.css'
import PropTypes from "prop-types";

interface IModalOverlay {
    onClose: () => void;
}
const ModalOverlay: React.FC<IModalOverlay> = ({onClose}) => {
    return (
        <div className={stylesModalOverlay.overlay} onClick={onClose}>
        </div>
    );
};


export default ModalOverlay;