import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useInvoiceContext } from "/src/contexts/InvoiceContext";
import { CalendarIcon } from "/src/assets/assets";

const Terms = () => {
  const { term, setTerm, defaultTerm } = useInvoiceContext();
  const netOptions = useMemo(() => [7, 15, 30, 60, "Custom date"], []);
  useEffect(() => {
    netOptions.forEach((option) => {
      if (option === defaultTerm) {
        setTerm(option);
      }
    });
  }, [defaultTerm, netOptions, setTerm]);

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <TermsBody>
      <CalendarBubble>
        <CalendarIcon />
      </CalendarBubble>
      <TermsTitle>Payment terms</TermsTitle>
      <SelectBox>
        <StyledSelect onChange={handleChange} value={term}>
          {netOptions.map((option, index) => {
            let text = `Net ${option}`;
            if (option === defaultTerm) {
              text = `Net ${option} (Default)`;
            }
            if (index === netOptions.length - 1) {
              text = option;
            }
            return (
              <option value={option} key={index}>
                {text}
              </option>
            );
          })}
        </StyledSelect>
        {term === "Custom date" && (
          <DatePickerBox>
            <CustomDatePicker />
            <CalendarIcon />
          </DatePickerBox>
        )}
      </SelectBox>
      {/* NextJS does not allow the import of node_module stylesheets */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
      />
    </TermsBody>
  );
};

const CustomDatePicker = () => {
  const { startDate, setStartDate } = useInvoiceContext();
  useEffect(() => {
    setStartDate(new Date());
    return () => setStartDate(null);
  }, [setStartDate]);
  return (
    <DatePicker
      wrapperClassName="datePicker"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};

const TermsBody = styled.div`
  display: flex;
  border: 1px solid lightgrey;
  border-radius: 6px;
  box-shadow: 0px 4px 3px #ededed;
  height: 75px;
  align-items: center;
  svg {
    height: 15px;
    width: 15px;
  }
`;

const CalendarBubble = styled.div`
  height: 25px;
  width: 25px;
  text-align: center;
  line-height: 28px;
  background: #d6f2ff;
  border-radius: 50%;
  margin-left: 25px;
`;

const TermsTitle = styled.h4`
  margin-left: 10px;
`;

const SelectBox = styled.div`
  display: flex;
  width: 340px;
  margin-left: 30px;
  margin-right: 10px;
  border-radius: 2px;
  .datePicker {
    margin-left: 5px;
    flex-grow: 1;
    input {
      width: 136px;
      height: 30px;
      padding: 0;
      padding-left: 10px;
      font-size: 12px;
      font-family: CalibreRegular;
    }
  }
`;

const StyledSelect = styled.select`
  flex-grow: 1;
  font-size: 12px;
  height: 35px;
  font-family: CalibreRegular;
`;

const DatePickerBox = styled.div`
  position: relative;
  svg {
    position: absolute;
    right: 5px;
    top: 10px;
    height: 12px;
  }
`;

export { Terms };
