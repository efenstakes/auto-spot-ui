import VSpacer from '@/components/v_spacer/component'
import { UPDATE_PROFILE_PHONE_QUERY } from '@/graphql/profile'
import { ProfileContext } from '@/providers/profile'
import { isPhoneValid } from '@/services/profile'
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
import React, { useContext, useEffect, useState } from 'react'

const UpdatePhoneNumber = ({ openDialog, onClose, }: { openDialog?: boolean, onClose: ()=> void, }) => {
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(null)
    const [hasError, setHasError] = useState(false)
    const [open, setOpen] = React.useState(false);

    const { updateProfilePhone, } = useContext(ProfileContext)


    const [ updatePhoneMutation, { loading, } ] = useMutation(UPDATE_PROFILE_PHONE_QUERY, {
        onCompleted(data) {

            updateProfilePhone(phone)
            handleClose()
            console.log('====================================');
            console.log("updatePhoneMutation success data ", data);
            console.log('====================================');
        },
        onError(error) {
            
            setHasError(true)
            console.log('====================================');
            console.log("updatePhoneMutation error data ", error);
            console.log('====================================');
        },
    })


    const updatePhone = ()=> {
        setError(null)
        setHasError(false)

        const validityResult = isPhoneValid(phone)
        if( validityResult ) {

            setError(validityResult)
            return
        }

        // if( !phone ) {
        //     console.log('====================================');
        //     console.log("Please provide a phone number.");
        //     console.log('====================================');
        //     setError("Please provide a phone number.")
        //     return
        // }


        // if( phone && phone.length != 12 ) {

        //     console.log('====================================');
        //     console.log("Please provide a phone number.");
        //     console.log('====================================');

        //     setError("Please provide a phone number.")
        //     return
        // }

        // if( !phone.startsWith("254") ) {

        //     console.log('====================================');
        //     console.log("Please ensure your phone number starts with 254.");
        //     console.log('====================================');

        //     setError("Please ensure your phone number starts with 254.")
        //     return
        // }

        // if( phone.match(/[a-z]/) ) {

        //     console.log('====================================');
        //     console.log("Please enter a valid phone number..");
        //     console.log('====================================');

        //     setError("Please enter a valid phone number.")
        //     return
        // }

        updatePhoneMutation({
            variables: { phone, }
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
                    Update Phone Number
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>
                        We use this phone number to contact you for order delivery or for payments. No third parties can access this data.
                    </DialogContentText>
                    <VSpacer space={.5} />

                    <DialogContentText color="orange">
                        Ensure you start your number with 254.
                    </DialogContentText>
                    <VSpacer space={1} />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter Phone Number (start with 254)"
                        type="tel"
                        fullWidth
                        variant="standard"
                        onChange={
                            (val)=> setPhone(val.target.value)
                        }
                    />
                    <VSpacer space={1} />

                    {
                        error &&
                            <Alert severity="error">
                                {error}
                            </Alert>
                    }
                    {
                        hasError &&
                            <Alert severity="error">
                                An error occured. Please try again.
                            </Alert>
                    }
                </DialogContent>

                <DialogActions>
                    
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
                    
                    <Button
                        variant='contained'
                        onClick={updatePhone}
                        disableElevation
                        style={{
                            borderRadius: '8px',
                            textTransform: 'none',
                        }}
                        disabled={loading}
                    >
                        {
                            loading ? "Updating Phone Number" : "Update Phone Number"
                        }
                    </Button>

                </DialogActions>
            </Dialog>

        </motion.div>
    )
}

export default UpdatePhoneNumber
