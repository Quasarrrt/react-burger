import {Location} from "history";

export interface IItem {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    key?:number,
}
export type TLocationState = {
    from?: Location;
    background?: Location;
};