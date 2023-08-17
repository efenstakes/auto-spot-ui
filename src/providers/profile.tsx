import { useLazyQuery } from '@apollo/client';
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';


// graphql
import { GET_PROFILE_QUERY } from '@/graphql/profile';

// models
import IProfile from '@/models/profile';

// services
import { getLocalProfile, saveProfileLocal } from '@/services/profile';


// Create the context
export const ProfileContext = createContext({
    profile: null,
    isLoading: true,
    hasError: false,
    refresh: ()=> {},
    updateProfileData: (u)=> {},
    updateProfilePhone: (u)=> {},
})


const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [hasError, setHasError] = useState<boolean>(false)
    const [profile, setProfile] = useState<IProfile>(null)


    // TODO !!! use profile/me which gets data for the current logged in user
    const [detailsQuery] = useLazyQuery(GET_PROFILE_QUERY, {
        onCompleted(data) {
            console.log("ProfileProvider done ", data)

            if( !data || !data['getMyProfilePetails'] ) {
                setHasError(false)
                return
            }

            // save profile data
            updateProfileData(data['getMyProfilePetails'])
            setIsLoading(false)
            setHasError(false)
        },
        onError(error) {
            console.log("ProfileProvider error ", error)
            setIsLoading(false)
            setHasError(true)
        },
    })

    const refresh = useCallback(
        ()=> {
            console.log("refresh profile")
            if( !profile || !profile?._id ) {
                return
            }
    
            setIsLoading(true)
            detailsQuery({variables: { id: profile?._id }})
        },
        []
    )

    // Function to update user data
    const updateProfileData = (user: IProfile) => {
        setProfile(user)
        // Update local storage with the new data
        saveProfileLocal(user)
        setIsLoading(false)
    }

    const updateProfilePhone = (phone)=> {
        const updatedProfile = {
            ...profile,
            phone,
        }
        setProfile(updatedProfile)
        saveProfileLocal(updatedProfile)
    }


    // Retrieve user data from local storage on initial render
    useEffect(() => {
        
        const profileData = getLocalProfile()
        if (profileData) {
            setProfile(profileData)
        }
        
        setIsLoading(false)
    }, [])

    
    const value = useMemo(
        () => ({ profile, updateProfileData, isLoading, hasError, refresh, updateProfilePhone, }), 
        [profile, isLoading, hasError, refresh, updateProfilePhone,]
    )
    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider
