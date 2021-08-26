import React from 'react'
import ReactDom from 'react-dom'
import modalStyles from './Modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {useEffect} from "react";
import PropTypes from "prop-types";


function Modal({ open, children, onClose, isOrderModal }) {
    const onKeydown = (event) => {
        if(event.key === 'Escape'){
            onClose()
        }
    }
     useEffect(() => {
         document.addEventListener('keydown', onKeydown)
         return () => document.removeEventListener('keydown', onKeydown)
     })
    if (!open) return null

    return ReactDom.createPortal(
        <>

            <ModalOverlay onClose={onClose}/>
            <div className={["pr-10 pl-10 pt-10", modalStyles.modalHeader].join(' ')}>
                <div className={modalStyles.modalHeaderWrapper}>
                    <h2 className={["text text_type_main-large", modalStyles.headerText].join(' ')}>
                        {isOrderModal ? "" : ("Детали ингредиента")}
                    </h2>
                    <button onClick={onClose} className={modalStyles.button}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    isOrderModal: PropTypes.bool.isRequired,

};

export default Modal;
