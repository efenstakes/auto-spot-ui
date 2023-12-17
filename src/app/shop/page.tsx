"use client"
import React from 'react'


// styles
import "./page.scss"

// components
import Appbar from '@/components/appbar/component'
import Shop from './shop'
import VSpacer from '@/components/v_spacer/component'

const ShopPage = () => {
    return (
        <div className='page'>

            {/* appbar */}
            <Appbar />
            <VSpacer space={8} />

            <Shop />

        </div>
    )
}

export default ShopPage