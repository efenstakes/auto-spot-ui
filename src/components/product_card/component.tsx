import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

import Img from "../../../public/images/texture.jpg"

// models
import IProduct from '@/models/product'


// styles
import "./component.scss"
import { containerVariants, itemVariants } from '@/styles/variants'
import VSpacer from '../v_spacer/component'

type Props = {
    product?: IProduct
}
const ProductCard = ({ product: { name, brand, model, variants, years, } }: Props) => {

    const getMinYear = ()=> {
        let min = years[0]

        for (const yr of years) {
            
            if( yr < min ) {

                min = yr
            }
        }

        return min
    }

    const getMinPrice = ()=> {
        let min = variants[0].price

        for (const vr of variants) {
            
            if( vr.price < min ) {

                min = vr.price
            }
        }

        return min
    }
    const getMaxPrice = ()=> {
        let max = variants[0].price

        for (const vr of variants) {
            
            if( vr.price > max ) {

                max = vr.price
            }
        }

        return max
    }

    const getMaxYear = ()=> {
        let max = years[0]

        for (const yr of years) {
            
            if( yr > max ) {

                max = yr
            }
        }

        return max
    }

    const minYear = getMinYear()
    const maxYear = getMaxYear()

    const minPrice = getMinPrice()
    const maxPrice = getMaxPrice()
    
    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="product_card"
        >

            {/* image */}
            <motion.div variants={containerVariants} className='product_card__image_container'>
                <motion.img
                    src={variants[0]?.image}
                    variants={itemVariants}
                    className="product_card__image"
                />
            </motion.div>

            {/* name and year */}
            <motion.div variants={containerVariants} className='row ma_space_btn ca_center'>

                {/* name */}
                <motion.h4 variants={itemVariants}>
                    { name }
                </motion.h4>

                {/* year */}
                <motion.p variants={itemVariants}>
                    <small>
                        { years.length > 1 ? `${minYear} - ${maxYear}` : years[0] }
                    </small>
                </motion.p>

            </motion.div>
            
            {/* brand and model */}
            <motion.div variants={containerVariants} className='row ca_center product_card__brand_model'>

                {/* brand */}
                <motion.p variants={itemVariants}>
                    <strong>{ brand }</strong>, { model }
                </motion.p>

                {/* <motion.div variants={containerVariants} className='product_card__brand_model_divider' /> */}

                {/* model */}
                {/* <motion.p variants={itemVariants}>
                    { model }
                </motion.p> */}

            </motion.div>
            
            {/* prices */}
            <motion.div variants={containerVariants} className='row ma_space_btn ca_center'>

                {
                    variants.length > 1 &&
                        <motion.p variants={itemVariants}>
                            Ksh. { minPrice } - { maxPrice }
                        </motion.p>
                }
                {
                    variants.length === 1 &&
                        <motion.p variants={itemVariants}>
                            Ksh. { variants[0].price }
                        </motion.p>
                }


            </motion.div>
            <VSpacer space={1} />
            
            {/* variations and buy now */}
            <motion.div variants={containerVariants} className='row ma_space_btn ca_center' style={{ gap: '.5rem', }}>

                <motion.div variants={itemVariants}>
                    <Button
                        disableElevation
                        variant='outlined'
                        style={{ textTransform: 'none', }}
                    >
                        { variants.length } Variations
                    </Button>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Button
                        variant='contained'
                        disableElevation
                        startIcon={<FaShoppingCart color="white" fontSize={'.9rem'} />}
                        style={{ textTransform: 'none', }}
                    >
                        Buy Now
                    </Button>
                </motion.div>

            </motion.div>
            
        
        </motion.div>
    )
}

export default ProductCard
