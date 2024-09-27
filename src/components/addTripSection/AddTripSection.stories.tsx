import { Box } from '@mui/material';
import type { Meta, StoryFn } from '@storybook/react';
import { defaultStyle } from '@/config/colorConfig';
import AddTripSection from '@/components/addTripSection/AddTripSection';

const meta: Meta = {
  title: 'AddTrip Card',
  component: AddTripSection,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: StoryFn<any> = (args: any) => <AddTripSection {...args} />;

export const AddTripComponent = Template.bind({});
AddTripComponent.args = {};
AddTripComponent.decorators = [
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
