import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import CommonTable from './CommonTable';
import './commonTable.css';
import { tableColumns, tableRows } from './tableDummyData';

const meta: Meta<typeof CommonTable> = {
  component: CommonTable,
  title: 'CommonTable',
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: tableColumns,
    rows: tableRows,
  },
  decorators: [
    Story => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Story />
      </Box>
    ),
  ],
};
