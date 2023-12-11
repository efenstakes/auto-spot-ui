import CircularProgress from '@mui/material/CircularProgress'
import { motion } from 'framer-motion'
import React from 'react'
import VSpacer from '../v_spacer/component'
import { containerVariants, itemVariants } from '@/styles/variants'

const ProfileLoading = () => {

    return (
        <motion.div variants={containerVariants}>
            <VSpacer spaceE='20vh' />

            <motion.div variants={itemVariants} className='row ma_center'>
                <CircularProgress color="primary" />
            </motion.div>

        </motion.div>
    )
}

export default ProfileLoading