import React from 'react'
import ReactDom from 'react-dom'
import modalStyles from './Modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {useEffect} from "react";
interface IModal {
    open: boolean;
    onClose: (isGoBack: boolean) => void;
    title:string;
    isGoBack: boolean;
}
const Modal: React.FC<IModal>= ({ open, children, onClose, title,isGoBack })=>{
    const onKeydown = (event:KeyboardEvent) => {
        if(event.key === 'Escape'){
            onClose(isGoBack)
        }
    }
     useEffect(() => {
         document.addEventListener('keydown', onKeydown)
         return () => document.removeEventListener('keydown', onKeydown)
     },)
    if (!open) return null
    const close=() => {
        onClose(isGoBack);
    }
    return ReactDom.createPortal(
        <>

            <ModalOverlay onClose={close}/>
            <div className={["pr-10 pl-10 pt-10", modalStyles.modalHeader].join(' ')}>
                <div className={modalStyles.modalHeaderWrapper}>
                    <h2 className={["text text_type_main-large", modalStyles.headerText].join(' ')}>
                        {title}
                    </h2>
                    <button onClick={close} className={modalStyles.button}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
                {children}
            </div>
        </>,
        document.getElementById('portal')!
    )
}

/*Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};*/

export default Modal;
