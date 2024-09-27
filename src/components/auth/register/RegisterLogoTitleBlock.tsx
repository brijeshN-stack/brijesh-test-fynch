import React from 'react';
import { Typography } from '@mui/material';
import { StyledStack } from '@/components/auth/style';
import ProductLogo from '@/components/sharedUi/ProductLogo';
import { defaultStyle } from '@/config/colorConfig';

type RegisterLogoTitleBlockProps = {
  create_business_account: string;
};

export default function RegisterLogoTitleBlock({ create_business_account }: RegisterLogoTitleBlockProps) {
  return (
    <>
      <StyledStack sx={{ gap: '70.9px' }}>
        {/* <Image src={fynchLogo} alt='Fynch Logo' priority /> */}
        <ProductLogo />
        <Typography variant='title' sx={{ fontSize: { xs: '28px', sm: '32px' }, color: defaultStyle.sidebarAndAuthScreenTextColor }}>
          {create_business_account}
        </Typography>
      </StyledStack>
    </>
  );
}
