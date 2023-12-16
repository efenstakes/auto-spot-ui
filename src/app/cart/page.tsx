"use client"
import React, { useContext, useState } from 'react'


import './page.scss'
import { ProfileContext } from '@/providers/profile'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/styles/variants'
import Appbar from '@/components/appbar/component'
import VSpacer from '@/components/v_spacer/component'
import { atom, useAtom, useAtomValue } from 'jotai'
import { cartAtom } from '@/store/cart'
import CartItemCard from '@/components/cart_item_card/component'
import Fab from '@mui/material/Fab'
import { BsCreditCard2Back } from 'react-icons/bs'
import { useMutation, } from '@apollo/client'
import { CREATE_ORDER_MUTATION } from '@/graphql/orders'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import { isPhoneValid } from '@/services/profile'
import { MdShoppingBasket } from 'react-icons/md'
import Link from 'next/link'
import { Routes } from '@/utility/constants'
import { BiSolidHomeSmile } from 'react-icons/bi'
import CartEmpty from './components/empty/component'



const CartPage = () => {
    const { profile, isLoading, } = useContext(ProfileContext)
    // const cart = useAtomValue(cartAtom)
    const [ cart, setCart ] = useAtom(cartAtom)
    const cartTotal = cart.items.map(({ quantity, variant })=> variant?.price * quantity).reduce((a, b)=> a + b, 0)

    const [isSuccessful, setIsSuccessful] = useState(false)
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(null)

    console.log("cart ", cart);
    

    const [ createOrderMutation, { loading, } ] = useMutation(CREATE_ORDER_MUTATION, {
        onCompleted(data) {

            if( data ) {

                setIsSuccessful(true)
                console.log("createOrderMutation completed with data ", data)

                // reset cart items to be empty
                // setCart({ items: [] })
            } else {

                setError("An error occured while placing your order. Please try again.")
            }
        },
        onError(error) {
            console.log("createOrderMutation completed with error ", error)

            setError("An error occured while placing your order. Please try again.")
        }
    })


    const placeOrder = async ()=> {
        
        if( cart.items.length === 0 ) {

            console.log('====================================');
            console.log("No Items to order");
            console.log('====================================');

            return
        }

        if( !profile || !profile.phone ) {

            const validityResult = isPhoneValid(phone)
            if( validityResult ) {
    
                setError(validityResult)
                return
            }
        }

        console.log("cart.items ", cart.items);
        
        const items = cart.items.map(({ _id, quantity, variant, ...rest })=> {

            return {
                id: _id,
                variant: variant.name,
                quantity,
                // ...rest,
                // variant: {
                //     price: variant?.price,
                //     name: variant?.name,
                // },
            }
        })
        console.log("send .items ", items);
        createOrderMutation({
            variables: {
                input: {
                    products: items,
                    phone: phone,
                }
            }
        })
    }

    // console.log("cart ", cart)
    if( isSuccessful ) {

        return (
            <div className='column ma_center page'>


                {/* appbar */}
                <Appbar showCart={false} />
                <VSpacer spaceE='30vh' />
        

                <motion.div
                    className='column ca_center primary_gradient rounded_sm my_order__success_container'
                    variants={containerVariants}
                    animate='animate'
                    initial='initial'
                >

                    {/* icon */}
                    <motion.div variants={itemVariants}>
                        <MdShoppingBasket style={{ fontSize: '4rem', }} />
                    </motion.div>

                    <motion.p variants={itemVariants} className='title_8'>
                        Order Placed Successfully.
                    </motion.p>

                    <motion.p variants={itemVariants} className='my_order__success_container_text'>
                        Your order has been successfully placed. Processing will start immediately.
                    </motion.p>
                    <VSpacer space={1} />

                    {/* actions */}
                    <motion.div variants={containerVariants} className='row ma_around ca_center w_100'>

                        <Link href={Routes.home}>
                            <Fab
                                sx={{ m: { width: '320px' } }}
                                variant="extended"
                                color="secondary"
                                style={{
                                    textTransform: 'none',
                                    borderRadius: 10,
                                    width: '100%',
                                }}
                                disabled={loading}
                            >
                                Home
                                <BiSolidHomeSmile style={{ marginLeft: '1rem' }} />
                            </Fab>
                        </Link>

                        <Link href={Routes.myOrders}>
                            <Fab
                                sx={{ m: { width: '320px' } }}
                                variant="extended"
                                color="secondary"
                                style={{
                                    textTransform: 'none',
                                    borderRadius: 10,
                                    width: '100%',
                                }}
                                disabled={loading}
                            >
                                My Orders
                                <MdShoppingBasket style={{ marginLeft: '1rem' }} />
                            </Fab>
                        </Link>

                    </motion.div>

                </motion.div>

            </div>
        )
    }

    if( !cart.items.length ) {
        
        return (
            <motion.div
                className='page'
                variants={containerVariants}
                animate='animate'
                initial='initial'
            >

                {/* appbar */}
                <Appbar showCart={false} />
                <VSpacer spaceE='12vh' />
        

                <CartEmpty />

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
            <Appbar showCart={false} />
            <VSpacer spaceE='12vh' />
        

            <motion.p variants={itemVariants} className='title_7'>
                Your Cart
            </motion.p>
            <VSpacer space={2} />

            {/* item list */}
            <motion.div
                className='cart_products__grid'
                variants={containerVariants}
            >
                {
                    cart.items.map((item, i)=> {
                        
                        return (
                            <CartItemCard
                                key={i}
                                product={item}
                                // {...item}
                                mode='CART'
                            />
                        )
                    })
                }
            </motion.div>
            <VSpacer space={3} />

            {/* price total */}
            <motion.div variants={containerVariants} className='row ma_space_btn ca_center'>

                <motion.p variants={itemVariants} className='semi_bold'>
                    Price
                </motion.p>

                <motion.p variants={itemVariants} className='bold'>
                    Ksh. { cartTotal }
                </motion.p>

            </motion.div>
            <VSpacer space={3} />


            {/* pay */}
            {
                (profile && profile?.phone) &&
                    <Fab
                        sx={{ m: { width: '320px' } }}
                        variant="extended"
                        color="secondary"
                        style={{
                            textTransform: 'none',
                            borderRadius: 10,
                            width: '100%',
                        }}
                        onClick={placeOrder}
                        disabled={loading}
                    >
                        Place My Order
                        <BsCreditCard2Back style={{ marginLeft: '1rem' }} />
                    </Fab>
            }


            {/* pay */}
            {
                (!profile || !profile?.phone) &&
                    <>

                        {/* alert that you have not logged in */}
                        {
                            !profile?.phone && !phone &&
                                <>
                                    <Alert severity="warning">
                                        You have not logged in. Log in first or enter a mobile phone number to pay and proceed.
                                    </Alert>
                                    <VSpacer space={1} />
                                </>
                        }

                        {/* text input to enter phone */}
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
                                <>
                                    <Alert severity="error">
                                        {error}
                                    </Alert>
                                    <VSpacer space={1} />
                                </>
                        }

                        {/* pay */}
                        <Fab
                            sx={{ m: { width: '320px' } }}
                            variant="extended"
                            color="secondary"
                            style={{
                                textTransform: 'none',
                                borderRadius: 10,
                                width: '100%',
                            }}
                            onClick={placeOrder}
                            disabled={loading}
                        >
                            Place My Order
                            <BsCreditCard2Back style={{ marginLeft: '1rem' }} />
                        </Fab>

                    </>
            }
            <VSpacer space={6} />

        </motion.div>
    )
}

export default CartPage