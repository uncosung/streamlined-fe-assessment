import React from "react";
import { useFormContext } from "react-hook-form";
import { CloseIcon } from "/src/assets/assets";
import styled from "styled-components";

const SingleLineItem = ({ index, removeLine, lineToRemove }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  //useFormContext hook provides access to all methos in FormProvider. register method allows inputs to be tagged with names. User inputs then tracked and updated in form data. Can be accessed from any component within provider via getValues method
  const quantity = watch(`lineItems[${index}].quantity`);
  const unit_price = watch(`lineItems[${index}].unit_price`);
  const validateInput = (event) => {
    //prevents user from entering negative numbers or operators
    if (event.which < 46 || event.which === 47 || event.which > 57) {
      event.preventDefault();
    }
  };

  return (
    <LineItemRow className={errors.lineItems?.[index] ? "errorRow" : ""}>
      <InputErrorContainer>
        <input
          type="text"
          name={`lineItems[${index}].name`}
          {...register(`lineItems[${index}].name`, { required: true })}
          className={`${
            errors.lineItems?.[index]?.name ? "error" : "noError"
          } lineItemName`}
        />
        {errors.lineItems ? (
          <ErrorMessage>{errors.lineItems[index]?.name?.message}</ErrorMessage>
        ) : null}
      </InputErrorContainer>
      <input
        type="text"
        {...register(`lineItems[${index}].description`)}
        className="lineItemDescription"
      />
      <InputErrorContainer>
        <input
          type="number"
          name={`lineItems[${index}].quantity`}
          {...register(`lineItems[${index}].quantity`)}
          className={`${
            errors.lineItems?.[index]?.quantity ? "error" : "noError"
          } lineItemQuantity`}
          onKeyPress={validateInput}
        />
        {errors.lineItems ? (
          <ErrorMessage>
            {errors.lineItems[index]?.quantity?.message}
          </ErrorMessage>
        ) : null}
      </InputErrorContainer>
      <InputErrorContainer>
        <input
          type="number"
          {...register(`lineItems[${index}].unit_price`)}
          className={`${
            errors.lineItems?.[index]?.unit_price ? "error" : "noError"
          } lineItemPrice`}
          onKeyPress={validateInput}
        />
        {errors.lineItems ? (
          <ErrorMessage>
            {errors.lineItems[index]?.unit_price?.message}
          </ErrorMessage>
        ) : null}
      </InputErrorContainer>
      <div className="lineItemAmount">
        {!isNaN(parseFloat(quantity * unit_price).toLocaleString("en-US")) &&
        parseFloat(quantity * unit_price)
          ? parseFloat(quantity * unit_price).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          : ""}
      </div>
      <RemoveButton
        onClick={() => {
          lineToRemove.current = index;
          removeLine();
        }}
      >
        <CloseIcon />
      </RemoveButton>
    </LineItemRow>
  );
};

const LineItemRow = styled.div`
  display: flex;
  height: 30px;
  justify-content: space-between;
  padding: 15px 15px 0px 15px;
  font-size: 12px;
  .lineItemName {
    width: 145px;
    margin: 0px 7px 0px 2px;
  }
  .lineItemDescription {
    width: 145px;
    margin-right: 20px;
  }
  .lineItemQuantity,
  .lineItemPrice,
  .lineItemAmount {
    text-align: right;
  }
  .lineItemQuantity {
    width: 35px;
    margin-right: 20px;
  }
  .lineItemPrice {
    width: 55px;
  }
  .lineItemAmount {
    padding-right: 10px;
    line-height: 30px;
    width: 100px;
  }
  .error {
    border: 1px solid red;
  }
  input {
    height: 25px;
    font-size: 12px;
    font-family: CalibreRegular;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
const InputErrorContainer = styled.div`
  position: relative;
`;

const ErrorMessage = styled.div`
  position: absolute;
  font-size: 10px;
  color: red;
  left: 2px;
`;
const RemoveButton = styled.div`
  line-height: 25px;
  svg {
    height: 8px;
    width: 8px;
  }
`;

export { SingleLineItem };
