"use client"
import Appbar from '@/components/appbar/component'
import Experience from '@/components/experience/component'
import ProductCategories from '@/components/product_categories/component'
import VSpacer from '@/components/v_spacer/component'

export default function Home() {
  
  return (
    <div className='page'>

      {/* appbar */}
      <Appbar />

      {/* experience */}
      <VSpacer space={8} />
      <Experience />
      <VSpacer space={4} />

      {/* product categories */}
      <ProductCategories />
      <VSpacer space={8} />

    </div>
  )
}
