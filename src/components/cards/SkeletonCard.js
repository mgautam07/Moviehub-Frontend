import React from 'react'
import Shimmer from './Shimmer'
import './card.css'

function SkeletonCard() {
  return (
    <div className='skeleton-wrapper'>
      <div className='skeleton'>
        <div className='skeleton-image'></div>
        <div className='skeleton-title'></div>
        <div className='skeleton-date'></div>
      </div>
      <Shimmer />
    </div>
    
  )
}

export default SkeletonCard