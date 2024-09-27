import type { Meta, StoryFn } from '@storybook/react';
import { Box } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import AddVehicleDialog from './AddVehicleDialog';

const meta: Meta = {
  title: 'AddVehicle Dialog',
  component: AddVehicleDialog,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: StoryFn<any> = (args: any) => <AddVehicleDialog {...args} />;

export const AddVehicleDialogComponent = Template.bind({});
AddVehicleDialogComponent.args = {};
AddVehicleDialogComponent.decorators = [
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
