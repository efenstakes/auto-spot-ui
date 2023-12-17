import { motion } from 'framer-motion'
import React from 'react'

// component
import VSpacer from '../v_spacer/component'

// styles
import "./component.scss"
import { containerVariants, itemFadeInVariants, itemVariants } from '@/styles/variants'


type Props = {
    image: string
    name: string
}
const BrandCard = ({ image, name, }: Props) => {
  return (
    <motion.div variants={containerVariants} initial="initial" animate="animate" className='column ma_center ca_center brand_card'>
        
        <motion.div variants={itemFadeInVariants} className='brand_card__image_container'>
            <motion.img src={image} variants={itemFadeInVariants} className='brand_card__image' />
        </motion.div>
        <VSpacer space={1} />

        <motion.p variants={itemVariants}>
            <strong>{name}</strong>
        </motion.p>

    </motion.div>
  )
}

export default BrandCard