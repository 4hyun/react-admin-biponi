import { SvgIcon, SvgIconProps } from '@mui/material'
import React from 'react'

const FacebookFilled = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="15" fill="#3B5998" />
      <path
        d="M12.7208 22H15.5937V16.098H18.1823L18.4667 13.1651H15.5937V11.6842C15.5937 11.2773 15.9153 10.9474 16.312 10.9474H18.4667V8H16.312C14.3286 8 12.7208 9.64948 12.7208 11.6842V13.1651H11.2843L11 16.098H12.7208V22Z"
        fill="white"
      />
    </SvgIcon>
  )
}

export default FacebookFilled
