import Item from './Item';

const calculateTax = (total: number) => total * 0.075;

const formatValue = (value: number) => {
    let fv: string[] = value.toString().split(".");
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

const calculateTotal = (itemList: Item[]) => {
    let total: number = itemList.reduce((t: number, item: Item) => {
        return t + item.price * item.amount;
    }, 0);
    let tax: number = itemList.reduce((tax: number, item: Item) => {
        return tax + item.tax;
    }, 0);
    let finalTotal: number = total + tax;
    return `$ ${formatValue(finalTotal)}`;
};

export default {calculateTotal, calculateTax}