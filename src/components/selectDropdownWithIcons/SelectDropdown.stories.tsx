import type { Meta, StoryFn } from '@storybook/react';
import { Box } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import DropdownBicycleIcon from '@/assets/dropdownBicycleIcon';
import DropdownCarIcon from '@/assets/dropdownCarIcon';
import SelectDropdown from './SelectDropdown';

const meta: Meta = {
  title: 'Select Component',
  component: SelectDropdown,
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

const secondarySelectValue = [
  {
    value: 'Order priority #1',
    icon: '',
  },
  {
    value: 'Order priority #2',
    icon: '',
  },
];

const Template: StoryFn<any> = (args: any) => <SelectDropdown {...args} />;

export const SelectWithIcon = Template.bind({});
SelectWithIcon.args = {
  selectValue: selectValue,
  width: '178px',
  type: 'primary',
};
SelectWithIcon.decorators = [
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

export const Select = Template.bind({});
Select.args = {
  selectValue: secondarySelectValue,
  type: 'secondary',
  width: '151px',
  height: '23px',
  borderRadius: '4px',
};
Select.decorators = [
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
