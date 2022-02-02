import React, { useEffect } from 'react'
import { itemProps } from "./Props"

type Props = {
  type: string,
  message: string,
  removeAlert: () => void,
  itemList: itemProps[];
}

const Alert = ({ type, message, removeAlert, itemList }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(() => { removeAlert() }, 2500)
    return () => clearTimeout(timeout)
  }, [itemList])
  return <p className={`alert alert-${type}`}>{message}</p>
}

export default Alert
