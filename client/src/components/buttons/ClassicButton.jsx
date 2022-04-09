import React from 'react'
import './button.css'
import { Spinner } from 'reactstrap'

export default function ClassicButton({
  onClick,
  children,
  className,
  loading,
}) {
  return (
    <div onClick={onClick} className={`classicButtonWrapper ${className}`}>
      {loading ? <Spinner /> : children}
    </div>
  )
}
