import IProduct from "./product"


export interface IPayment {
    id?: string
    type?: string
    amount?: number
    receiptNumber?: string
    madeOn?: number
}


type statusType = 'DELIVERED' | 'SHIPPPING' | 'READY' | 'PROCESSING' | 'CANCELLED' | 'DENIED'

export interface IOrder {
    _id?: string
    madeOn?: string | number | Date
    products?: Array<IProduct>
    status?: statusType
    totalPrice?: number
    accountId?: string
    accountType?: string
    deliveryDays?: number
    orderType?: string
    shippingInitiatedOn?: string
    payment?: IPayment
}
