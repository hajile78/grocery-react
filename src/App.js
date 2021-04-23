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
  const [amount, setAmount] = useState(null)
  const [price, setPrice] = useState(null)
  const [alert, setAlert] = useState({ show: false, message: '', type: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [totalPrice, setTotalPrice] = useState(null)
  const [addTax, setAddTax] = useState(false)

  const addItem = (price, amount) => {
    const newItem = { id: new Date().getTime().toString(), price: formatValue(price), amount: amount, tax: addTax ? calculateTax(price * amount).toFixed(2) : 0 }
    setItemList([newItem, ...itemList])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!price || !amount) {
      handleAlert(true, 'error', 'please enter a value')
    } else if (isEditing) {
      setItemList(
        itemList.map((item) => {
          if (item.id === editId) {
            return { ...item, price, amount, tax: addTax ? calculateTax(price * amount).toFixed(2) : '0'.toFixed(2) }
          }
          return item
        })
      )
      setPrice('')
      setAmount('')
      setEditId(null)
      setIsEditing(false)
      handleAlert(true, 'success', 'value changed')
    } else {
      addItem(price, amount)
      handleAlert(true, 'success', 'value added')
    }
    setPrice('')
    setAmount('')
    setAddTax(false)
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
    setAmount(specificItem.amount)
  }

  const calculateTax = (total) => total * .075

  const calculateTotal = () => {
    let total = itemList.reduce((t, item) => {
      return t + parseFloat(item.price * item.amount)
    }, 0)
    let tax = itemList.reduce((tax, item) => {
      return tax + item.tax
    }, 0)
    let finalTotal = parseFloat(total) + parseFloat(tax)
    setTotalPrice(`$ ${formatValue(finalTotal.toFixed(2))}`)
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

        </div>
        <form className='grocery-form' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-control'>
            <div className='row'>
              <input type='number' min='0' step='1' oninput='validity.valid||(value="");' className={`form-control grocery${alert.type === 'error' ? ' error' : ''}`} placeholder='# Of e.g. 1' value={amount} onChange={(e) => setAmount(e.target.value)} />
              <input type='number' min='0' step='0.01' oninput='validity.valid||(value="");' className={`form-control grocery${alert.type === 'error' ? ' error' : ''}`} placeholder='Price e.g. 1.00' value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className='row right'>
              <label htmlFor='addTax'>Add Tax</label>
              <input type='checkbox' checked={addTax} onChange={(e) => setAddTax(!addTax)} />
              <button type='submit' className='submit-btn'>{isEditing ? 'Edit' : 'Add'}</button>
            </div>
          </div>
        </form>
        <List itemList={itemList} removeItem={removeItem} editItem={editItem} />
        <div className='form-footer'>
          <button className='clear-btn' onClick={clearList}>
            clear items
        </button>
          <div className='grocery-total'>Total: {totalPrice}</div>
        </div>
      </section>
    </div>
  )
}

export default App
