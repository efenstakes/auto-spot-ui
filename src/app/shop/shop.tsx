
import { useQuery } from '@apollo/client'
import { CircularProgress, Grid, Skeleton } from '@mui/material'
import { useWindowWidth } from '@react-hook/window-size'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

// utility
import { CarBrandsAndModels } from '@/utility/form_data'

// graphql
import { GetProductsQuery } from '@/graphql/categories'

// models
import { ISelectedFilters } from '@/models/filters'

// providers
import { ProfileContext } from '@/providers/profile'

// components
import ProductCard from '@/components/product_card/component'
import LoadMore from './load_more'
import Filters from './filters'
import VSpacer from '@/components/v_spacer/component'
import Error from '@/components/error/component'


const Shop = () => {
    const width = useWindowWidth()
    const isMobile = width < 840
    
    const { profile, } = useContext(ProfileContext)
    const [filters, setFilters] = useState<ISelectedFilters>({  brand: "All", model: null, year: null })
    const [availableModels, setAvailableModels] = useState([])


    // get products
    const { loading, data, error, refetch, fetchMore, } = useQuery(GetProductsQuery, {
        variables: {
            input: {},
            offset: 0,
            limit: 30,
        },
        notifyOnNetworkStatusChange: true,
    })

    console.log("loading, data, error, ", loading, data, error,);
    


    const onClickBrand = (brand: string)=> {

        console.log('====================================');
        console.log("onClickBrand brand ", brand);
        console.log('====================================');

        // check if a
        setFilters((state)=> {

            return { ...state, brand, model: null }
        })

        // if all
        if( brand.toLowerCase() == "all" ) {

            setAvailableModels([])
        } else {

            setAvailableModels(
                CarBrandsAndModels.find(({brand})=> brand.toLowerCase() == brand.toLowerCase())?.models || []
            )
        }
    }

    const onClickModel = (model: string)=> {

        // check if a
        setFilters((state)=> {

            return { ...state, model, }
        })
    }

    const onClickYear = (year: number)=> {

        // check if a
        setFilters((state)=> {

            return { ...state, year, }
        })
    }

    const loadMore = (offset: number)=> {
        
        if( !loading )  {

            fetchMore({ variables: { offset, } })
        }
    }

    
    useEffect(()=> {

        console.log("filters ", filters);

        let queryFilters = {} 

        if( filters?.brand && filters?.brand == "All" ) {

            if( filters?.year ) {

                refetch({ input: { year: filters?.year, } })
            }
            return
        }
        
        if( filters?.brand && filters?.brand != "All" ) {

            queryFilters = { ...filters, brand: filters?.brand }
        }
        if( filters?.year ) {

            queryFilters = { ...filters, year: filters?.year }
        }
        if( filters?.brand && filters?.model && filters?.model != "All" ) {

            queryFilters = { ...filters, model: filters?.model }
        }

        refetch({
            input: {
                ...queryFilters 
            }
        })
    }, [filters])



    if( error ) {
        
        return (
            <Error
                title="Error Getting Products"
                text='We encountered an error while getting products. Please ensure you are connected to the internet and try again.'
            />
        )
    }

    if( loading && !data ) {

        return (
            <>

                {/* filters */}
                <Filters
                    onClickBrand={onClickBrand}
                    onClickModel={onClickModel}
                    onClickYear={onClickYear}
                    filters={filters}
                    models={availableModels}
                />                

                {/* products */}
                <Grid container spacing={2}>

                    {
                        Array.from({ length: 13 }, (_, i)=> i).map((_, index)=> {

                            return (
                                <Grid key={index} item xs={12} sm={6} lg={4}>
                                    <Skeleton variant="rounded" height={"320px"} />
                                </Grid>
                            )
                        })
                    }

                </Grid>
                <VSpacer space={8} />
            </>
        )
    }


    const products = data ? data['getProducts'] : []
    console.log("profile ", profile)
    const models = CarBrandsAndModels.find(({ brand })=> filters?.brand == brand)?.models || []
    return (
        <>
        
            {/* filters */}
            <Filters
                onClickBrand={onClickBrand}
                onClickModel={onClickModel}
                onClickYear={onClickYear}
                filters={filters}
                models={availableModels}
            />                

            {/* products */}
            <Grid container spacing={1}>

                {
                    products.map((product, index)=> {

                        return (
                            // <Grid key={index} item sm={12} m={4} lg={3}>
                            <Grid key={index} item xs={12} sm={6} lg={4}>
                                <Link href={`products/${product?._id}`}>
                                    <ProductCard product={product} />
                                </Link>
                            </Grid>
                        )
                    })
                }

            </Grid>
            {
                loading &&
                    <>

                        <VSpacer space={2} />

                        <motion.div className='row ma_center'>
                            <CircularProgress />
                        </motion.div>

                        <VSpacer space={2} />

                    </>
            }
            {
                products.length > 0 && <LoadMore loadMore={()=> loadMore(products.length)} />
            }
            <VSpacer space={8} />

        </>
    )
}


export default Shop