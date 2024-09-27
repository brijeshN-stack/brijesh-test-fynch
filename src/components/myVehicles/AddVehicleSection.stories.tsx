import { Box } from '@mui/material';
import type { Meta, StoryFn } from '@storybook/react';
import { defaultStyle } from '@/config/colorConfig';
import AddVehicleSection from './AddVehicleSection';

const meta: Meta = {
  title: 'AddVehicleSection',
  component: AddVehicleSection,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const Template: StoryFn<any> = (args: any) => <AddVehicleSection {...args} />;

export const AddVehicleSectionComponent = Template.bind({});
AddVehicleSectionComponent.args = {};

AddVehicleSectionComponent.decorators = [
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
