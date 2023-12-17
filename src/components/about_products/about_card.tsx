import React from 'react'
import { motion } from 'framer-motion'
import { BsAwardFill } from 'react-icons/bs'

// components
import VSpacer from '../v_spacer/component'

// styles
import { containerVariants, itemVariants } from '@/styles/variants'
import "./about_card.scss"

type Props = {
    title?: string
    text?: string
}
const AboutCard = ({ title, text, }: Props) => {
    return (
        <motion.div variants={containerVariants} initial="initial" animate="animate" className='column ca_center about_card'>
            
            <motion.div variants={itemVariants}>
                <BsAwardFill size={48} color='darkgoldenrod' />
            </motion.div>
            <VSpacer space={.5} />

            <motion.p variants={itemVariants} className='title_7'>
                {title}
            </motion.p>
            <VSpacer space={.5} />

            <motion.p className='text_center about_card_text' variants={itemVariants}>
                {text}
            </motion.p>

        </motion.div>
    )
}

export default AboutCard