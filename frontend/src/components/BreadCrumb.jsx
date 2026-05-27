import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
 
function BreadCrumb() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2 text-on-surface-variant font-label-md text-label-md"
        >
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-primary font-bold">Products</span>
        </motion.nav>
    )
}

export default BreadCrumb