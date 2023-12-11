import IProduct, { IProductVariant } from "./product";


export default interface ICartItem {
    // product: IProduct

    _id?: string
    name?: string
    category?: string
    brand?: string
    model?: string
    year?: number

    price?: number

    quantity?: number
    variant?: IProductVariant
}
