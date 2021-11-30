import React, {useState, FC} from 'react';
import {  CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from './BurgerConstructor.module.css';
import {useDispatch, useSelector} from "../../services/hooks";
import {RESET_CONSTRUCTOR} from '../../services/types/contructorIngredients'
import {getOrderNum} from "../../services/actions/order";
import {SET_ORDER_ERROR} from "../../services/types/order";
import BurgerConstructorItems from "../BurgerConstructorItems/BurgerConstructorItems";
import {useMemo} from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { getRefreshTokenFromCookie} from "../../services/cookieFunctions";
import { History } from 'history';
import {TItem} from "../../services/types/otherTypes";


interface IBurgerConstructor {
    history : History
}

const BurgerConstructor: FC<IBurgerConstructor> = ({history}) => {
    const { loginSuccess } = useSelector((state:any) => state.auth);
    const isRefreshToken = getRefreshTokenFromCookie();
    const dispatch=useDispatch();
    const { constructorIngredients, isBun } :{ constructorIngredients: TItem[], isBun: TItem } = useSelector((state) => (
        state.constructorIngredients));

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleCloseModal = () => {
        setIsOpen(false);
    }
    const orderModal= (
        <Modal open={isOpen} onClose={handleCloseModal}  title={""} isGoBack={true} >
            <OrderDetails/>
        </Modal>
    )
    const orderSend=()=>{
        const token=localStorage.getItem('token');
        //console.log('Token user', token)
        if (loginSuccess || isRefreshToken) {
            if(isBun!==null){
                if (isBun._id) {
                    const ingredientsIds = [
                        ...constructorIngredients.map((element) => element._id),
                        isBun._id,
                    ];
                    setIsOpen(true);
                    dispatch(getOrderNum(ingredientsIds, token));
                    dispatch({
                        type: RESET_CONSTRUCTOR,
                    });


                }
            }
            else {
                dispatch({
                    type: SET_ORDER_ERROR,
                });
            }
        }
        else {
            history.push('/login');
        }
    }



    const totalPrice = useMemo(() => {
        return constructorIngredients.reduce(function (acc:number, item:TItem ) {
            let totalPrice = item.price;
            if (item.type === 'bun') {

                totalPrice += item.price;
            }

            return acc + totalPrice;}, 0) + (isBun ? isBun.price * 2 : 0);
    }, [constructorIngredients, isBun]);

    return (

        <>
            <section className={["pt-25 pl-4 pr-4", constructorStyles.items].join(' ')}>
                <BurgerConstructorItems/>
                <div className={[ constructorStyles.totalWrapper, "pt-10"].join(' ')}>
                    <div className={["pr-10", constructorStyles.totalPrice].join(' ')}>
                        <p className="text text_type_digits-medium">
                            {totalPrice ||0}
                        </p>
                        <CurrencyIcon type="primary"/>
                    </div>

                    <Button type="primary" size="large" onClick={()=>{
                        orderSend();

                    }}>
                        Оформить заказ
                    </Button>


                    {isOpen&&orderModal}
                </div>

            </section>


        </>
    );
};

/*BurgerConstructor.propTypes = {
  history: PropTypes.object.isRequired,
};*/

export default BurgerConstructor;