import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { defaultStyle } from '@/config/colorConfig';
import { Box, Dialog } from '@mui/material';
import Background from '../background/Background';
import CustomTextField, { CustomTextFieldProps } from './CustomTextField';
import Card from '../card/Card';

const meta: Meta = {
  title: 'CustomTextField',
  component: CustomTextField,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const Template: StoryFn<CustomTextFieldProps> = args => <CustomTextField {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Enter your email',
  type: 'text',
  placeholder: 'Enter your email',
  variant: 'primary',
  sx: { width: '370px', height: '46px' },
};
Primary.decorators = [
  (Story: any) => (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
      <Background />
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: defaultStyle.cardBackground,
          width: defaultStyle.cardResponsiveWidth,
          height: '100%',
          overflow: 'auto',
          borderRadius: '22px',
          border: '0.2px solid #f5f4f430',
          position: 'absolute',
          right: 0,
          top: 0,
          backdropFilter: 'blur(6px)',
        }}
        childern={<Story />}
      />
    </div>
  ),
];

export const Secondary = Template.bind({});
Secondary.args = {
  placeholder: 'Start location',
  variant: 'secondary',
};
Secondary.decorators = [
  (Story: any) => (
    <Dialog
      sx={{
        '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          borderRadius: '13px',
        },
      }}
      open={true}>
      <Box
        sx={{
          background: defaultStyle.secondaryColor,
          '.MuiInputBase-input-MuiOutlinedInput-input': {
            textAlign: 'center',
          },
          width: '500px',
          height: '310px',
          padding: '0px 41px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Story />
      </Box>
    </Dialog>
  ),
];
