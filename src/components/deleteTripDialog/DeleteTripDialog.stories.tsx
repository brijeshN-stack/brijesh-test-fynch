import { Box } from '@mui/material';
import type { Meta, StoryFn } from '@storybook/react';
import { defaultStyle } from '@/config/colorConfig';
import DeleteTripDialog from './DeleteTripDialog';

const meta: Meta = {
  title: 'Delete trip Dialog',
  component: DeleteTripDialog,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: StoryFn<any> = (args: any) => <DeleteTripDialog {...args} />;

export const DeleteTripDialogComponent = Template.bind({});
DeleteTripDialogComponent.args = {};
DeleteTripDialogComponent.decorators = [
  (Story: any) => (
    <Box
      sx={{
        background: defaultStyle.pageBackgroundColor,
        height: '100vh',
        width: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Story />
    </Box>
  ),
];
