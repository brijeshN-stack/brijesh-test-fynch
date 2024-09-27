import React from 'react';

type AddVehicleIconProps = {
  fill?: string;
  circleFillColor?: string;
};
export default function AddVehicleIcon({ circleFillColor, fill }: AddVehicleIconProps) {
  return (
    <svg width='40' height='40' viewBox='0 0 62 62' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='31' cy='31' r='31' fill={circleFillColor || '#F5F4F4'} />
      <path
        d='M30.5265 20.2632C30.1216 20.2632 29.7934 20.5914 29.7934 20.9963V29.7933H20.9964C20.5915 29.7933 20.2633 30.1215 20.2633 30.5263C20.2633 30.9312 20.5915 31.2594 20.9964 31.2594H29.7934V40.0564C29.7934 40.4613 30.1216 40.7895 30.5265 40.7895C30.9313 40.7895 31.2595 40.4613 31.2595 40.0564V31.2594H40.0565C40.4614 31.2594 40.7896 30.9312 40.7896 30.5263C40.7896 30.1215 40.4614 29.7933 40.0565 29.7933H31.2595V20.9963C31.2595 20.5914 30.9313 20.2632 30.5265 20.2632Z'
        fill={fill || '#0E163B'}
      />
    </svg>
  );
}
