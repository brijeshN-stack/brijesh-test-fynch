import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import CancelIcon from '@/assets/cancelIcon';
import CustomButton from '@/components/button/CustomButton';
import { DialogWrapper } from '@/components/addTripDialog/AddTripDialog';
import { StyledDialog } from '@/components/StyledComponents/styledComponents';
import { months } from '@/utils/constants';
import { SelectedMonthProps } from '@/types';

interface ExpenseReportProps {
  expenseReportDialogOpen?: boolean;
  setExpenseReportDialogOpen?: any;
  intl: any;
  selectedMonth: SelectedMonthProps | undefined;
}

export default function ExpenseReport({ selectedMonth, expenseReportDialogOpen, setExpenseReportDialogOpen, intl }: ExpenseReportProps) {
  const getMonthName = (monthNumber: number | undefined) => {
    return monthNumber !== undefined ? months[monthNumber - 1] : '';
  };
  const expenseReportData = [
    { id: 1, count: 5, label: intl?.formatMessage({ id: 'work_from_home_days' }) },
    { id: 2, count: 35, label: intl?.formatMessage({ id: 'commute_trips' }) },
    { id: 3, count: 4, label: intl?.formatMessage({ id: 'business_trips' }) },
  ];

  const handleOpenExpenseReportDialog = () => {
    setExpenseReportDialogOpen(true);
  };

  const handleCloseExpenseReportDialog = () => {
    setExpenseReportDialogOpen(false);
  };

  const commonStyle = {
    textAlign: 'center',
    color: defaultStyle.primaryColor,
  };
  const monthName = selectedMonth ? getMonthName(selectedMonth.month) : '';

  return (
    <div>
      <StyledDialog onClose={handleCloseExpenseReportDialog} open={expenseReportDialogOpen ? expenseReportDialogOpen : false}>
        <DialogWrapper
          sx={{
            maxWidth: '470px',
            maxHeight: 'none',
            height: '100%',
            padding: { xs: '0 23px 17px', sm: '0 64px 17px' },
          }}>
          <Box
            sx={{
              position: 'absolute',
              right: '0',
              cursor: 'pointer',
              padding: '11px 10.95px',
            }}
            onClick={handleCloseExpenseReportDialog}>
            <CancelIcon />
          </Box>
          <Stack sx={{ alignItems: 'center' }}>
            <Stack sx={{ marginTop: '7px' }}>
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 600,
                  lineHeight: '33px',
                  ...commonStyle,
                }}>
                {intl?.formatMessage({ id: 'create_expense_report_for' })} {monthName ? intl?.formatMessage({ id: monthName }) : ''}{' '}
                {selectedMonth?.year}
              </Typography>
              <Typography variant='title3' sx={{ ...commonStyle, lineHeight: { xs: '20px', sm: '33px' } }}>
                {intl?.formatMessage({ id: 'submit_following_information' })}
              </Typography>
            </Stack>
            {expenseReportData?.map(item => (
              <Stack key={item.id} sx={{ marginTop: '7px', alignItems: 'center' }}>
                <Box sx={{ width: '172px', display: 'flex', gap: '5px' }}>
                  <Typography variant='title3' sx={{ fontWeight: '700 !important', ...commonStyle }}>
                    {item.count}
                  </Typography>
                  <Typography
                    variant='title3'
                    textTransform='capitalize'
                    sx={{
                      ...commonStyle,
                    }}>
                    {item.label}
                  </Typography>
                </Box>
              </Stack>
            ))}
            <Typography
              variant='title3'
              sx={{
                textAlign: 'start',
                marginTop: '5px',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              }}>
              {intl?.formatMessage({ id: 'you_can_not_make_edits' })}
              {monthName ? intl?.formatMessage({ id: monthName }) : ''} {selectedMonth?.year}
            </Typography>
            <CustomButton
              variant='defaultSecondary'
              disabled
              sx={{
                width: '228px',
                height: '38px',
                marginTop: '10px',
                borderRadius: '7px',
              }}>
              Proceed
            </CustomButton>
          </Stack>
        </DialogWrapper>
      </StyledDialog>
    </div>
  );
}
