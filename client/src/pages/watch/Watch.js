import React from 'react'
import './watch.scss'
import {ArrowBackOutlined} from '@mui/icons-material'

const Watch = () => {
  return (
    <div className='watch'>
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      <video autoPlay="autoPlay" progress controls src="https://ak.picdn.net/shutterstock/videos/1068208955/preview/stock-footage-top-down-aerial-of-cars-drive-at-cross-road-nobody-cityscape-traffic-highway-transportation.webm" className="video" />
    </div>
  )
}

export default Watch