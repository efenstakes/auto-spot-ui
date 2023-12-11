

export interface IProductVariant {
    name?: string
    price?: number

    discount?: number
    discountStartDate?: string | Date | number
    discountEndDate?: string | Date | number

    type?: string
    image?: string
}

export default interface IProduct {

    _id?: string
    
    name?: string
    
    category?: string
    brand?: string
    model?: string
    years?: number[]

    quantity?: number

    variants: IProductVariant[]

}

