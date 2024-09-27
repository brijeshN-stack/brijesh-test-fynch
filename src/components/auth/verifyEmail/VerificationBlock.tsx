import React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';
import inboxIcon from '@/assets/inboxIcon.svg';
import { useTranslate } from '@/hooks/useTranslate';
import { StyledStack } from '../style';
import useLocale from '@/hooks/useLocale';
import ProductLogo from '@/components/sharedUi/ProductLogo';
import { defaultStyle } from '@/config/colorConfig';
import MessageIcon from '@/assets/messageIcon';

type VerificationBlockProps = {
  getQueryValue: string | undefined | null;
};

export default function VerificationBlock({ getQueryValue }: VerificationBlockProps) {
  const [locale] = useLocale();

  const intl = useTranslate(locale);

  return (
    <>
      <StyledStack sx={{ gap: '15px', marginTop: { sm: '96px', xs: '60px' } }}>
        <StyledStack sx={{ gap: '74.9px' }}>
          {/* <Image src={fynchLogo} alt='Fynch Logo' priority /> */}
          <ProductLogo />
          {/* <Image src={inboxIcon} alt='Inbox Icon' /> */}
          <MessageIcon fill={defaultStyle.sidebarAndAuthScreenTextColor} />
        </StyledStack>
        <StyledStack sx={{ gap: '49px', marginTop: '40px' }}>
          <Typography variant='title' lineHeight='33px' sx={{ color: defaultStyle.sidebarAndAuthScreenTextColor }}>
            {intl?.formatMessage({ id: 'verify_your_email' })}
          </Typography>
          <StyledStack sx={{ maxWidth: { sm: '440px', xs: '300px' }, width: '100%' }}>
            <Typography variant='title3' sx={{ color: defaultStyle.sidebarAndAuthScreenTextColor }} textAlign='center'>
              {intl?.formatMessage({ id: 'sent_email_to' })} {getQueryValue}
            </Typography>
            <Typography variant='title3' sx={{ color: defaultStyle.sidebarAndAuthScreenTextColor }}>
              {intl?.formatMessage({ id: 'verify_email' })}
            </Typography>
          </StyledStack>
        </StyledStack>
      </StyledStack>
    </>
  );
}
