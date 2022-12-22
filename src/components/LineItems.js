import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useFormContext, useFieldArray } from "react-hook-form";
import { SingleLineItem } from "./SingleLineItem";
import { ShipmentIcon } from "/src/assets/assets";

const LineItems = () => {
  const lineToRemove = useRef(null);
  const tableColumns = [
    {
      className: "items",
      data: "ITEMS",
    },
    {
      className: "description",
      data: "DESCRIPTION",
    },
    {
      className: "quantity",
      data: "QUANTITY",
    },
    {
      className: "price",
      data: `UNIT PRICE ($)`,
    },
    {
      className: "amount",
      data: `AMOUNT ($)`,
    },
  ];
  const { control } = useFormContext();
  //useFieldArray provides access to the fields array - keeps track of all new entries which can be added via the append method. Remove method is used to clear an element from the DOM and from the fields array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
    keyName: "lineItemKey",
  });
  //On component mount add a new lineItem as per design wireframe
  useEffect(() => {
    append({
      name: "",
      description: "",
      quantity: "",
      unit_price: "",
    });
  }, [append]);

  const handleClick = (event) => {
    event.preventDefault();
    append({
      name: "",
      description: "",
      quantity: "",
      unit_price: "",
    });
  };
  const removeLine = () => {
    remove(lineToRemove.current);
    lineToRemove.current = null;
  };
  return (
    <LineItemsBody>
      <LineItemsHeader>
        <ShipmentBubble>
          <ShipmentIcon />
        </ShipmentBubble>
        <LineItemsTitle>Line items</LineItemsTitle>
      </LineItemsHeader>
      <ColumnContainer>
        <ColumnBody>
          <Columns>
            {tableColumns.map((column, index) => (
              <div key={index} className={column.className}>
                {column.data}
              </div>
            ))}
          </Columns>
        </ColumnBody>
      </ColumnContainer>
      {fields.map((field, index) => (
        <SingleLineItem
          index={index}
          key={field.lineItemKey}
          removeLine={removeLine}
          lineToRemove={lineToRemove}
        />
      ))}
      <NewRowButton onClick={handleClick}>+ Add new line</NewRowButton>
    </LineItemsBody>
  );
};

const LineItemsBody = styled.div`
  .errorRow {
    margin-bottom: 15px;
  }
`;

const LineItemsHeader = styled.div`
  display: flex;
  height: 80px;
  svg {
    height: 15px;
    width: 15px;
  }
  align-items: center;
`;

const LineItemsTitle = styled.h4`
  margin-left: 10px;
`;

const ShipmentBubble = styled.div`
  height: 25px;
  width: 25px;
  text-align: center;
  line-height: 28px;
  background: #d6f2ff;
  border-radius: 50%;
  margin-left: 25px;
`;

const ColumnContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ColumnBody = styled.div`
  width: 100%;
  margin: 0px 25px 0px 15px;
`;

const Columns = styled.div`
  padding: 9px 0px 9px 5px;
  border-top: 2px solid #f2d44b;
  border-bottom: 2px solid #f2d44b;
  color: #f2d44b;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  font-weight: bold;
  .items {
    flex-grow: 5;
  }
  .description {
    flex-grow: 2;
  }
  .quantity,
  .price,
  .amount {
    flex-grow: 1;
    text-align: right;
  }
`;

const NewRowButton = styled.button`
  border: none;
  background: transparent;
  border-bottom: 1px solid #4bbdf2;
  color: #4bbdf2;
  font-size: 12px;
  margin: 15px 20px;
  cursor: pointer;
`;

export { LineItems };
