import { IProducts } from "./product.interface";

export interface IOrder {
    _id?: string
    user: string,
    products: IProducts[]
    status: string
    returnRequested: boolean
    returnAccepted: boolean
}