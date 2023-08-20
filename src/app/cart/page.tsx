"use client"
import React, { useContext } from 'react'


import './page.scss'
import { ProfileContext } from '@/providers/profile'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/styles/variants'
import Appbar from '@/components/appbar/component'
import VSpacer from '@/components/v_spacer/component'
import { atom, useAtom, useAtomValue } from 'jotai'
import { cartAtom } from '@/store/cart'
import CartItemCard from '@/components/cart_card/component'
import Fab from '@mui/material/Fab'
import { BsCreditCard2Back } from 'react-icons/bs'



const CartPage = () => {
    const { profile, isLoading, } = useContext(ProfileContext)
    // const cart = useAtomValue(cartAtom)
    const [ cart, setCart ] = useAtom(cartAtom)

    const cartTotal = cart.items.map(({ quantity, product })=> product.price * quantity).reduce((a, b)=> a + b, 0)

    const placeOrder = async ()=> {
        
    }

    // console.log("cart ", cart)
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
                                {...item}
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
            >
                Place My Order
                <BsCreditCard2Back style={{ marginLeft: '1rem' }} />
            </Fab>

        </motion.div>
    )
}

export default CartPage