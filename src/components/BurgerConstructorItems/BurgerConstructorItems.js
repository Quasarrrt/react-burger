import constructorItemsStyles from './BurgerConstructorItems.module.css'
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
    ADD_CONSTRUCTOR_INGREDIENTS,
    ADD_CONSTRUCTOR_INGREDIENTS_BUN
} from "../../services/actions/constructorIngredients";
import { v4 as uuidv4 } from "uuid";
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";

function BurgerConstructorItems(){

    const { constructorIngredients, isBun } = useSelector(state => ({
        constructorIngredients: state.constructorIngredients.constructorIngredients,
        isBun: state.constructorIngredients.isBun,

    }));
    const dispatch = useDispatch();
    const [, dropTarget] = useDrop({
        accept: "item",
        drop(item) {
            onDropHandler(item);
        },
    });

    function onDropHandler(item) {
        if (item.type === "bun") {
            dispatch({
                type: ADD_CONSTRUCTOR_INGREDIENTS_BUN,
                item: item,
            });
        } else {
            dispatch({
                type: ADD_CONSTRUCTOR_INGREDIENTS,
                item: { ...item, key: uuidv4() },
            });
        }
    }

    return (
        <section  ref={dropTarget}>
            <ul className={ constructorItemsStyles.ul}>
                <li className={ constructorItemsStyles.item}>
                    {(isBun)&& (
                        <BurgerConstructorItem
                            type="top"
                            burger={isBun}
                            locked
                        />
                    )}
                </li>
                <div className={ constructorItemsStyles.scroll}>
                    {constructorIngredients && (
                            constructorIngredients.filter((item) => item.type !== "bun").map((item, index) => {
                                    return (
                                        <BurgerConstructorItem
                                            key={item.key}
                                            burger={item}
                                            index={index}
                                        />
                                    );
                                }))}
                </div>
                <li className={["pt-4",  constructorItemsStyles.item].join(' ')}>
                    <div className={ constructorItemsStyles.itemWrapper}>
                        {isBun && (
                            <BurgerConstructorItem
                                type="bottom"
                                burger={isBun}
                                locked
                            />
                        )}
                    </div>
                </li>

            </ul>
        </section>
    );
}
export default BurgerConstructorItems;