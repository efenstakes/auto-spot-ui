import VSpacer from '@/components/v_spacer/component'
import { ISelectedFilters } from '@/models/filters'
import { containerVariants, itemFadeInVariants, itemVariants } from '@/styles/variants'
import { CAR_BRANDS } from '@/utility/constants'
import { CarBrandsAndModels } from '@/utility/form_data'
import { Chip, Drawer, Fab } from '@mui/material'
import { useWindowWidth } from '@react-hook/window-size'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { BsSendFill } from 'react-icons/bs'
import DrawerFilters from './drawer_filters'


type Props = {
    onClickYear: (yr)=> void
    onClickBrand: (br)=> void
    onClickModel: (md)=> void
    filters: ISelectedFilters
    models: Array<string>
}
const Filters = ({  onClickYear, onClickBrand, onClickModel, filters, models, }: Props) => {
    const width = useWindowWidth()
    const isMobile = width < 840

    const [showDrawer, setShowDrawer] = useState(false)

    // const models = CarBrandsAndModels.find(({ brand })=> filters?.brand == brand)?.models || []
    
    if( isMobile ) {

        return (
            <>
                
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
                            onClick={()=> setShowDrawer(true)}
                        >
                            Filter
                        </Fab>
                    </motion.div>

                </motion.div>
                <VSpacer space={2} />

                {
                    showDrawer &&
                        <Drawer
                            anchor={'bottom'}
                            open={showDrawer}
                            onClose={()=> setShowDrawer(false)}
                        >
                            <DrawerFilters
                                close={() => setShowDrawer(false)}
                                onClickYear={onClickYear}
                                onClickBrand={onClickBrand}
                                onClickModel={onClickModel}
                                filters={filters}
                                models={models}
                            />
                        </Drawer>
                }

            </>
        )
    }
    return (
        <>
        
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
                    <motion.div key={brand} variants={itemFadeInVariants} onClick={()=> onClickBrand(brand)}>
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
            
        </>
    )
}

export default Filters