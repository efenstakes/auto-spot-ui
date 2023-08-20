import { containerVariants } from '@/styles/variants'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import React from 'react'


import './component.scss'


type Props = {
    selected?: boolean
    category: string
    onClick: ()=> void
}
const CategoryModelChip = ({ category, selected = false, onClick, }: Props) => {
  return (
    <motion.div
        onClick={onClick}
        className={
            clsx(
                [ 'row', 'ma_center', 'ca_center', 'category_chip' ],
                {
                    'category_chip__selected': selected,
                }
            )
        }
        variants={containerVariants}
        initial="initial"
        animate="animate"
    >
        { category }
    </motion.div>
  )
}

export default CategoryModelChip
