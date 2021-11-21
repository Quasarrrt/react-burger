import React from 'react';
import stylesOrderDetails from './OrderDetails.module.css'
import doneImage from '../../images/done.svg'
import {useSelector} from "../../services/hooks";


const OrderDetails = () => {
    const orderNumber = useSelector((store) => store.order.orderNumber);
    return (
        <div className={stylesOrderDetails.orderWrapper}>

                    <div className={["mt-4 mb-8 text text_type_digits-large",stylesOrderDetails.orderNum].join('  ')}>
                        { orderNumber }
                    </div>

            <p className={["mb-15 text text_type_main-medium", stylesOrderDetails.order].join('  ')}>
                идентификатор заказа
            </p>
            <img src={doneImage} alt={'Готово'} className="mb-15"/>
            <p className={["mb-2 text text_type_main-default", stylesOrderDetails.order].join('  ')}>
                Ваш заказ начали готовить
            </p>
            <p className={["mb-30 text text_type_main-default text_color_inactive", stylesOrderDetails.order].join('  ')}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

export default OrderDetails;