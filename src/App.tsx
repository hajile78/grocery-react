import React, { useState, useEffect, useRef } from "react";
import Alert from "./components/Alert";
import List from "./components/List";
import calc from "./util/calc/calc";
import "./App.css";
import { itemProps } from "./components/Props";

const getLocalStorage = () => {
  let list = localStorage.getItem("items");
  if (list) {
    return (list = JSON.parse(list));
  } else {
    return [];
  }
};

function App() {
  const [itemList, setItemList] = useState<itemProps[]>(
    getLocalStorage() || []
  );
  const [amount, setAmount] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [addTax, setAddTax] = useState(false);

  const formFocus = useRef();
  const addItem = (price: number, amount: number) => {
    const newItem: itemProps = {
      id: new Date().getTime().toString(),
      price: formatValue(price),
      amount: amount,
      tax: addTax ? calc.calculateTax(price * amount) : 0,
    };
    setItemList([newItem, ...itemList]);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!price || !amount) {
      handleAlert(true, "error", "please enter a value");
    } else if (isEditing) {
      setItemList(
        itemList.map((item) => {
          if (item.id === editId) {
            return {
              ...item,
              price,
              amount,
              tax: addTax ? calc.calculateTax(price * amount) : 0,
            };
          }
          return item;
        })
      );
      setPrice(0);
      setAmount(0);
      setEditId("");
      setIsEditing(false);
      handleAlert(true, "success", "value changed");
    } else {
      addItem(price, amount);
      handleAlert(true, "success", "value added");
    }
    setPrice(0);
    setAmount(0);
    setAddTax(false);
  };

  const formatValue = (value: number) => {
    let fv = value.toString().split(".");
    if (value.toString().indexOf(".") >= 0) {
      if (fv[1].length < 2) {
        return Number(fv[0] + "." + fv[1] + "0");
      } else {
        return value;
      }
    } else {
      return Number(value + ".00");
    }
  };

  const handleAlert = (show = false, type = "", message = "") => {
    setAlert({ show, type, message });
  };

  const clearList = () => {
    handleAlert(true, "danger", "empty list");
    setItemList([]);
  };

  const removeItem = (id: string) => {
    handleAlert(true, "danger", "item removed");
    setItemList(itemList.filter((item) => item.id !== id));
  };

  const editItem = (id: string) => {
    const specificItem = itemList.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setPrice(specificItem ? specificItem.price : 0);
    setAmount(specificItem ? specificItem.amount : 0);
  };

  // const calculateTax = (total: number) => total * 0.075;

  // const calculateTotal = () => {
  //   let total = itemList.reduce((t, item) => {
  //     return t + item.price * item.amount;
  //   }, 0);
  //   let tax = itemList.reduce((tax, item) => {
  //     return tax + parseFloat(item.tax);
  //   }, 0);
  //   let finalTotal = total + tax;
  //   setTotalPrice(`$ ${formatValue(finalTotal)}`);
  // };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(itemList));
    // calc.calculateTotal;
    // formFocus.current.focus();
  }, [itemList, formFocus]);

  return (
    <div className="App">
      <section className="section-center">
        {alert.show && (
          <Alert {...alert} removeAlert={handleAlert} itemList={itemList} />
        )}
        <div className="form-header">
          <h1 className="header-title">Cart Total Estimator</h1>
        </div>
        <form className="grocery-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-control">
            <div className="row">
              <input
                type="number"
                ref={formFocus}
                min="0"
                step="1"
                onInput={e => e.checkValidity()}
                className={`form-control grocery${
                  alert.type === "error" ? " error" : ""
                }`}
                placeholder="# Of e.g. 1"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
              <input
                type="number"
                min="0"
                step="0.01"
                onInput='validity.valid||(value="");'
                className={`form-control grocery${
                  alert.type === "error" ? " error" : ""
                }`}
                placeholder="Price e.g. 1.00"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
            </div>
            <div className="row right">
              <label htmlFor="addTax">Add Tax</label>
              <input
                type="checkbox"
                checked={addTax}
                onChange={(e) => setAddTax(!addTax)}
              />
              <button type="submit" className="submit-btn">
                {isEditing ? "Edit" : "Add"}
              </button>
            </div>
          </div>
        </form>
        <List itemList={itemList} removeItem={removeItem} editItem={editItem} />
        <div className="form-footer">
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
          <div className="grocery-total">Total: {totalPrice}</div>
        </div>
      </section>
      {/* <section className="section-center">
        <Form />
      </section> */}
    </div>
  );
}

export default App;
