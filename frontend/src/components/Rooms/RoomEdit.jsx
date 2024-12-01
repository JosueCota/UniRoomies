import React from 'react'
import BrandHeader from '../NavsHeaders/BrandHeader'
import RoomBasicInfo from './RoomBasicInfo'
import RoomOptionals from './RoomOptionals'

const RoomEdit = ({ userDetails, refetch }) => {
  return (
    <div style={{width:"100%"}}>
        <BrandHeader/>

        <RoomBasicInfo/>
        <RoomOptionals/>
    </div>
  )
}

export default RoomEdit
