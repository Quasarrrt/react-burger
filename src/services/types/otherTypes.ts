import {Location} from "history";

export type TItem = {
    _id: string;
    name: string;
    type: string;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    proteins: number;
    image: string;
    image_mobile?: string;
    image_large?: string;
    __v?: number;
   key?: string;
    index: number;
};

export type TLocationState = {
    from?: Location;
    background?: Location;
    backgroundOrders?: Location;

};



