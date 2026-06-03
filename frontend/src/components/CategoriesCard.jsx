import React from 'react'
import SpotlightCard from './SpotlightCard'

function CategoriesCard(props) {
  return (
    <SpotlightCard
      className="group flex flex-col md:flex-row gap-10 items-center justify-between relative overflow-hidden bg-primary border border-primary-container/20 rounded-xl p-4 md:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
      spotlightColor="rgba(153, 246, 228, 0.2)"
    >
      <div className='flex-1'>
        <span className="material-symbols-outlined text-4xl md:text-[100px] text-tertiary-fixed mb-6 group-hover:scale-110 transition-transform duration-300">
          {props.icon}
        </span>
      </div>
      <div className='flex-1'>
        <h3 className="font-headline-md text-headline-md md:text-[40px] text-on-primary mb-6">
          {props.title}
        </h3>
        <p className="font-body-sm text-body-sm md:text-[20px] text-primary-container mb-2">
          {props.description}
        </p>
      </div>
      <div className='flex flex-1 justify-end pr-10'>
        <span
          className="inline-flex items-center text-tertiary-fixed font-label-md text-label-md group-hover:gap-3 transition-all text-[16px] md:text-[20px]"
        >
          Explore{" "}
          <span className="material-symbols-outlined">arrow_forward</span>
        </span>
      </div>
    </SpotlightCard>
  )
}

export default CategoriesCard