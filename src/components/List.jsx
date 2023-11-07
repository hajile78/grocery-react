import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ itemList, editItem, removeItem }) => {
  const header = [
    { amount: "#of", price: "price", tax: "tax", buttons: "Edit/Delete" },
  ];
  return (
    <div className="grocery-list">
      {itemList &&
        header.map((head) => {
          return (
            <article className="grocery-item header">
              <p className="title">{head.amount}</p>
              <p className="title">{head.price}</p>
              <p className="title">{head.tax}</p>
              <div className="btn-container">{head.buttons}</div>
            </article>
          );
        })}
      {itemList &&
        itemList.map((v, id) => {
          return (
            <article className="grocery-item" key={id}>
              <p className="title">{v.amount}</p>
              <p className="title">{v.price}</p>
              <p className="title tax">{v.tax}</p>
              <div className="btn-container">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => editItem(v.id)}
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => removeItem(v.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </article>
          );
        })}
    </div>
  );
};

export default List;
