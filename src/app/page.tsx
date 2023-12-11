"use client"
import Appbar from '@/components/appbar/component'
import Experience from '@/components/experience/component'
import ProductCard from '@/components/product_card/component'
import VSpacer from '@/components/v_spacer/component'
import { GetProductsQuery, } from '@/graphql/categories'
import IProduct from '@/models/product'
import { ProfileContext } from '@/providers/profile'
import { containerVariants, itemVariants } from '@/styles/variants'
import { CAR_BRANDS } from '@/utility/constants'
import { CarBrandsAndModels } from '@/utility/form_data'
import { useQuery } from '@apollo/client'
import { Chip, Fab, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { useWindowWidth } from '@react-hook/window-size'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { BsSendFill } from 'react-icons/bs'


type SelectedFilters = {
  brand?: string
  model?: string
  year?: string
}

export default function Home() {
  const width = useWindowWidth()
  const isMobile = width < 840
  
  const { profile, } = useContext(ProfileContext)
  const [filters, setFilters] = useState<SelectedFilters>({  brand: "All", model: null, year: null })
  const [availableModels, setAvailableModels] = useState([])


  // get products
  const { loading, data, error, refetch, } = useQuery(GetProductsQuery)

  console.log("loading, data, error, ", loading, data, error,);
  


  const onClickBrand = (brand: string)=> {

    // check if a
    setFilters((state)=> {

      return { ...state, brand, model: null }
    })

    // if all
    if( brand.toLowerCase() == "all" ) {

      setAvailableModels([])
    } else {

      setAvailableModels(CarBrandsAndModels.filter(({brand})=> brand.toLowerCase() == brand.toLowerCase()))
    }
  }

  const onClickModel = (model: string)=> {

    // check if a
    setFilters((state)=> {

      return { ...state, model, }
    })
  }

  const onClickYear = (year: string)=> {

    // check if a
    setFilters((state)=> {

      return { ...state, year, }
    })
  }

  useEffect(()=> {

    console.log("filters ", filters);

    let queryFilters = {} 

    if( filters?.brand && filters?.brand == "All" ) {

      if( filters?.year ) {

        refetch({ year: filters?.year, })
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

    refetch({ ...queryFilters })
  }, [filters])

  // const products: Array<IProduct> = [
  //   {
  //     name: "Headlight",
  //     years: [ 2020 ],
  //     variants: [
  //       {
  //         price: 56000,
  //         type: "Standard",
  //         image: "/images/texture.jpg",
  //       },
  //     ],
  //     brand: "Toyota",
  //     model: "Camri",
  //   },
  //   {
  //     name: "Headlight",
  //     years: [ 2019, 2020, 2021, 2022, ],
  //     variants: [
  //       {
  //         price: 96000,
  //         type: "Standard",
  //         image: "/images/texture.jpg",
  //       },
  //       {
  //         price: 102000,
  //         type: "Modified",
  //         image: "/images/texture.jpg",
  //       },
  //     ],
  //     brand: "Audi",
  //     model: "Q3",
  //   },
  //   {
  //     name: "Bumper",
  //     years: [ 2019, 2020, 2021, 2022, ],
  //     variants: [
  //       {
  //         price: 96000,
  //         type: "Standard",
  //         image: "/images/texture.jpg",
  //       },
  //       {
  //         price: 102000,
  //         type: "Modified",
  //         image: "/images/texture.jpg",
  //       },
  //     ],
  //     brand: "Audi",
  //     model: "Q3",
  //   },
  //   {
  //     name: "Headlight",
  //     years: [ 2019, 2020, 2021, 2022, ],
  //     variants: [
  //       {
  //         price: 96000,
  //         type: "Standard",
  //         image: "/images/texture.jpg",
  //       },
  //       {
  //         price: 102000,
  //         type: "Modified",
  //         image: "/images/texture.jpg",
  //       },
  //     ],
  //     brand: "Audi",
  //     model: "Q4",
  //   },
  // ]
  

  const products = data ? data['getProducts'] : []
  console.log("profile ", profile)
  const models = CarBrandsAndModels.find(({ brand })=> filters?.brand == brand)?.models || []
  return (
    <div className='page'>

      {/* appbar */}
      <Appbar />

      {/* experience */}
      <VSpacer space={8} />
      <Experience />
      <VSpacer space={4} />

      {/* product categories */}
      {/* <ProductCategories /> */}

      {/* title */}
      <motion.div
          className='row ca_end ma_space_btn'
          variants={containerVariants}
          initial="initial"
          animate="animate"
      >

          {/* title */}
          <motion.p className='title_7' variants={itemVariants}>
            Shop
          </motion.p>

          {/* contact us */}
          <motion.div variants={itemVariants}>
          {/* href='mailto:autospot254@gmail.com' */}
              {/* <Link> */}
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
              {/* </Link> */}
          </motion.div>

      </motion.div>
      <VSpacer space={2} />

      {/* brand filters */}
      <motion.div variants={containerVariants} initial="initial" animate="animate" className='row_wrapped ca_center model_chips_container'>
        {
          [ "All", ...CAR_BRANDS ].map((brand)=> {

            return (
              <motion.div key={brand} variants={itemVariants} onClick={()=> onClickBrand(brand)}>
                <Chip label={brand} color='primary' variant={ filters.brand == brand ? "filled" : "outlined" } />
              </motion.div>
            )
          })
        }
      </motion.div>
      <VSpacer space={2} />

      {/* models and years */}
      {
        filters.brand && filters.brand != "All" &&
          <div className='row ma_end ca_center' style={{ gap: '1rem', }}>

            <select
              className='select'
              value={filters?.model}
              onChange={
                (e)=> onClickModel(e.target?.value)
              }
            >
                {
                  [ "All", ...models, ].map((brand)=> {

                    return (
                      <option key={brand} value={brand}>{brand}</option>
                    )
                  })
                }
            </select>

            <select
              className='select'
              value={filters?.year}
              onChange={
                (e)=> onClickYear(e.target?.value)
              }
            >
              {
                  Array.from({ length: 15 }, (_, i)=> (new Date()).getFullYear() - i).map((yr)=> {

                    return <option key={yr} value={yr}>{yr}</option>
                  })
              }
            </select>

        </div>
      }
      <VSpacer space={2} />

      <Grid container spacing={1}>

        {
          products.map((product, index)=> {

            return (
              // <Grid key={index} item sm={12} m={4} lg={3}>
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Link href={`products/${product?._id}`}>
                  <ProductCard product={product} />
                </Link>
              </Grid>
            )
          })
        }

      </Grid>
      <VSpacer space={8} />

    </div>
  )
}
