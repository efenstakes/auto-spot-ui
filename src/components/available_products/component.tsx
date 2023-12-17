import { Grid } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'

// components
import BrandCard from './brand_card'

// styles
import { containerVariants, itemVariants } from '@/styles/variants'

const AvailableProducts = () => {
    const products = [
        {
            name: "Mercedez Benz",
            image: "/images/car_models/benz.jpeg",
        },
        {
            name: "Jeep",
            image: "/images/car_models/jeep.png",
        },
        {
            name: "Audi",
            image: "/images/car_models/audi.png",
        },
        {
            name: "Lexus",
            image: "/images/car_models/lexus.jpeg",
        },
        {
            name: "VW",
            image: "/images/car_models/vw.jpeg",
        },
        {
            name: "Toyota",
            image: "/images/car_models/toyota.png",
        },
        {
            name: "Volvo",
            image: "/images/car_models/volvo.png",
        },
        {
            name: "Mazda",
            image: "/images/car_models/mazda.png",
        },
        {
            name: "Bmw",
            image: "/images/car_models/bmw.png",
        },
    ]
    return (
        <motion.div initial="initial" animate="animate" variants={containerVariants}>

            <motion.p variants={itemVariants} className='text_center title_4'>
                Available Brands
            </motion.p>
            
            <Grid container spacing={1}>

                {
                    products.map(({ image, name, }, index)=> {

                        return (
                            <Grid key={index} item xs={6} sm={3} lg={2}>
                                <BrandCard image={image} name={name} />
                            </Grid>
                        )
                    })
                }

            </Grid>

        </motion.div>
    )
}

export default AvailableProducts