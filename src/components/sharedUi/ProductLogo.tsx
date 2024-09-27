import React from 'react';
import Image from 'next/image';
import { productLogo } from '@/utils/constants';
// import productLogo from '@/assets/productLogo.png';

export default function ProductLogo() {
  const productLogoWidth = process?.env?.NEXT_PUBLIC_PRODUCT_LOGO_WIDTH ? Number(process.env.NEXT_PUBLIC_PRODUCT_LOGO_WIDTH) : 145;
  return <Image src={productLogo || ''} width={productLogoWidth} height={26} priority alt='Product logo' />;
}
