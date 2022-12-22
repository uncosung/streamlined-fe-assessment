import React, { useState } from "react";

const InvoiceContext = React.createContext(null);

const InvoiceProvider = (props) => {
  const [inputs, setInputs] = useState({
    discount: 0,
    shipping: 0,
    tax: 0,
  });
  const [isPercentage, setIsPercentage] = useState(false);
  const [term, setTerm] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [defaultTerm, setDefaultTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <InvoiceContext.Provider
      value={{
        inputs,
        setInputs,
        isPercentage,
        setIsPercentage,
        term,
        setTerm,
        isCustom,
        setIsCustom,
        startDate,
        setStartDate,
        defaultTerm,
        setDefaultTerm,
        openModal,
        setOpenModal,
        isSaved,
        setIsSaved,
      }}
    >
      {props.children}
    </InvoiceContext.Provider>
  );
};

const useInvoiceContext = () => {
  const context = React.useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoiceContext must be used within a provider");
  }
  return context;
};

export { InvoiceProvider, useInvoiceContext };
