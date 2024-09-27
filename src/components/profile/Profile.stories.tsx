import type { Meta, StoryFn } from '@storybook/react';
import { Box } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import Profile from './Profile';
import ThemeProvider from '../../theme/index';

const meta: Meta = {
  title: 'Profile Menu',
  component: Profile,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: StoryFn<any> = (args: any) => <Profile {...args} />;

export const ProfileComponent = Template.bind({});
ProfileComponent.args = {};
ProfileComponent.decorators = [
  (Story: any) => (
    <ThemeProvider>
      <Box
        sx={{
          background: defaultStyle.pageBackgroundColor,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}>
        <Story />
      </Box>
    </ThemeProvider>
  ),
];
