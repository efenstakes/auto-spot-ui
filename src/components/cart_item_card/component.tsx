import ICartItem from '@/models/cart'
import React from 'react'
import { MdDeleteOutline } from 'react-icons/md'

import './component.scss'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/styles/variants'
import { Chip, Fab, Paper, Stack } from '@mui/material'
import VSpacer from '../v_spacer/component'
import { useAtom } from 'jotai'
import { cartAtom } from '@/store/cart'

const CartItemCard = ({ quantity, product: { brand, model, name, year, price, _id, } }: ICartItem) => {
    const [ cart, setCart ] = useAtom(cartAtom)


    const deleteItem = ()=> {
        const newItems = cart.items.filter(({ product })=> product._id != _id)

        setCart((_)=> { 
            return { items: newItems }
        })
    }

    const addQuantity = ()=> {
        const newItems = cart.items.map(({ quantity, product })=> {

            if( product._id == _id ) {

                return {
                    quantity: quantity + 1,
                    product
                }
            } else {
                return { quantity, product }
            }
        })

        console.log("addQuantity :: newItems ", newItems)

        // const newItem = cart.items.find(({ product })=> product._id == _id)
        
        // const exemptItems = cart.items.filter(({ product })=> product._id != _id)
        // const newItems = [ ...exemptItems,  ]

        setCart((_)=> { 
            return { items: newItems }
        })
    }


    const reduceQuantity = ()=> {
        let newItems = cart.items.map(({ quantity, product })=> {

            if( product._id == _id ) {

                return {
                    quantity: quantity - 1,
                    product
                }
            } else {
                return { quantity, product }
            }
        })
        console.log("reduceQuantity :: newItems ", newItems)

        newItems = newItems.filter(({ quantity })=> quantity > 0)
        console.log("reduceQuantity :: final newItems ", newItems)

        // const newItem = cart.items.find(({ product })=> product._id == _id)
        
        // const exemptItems = cart.items.filter(({ product })=> product._id != _id)
        // const newItems = [ ...exemptItems,  ]

        setCart((_)=> { 
            return { items: newItems }
        })
    }

    return (
        <Paper style={{ maxWidth: '400px', }}>
        <motion.div
            className='cart_item_card'
            variants={containerVariants}
            animate='animate'
            initial='initial'
            exit="exit"
        >

            {/* name & delete */}
            <motion.div variants={containerVariants} className='row ma_space_btn ca_center'>
                
                {/* name */}
                <motion.h3 variants={itemVariants}>
                    { name }
                </motion.h3>

                {/* delete icon */}
                <Fab
                    size='small'
                    color="error"
                    aria-label="Delete from cart"
                    style={{ boxShadow: 'none', }}
                    onClick={deleteItem}
                >
                    <MdDeleteOutline color="white" />
                </Fab>

            </motion.div>
            <VSpacer space={.5} />

            {/* brand */}
            {/* <motion.p variants={itemVariants}>
                { brand }
            </motion.p>
            <VSpacer space={.2} /> */}

            {/* model & year*/}
            <Stack direction="row" spacing={1}>
                
                <Chip
                    style={{ borderRadius: 4, }}
                    label={ model }
                    color="primary"
                    // variant='outlined'
                />
                
                <Chip
                    style={{ borderRadius: 4, }}
                    label={ year }
                    color="secondary"
                    variant='outlined'
                />

            </Stack>
            <VSpacer space={1} />
            
            {/* quantity and add quantity */}
            <motion.p variants={itemVariants}>
                Quantity
            </motion.p>
            <VSpacer space={.5} />

            <motion.div variants={containerVariants} className='row ca_center' style={{ gap: '1rem' }}>

                {/* add icon */}
                <motion.div className='' variants={itemVariants}>
                    <Fab
                        size='small'
                        color="secondary"
                        aria-label="Go to my cart"
                        style={{ boxShadow: 'none', }}
                        onClick={addQuantity}
                    >
                        +
                    </Fab>
                </motion.div>

                {/* qty */}
                <motion.p variants={itemVariants}>
                    {quantity}
                </motion.p>

                {/* minus icon */}
                <motion.div className='' variants={itemVariants}>
                    <Fab
                        size='small'
                        color="secondary"
                        aria-label="Go to my cart"
                        style={{ boxShadow: 'none', }}
                        onClick={reduceQuantity}
                    >
                        -
                    </Fab>
                </motion.div>

            </motion.div>
            <VSpacer space={1} />

            {/* price total */}
            <motion.div variants={containerVariants} className='row ma_space_btn ca_center'>

                <motion.p variants={itemVariants} className='semi_bold'>
                    Price
                </motion.p>

                <motion.p variants={itemVariants} className='bold'>
                    Ksh. { quantity * price }
                </motion.p>

            </motion.div>
            {/* <VSpacer space={1} /> */}
        
        </motion.div>
        </Paper>
    )
}

export default CartItemCard