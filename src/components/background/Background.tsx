import React from 'react';
import Image from 'next/image';
import bg from '@/assets/bg.svg';

export default function Background() {
  return <Image src={bg.src} alt='Background Image' layout='fill' objectFit='cover' style={{ padding: '15px', borderRadius: '36px' }} />;
}
