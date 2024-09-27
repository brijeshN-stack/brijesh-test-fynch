import { Box } from '@mui/material';
import type { Meta, StoryFn } from '@storybook/react';
import AddTripDialog from '@/components/addTripDialog/AddTripDialog';
import { defaultStyle } from '@/config/colorConfig';

const meta: Meta = {
  title: 'AddTrip Dialog',
  component: AddTripDialog,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: StoryFn<any> = (args: any) => <AddTripDialog {...args} />;

export const AddTripDialogComponent = Template.bind({});
AddTripDialogComponent.args = {};
AddTripDialogComponent.decorators = [
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

export const EditTripDialogComponent = Template.bind({});
EditTripDialogComponent.args = {
  tripLabel: 'Edit Business Trip',
  returnTripLabel: 'Edit return trip',
  dialogOpen: false,
};
EditTripDialogComponent.decorators = [
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
