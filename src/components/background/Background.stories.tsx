import type { Meta, StoryObj } from '@storybook/react';
import Background from './Background';

const meta: Meta<typeof Background> = {
  component: Background,
  title: 'Background',
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
