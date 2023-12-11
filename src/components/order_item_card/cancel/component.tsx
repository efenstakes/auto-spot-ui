import VSpacer from '@/components/v_spacer/component'
import { CANCEL_ORDER_MUTATION } from '@/graphql/orders'
import { itemVariants } from '@/styles/variants'
import { useMutation } from '@apollo/client'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'



type CancelOrderProps = {
    id: string
    phone?: string
    onSuccess?: ()=> void
    actor?: string
}
const CancelOrder = ({ onSuccess, id, phone, actor = "REGULAR" }: CancelOrderProps) => {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [open, setOpen] = React.useState(false);


    const [ cancelOrderMutation, { loading, } ] = useMutation(CANCEL_ORDER_MUTATION, {
        onCompleted(data) {

            console.log('====================================');
            console.log("data['cancelOrderMutation'] ", data);
            console.log('====================================');

            handleClose()
            onSuccess()
        },
        onError(error) {
            
            setError("An error occured. Please try again.")
            console.log('====================================');
            console.log("cancelOrderMutation error data ", error);
            console.log('====================================');
        },
    })


    const cancel = ()=> {
        
        cancelOrderMutation({
            variables: { id, status: "CANCELLED", phone, }
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        
        setOpen(false);
    };

    // useEffect(()=> {
    //     setOpen(openDialog)
    // }, [ openDialog ])
    
    return (
        <motion.div
            className='w_100'
            variants={itemVariants}
            animate='animate'
            initial='initial'
            exit="exit"
        >
            <Button
                variant="outlined"
                size='small'
                color='error'
                onClick={handleClickOpen}
                style={{
                    textTransform: 'none',
                }}
                fullWidth
                disabled={loading}
                disableElevation
            >
                { loading ? "Cancelling" : "Cancel" }
            </Button>



            <Dialog open={open} onClose={handleClose}>
                
                <DialogTitle>
                    Cancel Order?
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>
                        {
                            actor == "ADMIN"
                                ? "Are you sure you want to cancel this order. We have to refund the already paid money."
                                : "Are you sure you want to cancel your order. We don't allow refunds after orders are placed unless items are faulty."
                        }
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
                        color='error'
                        onClick={cancel}
                        disableElevation
                        style={{
                            borderRadius: '8px',
                            textTransform: 'none',
                        }}
                        disabled={loading}
                    >
                        {
                            loading ? "Cancelling Order..." : "Cancel Order"
                        }
                    </Button>

                    <Button
                        onClick={handleClose}
                        disableElevation
                        style={{
                            borderRadius: '8px',
                            textTransform: 'none',
                        }}
                        disabled={loading}
                    >
                        Back
                    </Button>

                </DialogActions>
            </Dialog>



        </motion.div>
    )
}

export default CancelOrder
