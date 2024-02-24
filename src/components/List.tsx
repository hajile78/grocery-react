import { FaEdit, FaTrash } from "react-icons/fa";
import { Props } from "./Props";

export type headerProps = {
  id: string;
  amount: string;
  price: string;
  tax: string;
  buttons: string;
};

const List = ({ itemList, editItem, removeItem }: Props) => {
  const header: headerProps[] = [
    {
      id: "0",
      amount: "#of",
      price: "price",
      tax: "tax",
      buttons: "Edit/Delete",
    },
  ];

  const formatValue = (value: number) => {
    let fv = value.toString().split(".");
    if (value.toString().indexOf(".") >= 0) {
      if (fv[1].length < 2) {
        return fv[0] + "." + fv[1] + "0";
      } else {
        return value;
      }
    } else {
      return value + ".00";
    }
  };

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
              <p className="title">{formatValue(v.amount)}</p>
              <p className="title">${formatValue(v.price)}</p>
              <p className="title tax">${formatValue(v.tax)}</p>
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
