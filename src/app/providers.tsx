"use client"
import React, { ReactNode } from 'react'
import { AnimatePresence, } from 'framer-motion'
import { Provider } from 'jotai'

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

// import { Provider } from 'react-redux'
// import store from '@/store'

// mui theme
import theme from '@/styles/theme'

// services
import { getLocalProfile, getValidAccessToken } from '@/services/profile'


// constants
import { SERVER_URL } from '@/utility/constants'
import { ToastContainer } from 'react-toastify';



const httpLink = createHttpLink({
  uri: `${SERVER_URL}/api`,
  // include works for development because server and ui are in different domains
  // in prod, same-origin should be used instead
  credentials: 'same-origin', // 'include', // 'same-origin'
})


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const profile = getLocalProfile()
  console.log("token ", profile?.accessToken)
  console.log("profile ", )
  
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: profile?.accessToken ? `Bearer ${profile?.accessToken}` : "",
    }
  }
})


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {

        fields: {

          getProducts: {

            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
    
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
                return [...existing, ...incoming];
            },
            

          },

        },
      },
    },
  }),
})

const ProvidersComponent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AnimatePresence>
      <ApolloProvider client={client}>
        {/* <Provider store={store}> */}
          <ThemeProvider theme={theme}>
            <ProfileProvider>
              <Provider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <ToastContainer autoClose={6000} />
                    {children}
              </LocalizationProvider>
              </Provider>
            </ProfileProvider>
          </ThemeProvider>
        {/* </Provider> */}
      </ApolloProvider>
      </AnimatePresence>
    </>
  )
}

export default ProvidersComponent
