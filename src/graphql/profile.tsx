import { gql } from '@apollo/client';


// update
export const UPDATE_PROFILE_PHONE_QUERY = gql`
  mutation updatePhoneNumber($phone: String!) {
    updatePhoneNumber( phone: $phone ) {
      updated
    }
  }
`


// delete
export const DELETE_PROFILE_MUTATION = gql`
  mutation deleteProfile {
    deleteProfile {
      deleted
      message
    }
  }
`

// login query
export const AUTHENTICATE_MUTATION = gql`
  mutation authenticate( $token: String! ) {
    authenticate( token: $token ) {
      _id
      name
      email
      picture
      phone
      
      accessToken
      refreshToken
      type
    }
  }
`;



// get profile query
export const GET_PROFILE_QUERY = gql`
  query get_profile_details($id: String!) {
    get_profile_details(id: $id) {
      _id
      name
      email
      avatar
      phone
      location {
        lat
        lng
        city
        country
      }
      entity_type
    }
  }
`;


// check if email is used
export const IS_PROFILE_EMAIL_USED = gql`
  query isProfileEmailUsed($email: String!) {
    isProfileEmailUsed(email: $email) {
      used
    }
  }
`;

// check if email is used excluding
export const IS_PROFILE_EMAIL_USED_EXCLUDING = gql`
  query isProfileEmailUsedExcluding($id: String!, $email: String!) {
    isProfileEmailUsedExcluding(id: $id, email: $email) {
      used
    }
  }
`;
