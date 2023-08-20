import React from 'react'
import { motion } from 'framer-motion'


// models
import ICategory from '@/models/category'


// styles
import { containerVariants, itemVariants } from '@/styles/variants'
import './component.scss'



type ProductCategoryCardProps = {
    category: ICategory
}
const ProductCategoryCard = ({ category: { category, } }: ProductCategoryCardProps) => {
    // console.log('====================================');
    // console.log("category ", category);
    // console.log('====================================');
    const themedBgs = [
        'themed_bg_primary', 'themed_bg_secondary', 'themed_bg_black',
    ]
    const bg = themedBgs[Math.floor(Math.random() * themedBgs.length)]

    
    return (
        <motion.div
            className={`row ma_center ca_center ${bg} product_category_card`}
            variants={containerVariants}
            animate='animate'
            initial='initial'
        >
            
            <motion.p variants={itemVariants} className='bold product_category_card__text'>
                { category }
            </motion.p>

        </motion.div>
    )
}

export default ProductCategoryCard
