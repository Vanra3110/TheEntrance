import React from 'react'
import { motion } from 'framer-motion'

const Button = (props) => {
  return (
    <div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={props.className} type={props.type} onClick={props.onClick} >
            <span className={props.textClassName}>{props.text}</span>
            <span className="material-symbols-outlined text-[18px]">{props.icon}</span>
        </motion.button>

    </div>
  )
}

export default Button