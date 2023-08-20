

export default interface IProduct {

    _id?: string
    
    name?: string
    
    category?: string
    brand?: string
    model?: string
    year?: number

    price?: number

    discount?: number
    discountStartDate?: string | Date | number
    discountEndDate?: string | Date | number

}
