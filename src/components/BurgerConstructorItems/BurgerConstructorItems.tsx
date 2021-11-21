import constructorItemsStyles from './BurgerConstructorItems.module.css'
import {useSelector} from "../../services/hooks";
import { useDrop } from "react-dnd";
import {useDispatch} from "../../services/hooks";
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";
import {TItem} from "../../services/types/otherTypes";
import {addBunConstructorIngredients, addConstructorIngredients} from "../../services/actions/constructorIngredients";


function BurgerConstructorItems(){

    const { constructorIngredients, isBun } :{ constructorIngredients: TItem[], isBun: TItem } = useSelector((state) => (
     state.constructorIngredients));
    const dispatch = useDispatch();
    const [, dropTarget] = useDrop({
        accept: "item",
        drop(item:TItem) {
            onDropHandler(item);
        },
    });

    function onDropHandler(item:TItem) {
        if (item.type === "bun") {
            dispatch(addBunConstructorIngredients(item));
        } else {
            dispatch(addConstructorIngredients(item));
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
                            index={0}
                        />
                    )}
                </li>
                <div className={ constructorItemsStyles.scroll}>
                    {constructorIngredients && (
                            constructorIngredients.filter((item:TItem) => item.type !== "bun").map((item:TItem, index:number) => {
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
                                index={0}
                            />
                        )}
                    </div>
                </li>

            </ul>
        </section>
    );
}
export default BurgerConstructorItems;