import type { Meta, StoryFn } from '@storybook/react';
import { Box } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import Statistics from './Statistics';

const meta: Meta = {
  title: 'Statistics',
  component: Statistics,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: StoryFn<any> = (args: any) => <Statistics {...args} />;

export const StatisticsComponent = Template.bind({});
StatisticsComponent.args = {};
StatisticsComponent.decorators = [
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
