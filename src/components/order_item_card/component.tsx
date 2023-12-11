import React, { useMemo, useState } from 'react'
import Chip from '@mui/material/Chip'
import { motion } from 'framer-motion'
import moment from 'moment'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'


// models
import { IOrder } from '@/models/order'

// component
import VSpacer from '../v_spacer/component'
import CartItemCard from '../cart_item_card/component'
import CancelOrder from './cancel/component'

// styles
import './component.scss'
import { containerVariants, itemVariants } from '@/styles/variants'

type actorType = "ADMIN" | "REGULAR"
type OrderItemCardProps = {
    order: IOrder
    refresh: ()=> void
    phone?: string
    actor?: actorType
}
const OrderItemCard = ({ actor = "REGULAR", phone, refresh, order: { _id, madeOn, products, totalPrice, status } }: OrderItemCardProps) => {
    const [isShowingProducts, setIsShowingProducts] = useState(false)


    const toggleShowProducts = ()=> {
        setIsShowingProducts(!isShowingProducts)
    }

    const getColor = ()=> {
        let color = 'primary'

        switch (status) {
            case 'CANCELLED':
                color = 'error'
                break;

            case 'DENIED':
                color = 'error'
                break;
                
            case 'READY':
                color = 'success'
                break;
           
            case 'DELIVERED':
                color = 'success'
                break;
            
            default:
                break;
        }

        return color
    }

    const color = useMemo(()=> {
        return getColor()
    }, [ status ])
    return (
        <div className='order_item_outer_card'>
            <motion.div
                className='rounded_sm w_100 order_item_card'
                variants={containerVariants}
                animate='animate'
                initial='initial'
                exit="exit"
            >
                
                {/* id */}
                <motion.div variants={containerVariants} className='row ma_space_btn ca_center'>

                    <Chip
                        style={{ borderRadius: 4, }}
                        label={ _id }
                        color="primary"
                        variant='filled'
                    />

                    <IconButton aria-label="Show Products" onClick={toggleShowProducts}>
                        <MdKeyboardArrowRight />
                    </IconButton>

                </motion.div>
                <VSpacer space={1} />
                {/* <motion.p>
                    { _id }
                </motion.p> */}

                {/* made on */}
                <motion.div variants={containerVariants} className='row ca_center' style={{ gap: '0 .5rem' }}>

                    <AiOutlineClockCircle />

                    <motion.p variants={itemVariants} className=''>
                        {/* { moment(madeOn).fromNow() } */}
                        { moment(madeOn).format("MMM Do YY") }
                    </motion.p>

                </motion.div>
                <VSpacer space={.5} />

                {/* number of products */}
                <motion.p variants={itemVariants}>
                    { products.length } Items
                </motion.p>
                <VSpacer space={.5} />

                {/* total price */}
                <motion.div variants={containerVariants} className='row ma_space_btn ca_center'>

                    <motion.p variants={itemVariants} className='semi_bold'>
                        Price
                    </motion.p>

                    <motion.p variants={itemVariants} className='bold'>
                        Ksh. { totalPrice }
                    </motion.p>

                </motion.div>
                <VSpacer space={1} />

                {/* status */}
                <Chip
                    style={{ borderRadius: 4, }}
                    label={ status }
                    // @ts-ignore
                    color={color}
                />
                <VSpacer space={1} />

                <motion.div variants={containerVariants} className='row ma_around ca_center' style={{ gap: '0 1rem' }}>

                    <motion.div variants={itemVariants} className='row w_100 ma_center ca_center'>
                        <Button
                            variant="contained"
                            size='small'
                            onClick={toggleShowProducts}
                            style={{
                                textTransform: 'none',
                            }}
                            fullWidth
                            disableElevation
                        >
                            { isShowingProducts ? "Hide Products" : "Show Products" }
                        </Button>
                    </motion.div>

                    {
                        (status != 'CANCELLED' && status != 'DENIED') &&
                            <CancelOrder
                                phone={phone}
                                id={_id}
                                onSuccess={refresh}
                                actor={actor}
                            />
                    }

                </motion.div>

            </motion.div>


            {
                isShowingProducts &&
                    <motion.div
                        className='cart_products__grid'
                        variants={containerVariants}
                    >
                        {
                            products.map((item, i)=> {
                                
                                // {...item}
                                return (
                                    <CartItemCard
                                        key={i}
                                        product={item}
                                        mode='ORDER'
                                    />
                                )
                            })
                        }
                    </motion.div>
            }
        </div>
    )
}

export default OrderItemCard