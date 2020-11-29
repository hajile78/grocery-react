import React, { useState, useEffect } from 'react'
import Alert from './components/Alert'
import List from './components/List'
import './App.css'

const getLocalStorage = () => {
  let list = localStorage.getItem('items')
  if (list) {
    return (list = JSON.parse(list))
  } else {
    return []
  }
}

function App() {
  const [itemList, setItemList] = useState(getLocalStorage() || [])
  const [ammount, setAmmount] = useState(null)
  const [price, setPrice] = useState(null)
  const [alert, setAlert] = useState({ show: false, message: '', type: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [totalPrice, setTotalPrice] = useState(null)

  const addItem = (price, ammount) => {
    const newItem = { id: new Date().getTime().toString(), price: formatValue(price), ammount: ammount, tax: calculateTax(price * ammount).toFixed(2) }
    setItemList([newItem, ...itemList])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!price || !ammount) {
      handleAlert(true, 'error', 'please enter a value')
    } else if (isEditing) {
      setItemList(
        itemList.map((item) => {
          if (item.id === editId) {
            return { ...item, price, ammount, tax: calculateTax(price * ammount).toFixed(2) }
          }
          return item
        })
      )
      setPrice('')
      setAmmount('')
      setEditId(null)
      setIsEditing(false)
      handleAlert(true, 'success', 'value changed')
    } else {
      addItem(price, ammount)
      handleAlert(true, 'success', 'value added')
    }
    setPrice('')
    setAmmount('')
  }

  const formatValue = (value) => {
    let fv = value.toString().split('.')
    if (value.toString().indexOf('.') >= 0) {
      if (fv[1].length < 2) {
        return fv[0] + '.' + fv[1] + '0'
      } else {
        return parseFloat(value).toFixed(2).toString()
      }
    } else {
      return value += '.00'
    }
  }

  const handleAlert = (show = false, type = '', message = '') => {
    setAlert({ show, type, message })
  }

  const clearList = () => {
    handleAlert(true, 'danger', 'empty list')
    setItemList([])
  }

  const removeItem = (id) => {
    handleAlert(true, 'danger', 'item removed')
    setItemList(itemList.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = itemList.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setPrice(specificItem.price)
    setAmmount(specificItem.ammount)
  }

  const calculateTax = (total) => total * .075

  const calculateTotal = () => {
    let total = itemList.reduce((total, item) => {
      return total + parseFloat(item.price * item.ammount)
    }, 0)
    total += calculateTax(total)
    setTotalPrice(`$ ${formatValue(total.toFixed(2))}`)
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(itemList))
    calculateTotal()
  }, [itemList])

  return (
    <div className='App'>
      <section className='section-center'>
        {alert.show && <Alert {...alert} removeAlert={handleAlert} itemList={itemList} />}
        <div className='form-header'>
          <h3>Grocery list Calculator</h3>
          <span className='grocery-total'>Total: {totalPrice}</span>
        </div>
        <form className='grocery-form' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-control'>
            <input type='number' className={`form-control grocery${alert.type === 'error' ? ' error' : ''}`} placeholder='Ammount e.g. 1' value={ammount} onChange={(e) => setAmmount(e.target.value)} />
            <input type='text' className={`form-control grocery${alert.type === 'error' ? ' error' : ''}`} placeholder='Price e.g. 1.00' value={price} onChange={(e) => setPrice(e.target.value)} />
            <button type='submit' className='submit-btn'>{isEditing ? 'Edit' : 'Add'}</button>
          </div>
        </form>
        <List itemList={itemList} removeItem={removeItem} editItem={editItem} />
        <button className='clear-btn' onClick={clearList}>
          clear items
        </button>
      </section>
    </div>
  )
}

export default App
