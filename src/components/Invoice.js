import React, { useState, useEffect } from "react";
import { Terms } from "./Terms";
import { LineItems } from "./LineItems";
import { Total } from "./Total";
import { SuccessModal } from "./SuccessModal";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import MockApiData from "/Mock-Data/api-company-preference.json";
import { useInvoiceContext } from "/src/contexts/InvoiceContext";
import { CheckIcon, CircleInterfaceIcon } from "/src/assets/assets";

const Invoice = () => {
  const {
    inputs,
    isPercentage,
    term,
    startDate,
    setDefaultTerm,
    openModal,
    setOpenModal,
    isSaved,
    setIsSaved,
  } = useInvoiceContext();
  useEffect(() => {
    setDefaultTerm(MockApiData["default-net-terms"]);
  }, [setDefaultTerm]);
  const {
    getValues,
    handleSubmit: validateFields,
    formState: { errors },
  } = useFormContext();
  const [savedInvoice, setSavedInvoice] = useState({
    line_items: [],
    discount_percentage: null,
    discount_type: "",
    discount_amount: 0,
    shipping_amount: 0,
    tax_amount: 0,
    payment_terms: 0,
    due_date: null,
  });

  const handleSave = () => {
    //Form data pulled in via getValues method, state stored in context pulled in and evaluated. All data packaged into final payload for delivery
    const payload = {
      line_items: getValues("lineItems").map((item) => ({
        ...item,
        quantity: parseFloat(item.quantity),
        unit_price: parseFloat(item.unit_price),
      })),
      discount_percentage: isPercentage ? inputs.discount / 100 : null,
      discount_type: isPercentage ? "percent" : "dollar",
      discount_amount: isPercentage ? null : inputs.discount,
      shipping_amount: inputs.shipping,
      tax_amount: inputs.tax,
      payment_terms: startDate ? null : parseFloat(term),
      due_date: startDate ? startDate : null,
    };
    console.log("Final payload: ", payload);
    setSavedInvoice(payload);
    setIsSaved(true);
    setOpenModal(true);
  };
  return (
    <Body>
      <form onSubmit={validateFields(handleSave)}>
        <Header>
          <h2>New draft</h2>
          <div>{isSaved ? "SAVED" : "UNSAVED"}</div>
          <SaveButton type="submit">
            <CheckIcon />
            Save
          </SaveButton>
        </Header>
        {errors.lineItems && (
          <ErrorToast>
            <IconContainer>
              <CircleInterfaceIcon />
            </IconContainer>
            {`Form contains error(s). Please correct them and try again.`}
          </ErrorToast>
        )}
        <Terms />
        <LowerBody>
          <LineItems />
          <Total />
        </LowerBody>
      </form>
      {openModal && <SuccessModal />}
    </Body>
  );
};

const Body = styled.div`
  margin: auto;
  width: 550px;
  font-family: "CalibreRegular";
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  margin-bottom: 10px;
  div {
    margin-left: 10px;
    background: #ededed;
    border-radius: 4px;
    font-size: 10px;
    width: 60px;
    height: 20px;
    text-align: center;
    line-height: 20px;
  }
`;

const SaveButton = styled.button`
  margin-left: auto;
  background: #f2d44b;
  border: none;
  border-radius: 2px;
  height: 32px;
  font-size: 12px;
  width: 65px;
  svg {
    margin-right: 5px;
    height: 10px;
    width: 10px;
  }
`;

const LowerBody = styled.div`
  border: 1px solid lightgrey;
  border-radius: 6px;
  box-shadow: 2px 4px 3px #ededed;
  margin-top: 15px;
  position: relative;
`;

const ErrorToast = styled.div`
  margin: auto;
  margin-bottom: 15px;
  width: 539px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  border-left: 10px solid red;
  box-shadow: 0px 3px 3px #ededed;
  border-radius: 3px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  display: flex;
`;

const IconContainer = styled.div`
  color: red;
  line-height: 50px;
  display: flex;
  align-items: center;
  margin: 0px 10px;
  svg {
    height: 25px;
    width: 25px;
  }
`;

export { Invoice };
