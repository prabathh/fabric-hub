import React from 'react';
import { OrderItem } from "@/types/order";

const formatCurrency = (amount: number) => `Rs ${amount.toLocaleString()}.00`;

export const useOrderCalculations = (items: OrderItem[], shipping: number) => {

  const subtotal = React.useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [items]);

  const total = React.useMemo(() => {
    return subtotal + shipping;
  }, [subtotal, shipping]);

  const formattedSubtotal = React.useMemo(() => formatCurrency(subtotal), [subtotal]);
  const formattedShipping = React.useMemo(() => formatCurrency(shipping), [shipping]);
  const formattedTotal = React.useMemo(() => formatCurrency(total), [total]);

  return {
    subtotal,
    total,
    formattedSubtotal,
    formattedShipping,
    formattedTotal,
    formatCurrency,
  };
};