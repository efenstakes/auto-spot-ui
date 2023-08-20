import { useQuery } from '@apollo/client'
import Skeleton from '@mui/material/Skeleton'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BsSendFill } from 'react-icons/bs'
import Fab from '@mui/material/Fab'
import { useWindowWidth } from '@react-hook/window-size'


// component
import ProductCategoryCard from '../product_category_card/component'
import VSpacer from '../v_spacer/component'

// graphql
import { GET_PRODUCT_CATEGORIES_QUERY } from '@/graphql/categories'

// styles
import { containerVariants, itemVariants } from '@/styles/variants'
import './component.scss'
import Link from 'next/link'
import Chip from '@mui/material/Chip'
import ICategory from '@/models/category'


const ProductCategories = () => {
    const width = useWindowWidth()
    const isMobile = width < 840

    const [categories, setCategories] = useState<Array<ICategory>>([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const { data, loading, error, } = useQuery(GET_PRODUCT_CATEGORIES_QUERY)


    // console.log("data ", data)
    // console.log("loading ", loading)
    // console.log("error ", error)

    useEffect(()=> {
        if( !data ) {
            return
        }

        if( data && !data['getProductCategories'] ) {
            return
        }

        setCategories(data['getProductCategories'])

        if( data['getProductCategories'].length > 0 ) {

            setSelectedCategory(data['getProductCategories'][0]['category'])   
        }
    }, [ data ])

    // motion
    // const categories = data ? data['getProductCategories'] : []
    return (
        <motion.div
        
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >

            {/* title */}
            <motion.div
                className='row ca_end ma_space_btn'
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >

                {/* title */}
                <motion.p className='title_7' variants={itemVariants}>
                    {
                        isMobile ? "Products" : "Product Categories"
                    }
                </motion.p>

                {/* contact us */}
                <motion.div variants={itemVariants}>
                    <Link href='mailto:autospot254@gmail.com'>
                        <Fab
                            size='small'
                            color="primary"
                            aria-label="inquire"
                            variant='extended'
                            style={{
                                padding: '1rem',
                                textTransform: 'none',
                                boxShadow: 'none',
                            }}
                        >
                            Inquire
                            <BsSendFill style={{ marginLeft: '.5rem', fontSize: '.8rem', }} />
                        </Fab>
                    </Link>
                </motion.div>

            </motion.div>
            <VSpacer space={1} />


            {/* categories - chips */}
            <motion.div variants={containerVariants} className='row_wrapped ma_center' style={{ gap: '.5rem' }}>

                {
                    loading &&
                        new Array(11).fill(0).map((_, index)=> {
                            // const themedBgs = [
                            //     'themed_bg_primary', 'themed_bg_secondary', 'themed_bg_tertiary', 'themed_bg_black',
                            // ]
                            // const bg = themedBgs[Math.floor(Math.random() * themedBgs.length)]

                            return (
                                    <Skeleton
                                        variant="rounded"
                                        width={Math.random() * 200 + 10}
                                        height={32}
                                    />
                            )
                        })
                }

                {
                    (!loading && categories) &&
                        categories.map((category, index)=> {
                            // const themedBgs = [
                            //     'themed_bg_primary', 'themed_bg_secondary', 'themed_bg_tertiary', 'themed_bg_black',
                            // ]
                            // const bg = themedBgs[Math.floor(Math.random() * themedBgs.length)]

                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    onClick={
                                        ()=> setSelectedCategory(category?.category)
                                    }
                                >
                                    <Chip
                                        label={category.category}
                                        color="primary"
                                        variant={ category.category == selectedCategory ? "filled" : "outlined" }
                                    />
                                </motion.div>
                            )
                        })
                }

            </motion.div>
            <VSpacer space={1} />


            {/* categories */}
            {/* loading */}
            {
                loading && 
                    <motion.div className='product_categories__category_grid'>
                        {
                            new Array(11).fill(0).map((_, index)=> {
                                const themedBgs = [
                                    'themed_bg_primary', 'themed_bg_secondary', 'themed_bg_tertiary', 'themed_bg_black',
                                ]
                                const bg = themedBgs[Math.floor(Math.random() * themedBgs.length)]

                                return (
                                    <Skeleton
                                        variant="rounded"
                                        width={'100%'}
                                        height={160}
                                        className={bg}
                                    />
                                )
                            })
                        }
                    </motion.div>
            }

            {/* data */}
            {/* {
                (!loading && categories) &&
                    <motion.div className='product_categories__category_grid'>
                        {
                            categories.map((category, index)=> {
                                // const themedBgs = [
                                //     'themed_bg_primary', 'themed_bg_secondary', 'themed_bg_tertiary', 'themed_bg_black',
                                // ]
                                // const bg = themedBgs[Math.floor(Math.random() * themedBgs.length)]

                                return (
                                    <Link href={`/products/${category?.category?.toLowerCase()}`} key={index}>

                                        <ProductCategoryCard category={category} />
                                    </Link>
                                )
                            })
                        }
                    </motion.div>
            } */}
            {
                (!loading && categories && selectedCategory) &&
                    <motion.div className='product_categories__category_grid'>
                        {
                            categories.find((c)=> c.category == selectedCategory)?.products?.map((category, index)=> {
                                // const themedBgs = [
                                //     'themed_bg_primary', 'themed_bg_secondary', 'themed_bg_tertiary', 'themed_bg_black',
                                // ]
                                // const bg = themedBgs[Math.floor(Math.random() * themedBgs.length)]

                                return (
                                    <Link href={`/products/${category?.toLowerCase()}`} key={index}>

                                        <ProductCategoryCard category={{ category, }} />
                                    </Link>
                                )
                            })
                        }
                    </motion.div>
            }

        </motion.div>
    )
}

export default ProductCategories