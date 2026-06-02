import React from 'react'
// import ElectricBorder from './ElectricBorder'
import SpotlightCard from './SpotlightCard'

function CategoriesCard(props) {
  return (
    //  <ElectricBorder
    //         color={props.color}
    //         speed={props.speed}
    //         chaos={props.chaos}
    //         thickness={props.thickness}
    //         style={{ borderRadius: props.borderRadius }}
    // >

    <SpotlightCard
      className="group flex flex-col md:flex-row gap-10 items-center justify-between  relative overflow-hidden bg-surface-container border border-outline-variant rounded-xl p-4 md:p-6 hover:shadow-xl transition-all duration-300 h-full"
      spotlightColor="rgba(109, 40, 217, 0.15)"
    >
      <div className='flex-1'>
        <span className="material-symbols-outlined text-4xl md:text-[100px] text-secondary mb-6">
          {props.icon}
        </span>
      </div>
      <div className='flex-1'>
        <h3 className="font-headline-md  text-headline-md md:text-[40px] text-primary mb-6">
          {props.title}
        </h3>
        <p className="font-body-sm text-body-sm md:text-[20px] text-on-surface-variant mb-2">
          {props.description}
        </p>
      </div>
      <div className='flex flex-1 justify-end pr-10'>
        <span
          className="inline-flex items-center text-secondary font-label-md text-label-md group-hover:gap-2 transition-all text-[16px] md:text-[20px]"
        >
          Explore{" "}
          <span className="material-symbols-outlined">arrow_forward</span>
        </span>
      </div>
    </SpotlightCard>
    // </ElectricBorder>
  )
}

export default CategoriesCard