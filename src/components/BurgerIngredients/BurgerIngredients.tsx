import React, {useEffect,  FC} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import Card from "../Card/Card";
import {useSelector} from "../../services/hooks";
import { useInView } from 'react-intersection-observer';
import {TItem} from "../../services/types/otherTypes";


interface IBurgerIngredients {
    onCardClick: ()=>void;
}
const BurgerIngredients: FC<IBurgerIngredients> = ({onCardClick}) => {
    const [current, setCurrent] = React.useState<string>('one')
    const {  allIngredients }:{ allIngredients: TItem[] } = useSelector((state) => (state.allIngredients));

    const [bunRef, inViewBuns] = useInView({ threshold: 0 });
    const [sauceRef, inViewSauces] = useInView({ threshold: 0 });
    const [mainRef, inViewMains] = useInView({ threshold: 0 });
    useEffect(() => {
        if (inViewBuns) {
            setCurrent("one");
        }
        else if (inViewSauces) {
            setCurrent("two");
        }
        else if (inViewMains) {
            setCurrent("three");
        }
    }, [inViewBuns, inViewSauces, inViewMains]);
    const setTab = (tab:string) => {
        setCurrent(tab);
        const item = document.getElementById(tab);
        if (item) item.scrollIntoView({ behavior: "smooth" });
    };
    const bun = allIngredients.filter((item:TItem) => {
        return item.type === "bun";
    });
    const sauce = allIngredients.filter((item:TItem) => {
        return item.type === "sauce";
    });
    const main = allIngredients.filter((item:TItem) => {
        return item.type === "main";
    });


    return (
        <section className={["mr-10",burgerIngredientsStyles.section].join(' ')}>
            <p className="text text_type_main-large pb-5 pt-10">
                Соберите бургер
            </p>
            <nav>
                <div style={{ display: 'flex' }} className="pb-10">
                    <Tab value="one" active={current === 'one'} onClick={setTab}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setTab}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setTab}>
                        Начинки
                    </Tab>
                </div>
            </nav>
            <div>
                <div className={burgerIngredientsStyles.scroll}>
                    <section ref={bunRef} >
                        <p className="text text_type_main-medium">
                        Булки
                        </p>
                        <div className={burgerIngredientsStyles.cards}>
                        {bun&&bun.map((card:TItem) => {
                            return <Card card={card} key={card._id}  onCardClick={onCardClick}   />
                        }
                        )}
                        </div>
                    </section>
                    <section ref={sauceRef}>
                        <p className="text text_type_main-medium">
                        Соусы
                        </p>
                        <div className={burgerIngredientsStyles.cards}>
                        {sauce.map((card:TItem) => {
                            return <Card card={card} key={card._id} onCardClick={onCardClick}/>
                            }
                        )}
                        </div>
                    </section>
                    <section ref={mainRef}>
                        <p className="text text_type_main-medium">
                        Начинки
                        </p>
                        <div className={burgerIngredientsStyles.cards}>
                        {main.map((card:TItem) => {
                            return <Card card={card} key={card._id}  onCardClick={onCardClick}/>
                        }
                    )}
                        </div>
                    </section>
                </div>
            </div>

        </section>
    );
};
/*BurgerIngredients.propTypes = {
    onCardClick: PropTypes.func.isRequired,
};*/

export default BurgerIngredients;