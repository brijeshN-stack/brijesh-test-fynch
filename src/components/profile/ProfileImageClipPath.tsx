import React from 'react';
import { defaultStyle } from '@/config/colorConfig';
import { defaultProfilePath } from '@/assets/blobs/defaultProfilePath';

type ProfileImageClipPathProps = {
  imageUrl?: any;
  paddingLeft?: string;
  label?: any;
};

export default function ProfileImageClipPath({ imageUrl, paddingLeft, label }: ProfileImageClipPathProps) {
  const style = {
    textTransform: 'capitalize',
    fontSize: '3rem',
    opacity: '60%',
    fontWeight: 'bold',
    fill: defaultStyle.primaryColor,
  } as React.CSSProperties;

  const svgStyle = `translate(${process.env.NEXT_PUBLIC_PROFILE_IMAGE_TOP || 0} ${process.env.NEXT_PUBLIC_PROFILE_IMAGE_LEFT || 0})`;
  const decodedSvg = atob(process.env.NEXT_PUBLIC_SVG_PATH || '');
  const parser = new DOMParser();
  const doc = parser.parseFromString(decodedSvg, 'image/svg+xml');
  const pathElement = doc.querySelector('path');
  const svgPath = pathElement?.getAttribute('d') || defaultProfilePath;

  return (
    <svg viewBox='0 0 180 180' width={'100%'} height={'200px'} preserveAspectRatio='xMidYMid meet' style={{ paddingLeft: paddingLeft }}>
      <defs>
        <clipPath id='shape'>
          <path id='Imported Path' fill='none' stroke='black' strokeWidth='1' d={svgPath} transform={svgStyle} />
        </clipPath>
      </defs>
      {label && (
        <>
          <rect width='180' height='180' fill='white' clipPath='url(#shape)' />
          <text style={style} x='45%' y='50%' dominantBaseline='middle' textAnchor='middle' fontSize='20' clipPath='url(#shape)'>
            {label}
          </text>
        </>
      )}
      {imageUrl && <image width='180' height='180' clipPath='url(#shape)' href={imageUrl} preserveAspectRatio='xMidYMid slice'></image>}
    </svg>
  );
}
{
  /* <path
id='Imported Path'
fill='none'
stroke='black'
strokeWidth='1'
d='M 74.72,0.63
C 112.10,-5.62 144.05,21.37 154.41,56.00
156.31,62.36 157.92,68.31 158.00,75.00
158.09,83.14 158.39,89.05 155.96,97.00
150.49,114.91 133.40,126.98 119.00,137.87
104.75,148.64 89.44,158.21 71.00,158.00
54.38,157.81 44.76,146.56 33.00,136.42
15.22,121.10 -0.29,110.50 0.00,85.00
0.13,73.80 6.83,60.40 12.68,51.00
27.44,27.31 46.86,7.41 74.72,0.63 Z'
/> */
}
