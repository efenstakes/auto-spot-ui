"use client"

// components
import Appbar from '@/components/appbar/component'
import Experience from '@/components/experience/component'
import VSpacer from '@/components/v_spacer/component'
import Shop from './shop/shop'


export default function Home() {
  
  return (
    <div className='page'>

      {/* appbar */}
      <Appbar />

      {/* experience */}
      <VSpacer space={8} />
      <Experience />
      <VSpacer space={4} />

      <Shop />

    </div>
  )
}
