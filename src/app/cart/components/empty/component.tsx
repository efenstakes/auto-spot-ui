import { containerVariants, itemVariants } from '@/styles/variants'
import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { FaRegHourglass, FaShoppingCart } from "react-icons/fa";



import "./component.scss"
import VSpacer from '@/components/v_spacer/component'

const CartEmpty = () => {
  return (
    <motion.div variants={containerVariants} className='column ma_center ca_center empty_cart'>

        <motion.div variants={itemVariants}>
            <FaRegHourglass fontSize="2rem" />
        </motion.div>
        <VSpacer space={.5} />

        <motion.p variants={itemVariants} className='title_6'>
            Cart Empty
        </motion.p>

        <motion.p variants={itemVariants}>
            Click the shop button and shop to checkout here.
        </motion.p>
        <VSpacer space={.5} />

        <motion.div variants={itemVariants}>
            <Link href={"/"}>
                <Button variant='contained' startIcon={<FaShoppingCart />} disableElevation style={{ textTransform: 'none', }}>
                    Start Shopping
                </Button>
            </Link>
        </motion.div>
    </motion.div>
  )
}

export default CartEmpty