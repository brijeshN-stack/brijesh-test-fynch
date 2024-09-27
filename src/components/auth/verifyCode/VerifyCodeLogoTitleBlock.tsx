import React from 'react';
import { Typography } from '@mui/material';
import { StyledStack } from '@/components/auth/style';
import ProductLogo from '@/components/sharedUi/ProductLogo';
import { defaultStyle } from '@/config/colorConfig';

type VerifyCodeLogoTitleBlockProps = {
  enter_registration_code?: string;
  could_not_match_email?: string;
};

export default function VerifyCodeLogoTitleBlock({ enter_registration_code, could_not_match_email }: VerifyCodeLogoTitleBlockProps) {
  return (
    <>
      <StyledStack sx={{ gap: '74.9px' }}>
        {/* <Image src={fynchLogo} alt='Fynch Logo' priority /> */}
        <ProductLogo />
      </StyledStack>
      <StyledStack sx={{ gap: '11px', marginTop: '75px' }}>
        <Typography variant='title' lineHeight='33px' sx={{ color: defaultStyle.sidebarAndAuthScreenTextColor }}>
          {enter_registration_code}
        </Typography>
        <StyledStack sx={{ width: '80%' }}>
          <Typography variant='title4' textAlign='center' sx={{ color: defaultStyle.sidebarAndAuthScreenTextColor }}>
            {could_not_match_email}
          </Typography>
        </StyledStack>
      </StyledStack>
    </>
  );
}
