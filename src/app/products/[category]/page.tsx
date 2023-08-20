"use client"
import Appbar from '@/components/appbar/component'
import CategoryModelChip from '@/components/category_model_chip/component'
import ProductCategoryChip from '@/components/category_model_chip/component'
import VSpacer from '@/components/v_spacer/component'
import { GET_CATEGORY_PRODUCTS_QUERY, GET_PRODUCT_CATEGORIES_QUERY } from '@/graphql/categories'
import { containerVariants, itemVariants } from '@/styles/variants'
import { BRAND_MODELS, CAR_BRANDS, Routes, } from '@/utility/constants'
import { useLazyQuery, useQuery } from '@apollo/client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { BsCreditCard2Back } from 'react-icons/bs'


import IProduct from '@/models/product'


import './page.scss'
import Fab from '@mui/material/Fab'
import { atom, useAtom } from 'jotai'
import { cartAtom } from '@/store/cart'
import Link from 'next/link'
import ICartItem from '@/models/cart'

const ProductCategory = ({ params: { category, } }: { params: { category: string } }) => {
    const router = useRouter()
    let productName = decodeURI(category)
    console.log("decodeURI(category) ", decodeURI(category))
    const [ cart, setCart ] = useAtom(cartAtom)

    const [product, setProduct] = useState<IProduct>({ name: productName, })
    // const [brand, setBrand] = useState<string>(null)
    // const [model, setModel] = useState<string>(null)
    // const [model, setModel] = useState<string>(null)


    // get products for the given category
    const [ getProductsForModel, { loading, data, error, } ] = useLazyQuery(GET_CATEGORY_PRODUCTS_QUERY)



    console.log('====================================');
    console.log("router ", router);
    console.log('====================================');



    useEffect(()=> {

        if( !product.brand ) {
            console.log("No Car Model ", product.brand)
            return
        }

        getProductsForModel({
            variables: {
                brand: product.brand,
                category,
            }
        })

    }, [ product.brand ])


    const addItemToCart = ()=> {
        const newItem = { quantity: 1, product, }
        const newItems = [ ...cart.items, newItem ]

        // setCart((_)=> {

        //     return { items: newItems }
        // })

        setCart((_)=> {

            return { items: newItems }
        })
    }

    const addItemToCartAndCheckout = ()=> {
        addItemToCart()

        router.push(Routes.cart)
    }

    function capitalizeFirstLetter(word) {
        if (typeof word !== 'string') {
          throw new Error('Input must be a string');
        }
      
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    console.log("loading, data, error ", loading, data, error)
    const SECTION_SPACE = 2.4
    return (
        <motion.div
            className='page'
            variants={containerVariants}
            animate='animate'
            initial='initial'
            style={{
                // backgroundColor: 'thistle',
            }}
        >

            {/* appbar */}
            <Appbar />
            <VSpacer spaceE='12vh' />

        
            <motion.div
                variants={containerVariants}

                style={{
                    // backgroundColor: 'thistle',
                }}
            >

                <motion.div>
                    Let's get you a
                </motion.div>
                <motion.p className='title_2 bold' variants={itemVariants}>
                    { capitalizeFirstLetter(productName) }.
                </motion.p>
                <VSpacer space={SECTION_SPACE} />

                {/* available models */}
                <motion.p className='title_7 bold' variants={itemVariants}>
                    Brand
                </motion.p>
                <VSpacer space={1} />

                <motion.div
                    className='row category_products__models_grid'
                    variants={containerVariants}
                    style={{
                        // backgroundColor: 'thistle',
                    }}
                >
                    {
                        CAR_BRANDS.map((brand)=> {

                            return (
                                <CategoryModelChip
                                    key={brand}
                                    category={brand}
                                    selected={ brand == product.brand }
                                    onClick={
                                        ()=> setProduct({ ...product, brand })
                                    }
                                />
                            )
                        })
                    }
                </motion.div>
                <VSpacer space={SECTION_SPACE} />


                {/* available models */}
                {
                    ( product.brand && BRAND_MODELS.find(({ brand })=> brand === product.brand) && BRAND_MODELS.find(({ brand })=> brand === product.brand)?.models?.length > 0 ) &&
                        <>
                        
                            <motion.p className='title_7 bold' variants={itemVariants}>
                                Car's Model
                            </motion.p>
                            <VSpacer space={1} />

                            <motion.div
                                className='row category_products__models_grid'
                                variants={containerVariants}
                                style={{
                                    // backgroundColor: 'thistle',
                                }}
                            >
                                {
                                    BRAND_MODELS.find(({ brand })=> brand === product.brand)?.models?.map((model)=> {

                                        return (
                                            <CategoryModelChip
                                                key={model}
                                                category={model}
                                                selected={ model == product.model }
                                                onClick={
                                                    ()=> setProduct({ ...product, model })
                                                }
                                            />
                                        )
                                    })
                                }
                            </motion.div>
                            <VSpacer space={SECTION_SPACE} />

                        </>
                }

                {/* year */}
                <motion.p className='title_7 bold' variants={itemVariants}>
                    Year
                </motion.p>
                <VSpacer space={1} />

                <motion.div
                    className='row category_products__models_grid'
                    variants={containerVariants}
                    style={{
                        // backgroundColor: 'thistle',
                        gap: '1rem 1.2rem',
                    }}
                >
                    {
                        [ 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023 ].map((year)=> {

                            return (
                                <CategoryModelChip
                                    key={year}
                                    category={year.toString()}
                                    selected={ year == product.year }
                                    onClick={
                                        ()=> setProduct({ ...product, year, })
                                    }
                                />
                            )
                        })
                    }
                </motion.div>
                <VSpacer space={SECTION_SPACE} />

                
                {/* price */}
                <motion.div className='row ma_space_btn ca_center' variants={containerVariants}>
                    
                    {/* price */}
                    <motion.p className='title_8 bold' variants={itemVariants}>
                        Price
                    </motion.p>


                    <motion.p className='title_8 bold' variants={itemVariants}>
                        200
                    </motion.p>
                    
                </motion.div>
                <VSpacer space={SECTION_SPACE * 1.5} />

                {/* add */}
                <motion.div className='row ma_space_btn ca_center' style={{ gap: '.5rem' }} variants={containerVariants}>

                    {/* add to cart */}
                    <Fab
                        sx={{ m: { width: '320px' } }}
                        variant="extended"
                        color="secondary"
                        style={{
                            textTransform: 'none',
                            borderRadius: 10,
                        }}
                        onClick={addItemToCart}
                    >
                        Add To Cart
                        <MdShoppingCart fontSize={20} style={{ marginLeft: '1rem' }} />
                    </Fab>


                    {/* checkout */}
                    <Fab
                        sx={{ m: { width: '320px' } }}
                        variant="extended"
                        color="primary"
                        style={{
                            textTransform: 'none',
                            borderRadius: 10,
                        }}
                        onClick={addItemToCartAndCheckout}
                    >
                        Checkout
                        <BsCreditCard2Back style={{ marginLeft: '1rem' }} />
                    </Fab>

                </motion.div>
                <VSpacer space={SECTION_SPACE * 2} />


            </motion.div>
        </motion.div>
    )
}

export default ProductCategory