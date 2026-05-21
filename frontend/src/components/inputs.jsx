import React from 'react'
import { motion } from 'framer-motion'

function Input(props) {
  return (
    <motion.input 
      whileFocus={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} name={props.name} className={props.className} readOnly={props.readOnly} {...props} />
  )
}

export default Input;