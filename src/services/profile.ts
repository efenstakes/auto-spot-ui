import dayjs from "dayjs"


import IProfile, { ILocalToken } from "@/models/profile"
import { PROFILE_ACCESS_TOKEN, PROFILE_REFRESH_TOKEN, PROFILE_STORAGE_NAME } from "@/utility/constants"


// save user details
export const saveProfileLocal = (profile: IProfile)=> {
    if( profile && profile?.accessToken ) {
      localStorage.setItem(
        PROFILE_ACCESS_TOKEN,
        JSON.stringify({
          token: profile.accessToken,
          assignedAt: Date.now()
        })
      )
    }
  
    localStorage.setItem(PROFILE_STORAGE_NAME, JSON.stringify(profile))
}
  
// save user details
export const getLocalProfile = (): IProfile | null=> {
  const ret = localStorage.getItem(PROFILE_STORAGE_NAME)
  
  if( !ret ) return null
  
  return JSON.parse(ret)
}
  
// save user access token
export const getLocalAccessToken = (): ILocalToken | null => {
  const ret = localStorage.getItem(PROFILE_ACCESS_TOKEN)
  
  if( !ret ) return null
  
  return JSON.parse(ret)
}


export const isLocalAccessTokenValid = (token: ILocalToken | null): boolean=> {
  if( !token ) {
    token = getLocalAccessToken()
  }

  if( !token ) return false

  // console.log('token ', token)
  const isLessThen2Hrs = new Date(token.assignedAt).getTime() 
                          > 
                          dayjs(Date.now()).subtract(30, 'day').toDate().getTime()
  // console.log('isLessThen2Hrs', isLessThen2Hrs, ' token.assigned_at !== null ', token.assigned_at !== null, ' token.assigned_at ', token.assigned_at)
  
  return isLessThen2Hrs
}

export const getValidAccessToken = ()=> {
  const token = getLocalAccessToken()

  if( !token || !isLocalAccessTokenValid(token) ) return null

  return token?.token
}

export const clearLocalProfileData = ()=> {
  localStorage.removeItem(PROFILE_STORAGE_NAME)
  localStorage.removeItem(PROFILE_ACCESS_TOKEN)
  localStorage.removeItem(PROFILE_REFRESH_TOKEN)
}


export const isPhoneValid = (phone: string): string | null => {

  if( !phone ) {
    console.log('====================================');
    console.log("Please provide a phone number.");
    console.log('====================================');
    return "Please provide a phone number."
}


if( phone && phone.length != 12 ) {

    console.log('====================================');
    console.log("Please provide a phone number.");
    console.log('====================================');

    return "Please provide a phone number."
}

if( !phone.startsWith("254") ) {

    console.log('====================================');
    console.log("Please ensure your phone number starts with 254.");
    console.log('====================================');

    return "Please ensure your phone number starts with 254."
}

  if( phone.match(/[a-z]/) ) {

      console.log('====================================');
      console.log("Please enter a valid phone number..");
      console.log('====================================');

      return "Please enter a valid phone number."
  }

  return null
}
