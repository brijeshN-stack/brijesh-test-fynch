import React, { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

type FormProps = {
  children?: ReactNode;
  methods?: Object | any;
  onSubmit?: () => void;
};

export default function Form({ children, onSubmit, methods }: FormProps) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
}
