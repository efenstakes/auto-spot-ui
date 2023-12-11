import VSpacer from '@/components/v_spacer/component'
import { DELETE_PROFILE_MUTATION, UPDATE_PROFILE_PHONE_QUERY } from '@/graphql/profile'
import { ProfileContext } from '@/providers/profile'
import { Routes } from '@/utility/constants'
import { useMutation } from '@apollo/client'
import { CircularProgress } from '@mui/material'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

const UpdatePhoneNumber = ({ openDialog, onClose, }: { openDialog?: boolean, onClose: ()=> void, }) => {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [open, setOpen] = React.useState(false);

    const { logOut, } = useContext(ProfileContext)


    const [ deleteMutation, { loading, } ] = useMutation(DELETE_PROFILE_MUTATION, {
        onCompleted(data) {

            if( !data['deleteProfile']['deleted'] ) {
                setError(data['deleteProfile']['message'])
                return
            }

            handleClose()
            console.log('====================================');
            console.log("deleteMutation success data ", data);
            console.log('====================================');

            logOut()
            router.replace(Routes.home)
        },
        onError(error) {
            
            setError("An error occured. Please try again.")
            console.log('====================================');
            console.log("deleteMutation error data ", error);
            console.log('====================================');
        },
    })


    const deleteProfile = ()=> {
        
        deleteMutation({
            variables: {  }
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        onClose()
        setOpen(false);
    };

    useEffect(()=> {
        setOpen(openDialog)
    }, [ openDialog ])
    
    // motion
    return (
        <motion.div
        
        >

            <Dialog open={open} onClose={handleClose}>
                
                <DialogTitle>
                    Delete Profile?
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>
                        Are you sure you want to delete your profile? You will lose all your data.
                    </DialogContentText>
                    <VSpacer space={1} />

                    {
                        error &&
                            <Alert severity="error">
                                {error}
                            </Alert>
                    }
                </DialogContent>

                <DialogActions>
                    
                    <Button
                        variant='contained'
                        onClick={deleteProfile}
                        disableElevation
                        style={{
                            borderRadius: '8px',
                            textTransform: 'none',
                        }}
                        disabled={loading}
                    >
                        {
                            loading ? "Deleting Profile" : "Delete Profile"
                        }
                    </Button>

                    <Button
                        onClick={handleClose}
                        disableElevation
                        style={{
                            borderRadius: '8px',
                            textTransform: 'none',
                        }}
                    >
                        Cancel
                    </Button>

                </DialogActions>
            </Dialog>

        </motion.div>
    )
}

export default UpdatePhoneNumber
