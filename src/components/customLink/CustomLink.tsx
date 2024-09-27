import { defaultStyle } from '@/config/colorConfig';
import Link from 'next/link';
import { ReactNode } from 'react';

type CustomLinkProps = {
  children: ReactNode;
  location: string;
  target?: string;
};

export default function CustomLink({ children, location, target }: CustomLinkProps) {
  return (
    <Link
      style={{
        marginInlineStart: '5px',
        textDecoration: 'underline',
        textDecorationColor: process.env.NEXT_PUBLIC_AUTH_SCREEN_LINK_COLOR || defaultStyle.authScreenButtonColor,
      }}
      target={target}
      href={location}>
      {children}
    </Link>
  );
}
