



export const containerVariants = {
    initial: {
        scale: .8,
        opacity: 0,
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            when: "beforeChildren",
            delay: .1,
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        scale: .8,
    }
}

export const itemVariants = {
    initial: {
        y: 120,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            when: "beforeChildren",
            delay: .1,
            staggerChildren: 0.1,
        },
    },
}

export const bouncingItemVariants = {
    initial: {
        y: 60,
    },
    animate: {
        y: 0,
        transition: {
            repeat: Infinity,
            delay: .2
        },
    },
}


export const logoContainerVariants = {
    initial: {
        // scale: .6,
        opacity: 0,
    },
    animate: {
        // scale: .72,
        opacity: 1,
        transition: {
            when: "beforeChildren",
            delay: 1,
            staggerChildren: 0.2,
        },
    },
    exit: {
        opacity: 0,
        // scale: .6,
    }
}


export const logoVariants = {
    initial: {
        strokeDashoffset: 1,
        fill: 'none',
        // y: 120,
    },
    animate: {
        // y: 0,
        strokeDashoffset: 0,
        // fill: 'white',
        transition: {
            delay: .5,
        }
    },
}
