import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import WorkFromHomeIcon from '@/assets/workFromHomeIcon';
import { defaultStyle } from '@/config/colorConfig';
import CustomButton from './CustomButton';

const meta: Meta<typeof CustomButton> = {
  component: CustomButton,
  title: 'Button',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryButton: Story = {
  args: {
    children: 'Create a new account',
    variant: 'primary',
    sx: {
      width: '370px',
      height: '46px',
    },
  },
  decorators: [
    (Story: any) => (
      <Box
        sx={{
          background: defaultStyle.primaryColor,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Story />
      </Box>
    ),
  ],
};

export const SecondaryButton: Story = {
  args: {
    children: 'Save',
    variant: 'secondary',
    sx: {
      width: '221px',
      height: '38px',
    },
  },
  decorators: [
    (Story: any) => (
      <Box
        sx={{
          background: defaultStyle.pageBackgroundColor,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Story />
      </Box>
    ),
  ],
};

export const ButtonWithIcon: Story = {
  args: {
    children: 'Work from home',
    showStartIcon: <WorkFromHomeIcon />,
    variant: 'secondary',
    sx: {
      border: `0.5px solid ${defaultStyle.wfhButtonColor}`,
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          background: defaultStyle.primaryColor,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Story />
      </div>
    ),
  ],
};
