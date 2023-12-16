"use client"
import Appbar from '@/components/appbar/component'
import CategoryModelChip from '@/components/category_model_chip/component'
import ProductCategoryChip from '@/components/category_model_chip/component'
import VSpacer from '@/components/v_spacer/component'
import {   GetProductQuery } from '@/graphql/categories'
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
import Skeleton from '@mui/material/Skeleton'
import { Chip } from '@mui/material'
import clsx from 'clsx'

const ProductCategory = ({ params: { id, } }: { params: { id: string } }) => {
    const router = useRouter()
    const [ cart, setCart ] = useAtom(cartAtom)

    const [cartItem, setCartItem] = useState<ICartItem>({ _id: id, quantity: 1, })
    // const [products, setProducts] = useState<IProduct[]>([])
    // const [years, setYears] = useState<number[]>([])

    console.log("id ", id);
    

    // get products for the given category
    const { loading, data, error, } = useQuery(GetProductQuery, { variables: { id, } })
    console.log("loading, data, error,  ", loading, data, error, );



    console.log('====================================');
    console.log("router ", router);
    console.log('====================================');

    useEffect(()=> {

        console.log('====================================');
        console.log("product changed something");
        console.log('====================================');

        if( !data ) {

            console.log("no data");
            return
        }

        if( !loading && ( !data || !data['getProduct'] ) ) {
            console.log("No Car model ", product?.model)
            return
        }

        let prod: IProduct = data['getProduct']
        setCartItem({
            _id: prod?._id,
            name: prod?.name,
            model: prod?.model,
            brand: prod?.brand,
            year: prod?.years[0],
            quantity: 1,
            variant: prod?.variants[0],
        })
    }, [ data ])


    const addItemToCart = ()=> {
        let exists = cart.items.find((item)=> item.variant.name == cartItem?.variant?.name)

        let newItems = []
        if( exists ) {

            newItems = cart.items.map((item)=> {

                if( item?._id == cartItem?._id && item.variant.name == cartItem?.variant?.name ) {
    
                    return {
                        ...item,
                        quantity: item?.quantity + 1,
                    }
                }
    
                return item
            })
        } else {

            newItems = [ ...cart.items, cartItem ]
        }
        // let newItems = cart.items.map((item)=> {

        //     if( item?._id == cartItem?._id && item.variant.name == cartItem?.variant?.name ) {

        //         return {
        //             ...item,
        //             quantity: item?.quantity + 1,
        //         }
        //     }

        //     return item
        // })

        console.log('====================================');
        console.log("newItems ", newItems);
        console.log('====================================');

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
    if( loading ) {

        return (
            <h1>Loading</h1>
        )
    }
    const product = data ? data['getProduct'] : null
    if( error || product == null ) {

        return (
            <h1>Error {error?.message}</h1>
        )
    }
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

                {/* image */}
                <motion.div variants={containerVariants} className='product_details__image_container'>
                    <motion.img
                        src={ cartItem?.variant?.image }
                        className='product_details_image'
                        variants={itemVariants}
                    />
                </motion.div>
                <VSpacer space={1} />

                {/* name */}
                <motion.p className='title_4 bold' variants={itemVariants}>
                    { product?.name }
                </motion.p>
                <VSpacer space={1} />

                {/* brand model */}
                <motion.p className='title_7 bold' variants={itemVariants}>
                    { product?.brand }, { product?.model }
                </motion.p>
                <VSpacer space={1} />
            

                {/* year */}
                <motion.p className='title_7 bold' variants={itemVariants}>
                    { product?.years.length > 1 ? "Select Year" : "Year" }
                </motion.p>
                <VSpacer space={1} />

                {/* year */}
                {
                    product?.years?.length === 1 &&
                        <motion.p variants={itemVariants}>
                            {product?.years[0]}
                        </motion.p>
                }
                
                {
                    product?.years?.length > 1 &&

                        <div
                            className='row category_products__models_grid'
                            style={{
                                // backgroundColor: 'thistle',
                                gap: '1rem 1.2rem',
                            }}
                        >
                        {
                            product?.years?.map((yr)=> {

                                return (
                                    <motion.div
                                        key={yr}
                                        onClick={
                                            ()=> setCartItem((state)=> {
                                                return { ...state, year: yr, }
                                            })
                                        }
                                        variants={itemVariants}
                                        className={
                                            clsx({
                                                'category_products__models_grid_item_selected': cartItem?.year == yr,
                                                'category_products__models_grid_item': true,
                                            })
                                        }
                                        // className='category_products__models_grid_item'
                                    >
                                        {yr}
                                    </motion.div>
                                )
                            })
                        }
                        </div>
                }
                <motion.div
                    className='row category_products__models_grid'
                    variants={containerVariants}
                    style={{
                        // backgroundColor: 'thistle',
                        gap: '1rem 1.2rem',
                    }}
                >
                    {/* {
                        loading &&
                            new Array(10).fill(0).map((_, index)=> {
                              
                                return (
                                        <Skeleton
                                            key={index}
                                            variant="rounded"
                                            width={Math.random() * 200 + 10}
                                            height={32}
                                        />
                                )
                            })
                    } */}
                    {/* {
                        years.map((year)=> {

                            return <div key={brand} />
                            return (
                                <CategoryModelChip
                                    key={year}
                                    category={year.toString()}
                                    selected={ year == product.year }
                                    onClick={
                                        ()=> {

                                            const price = products.find((product)=> product.year == year)?.price
                                            console.log("found ", price)
                                            setProduct({ ...product, year, price, })
                                        }
                                    }
                                />
                            )
                        })
                    } */}
                </motion.div>
                <VSpacer space={SECTION_SPACE} />


                {/* variant */}
                <motion.p className='title_7 bold' variants={itemVariants}>
                    { product?.years.length > 1 ? "Selected Type" : "Type" }
                </motion.p>
                {
                    product?.years.length > 1 &&
                        <small className='product_details__variant_chooser_instruction'>
                            When you change this please check the updated product image.
                        </small>
                }
                <VSpacer space={1} />

                {/* year */}
                {
                    product?.variants?.length === 1 &&
                        <motion.p variants={itemVariants}>
                            {product?.variants[0]?.name}
                        </motion.p>
                }
                
                {
                    product?.variants?.length > 1 &&

                        <div
                            className='row category_products__models_grid'
                            style={{
                                // backgroundColor: 'thistle',
                                gap: '1rem 1.2rem',
                            }}
                        >
                        {
                            product?.variants?.map((variant)=> {

                                return (
                                    <motion.div
                                        key={variant?.name}
                                        onClick={
                                            ()=> setCartItem((state)=> {
                                                return { ...state, variant, }
                                            })
                                        }
                                        variants={itemVariants}
                                        className={
                                            clsx({
                                                'category_products__models_grid_item_selected': cartItem?.variant?.name == variant?.name,
                                                'category_products__models_grid_item': true,
                                            })
                                        }
                                        // className='category_products__models_grid_item'
                                    >
                                        {variant?.name}
                                    </motion.div>
                                )
                            })
                        }
                        </div>
                }
                <VSpacer space={SECTION_SPACE} />
                
                {/* price */}
                {
                    product &&
                        <motion.div className='row ma_space_btn ca_center' variants={containerVariants}>
                            
                            {/* price */}
                            <motion.p className='title_8 bold' variants={itemVariants}>
                                Price
                            </motion.p>
        
        
                            <motion.p className='title_8 bold' variants={itemVariants}>
                                { cartItem?.variant?.price }
                            </motion.p>
                            
                        </motion.div>
                }
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
                        // disabled={
                        //     !product.name || !product.brand || !product.model || !product.year
                        // }
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
                        // disabled={
                        //     !product.name || !product.brand || !product.model || !product.year
                        // }
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