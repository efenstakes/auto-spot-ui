"use client"
import React, { useContext, useEffect, useState } from 'react'

import { motion, } from 'framer-motion'
import { MdList, MdOutlineAccountCircle, MdOutlineLogout, MdOutlinePerson4, MdPerson } from 'react-icons/md';
import clsx from 'clsx';
import { useWindowWidth } from '@react-hook/window-size';
import { Fab, Button, CircularProgress, Divider, Menu, MenuItem, Badge, } from '@mui/material'
import { BsPersonFill, } from 'react-icons/bs'
import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link';


import { containerVariants, itemVariants, logoContainerVariants, logoVariants, } from '@/styles/variants/index'
import './component.scss'
import { Routes } from '@/utility/constants';
import { atom, useAtom, useSetAtom } from 'jotai';
import { cartAtom } from '@/store/cart';
import ICartItem from '@/models/cart';
import { BLACK_COLOR, PRIMARY_COLOR } from '@/styles/theme';
import { ProfileContext } from '@/providers/profile';
import { clearLocalProfileData } from '@/services/profile';
import { useRouter } from 'next/navigation';

const Appbar = ({ showCart = true }: { showCart?: boolean }) => {
    const router = useRouter()
    const width = useWindowWidth()
    const isMobile = width < 840

    const [ cart, setCart ] = useAtom(cartAtom)

    const { profile, clearProfileData, } = useContext(ProfileContext)
    
    // const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const [accountButtonRef, setAccountButtonRef] = useState<null | HTMLElement>(null);
    const open = Boolean(accountButtonRef)

    // console.log("cart ",cart)
    

    useEffect(()=> {
        // setCart((prev)=> {

        //     return {
        //         items: [

        //             {
        //                 quantity: 2,
        //                 product: {
        //                     name: "Test 1",
        //                     _id: "wrdgvd",
        //                     brand: "Toyota",
        //                     model: "Lexus",
        //                     year: 2020,
        //                     price: 200,
        //                 }
        //             },
        //             {
        //                 quantity: 3,
        //                 product: {
        //                     name: "Test 2",
        //                     _id: "5467uyhtgre",
        //                     brand: "Mercedez Benz",
        //                     model: "q3",
        //                     year: 2022,
        //                     price: 200,
        //                 }
        //             },
        //         ]
        //     }
        // })
    
    }, [])


    const handleClick = (event) => {
        if( accountButtonRef ) {
            setAccountButtonRef(null)
            return
        }
        setAccountButtonRef(event.currentTarget);
    }

    const handleClose = () => {
        setAccountButtonRef(null);
    }


    const handleCloseAndLogout = ()=> {
        handleClose()
        
        clearProfileData()

        router.push(Routes.home)
    }
    
    return (
        <motion.div
            className={
                clsx([
                    'padded_container',
                    'row',
                    'ma_space_btn',
                    'ca_center main_appbar',
                    'appbar_md',
                ])
            }
            variants={containerVariants}
            animate='animate'
            initial='initial'
        >


            {
                !isMobile &&
                    <Link href={Routes.home}>
                        <motion.p variants={itemVariants} className='main_appbar__name'>
                            Auto Spot
                        </motion.p>
                    </Link>
            }

            <motion.div className='row ca_center'>
            
                <Link href={Routes.home}>
                    <motion.svg
                        width="48px"
                        height="48px"
                        viewBox="0 0 16 16"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        className="appbar_svg"
                        fill="#000000"
                        variants={logoContainerVariants}
                    >
                        
                        <motion.path
                            d="M7.992,6 C5.676,6 3.894,6.797 3.031,8.346 C3.068,8.819 3.185,9.274 3.367,9.698 C4.588,9.046 6.918,11.528 6.185,12.633 C6.765,12.837 7.326,12.988 7.982,12.988 C8.627,12.988 9.299,12.87 9.869,12.673 C9.135,11.568 11.394,9.138 12.623,9.804 C12.811,9.366 12.932,8.898 12.967,8.408 C12.095,6.875 10.293,6 7.992,6 L7.992,6 Z M8.002,9.156 C7.377,9.156 6.875,8.646 6.875,8.015 C6.875,7.384 7.377,6.874 8.002,6.874 C8.621,6.874 9.125,7.384 9.125,8.015 C9.125,8.646 8.621,9.156 8.002,9.156 L8.002,9.156 Z"
                            fill="none"
                            stroke={BLACK_COLOR}
                            strokeWidth=".8"
                            pathLength={1}
                            strokeDasharray={1}
                            strokeDashoffset={1}
                            variants={logoVariants}
                        />
                        
                    </motion.svg>
                </Link>

            </motion.div>

            {/* account button */}
            <motion.div
                className={
                    clsx([
                        "row",
                        "ma_end",
                    ])
                }
                style={{
                    gap: '.5rem',
                }}
                variants={itemVariants}
            >

                {
                    showCart &&
                        <Link href={Routes.cart}>
                            
                            <Badge badgeContent={cart.items.length} color="primary">
                                <Fab
                                    size='small'
                                    color="secondary"
                                    aria-label="Go to my cart"
                                >
                                    <FaShoppingCart color="white" fontSize={'.9rem'} />
                                </Fab>
                            </Badge>
                        </Link>
                }

                <Fab
                    size='small'
                    color="primary"
                    aria-label="add"
                    onClick={(e)=> handleClick(e)}
                >
                    <BsPersonFill />
                </Fab>

            </motion.div>

            {/* floating menu */}
            <Menu
                anchorEl={accountButtonRef}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                {/* my profile */}
                {
                    profile &&
                        <Link href={Routes.myProfile}>
                            <MenuItem onClick={handleClose}>
                                <AppbarMenuItemIcon classes='themed_bg_primary'>
                                    <MdOutlinePerson4 />
                                </AppbarMenuItemIcon>
        
                                <small>
                                    My Profile
                                </small>
                            </MenuItem>
                        </Link>
                }

                {/* my orders */}
                {
                    profile &&
                        <Link href={Routes.myOrders}>
                            <MenuItem onClick={handleClose}>
                                <AppbarMenuItemIcon classes='themed_bg_secondary'>
                                    <MdList />
                                </AppbarMenuItemIcon>

                                <small>
                                    My Orders
                                </small>
                            </MenuItem>
                        </Link>
                }

                { profile && <Divider /> }

                {/* logout */}
                {
                    profile &&
                        <MenuItem onClick={handleCloseAndLogout}>
                            <AppbarMenuItemIcon classes='themed_bg_tertiary'>
                                <MdOutlineLogout />
                            </AppbarMenuItemIcon>

                            <small>
                                Log Out
                            </small>
                        </MenuItem>
                }

                
                
                {/* login */}
                { 
                    !profile &&
                        <Link href={Routes.login}>
                            <MenuItem>
                                <AppbarMenuItemIcon classes='themed_bg_tertiary'>
                                    <MdOutlinePerson4 />
                                </AppbarMenuItemIcon>

                                <small>
                                    Login
                                </small>
                            </MenuItem>
                        </Link>
                }

                {/* create account */}
                { 
                    !profile &&
                        <Link href={Routes.login}>
                            <MenuItem>
                                <AppbarMenuItemIcon classes='themed_bg_tertiary'>
                                    <MdOutlinePerson4 />
                                </AppbarMenuItemIcon>

                                <small>
                                    Create Account
                                </small>
                            </MenuItem>
                        </Link>
                }
                

            </Menu>
            
            {/* <LoginDialog openDialog={openLoginDialog} onClose={ ()=> setOpenLoginDialog(false) } /> */}
        </motion.div>
    )
}

const AppbarMenuItemIcon = ({ classes, children,  })=> {

    return (
        <div className={`menu_item_icon ${classes}`}>
            { children }
        </div>
    )
}


export default Appbar
