import { defaultStyle } from '@/config/colorConfig';
import React, { useState } from 'react';
import { RegisterTermsAndConditionBlockProps } from '@/components/auth/register/RegisterTermsAndConditionBlock';

export default function RadioButton({ setChecked, checked, fill }: RegisterTermsAndConditionBlockProps) {
  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={handleCheck}
      style={{ cursor: 'pointer' }}>
      <path
        d='M1.94438 7.80438C2.16262 7.37319 6.26211 -0.450184 12.5643 1.23828C17.429 2.54146 19.975 8.57553 18.653 12.2809C18.1142 13.7907 17.0198 14.6697 15.3445 16.0155C13.6758 17.3559 10.8729 19.6074 8.03296 18.847C7.17286 18.6166 6.35248 17.8518 4.66156 16.3816C2.63753 14.6219 1.43891 13.5523 1.09441 11.9114C0.741373 10.2298 1.45718 8.76687 1.94438 7.80438'
        stroke={fill || 'white'}
        strokeWidth='1'
        fill={checked ? fill || defaultStyle.authScreenButtonColor : 'none'}
      />
    </svg>
  );
}
