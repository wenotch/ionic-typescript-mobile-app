import { useEffect } from "hoist-non-react-statics/node_modules/@types/react";
import React from "react";
import { usePaystackPayment } from "react-paystack";
const CallPaystack: React.FC = ({ config }: any) => {
  const initializePayment = usePaystackPayment(config);
  const onSuccess = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  useEffect(() => {
    initializePayment(onSuccess, onClose);
  });
  return <div></div>;
};

export default CallPaystack;
