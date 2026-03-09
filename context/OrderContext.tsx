import React, { createContext, ReactNode, useContext, useState } from "react";

export interface Order {
  id: string;
  title: string;
  dateTitle: string;
  date: string;
  image: any;
  type: string;
}

const initialOrders: Order[] = [
  {
    id: "BEOS203981",
    title: "Alloy Wheels 16 Inches\nfor KIA EV6",
    dateTitle: "Expected Delivery",
    date: "20th November",
    image: require("../assets/images/order/wheel.png"),
    type: "ACCESSORIES",
  },
  {
    id: "BEOSCB8912",
    title: "KIA EV6 GT Line - Test Drive\nSusheel Motors - Whitefield",
    dateTitle: "Scheduled on",
    date: "18th November",
    image: require("../assets/images/brand-varients/blue-car.png"),
    type: "VEHICLE BOOKING",
  },
  {
    id: "BEOS091234",
    title: "Subway Charging Station\nDuration : 1hr 30min",
    dateTitle: "Delivered on",
    date: "17th November",
    image: require("../assets/images/ev-network/stations.jpg"),
    type: "CHARGING",
  },
];

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
