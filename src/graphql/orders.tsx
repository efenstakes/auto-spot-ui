import { gql } from "@apollo/client";



export const CREATE_ORDER_MUTATION = gql`
    mutation placeOrder( $input: PlaceOrderInput! ) {
        placeOrder( input: $input ) {

            ... on Order {
                _id
                accountId
                accountType
                products {
                    id
                    name
                    price
                }
                status

                orderType
                madeOn
            }

            ... on ErrorResult {
                error
            }

        }
    }
`;


export const GET_MY_ORDERS_QUERY = gql`
    query getMyOrders( $phone: String ) {
        getMyOrders( phone: $phone ) {

            _id
            
            accountId
            
            accountType
            
            products {
                id
                name
                price
                exists
                quantity
                year
                model
            }

            totalPrice

            status

            orderType
            madeOn

        }
    }
`;


export const GET_ADMIN_ORDERS_QUERY = gql`
    query getOrders( $status: String, $phone: String, ) {
        getOrders( status: $status, phone: $phone ) {

            _id
            
            accountId
            
            accountType
            
            products {
                id
                name
                price
                exists
                quantity
                year
                model
            }

            totalPrice

            status

            orderType
            madeOn

        }
    }
`;



export const DENY_ORDER_MUTATION = gql`
    mutation updateOrderStatus( $id: String! ) {
        updateOrderStatus( id: $id, status: "DENIED" ) {

            _id

        }
    }
`;


export const CANCEL_ORDER_MUTATION = gql`
mutation updateOrderStatus( $id: String!, $phone: String, $status: String! ) {
    updateOrderStatus( id: $id, phone: $phone, status: $status ) {

        _id
        accountId
        accountType
        products {
            id
            name
            price
            exists
        }
        status

        orderType
        madeOn

    }
}
`;


