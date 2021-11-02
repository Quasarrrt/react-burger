import {ConstructorElement, DragIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {DropTargetMonitor, useDrag, useDrop} from "react-dnd";
import { useRef, FC } from "react";
import { MOVE_CONSTRUCTOR_INGREDIENTS, DELETE_CONSTRUCTOR_INGREDIENTS} from "../../services/actions/constructorIngredients";
import {cardPropTypes} from "../../propTypes/propTypes";
import constructorItemStyles from './BurgerConstructorItem.module.css'
import {IItem} from "../../services/types/types";

interface IBurgerConstructorItem {
    type?: "top" | "bottom" ,
    index: number,
    burger: IItem,
    locked?: boolean,
}
const BurgerConstructorItem: FC<IBurgerConstructorItem>=({ type, burger, index, locked })=>{

    const dispatch = useDispatch();
    function handleClose() {
        dispatch({
            type: DELETE_CONSTRUCTOR_INGREDIENTS,
            index: index,
        });
    }
    const dropRef = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: "ingredients",
        collect(monitor:DropTargetMonitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item:{index: number}, monitor: DropTargetMonitor) {
            if (!dropRef.current) {
                return;
            }
            const dragIndex:number = item.index;
            const hoverIndex = index;
            if (!dragIndex || dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = dropRef.current.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch({
                type: MOVE_CONSTRUCTOR_INGREDIENTS,
                payload: { dragIndex, hoverIndex },
            });
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: "ingredients",
        item: () => {
            return { burger, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(dropRef));

    return (
        <div ref={dropRef} data-handler-id={handlerId} className={ ["mb-4", constructorItemStyles.itemWrapper].join(' ')}>
            {burger.type !== "bun" ? (<DragIcon type="primary" />) : null}

            <ConstructorElement

                text={burger.type !== "bun"? burger?.name: type==="top"? burger?.name+" (верх)":burger?.name+" (низ)"}
                price={burger?.price}
                thumbnail={burger?.image}
                type={type}
                isLocked={locked}
                handleClose={handleClose}
            />
        </div>
    );
}
/*BurgerConstructorItem.propTypes = {
    type: PropTypes.string,
    index: PropTypes.number,
    burger: cardPropTypes.isRequired,
    locked: PropTypes.bool
};*/

export default BurgerConstructorItem;