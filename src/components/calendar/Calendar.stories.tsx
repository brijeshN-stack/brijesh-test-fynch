import type { Meta, StoryFn } from '@storybook/react';
import Calendar from './Calendar';

const meta: Meta = {
  title: 'Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const Template: StoryFn<any> = (args: any) => <Calendar {...args} />;

export const CalendarComponent = Template.bind({});
CalendarComponent.args = {};

CalendarComponent.decorators = [(Story: any) => <Story />];
