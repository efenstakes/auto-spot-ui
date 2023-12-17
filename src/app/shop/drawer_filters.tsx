import { motion } from 'framer-motion'
import React from 'react'


// models
import { ISelectedFilters } from '@/models/filters'
import { containerVariants, itemFadeInVariants, itemVariants } from '@/styles/variants'
import { CAR_BRANDS } from '@/utility/constants'
import { Button, Chip } from '@mui/material'
import VSpacer from '@/components/v_spacer/component'


type Props = {
    onClickYear: (yr)=> void
    onClickBrand: (br)=> void
    onClickModel: (md)=> void
    filters: ISelectedFilters
    models: Array<string>
    close: ()=> void
}
const DrawerFilters = ({ onClickYear, onClickBrand, onClickModel, filters, models, close, }: Props) => {
    return (
        <motion.div
            animate='animate'
            initial='initial'
            className='drawer_container'
        >
            
            {/* brands */}
            <motion.p variants={itemVariants} className='text_center title_5'>
                Filter
            </motion.p>

            {/* brands */}
            <motion.p variants={itemVariants} className='text_center title_7'>
                Select Brand
            </motion.p>
            <VSpacer space={.5} />

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

            {/* models */}
            {
                filters.brand && filters.brand != "All" &&
                    <>
                        <motion.div variants={containerVariants} initial="initial" animate="animate" className='row_wrapped ca_center model_chips_container'>
                            {
                                [ "All", ...models ].map((model)=> {
                
                                    return (
                                        <motion.div key={model} variants={itemFadeInVariants} onClick={()=> onClickModel(model)}>
                                            <Chip label={model} color='primary' variant={ filters.model == model ? "filled" : "outlined" } />
                                        </motion.div>
                                    )
                                })
                            }
                        </motion.div>
                        <VSpacer space={2} />
                    </>
            }

            {/* years */}
            {
                filters.brand && filters.brand != "All" &&
                    <>
                        <motion.div variants={containerVariants} initial="initial" animate="animate" className='row_wrapped ca_center model_chips_container'>
                            {
                                Array.from({ length: 15 }, (_, i)=> (new Date()).getFullYear() - i).map((year)=> {
                
                                    return (
                                        <motion.div key={year} variants={itemFadeInVariants} onClick={()=> onClickYear(year.toString())}>
                                            <Chip label={year} color='primary' variant={ filters?.year == year.toString() ? "filled" : "outlined" } />
                                        </motion.div>
                                    )
                                })
                            }
                        </motion.div>
                        <VSpacer space={2} />
                    </>
            }
            <VSpacer space={2} />

            <Button onClick={close} fullWidth variant='contained' style={{ textTransform: 'none', }}>
                Filter
            </Button>
            
        </motion.div>
    )
}

export default DrawerFilters