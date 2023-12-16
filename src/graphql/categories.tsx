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
// export const GET_CATEGORY_PRODUCTS_QUERY = gql`
//   query getProducts($name: String, $model: String) {
//     getProducts( name: $name, model: $model ) {
        
//         _id
//         name
//         description
        
//         brand
//         model

//         year
        
//         price
        
//         discount
        

//         category
//         subCategory
//         pictures
//         deliveryDays

//     }
//   }
// `;




// get profile query
export const GetProductsQuery = gql`
  query getProducts($input: SearchProductsInput!, $limit: Float, $offset: Float) {
    getProducts( input: $input, limit: $limit, offset: $offset ) {
        
        _id
        name
        description
        
        brand
        model

        years
        
        variants {
          name
          price
          discount
          image
        }

        deliveryDays

    }
  }
`;


// get profile query
export const GetProductsQuery2 = gql`
  query getProducts {
    getProducts {
        
        _id
        name
        description
        
        brand
        model

        years
        
        variants {
          name
          price
          discount
          image
        }

        deliveryDays

    }
  }
`;



// get profile query
export const GetProductQuery = gql`
  query getProduct($id: String!) {
    getProduct( id: $id ) {
        
        _id
        name
        description
        
        brand
        model

        years
        
        variants {
          name
          price
          discount
          image
        }

        deliveryDays

    }
  }
`;

