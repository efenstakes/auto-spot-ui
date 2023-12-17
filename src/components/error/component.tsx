"use client"
import { motion } from 'framer-motion'
import React from 'react'
import { FaRegHourglass } from 'react-icons/fa'

// components
import VSpacer from '@/components/v_spacer/component'

// styles
import { containerVariants, itemVariants } from '@/styles/variants'
import "./component.scss"

type Props = {
    title: string
    text: string
}
const Error = ({ title, text, }: Props) => {
    return (
        <motion.div variants={containerVariants} animate="animate" initial="initial" className='column ma_center ca_center error_loading'>
            
            {/* icon */}
            <motion.div variants={itemVariants}>
                <FaRegHourglass size={40} />
            </motion.div>
            <VSpacer space={.5} />

            <motion.p variants={itemVariants} className='title_7'>
                {title}
            </motion.p>
            <VSpacer space={.5} />

            <motion.p variants={itemVariants} className='text_center'>
                { text }
            </motion.p>

        </motion.div>
    )
}

export default Error