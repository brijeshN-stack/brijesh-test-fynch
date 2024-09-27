import { Box } from '@mui/material';
import type { Meta, StoryFn } from '@storybook/react';
import { defaultStyle } from '@/config/colorConfig';
import GetVehicleSection from './GetVehicleSection';

const meta: Meta = {
  title: 'GetVehicleSection',
  component: GetVehicleSection,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const Template: StoryFn<any> = (args: any) => <GetVehicleSection {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
};

Primary.decorators = [
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
];

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
};

Secondary.decorators = [
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
];
