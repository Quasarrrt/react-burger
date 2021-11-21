import React from 'react';
import stylesModalOverlay from './ModalOverlay.module.css'

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