import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({ itemList, editItem, removeItem }) => {
  return (
    <div className="grocery-list">
      {itemList && itemList.map((v, id) => {
        return (
          <article className='grocery-item' key={id}>
            <p className='title'>{v.ammount}</p>
            <p className='title'>{v.price}</p>
            <p className='title tax'>{v.tax}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(v.id)}
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(v.id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List