import { usePaystackPayment } from "react-paystack";

export const MakePayment = (transactionPay) => {
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(transactionPay);

  initializePayment(onSuccess, onClose);
};
