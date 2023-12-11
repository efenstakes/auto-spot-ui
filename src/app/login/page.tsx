"use client"
import Appbar from '@/components/appbar/component'
import VSpacer from '@/components/v_spacer/component'
import { ProfileContext } from '@/providers/profile'
import { containerVariants, itemVariants } from '@/styles/variants'
import { Alert, Button } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, } from '@/services/auth'
import { useMutation } from '@apollo/client'
import { AUTHENTICATE_MUTATION, } from '@/graphql/profile'
import { Routes } from '@/utility/constants'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const router  = useRouter()
    
    const { profile, updateProfileData, updateProfilePhone, } = useContext(ProfileContext)

    const [hasError, setHasError] = useState(false)
    

    const [ loginMutation, { data } ] = useMutation(AUTHENTICATE_MUTATION, {
        onCompleted(data) {
            console.log("completed with data ", data['authenticate'])
            updateProfileData(data['authenticate'])
            router.push(Routes.home)
        },
        onError(error) {
            console.log("completed with error ", error)
            setHasError(true)
        }
    })

    const signinWithGoogle = async ()=> {
        setHasError(false)
        console.log("sign in")
        
        try {
        const res = await signInWithPopup(auth, new GoogleAuthProvider())
        console.log("res")
        console.log(res)

        console.log("res ", res['_tokenResponse']['idToken'])
        console.log("keys ", Object.keys(res.user))

        const token = res['_tokenResponse']['idToken']

        loginMutation({
            variables: { token }
        })

        // const req = await fetch("http://localhost:4444/authenticate", {
        //     method: 'POST',
        //     body: JSON.stringify({
        //     token,
        //     }),
        //     headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //     },
        // })
        // const resJson = await req.json()
        // console.log("resJson ", resJson)

        // updateProfileData(resJson.result)
        } catch (error) {
            console.log("error in signinWithGoogle ", error)
        }

    }

    
    return (
        <motion.div
            className=' page'
            variants={containerVariants}
            animate='animate'
            initial='initial'
        >

            {/* appbar */}
            <Appbar />
            <VSpacer spaceE='40vh' />
            

            <motion.div variants={itemVariants} className='column ma_center'>
                
                <Button
                    variant="contained"
                    onClick={signinWithGoogle}
                    startIcon={
                        <FcGoogle />
                    }
                    fullWidth
                >
                    Proceed With Google
                </Button>
                <VSpacer space={2} />

                {
                    hasError &&
                        <motion.div variants={itemVariants}>
                            <Alert severity="error">
                                Seems There was an error loggin in. Try again.
                            </Alert>
                        </motion.div>
                }


            </motion.div>


            
        </motion.div>
    )
}

export default LoginPage