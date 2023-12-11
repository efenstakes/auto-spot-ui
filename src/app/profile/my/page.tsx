"use client"
import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// components
import Appbar from '@/components/appbar/component'
import VSpacer from '@/components/v_spacer/component'


import { ProfileContext } from '@/providers/profile'


// styles
import './page.scss'
import { containerVariants, itemVariants } from '@/styles/variants'
import { Alert, Button, CircularProgress, Fab, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Paper } from '@mui/material'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/styles/theme'
import { useRouter } from 'next/navigation'
import { Routes } from '@/utility/constants'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { BsListUl, BsPersonFillDash, BsTelephone } from 'react-icons/bs'
import { GoAlertFill, GoSignOut, } from 'react-icons/go'
import { BiChevronRight } from 'react-icons/bi'
import UpdatePhoneNumber from './update_phone/component'
import Link from 'next/link'

const MyProfilePage = () => {
    const router = useRouter()
    const { profile, isLoading, logOut, } = useContext(ProfileContext)

    const [openUpdatePhoneDialog, setOpenUpdatePhoneDialog] = useState(false)


    const logUserOut = async ()=> {
        logOut()
        router.replace(Routes.home)
    }

    useEffect(()=> {
        if( !profile && !isLoading ) {
            router.push(Routes.home)
        }
    }, [ profile ])

    if( isLoading ) {

        return (
            <motion.div
                className='page'
                variants={containerVariants}
                animate='animate'
                initial='initial'
            >

                {/* appbar */}
                <Appbar />
                <VSpacer spaceE='40vh' />


                <motion.div variants={itemVariants} className='row ma_center'>
                    <CircularProgress
                        color="primary"
                        style={{
                            borderRadius: "50%",
                            border: `2px solid ${PRIMARY_COLOR}`,
                            borderBottomColor: SECONDARY_COLOR,
                        }}
                    />
                </motion.div>

            </motion.div>
        )
    }
    return (
        <motion.div
            className='page'
            variants={containerVariants}
            animate='animate'
            initial='initial'
        >

            {/* appbar */}
            <Appbar />
            <VSpacer spaceE='13vh' />

            {
                !profile?.phone &&
                    <motion.div
                        variants={itemVariants}
                        animate='animate'
                        initial='initial'
                        className='column ca_center my_profile__add_phone_number_alert'
                    >

                        <motion.div variants={itemVariants}>
                            <GoAlertFill fontSize={'2rem'} />
                        </motion.div>

                        <motion.p variants={itemVariants}>
                            No phone number provided. Please add it.
                        </motion.p>

                        <motion.div variants={itemVariants}>
                            <Button
                                color='primary'
                                size="small"
                                variant='contained'
                                style={{
                                    textTransform: 'none',
                                }}
                                disableElevation
                                onClick={
                                    ()=> setOpenUpdatePhoneDialog(true)
                                }
                            >
                                Add Phone Number
                            </Button>
                        </motion.div>

                </motion.div>
            }
            
            
            <motion.div
                className='column ca_center'
                variants={containerVariants}
                animate='animate'
                initial='initial'
            >
                <VSpacer space={1} />

                {/* image */}
                <motion.div className='my_profile__picture_container' variants={itemVariants}>
                    <img
                        src={profile?.picture}
                        className='my_profile__picture'
                    />
                </motion.div>
                <VSpacer space={1} />

                {/* name */}
                <motion.div className='w_100' variants={itemVariants}>
                    <ListItem>
                        <ListItemIcon>
                            <FaRegUser />
                        </ListItemIcon>
                        <ListItemText
                            primary={ profile?.name }
                        />
                    </ListItem>
                </motion.div>


                {/* email */}
                <motion.div className='w_100' variants={itemVariants}>
                    <ListItem>
                        <ListItemIcon>
                            <MdOutlineEmail />
                        </ListItemIcon>
                        <ListItemText
                            primary={ profile?.email }
                        />
                    </ListItem>
                </motion.div>


                {/* phone */}
                {
                    profile?.phone &&
                        <motion.div className='w_100' variants={itemVariants}>
                            <ListItem>
                                <ListItemIcon>
                                    <BsTelephone />
                                </ListItemIcon>
                                <ListItemText
                                    primary={ profile?.phone }
                                />
                            </ListItem>
                        </motion.div>
                }
                <VSpacer space={4} />


                {/* my orders */}
                <Paper style={{ width: '100%', }}>
                    <Link href={Routes.myOrders}>
                        <ListItem>
                            <ListItemAvatar>
                                <BsListUl style={{ marginTop: '3px', fontSize: '.8rem', }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary="My Orders"
                            />
                            <ListItemAvatar  className='row ma_end'>
                                <BiChevronRight style={{ marginTop: '3px', }} />
                            </ListItemAvatar>
                        </ListItem>
                    </Link>
                </Paper>
                <VSpacer space={2} />

                {/* clear data */}
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    style={{
                        borderRadius: '8px',
                        boxShadow: 'none',
                        width: '100%',
                    }}
                    onClick={logUserOut}
                >
                    <GoSignOut style={{ marginRight: '1rem', }} />
                    Log Out
                </Fab>
                <VSpacer space={2} />

                {/* clear data */}
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    style={{
                        borderRadius: '8px',
                        boxShadow: 'none',
                        width: '100%',
                    }}
                >
                    <BsPersonFillDash style={{ marginRight: '1rem', }} />
                    Clear My Data
                </Fab>


            </motion.div>

            <UpdatePhoneNumber openDialog={openUpdatePhoneDialog} onClose={ ()=> setOpenUpdatePhoneDialog(false) } />
        </motion.div>
    )
}

export default MyProfilePage