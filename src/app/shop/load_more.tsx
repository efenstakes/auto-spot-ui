import { useInView } from 'framer-motion'
import React, { useEffect, useRef } from 'react'


// styles
import "./load_more.scss"

type Props = {
    loadMore?: ()=> void
}
const LoadMore = ({ loadMore, }: Props) => {
    const ref = useRef(null)
    const isInView = useInView(ref)

    useEffect(()=> {

        if( isInView ) loadMore()

    }, [ isInView ])

    return (
        <div ref={ref} className='load_more_products' />
    )
}

export default LoadMore