"use client"
import React, { ReactNode } from 'react'

// graphql
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

// date pickers
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

// theme
import { ThemeProvider } from '@mui/material'

// profile provider
import ProfileProvider from '@/providers/profile'

import { Provider } from 'react-redux'
// import store from '@/store'

// mui theme
import theme from '@/styles/theme'

// services
import { getValidAccessToken } from '@/services/profile'


// constants
import { SERVER_URL } from '@/utility/constants'
import { ToastContainer } from 'react-toastify';



const httpLink = createHttpLink({
  uri: `${SERVER_URL}/q`,
  // include works for development because server and ui are in different domains
  // in prod, same-origin should be used instead
  credentials: 'same-origin', // 'include', // 'same-origin'
})


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getValidAccessToken()
  console.log("token ", token)
  console.log("profile ", )
  
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const ProvidersComponent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ApolloProvider client={client}>
        {/* <Provider store={store}> */}
          <ThemeProvider theme={theme}>
            <ProfileProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <ToastContainer autoClose={6000} />
                    {children}
              </LocalizationProvider>
            </ProfileProvider>
          </ThemeProvider>
        {/* </Provider> */}
      </ApolloProvider>
    </>
  )
}

export default ProvidersComponent
