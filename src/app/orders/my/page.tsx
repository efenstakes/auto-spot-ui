"use client"
import Appbar from '@/components/appbar/component'
import VSpacer from '@/components/v_spacer/component'
import { GET_MY_ORDERS_QUERY } from '@/graphql/orders'
import { ProfileContext } from '@/providers/profile'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/styles/theme'
import { containerVariants, itemVariants } from '@/styles/variants'
import { useLazyQuery } from '@apollo/client'
import CircularProgress from '@mui/material/CircularProgress'
import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import PhoneNumberSearch from '../enter_phone/component'
import ProfileLoading from '@/components/profile_loading/component'
import Skeleton from '@mui/material/Skeleton'


import './page.scss'
import { MdShoppingBasket } from 'react-icons/md'
import CartItemCard from '@/components/cart_item_card/component'
import OrderItemCard from '@/components/order_item_card/component'

const MyOrders = () => {

    const { profile, isLoading, } = useContext(ProfileContext)

    const [orders, setOrders] = useState([])
    const [hasSearch, setHasSearch] = useState(false)
    const [ phone, setPhone ] = useState(null)


    const [ getMyOrders, { data, loading, error, refetch, }] = useLazyQuery(GET_MY_ORDERS_QUERY)


    const searchByPhone = (phoneNo)=> {
        setPhone(phoneNo)

        setHasSearch(true)
        getMyOrders({
            variables: {
                phone,
            }
        })
    }


    const refresh = ()=> {
        refetch({ variables: { phone, } })
    }


    useEffect(()=> {

        if( !isLoading && profile ) {

            setHasSearch(true)
            getMyOrders({ variables: {} })
        }
        
    }, [ profile ])
    useEffect(()=> {

        if( !data || !data['getMyOrders'] ) {

            console.log('====================================');
            console.log("No data returned ", data);
            console.log('====================================');
            return
        }

        setOrders(data['getMyOrders'])
    }, [ data ])

    console.log("data, loading, error, ", data, loading, error,)
    return (
        <motion.div
            className='page'
            variants={containerVariants}
            animate='animate'
            initial='initial'
        >

            {/* appbar */}
            <Appbar showCart={false} />
            <VSpacer spaceE='12vh' />
        


            {/* when loading profile */}
            { isLoading && <ProfileLoading /> }

            {/* if we have no profile */}
            {
                (!profile && !isLoading) &&
                    <PhoneNumberSearch
                        startSearch={searchByPhone}
                    />
            }
            <VSpacer space={2} />

            {
                (loading || orders.length > 0) &&
                    <motion.p variants={itemVariants} className='title_7'>
                        Your Orders
                    </motion.p>
            }
            { (loading || orders.length > 0) && <VSpacer space={2} /> }
            
            {/* when loading data */}
            <motion.div variants={containerVariants} className='my_orders__grid'>

                {
                    loading &&
                        new Array(11).fill(0).map((_, index)=> {
                            const themedBgs = [
                                'themed_bg_primary', 'themed_bg_secondary', 'themed_bg_tertiary', 'themed_bg_black',
                            ]
                            const bg = themedBgs[Math.floor(Math.random() * themedBgs.length)]

                            return (
                                <Skeleton
                                    key={index}
                                    variant="rounded"
                                    width={'100%'}
                                    height={180}
                                    className={bg}
                                />
                            )
                        })
                }
            </motion.div>
            

            {
                orders.map((order, index)=> {

                        return (
                            <OrderItemCard
                                key={index}
                                order={order}
                                refresh={refresh}
                                phone={phone}
                            />
                        )
                    })
            }


            {
                (!loading && orders.length === 0 && hasSearch ) &&
                    <motion.div variants={containerVariants} className='column ca_center bg_black rounded_sm my_orders__empty_container'>
                        
                        
                        {/* icon */}
                        <motion.div variants={itemVariants}>
                            <MdShoppingBasket style={{ fontSize: '4rem', }} />
                        </motion.div>

                        <motion.p variants={itemVariants} className='title_8'>
                            No Orders Found
                        </motion.p>

                        <motion.p variants={itemVariants} className='my_orders__empty_container_text'>
                            We could not find any orders for you. You can go home and make one now.
                        </motion.p>

                    </motion.div>
            }


            <VSpacer space={1} />


        </motion.div>
    )
}



export default MyOrders