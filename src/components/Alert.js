import React, { useEffect } from 'react'

const Alert = ({ type, message, removeAlert, itemList }) => {
  useEffect(() => {
    const timeout = setTimeout(() => { removeAlert() }, 2500)
    return () => clearTimeout(timeout)
  }, [itemList])
  return <p className={`alert alert-${type}`}>{message}</p>
}

export default Alert
