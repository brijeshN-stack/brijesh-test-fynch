import React, { Fragment, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CancelIcon from '@/assets/cancelIcon';
import { defaultStyle } from '@/config/colorConfig';
import CustomButton from '@/components/button/CustomButton';
import { DialogHeaderTypography, StyledDialog } from '@/components/StyledComponents/styledComponents';
import CircularLoader from '@/components/circularLoader/CircularLoader';
import { useAppSelector } from '@/redux/hooks';
import { RootState, dispatch } from '@/redux/store';
import {
  selectDialogLoading,
  selectExpenseReportStatus,
  selectMonthsOfExpenseReports,
  submitExpenseReportSuccess,
} from '@/redux/slices/tripsSlice';
import { months, warningMessages } from '@/utils/constants';
import { subscription } from '@/redux/slices/profileSlice';
import { sagaActions } from '@/redux/actions';
import { styled } from '@mui/system';
import { triggerInfoMessage } from '@/utils/helpers';

interface ExpenseProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  intl: any;
  licenseDataFromLocal: any;
}

export default function SubmitExpenseDialog({ dialogOpen, setDialogOpen, intl, licenseDataFromLocal }: ExpenseProps) {
  const [selectedMonth, setSelectedMonth] = useState();

  const isDialogLoading = useAppSelector((state: RootState) => selectDialogLoading(state));
  const expenseReports = useAppSelector((state: RootState) => selectMonthsOfExpenseReports(state));
  const getSubscriptionDetails: any = useAppSelector((state: RootState) => subscription(state));

  const subscriptionDetails = getSubscriptionDetails || licenseDataFromLocal;
  const expenseReportStatus: any = useAppSelector((state: RootState) => selectExpenseReportStatus(state));
  useEffect(() => {
    if (expenseReportStatus) {
      setDialogOpen(false);
      setSelectedMonth(undefined);
      dispatch(submitExpenseReportSuccess(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenseReportStatus]);
  const modifyExpenseData = expenseReports.reduce((acc: any, curr) => {
    const year = curr.split('-')[0];
    const yearExists: any = acc.find((item: any) => item.year === year);
    if (yearExists) {
      yearExists.months.push(curr);
    } else {
      acc.push({
        year: year,
        months: [curr],
      });
    }
    return acc;
  }, []);

  const handleOnCloseDialog = () => {
    setDialogOpen(false);
    setSelectedMonth(undefined);
  };

  const buttonStyle = {
    width: '101px',
    height: '33px',
    borderRadius: '7px !important',
  };
  const getMonthName = (monthNumber: number) => {
    const monthName = months[monthNumber - 1];
    return intl?.formatMessage({ id: monthName });
  };
  const handleClickFunction = (month: any) => {
    if (month === selectedMonth) {
      setSelectedMonth(undefined);
    } else {
      setSelectedMonth(month);
    }
  };
  const handleOpenExpenseReportDialog = () => {
    const monthOfYear = selectedMonth || '';
    const [year, month] = monthOfYear?.split('-');
    const selectYear = parseInt(year);
    const selectMonth = parseInt(month, 10);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (selectYear === currentYear && selectMonth === currentMonth) {
      triggerInfoMessage(warningMessages.cannot_submit_current_month);
    } else {
      dispatch({
        type: sagaActions.SUBMIT_EXPENSE_REPORTS,
        data: {
          year: selectYear,
          month: selectMonth,
        },
        license_id: subscriptionDetails?.license?.id,
        dialogLoading: true,
      });
    }
  };
  return (
    <>
      <StyledDialog
        onClose={handleOnCloseDialog}
        open={dialogOpen}
        sx={{
          '.MuiDialog-paper': {
            // width: '100%',
            maxWidth: '677px',
            minWidth: '300px',
          },
        }}>
        {isDialogLoading && <CircularLoader />}
        <DialogWrapper>
          <Box sx={{ right: '18px', cursor: 'pointer', position: 'absolute' }} onClick={handleOnCloseDialog}>
            <CancelIcon />
          </Box>
          <Box
            sx={{
              display: 'flex',
              height: '38px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <DialogHeaderTypography sx={{ maxWidth: '100%' }}>{intl?.formatMessage({ id: 'submit_your_expense' })}</DialogHeaderTypography>
          </Box>
          {expenseReports.length === 0 ? (
            <Box
              sx={{
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Typography variant='title3'>{intl?.formatMessage({ id: 'no_data_available' })}</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '20px',
                marginTop: '13px',
              }}>
              {modifyExpenseData.map((item: any, index: number) => {
                return (
                  <Fragment key={index}>
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          height: '31px',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                        }}>
                        <DialogHeaderTypography sx={{ maxWidth: '100% ' }}>{item.year}</DialogHeaderTypography>
                      </Box>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          marginTop: '7px',
                          rowGap: '7px',
                          columnGap: '5px',
                          flexWrap: 'wrap',
                        }}>
                        {item.months.map((month: any, index: number) => {
                          return (
                            <Fragment key={index}>
                              <CustomButton
                                variant='defaultSecondary'
                                sx={{
                                  ...buttonStyle,
                                  color: selectedMonth === month ? defaultStyle.secondaryColor : defaultStyle.primaryColor,
                                  background: selectedMonth === month ? defaultStyle.primaryColor : defaultStyle.disableButtonColor,
                                  boxShadow: 'none !important',
                                  ':hover': {
                                    background: `${defaultStyle.primaryColor} !important`,
                                    color: `${defaultStyle.secondaryColor} !important`,
                                  },
                                }}
                                handleClick={() => handleClickFunction(month)}>
                                {getMonthName(month?.split('-')[1])}
                              </CustomButton>
                            </Fragment>
                          );
                        })}
                      </Box>
                    </Box>
                  </Fragment>
                );
              })}
            </Box>
          )}
          {expenseReports.length === 0 ? null : (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}>
              <CustomButton
                variant='defaultSecondary'
                disabled={selectedMonth ? false : true}
                handleClick={handleOpenExpenseReportDialog}
                sx={{
                  width: '177px',
                  height: '36px',
                  marginTop: '32px',
                  borderRadius: '7px !important',
                  boxShadow: 'none !important',
                }}>
                {intl?.formatMessage({ id: 'submit_expense' })}
              </CustomButton>
            </Box>
          )}
        </DialogWrapper>
      </StyledDialog>
    </>
  );
}
const DialogWrapper = styled(Box)(({ theme }: any) => ({
  padding: '20px 23px 31px',
  width: '100%',
  position: 'relative',
}));
