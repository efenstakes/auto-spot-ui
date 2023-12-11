import VSpacer from '@/components/v_spacer/component'
import { UPDATE_PROFILE_PHONE_QUERY } from '@/graphql/profile'
import { ProfileContext } from '@/providers/profile'
import { isPhoneValid } from '@/services/profile'
import { containerVariants, itemVariants } from '@/styles/variants'
import { useMutation } from '@apollo/client'
import { CircularProgress, Fab } from '@mui/material'
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
import { BiSearch } from 'react-icons/bi'

const PhoneNumberSearch = ({ startSearch, }: { startSearch: (b: string)=> void, }) => {
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(null)

    const search = ()=> {
        setError(null)

        const result = isPhoneValid(phone)

        if( result ) {
            setError(result)
            return
        }

        startSearch(phone)
    }

    // motion
    return (
        <motion.div
        
            variants={containerVariants}
            animate='animate'
            initial='initial'
        >


            <motion.p variants={itemVariants} className='title_8 text_center'>
                Enter Your Number To Get Orders
            </motion.p>
            <VSpacer space={2} />

            <motion.div variants={containerVariants} className='row ca_center' style={{ gap: '10px' }}>
                
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter Phone Number (start with 254)"
                    type="tel"
                    fullWidth
                    variant='outlined'
                    onChange={
                        (val)=> setPhone(val.target.value)
                    }
                    style={{
                        width: '100%',
                    }}
                />
                
                <Fab
                    color="primary"
                    aria-label="search"
                    onClick={search}
                    style={{ borderRadius: '12px', boxShadow: 'none' }}
                >
                    <BiSearch />
                </Fab>

            </motion.div>
            { error && <VSpacer space={1} /> }
            {
                error &&
                    <Alert severity="warning">
                        { error }
                    </Alert>
            }
            <VSpacer space={1} />

        </motion.div>
    )
}

export default PhoneNumberSearch
