import { Grid } from '@mui/material'
import React from 'react'

// components
import AboutCard from './about_card'

const AboutProducts = () => {
    const info = [
        {
            title: "Brand New",
            text: "Our products are quality, Our products are quality.",
        },
        {
            title: "Quality",
            text: "Our products are quality, Our products are quality.",
        },
        {
            title: "Affordable",
            text: "Our products are quality, Our products are quality, Our products are quality.",
        },
    ]
    return (
        <div>
            
            <Grid container spacing={1}>

                {
                    info.map(({ title, text, }, index)=> {

                        return (
                            <Grid key={index} item xs={12} sm={4} lg={3}>
                                <AboutCard title={title} text={text} />
                            </Grid>
                        )
                    })
                }

            </Grid>

        </div>
    )
}

export default AboutProducts