export type Props = {
  itemList: itemProps[];
  editItem: (id: string) => void;
  removeItem: (id: string) => void;
};
export type itemProps = {
  id: string;
  amount: number;
  price: number;
  tax: number;
};
