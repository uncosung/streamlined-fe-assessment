import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useInvoiceContext } from "/src/contexts/InvoiceContext";
import styled from "styled-components";

const Total = () => {
  const { inputs, setInputs, isPercentage, setIsPercentage } =
    useInvoiceContext();
  const { watch } = useFormContext();
  const allLineItems = watch("lineItems");
  const formTotal = watch("total");
  const [subtotal, setSubtotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    //Checks for updates on all singleLineItems. If user goes back and adds new items, subtotal is updated as well
    const items = watch((value) => {
      let tempSubtotal = 0;
      value?.lineItems.forEach((item) => {
        tempSubtotal += item.unit_price * item.quantity;
      });
      setSubtotal(tempSubtotal);
    });
  }, [allLineItems, watch]);
  const handleChange = (event) => {
    setInputs((previousInputs) => ({
      ...previousInputs,
      [event.target.name]: Number(event.target.value),
    }));
  };

  const handleClick = () => {
    setIsOpen(true);
  };
  const validateInput = (event) => {
    //prevents user from entering negative numbers or operators
    if (event.which < 46 || event.which === 47 || event.which > 57) {
      event.preventDefault();
    }
  };
  const total = subtotal - (isPercentage ? (subtotal * inputs.discount) / 100 : inputs.discount) + inputs.shipping + inputs.tax;
  return (
    <TotalBody>
      <SubtotalContainer>
        <span>Subtotal</span>
        <span>
          {subtotal.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </SubtotalContainer>
      {!isOpen && (
        <ButtonContainer>
          {/* Buttons all have same event handler - confusion on wireframe, Discount, Shipping, and Tax all look like buttons, reasonable to assume they would all open the same view */}
          <div>
            <button onClick={handleClick}>Add discount</button>
          </div>
          <div>
            <button onClick={handleClick}>Add Shipping</button>
          </div>
          <div>
            <button onClick={handleClick}>Add tax</button>
          </div>
        </ButtonContainer>
      )}
      {isOpen && (
        <InputContainer>
          <DiscountContainer>
            <span>Discount</span>
            <PercentageContainer>
              <button
                type="button"
                className={isPercentage ? "notActive" : "active"}
                onClick={() => {
                  setIsPercentage(false);
                }}
              >
                $
              </button>
              <button
                type="button"
                className={isPercentage ? "active" : "notActive"}
                onClick={() => {
                  setIsPercentage(true);
                }}
              >
                %
              </button>
            </PercentageContainer>
            <DiscountInputContainer>
              {/* Absolute positioned labels used to preface or follow up input fields with $ or % symbols. See styled components below for context*/}
              {!isPercentage && (
                <DollarLabel className="dollarDiscount">$</DollarLabel>
              )}
              <input
                type="number"
                name="discount"
                value={inputs.discount ? inputs.discount : ''}
                placeholder={"0.00"}
                onChange={handleChange}
                onFocus={(event) => event.target.select()}
                className={isPercentage ? "percentTrue" : ""}
                onKeyPress={validateInput}
              />
              {isPercentage && <PercentLabel>%</PercentLabel>}
            </DiscountInputContainer>
          </DiscountContainer>
          <ShippingAndTaxContainer>
            <span>Shipping</span>
            <span>
              <DollarLabel>$</DollarLabel>
              <input
                type="number"
                name="shipping"
                value={inputs.shipping ? inputs.shipping : ""}
                placeholder={"0.00"}
                onChange={handleChange}
                onFocus={(event) => event.target.select()}
                onKeyPress={validateInput}
              />
            </span>
          </ShippingAndTaxContainer>
          <ShippingAndTaxContainer>
            <span>Tax</span>
            <span>
              <DollarLabel>$</DollarLabel>
              <input
                type="number"
                name="tax"
                value={inputs.tax ? inputs.tax : ""}
                placeholder={"0.00"}
                onChange={handleChange}
                onFocus={(event) => event.target.select()}
                onKeyPress={validateInput}
              />
            </span>
          </ShippingAndTaxContainer>
        </InputContainer>
      )}
      <TotalContainer>
        <span>Total</span>
        <span>
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </TotalContainer>
    </TotalBody>
  );
};

const TotalBody = styled.div`
  text-align: right;
  width: 180px;
  margin: 30px 25px 30px auto;
  font-size: 12px;
`;

const SubtotalContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  span:first-child {
    font-weight: bold;
    float: left;
  }
  span:nth-child(2) {
    width: 60px;
    margin-left: 60px;
  }
`;
const ButtonContainer = styled.div`
  button {
    font-size: 12px;
    text-align: right;
    background: transparent;
    border: none;
    padding: 0px;
    margin-bottom: 10px;
    border-bottom: 1px solid #4bbdf2;
    color: #4bbdf2;
    cursor: pointer;
    display: inline-block;
  }
`;

const TotalContainer = styled.div`
  padding-top: 7px;
  margin-top: 5px;
  border-top: 2px solid #f2d44b;
  display: flex;
  justify-content: flex-end;
  span:first-child {
    font-weight: bold;
    text-align: right;
  }
  span:nth-child(2) {
    width: 60px;
    margin-left: 60px;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input {
    text-align: right;
    font-family: CalibreRegular;
  }
`;

const DollarLabel = styled.label`
  width: 5px;
  position: absolute;
  left: 67px;
  top: 5px;
`;

const PercentLabel = styled.label`
  position: absolute;
  right: 7px;
  top: 5px;
`;
const DiscountContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
    width: 50px;
    height: 20px;
    margin-left: 10px;
  }
  button {
    width: 20px;
    padding: 0px;
    border: none;
    font-size: 12px;
    height: 25px;
    cursor: pointer;
  }
  .active {
    background: #f2d44b;
  }
  .notActive {
    background: #ededed;
  }
  span {
    font-weight: bold;
  }
  .dollarDiscount {
    width: 5px;
    position: absolute;
    left: 16px;
    top: 5px;
  }
  .percentTrue {
    padding-right: 15px;
    width: 38px;
  }
`;

const DiscountInputContainer = styled.div`
  position: relative;
`;

const PercentageContainer = styled.div`
  margin-left: 10px;
`;

const ShippingAndTaxContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
    width: 50px;
    height: 20px;
    margin-left: 60px;
  }
  span:nth-child(2) {
    position: relative;
    label {
      width: 5px;
      position: absolute;
      left: 67px;
      top: 5px;
    }
  }
  span {
    font-weight: bold;
  }
`;

export { Total };
