import React, { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {DELETE_CONSTRUCTOR_INGREDIENTS} from "../../services/actions/constructorIngredients";


const IngredientsToSort = ({id, index, moveItem, name, image, price}) => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [{handlerId}, drop] = useDrop({
        accept: 'constructorItems',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{isDrag}, drag] = useDrag({
        type: 'constructorItems',
        item: () => {
            return {id, index};
        },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });
    drag(drop(ref));
    return (
        <div ref={ref}  data-handler-id={handlerId}>
            <DragIcon type='secondary' />


            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={() => {
                    dispatch({
                        type: DELETE_CONSTRUCTOR_INGREDIENTS,
                        uniqueId: id
                    });
                }}
            />
        </div>
    );
};

IngredientsToSort.propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    moveItem: PropTypes.func.isRequired
};

export default IngredientsToSort;