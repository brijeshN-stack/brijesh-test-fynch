import type { Meta, StoryFn } from '@storybook/react';
import { Box } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import DropdownBicycleIcon from '@/assets/dropdownBicycleIcon';
import DropdownCarIcon from '@/assets/dropdownCarIcon';
import SelectWithEndIcon from './SelectWithEndIcon';

const meta: Meta = {
  title: 'SelectWithEndIcon',
  component: SelectWithEndIcon,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const selectValue = [
  {
    value: 'Bicycle',
    icon: <DropdownBicycleIcon />,
  },
  {
    value: 'Car',
    icon: <DropdownCarIcon />,
  },
];

const Template: StoryFn<any> = (args: any) => <SelectWithEndIcon {...args} />;

export const SelectWithEndIconComponent = Template.bind({});
SelectWithEndIconComponent.args = {
  selectValue: selectValue,
  width: '239px',
};
SelectWithEndIconComponent.decorators = [
  (Story: any) => (
    <Box
      sx={{
        background: defaultStyle.secondaryColor,
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
