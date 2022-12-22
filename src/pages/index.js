import React from "react";
import { Invoice } from "/src/components/Invoice";
import { FormProvider, useForm } from "react-hook-form";
import { InvoiceProvider } from "/src/contexts/InvoiceContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const SinglePageApp = () => {
  const validationSchema = Yup.object().shape({
    lineItems: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        quantity: Yup.string().required("Required"),
        unit_price: Yup.string().required("Required"),
      })
    ),
  });
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });
  return (
    <InvoiceProvider>
      <FormProvider {...methods}>
        <Invoice />
      </FormProvider>
    </InvoiceProvider>
  );
};

export default SinglePageApp;
