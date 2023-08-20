import { gql } from "@apollo/client";


// get profile query
export const GET_PRODUCT_CATEGORIES_QUERY = gql`
  query getProductCategories {
    getProductCategories {
        
        _id
        category

        products

    }
  }
`;



// get profile query
export const GET_CATEGORY_PRODUCTS_QUERY = gql`
  query getProducts($category: String, $brand: String) {
    getProducts( category: $category, brand: $brand ) {
        
        _id
        name
        description
        
        brand
        model

        year
        
        price
        
        discount
        

        category
        subCategory
        pictures
        deliveryDays

    }
  }
`;
